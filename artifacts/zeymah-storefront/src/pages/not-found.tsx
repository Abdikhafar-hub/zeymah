import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="page-width" style={{ minHeight: '58vh', display: 'grid', placeItems: 'center', textAlign: 'center' }} data-testid="section-not-found">
      <div>
        <div className="eyebrow" style={{ color: '#71817e' }}>A quiet corner</div>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--teal)', fontSize: 66, fontWeight: 400, margin: '12px 0 4px' }} data-testid="text-not-found-title">That page has moved.</h1>
        <p style={{ color: '#687475', margin: '0 auto 24px', maxWidth: 370 }} data-testid="text-not-found-description">The piece you are looking for may have found a new home. Let us take you back to the edit.</p>
        <Link href="/" className="button-dark" data-testid="link-not-found-home"><ArrowLeft size={14} style={{ marginRight: 10 }} /> Return home</Link>
      </div>
    </section>
  );
}