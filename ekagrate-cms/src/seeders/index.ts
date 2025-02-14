import { categories, artisans, products, siteConfig } from './seed-data';

export default async ({ strapi }) => {
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await strapi.db.query('api::category.category').deleteMany({});
    await strapi.db.query('api::artisan.artisan').deleteMany({});
    await strapi.db.query('api::product.product').deleteMany({});
    await strapi.db.query('api::site-config.site-config').deleteMany({});

    // Seed categories
    console.log('Seeding categories...');
    const createdCategories = await Promise.all(
      categories.map(category =>
        strapi.db.query('api::category.category').create({ data: category })
      )
    );

    // Seed artisans
    console.log('Seeding artisans...');
    const createdArtisans = await Promise.all(
      artisans.map(artisan =>
        strapi.db.query('api::artisan.artisan').create({ data: artisan })
      )
    );

    // Seed products with relationships
    console.log('Seeding products...');
    const productsWithRelations = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length].id,
      artisan: createdArtisans[index % createdArtisans.length].id,
    }));

    await Promise.all(
      productsWithRelations.map(product =>
        strapi.db.query('api::product.product').create({ data: product })
      )
    );

    // Seed site config
    console.log('Seeding site configuration...');
    await strapi.db.query('api::site-config.site-config').create({
      data: siteConfig
    });

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}; 