import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Reesh Enterprise — Design. Digital. Media. Web. Print.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #16242F 0%, #0B1622 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -80,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(0,159,208,0.45), rgba(0,159,208,0) 70%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg,#66CFEC,#006A8B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            R
          </div>
          <div style={{ color: 'white', fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>Reesh Enterprise</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: 'white', fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            From a simple idea to a brand people trust.
          </div>
          <div style={{ color: '#8B98A5', fontSize: 30, marginTop: 28, fontWeight: 500 }}>
            Design. Digital. Media. Web. Print. — Mogadishu
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
