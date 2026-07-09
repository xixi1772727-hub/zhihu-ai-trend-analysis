import { NextResponse } from 'next/server';

export async function GET() {
  const accessSecret = process.env.ZHIHU_ACCESS_SECRET;
  const timestamp = Math.floor(Date.now() / 1000).toString();

  try {
    const res = await fetch('https://developer.zhihu.com/api/v1/hot/zhihu-hot-list', {
      headers: {
        'Authorization': `Bearer ${accessSecret}`,
        'X-Request-Timestamp': timestamp,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 300 } // cache 5 min
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
