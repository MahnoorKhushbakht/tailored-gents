import { Field, Sign } from '@/utils/models/Schema';
import dbConnect from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSession } from '@/lib/auth';

export async function GET() {
  await dbConnect();
  try {
    const fields = await Field.find({});
    return NextResponse.json({ data: fields });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { name, comment, rating, slug } = body;
    console.log("Received POST request with data:", name, comment, rating, slug);
    await dbConnect();

 
    const existingComment = await Field.findOne({ user_id: user.id });
    if (existingComment) {
      return NextResponse.json({ message: 'You have already commented', code: 11000 }, { status: 400 });
    }

   
    const field = await Field.create({
      name,
      comment,
      rating,
      slug,
      user_id: user.id,
    });
    console.log("Saved field:", field);
    await Sign.findByIdAndUpdate(user.id, { $push: { fields: field._id } });
    return NextResponse.json({ data: field });
  } catch (error) {
    console.error("field Error:", error);
    if (error.name === 'MongoError' && error.code === 11000) {
      return NextResponse.json({ message: 'You have already commented', code: 11000 }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'An error occurred while creating the comment' }, { status: 500 });
    }
  }
}
