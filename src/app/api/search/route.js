import { NextResponse } from 'next/server';
import { getSearch } from '@/lib/categories';
export async function GET(request) {
  const query = request.nextUrl.searchParams.get('query');
  console.log('query',query)
  const reviews = await getSearch(query)
  console.log('rev',reviews)
  return NextResponse.json(reviews);
}