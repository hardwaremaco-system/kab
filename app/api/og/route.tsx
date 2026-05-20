import { ImageResponse } from 'next/og';

// This forces the route to run on Vercel's fast Edge network
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Check if it's an Invite
    const name = searchParams.get('name');
    const isInvite = !!name;

    // 2. Check if it's a Product/Deal
    const price = searchParams.get('price');
    const isProduct = !!price;
    const discount = searchParams.get('discount');
    const dealType = searchParams.get('dealType');

    // 3. Get Base Text
    const rawTitle = searchParams.get('title');
    const rawDesc = searchParams.get('desc');

    // Determine Title & Description based on link type
    let displayTitle = rawTitle || 'Kabale Online Marketplace';
    let displayDesc = rawDesc || 'The Better Way to Buy and Sell Locally';

    if (isInvite) {
      displayTitle = `${name} invited you to Kabale Online! 🎁`;
      displayDesc = 'Accept the invite and shop safely on campus with Cash on Delivery.';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a', // Sleek dark slate background
            fontFamily: 'sans-serif',
            padding: '40px',
            borderTop: '20px solid #D97706', // Brand orange highlight
          }}
        >
          {/* Logo / Brand Name (Smaller if product, big if generic) */}
          <div style={{ display: 'flex', fontSize: isProduct ? 36 : 48, fontWeight: 'black', marginBottom: isProduct ? '20px' : '20px', letterSpacing: '-0.05em' }}>
            <span style={{ color: 'white' }}>Kabale</span>
            <span style={{ color: '#D97706' }}>Online</span>
          </div>

          {/* 🔥 PRODUCT MODE: Deal Badge */}
          {isProduct && dealType && (
            <div style={{ display: 'flex', background: 'rgba(217, 119, 6, 0.15)', border: '2px solid #D97706', padding: '10px 25px', borderRadius: '12px', fontSize: 26, fontWeight: 'bold', color: '#fdba74', textTransform: 'uppercase', marginBottom: '20px' }}>
              {dealType} {discount && <span style={{ color: '#ef4444', marginLeft: '12px' }}> -{discount}%</span>}
            </div>
          )}

          {/* Dynamic Title */}
          <div style={{ 
            display: 'flex', 
            fontSize: isProduct ? 64 : (isInvite ? 72 : 84), // Adjust size based on mode
            fontWeight: 'black', 
            color: 'white', 
            textAlign: 'center', 
            lineHeight: 1.1,
            marginBottom: isProduct ? '20px' : '30px',
            padding: '0 40px'
          }}>
            {displayTitle}
          </div>

          {/* 🔥 PRODUCT MODE: Massive Price */}
          {isProduct && (
            <div style={{ display: 'flex', fontSize: 80, fontWeight: 'black', color: '#f59e0b', marginBottom: '20px' }}>
              UGX {price}
            </div>
          )}

          {/* Dynamic Description / Tagline */}
          <div style={{ display: 'flex', fontSize: isProduct ? 28 : 36, color: '#94a3b8', textAlign: 'center', fontWeight: 'bold' }}>
            {isProduct && !rawDesc ? 'Fast Local Delivery in Kabale Town' : displayDesc}
          </div>

          {/* 🎁 INVITE MODE: Extra Trust Badge */}
          {isInvite && (
            <div style={{ display: 'flex', marginTop: '50px', background: 'rgba(217, 119, 6, 0.2)', border: '2px solid #D97706', color: '#fdba74', padding: '15px 40px', borderRadius: '15px', fontSize: '28px', fontWeight: 'bold' }}>
              Verified Partner Link
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
