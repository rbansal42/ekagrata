import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const client = await clientPromise;
    const db = client.db();

    const product = await db.collection('products').findOne({ slug });

    if (!product) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    const formattedProduct = { ...product, _id: product._id.toString() };

    return NextResponse.json({ data: formattedProduct });
  } catch (error) {
    return NextResponse.error();
  }
} 