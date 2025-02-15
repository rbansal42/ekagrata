import { MongoClient, ObjectId } from "mongodb";

// Define interfaces for dummy data
interface Image {
  url: string;
  alternativeText?: string;
}

interface Product {
  _id: ObjectId;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  images: Image[];
  featuredImage: string;
  categories: ObjectId[]; // Reference to category _id's
  featured: boolean;
}

interface Category {
  _id: ObjectId;
  name: string;
  description?: string;
  slug: string;
  image?: Image;
  products: ObjectId[]; // Array of product _id's
  featured: boolean;
  order: number;
}

// Dummy icons for images
const dummyIcons: string[] = [
  "/images/icons/icon1.svg",
  "/images/icons/icon2.svg",
  "/images/icons/icon3.svg",
];

// Create 3 dummy categories: Cups, Plates, Bowls
const dummyCategories: Category[] = [
  {
    _id: new ObjectId(),
    name: "Cups",
    description: "Beautiful cups for every occasion",
    slug: "cups",
    image: { url: dummyIcons[Math.floor(Math.random() * dummyIcons.length)], alternativeText: "Cups Icon" },
    products: [],
    featured: true,
    order: 1,
  },
  {
    _id: new ObjectId(),
    name: "Plates",
    description: "Elegant plates that stand out",
    slug: "plates",
    image: { url: dummyIcons[Math.floor(Math.random() * dummyIcons.length)], alternativeText: "Plates Icon" },
    products: [],
    featured: false,
    order: 2,
  },
  {
    _id: new ObjectId(),
    name: "Bowls",
    description: "Handcrafted bowls for your table",
    slug: "bowls",
    image: { url: dummyIcons[Math.floor(Math.random() * dummyIcons.length)], alternativeText: "Bowls Icon" },
    products: [],
    featured: true,
    order: 3,
  },
];

// Generate 20 dummy products and distribute them among categories
const dummyProducts: Product[] = Array.from({ length: 20 }, (_, i) => {
  const categoryIndex = i % dummyCategories.length; // distribute evenly
  const category = dummyCategories[categoryIndex];
  const name = `${category.name} Product ${i + 1}`;
  const randomIcon = dummyIcons[Math.floor(Math.random() * dummyIcons.length)];
  return {
    _id: new ObjectId(),
    name,
    slug: name.toLowerCase().replace(/ /g, "-"),
    shortDescription: `Short description for ${name}.`,
    longDescription: `Long detailed description for ${name}. It is a great product in the ${category.name} category.`,
    price: Math.floor(Math.random() * 90) + 10, // price between 10 and 99
    images: [{ url: randomIcon, alternativeText: `${name} Icon` }],
    featuredImage: randomIcon,
    categories: [category._id],
    featured: Math.random() < 0.5,
  };
});

// Update each category.products field to include product _id's
dummyCategories.forEach(category => {
  category.products = dummyProducts
    .filter(product => product.categories.some(catId => catId.equals(category._id)))
    .map(product => product._id);
});

async function seedData() {
  // Use MONGO_URI and MONGO_DB_NAME from environment variables, or fall back to defaults
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
  const dbName = process.env.MONGO_DB_NAME || "ekagrata";

  console.log("Connecting to MongoDB...");
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);

    // Get collections for categories and products
    const categoriesCollection = db.collection("categories");
    const productsCollection = db.collection("products");

    // Clean existing data
    console.log("Deleting old data...");
    await categoriesCollection.deleteMany({});
    await productsCollection.deleteMany({});

    // Insert dummy categories
    console.log("Seeding categories...");
    const resultCategories = await categoriesCollection.insertMany(dummyCategories);
    console.log(`Inserted categories: ${resultCategories.insertedCount}`);

    // Insert dummy products
    console.log("Seeding products...");
    const resultProducts = await productsCollection.insertMany(dummyProducts);
    console.log(`Inserted products: ${resultProducts.insertedCount}`);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.close();
  }
}

seedData(); 