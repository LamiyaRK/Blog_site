import dbConnect from '@/lib/dbConnect';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const blogid = searchParams.get('blogid');
  const email = searchParams.get('email');

  if (!blogid || !email) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

  const paidPremiumCol = await dbConnect('paidPremium'); 

  const existing = await paidPremiumCol.findOne({
    blogid,
    email,
  });

  return new Response(JSON.stringify({ hasAccess: !!existing }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
