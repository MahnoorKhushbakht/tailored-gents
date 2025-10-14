import { Cart, Sign } from '@/utils/models/Schema';
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from '@/lib/auth';

export async function GET() {
  await dbConnect();
  try {
    const carts = await Cart.find({});
    return NextResponse.json({ data: carts });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.status(500).json({ error: error.message });
  }
}

export async function POST(request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      throw new Error('Unauthorized');
    }
    const body = await request.json();
    const { product,quantity,price } = body;
    console.log("Received POST request with data:", product,quantity,price );
   await dbConnect();
    const cart = await Cart.create({
      product,
      quantity,
      price,
      user_id: user.id, 
    });
    console.log("Saved field:", cart);
    await Sign.findByIdAndUpdate(user.id, { $push: { quantities: cart._id } });
    await Sign.findByIdAndUpdate(user.id, { $push: { user_id: user.id } });
    return NextResponse.json({ data: cart });
  } catch (error) {
    console.error("field Error:", error);
    return NextResponse.status(500).json({ error: error.message });
  }
}
export async function DELETE(request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      throw new Error('Unauthorized');
    }

    const url = new URL(request.url);
    const cartId = url.searchParams.get('id');

    if (!cartId) {
      throw new Error('Cart ID is required');
    }

    await dbConnect();


    const cart = await Cart.findByIdAndDelete(cartId);

    if (!cart) {
      throw new Error('Cart item not found');
    }

  
    await Sign.findByIdAndUpdate(user.id, { $pull: { quantities: cart._id } });

    return NextResponse.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.status(500).json({ error: error.message });
  }
}