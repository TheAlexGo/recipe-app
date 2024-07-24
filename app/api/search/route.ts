import { NextRequest } from 'next/server';

import { searchInLenta } from '@/actions/product';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const res = await searchInLenta(query);
  return Response.json(res);
}
