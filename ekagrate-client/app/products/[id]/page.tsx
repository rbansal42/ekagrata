import { getProduct } from "@/lib/strapi";
import { ProductDetail } from "@/components/sections";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

interface ProductPageProps {
  params: Params;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  try {
    const product = await getProduct(id);
    
    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
      </div>
    );
  } catch (error) {
    notFound();
  }
} 