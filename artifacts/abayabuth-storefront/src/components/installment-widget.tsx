import { useState } from 'react';
import { Info, X, ShieldCheck } from 'lucide-react';
import { useStorefront } from './storefront';
import { formatCurrency } from '@/data/currency';

interface InstallmentWidgetProps {
  priceInGbp: number;
}

export function InstallmentWidget({ priceInGbp }: InstallmentWidgetProps) {
  const { currency } = useStorefront();
  const [modalOpen, setModalOpen] = useState(false);

  const installment3 = formatCurrency(priceInGbp / 3, currency);
  const installment4 = formatCurrency(priceInGbp / 4, currency);

  return (
    <>
      <div className="installment-box" data-testid="widget-installment">
        <div className="installment-line">
          <span className="installment-badge klarna">Klarna.</span>
          <span className="installment-text">
            Make 3 payments of <strong>{installment3}</strong>. No interest, no fees.
          </span>
          <button
            type="button"
            className="installment-info-btn"
            onClick={() => setModalOpen(true)}
            aria-label="Learn more about Klarna installments"
          >
            <u>Learn more</u>
          </button>
        </div>

        <div className="installment-line sub">
          <span className="installment-badge clearpay">clearpay</span>
          <span className="installment-text">
            or 4 interest-free instalments of <strong>{installment4}</strong>.
          </span>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div
            className="installment-modal animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="installment-modal-header">
              <span className="installment-badge klarna large">Klarna.</span>
              <button
                type="button"
                className="icon-button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="installment-modal-body">
              <h3>Shop now. Pay in 3 interest-free installments.</h3>
              <p>
                Split your purchase into 3 equal monthly payments. No hidden fees, no interest, and zero impact on your credit score when paid on time.
              </p>

              <div className="klarna-steps">
                <div className="k-step">
                  <div className="k-step-num">1</div>
                  <div className="k-step-text">
                    <strong>At Checkout:</strong> Select Klarna as your payment method.
                  </div>
                </div>
                <div className="k-step">
                  <div className="k-step-num">2</div>
                  <div className="k-step-text">
                    <strong>1st Payment:</strong> Made when your order is dispatched from our London studio.
                  </div>
                </div>
                <div className="k-step">
                  <div className="k-step-num">3</div>
                  <div className="k-step-text">
                    <strong>Next 2 Payments:</strong> Automatically scheduled every 30 days.
                  </div>
                </div>
              </div>

              <div className="k-trust-note">
                <ShieldCheck size={16} className="text-emerald" />
                <span>18+, UK residents only. Subject to status. T&Cs apply.</span>
              </div>
            </div>
            <div className="installment-modal-footer">
              <button type="button" className="button-dark" onClick={() => setModalOpen(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
