import { NextResponse } from 'next/server';

export async function GET(request) {
  const accessSecret = process.env.ZHIHU_ACCESS_SECRET;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://developer.zhihu.com/api/v1/content/zhihu_search?Query=${encodeURIComponent(query)}&Count=5`,
      {
        headers: {
          'Authorization': `Bearer ${accessSecret}`,
          'X-Request-Timestamp': timestamp,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });
    }

    const data = await res.json();
    // Return just the items array for easier frontend consumption
    return NextResponse.json(data.Data?.Items || []);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
