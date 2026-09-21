import { useState } from 'react';
import { X, Ruler, CheckCircle, Info } from 'lucide-react';

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

interface HeightMapping {
  heightRangeFt: string;
  heightCm: string;
  recommendedSize: string;
  note: string;
}

const HEIGHT_MAPPINGS: HeightMapping[] = [
  { heightRangeFt: "4'10\" - 5'0\"", heightCm: '147 - 152 cm', recommendedSize: '50', note: 'Ankle length with flat shoes' },
  { heightRangeFt: "5'1\" - 5'2\"", heightCm: '155 - 158 cm', recommendedSize: '52', note: 'Standard ankle drape' },
  { heightRangeFt: "5'3\" - 5'4\"", heightCm: '160 - 163 cm', recommendedSize: '54', note: 'Most popular universal length' },
  { heightRangeFt: "5'5\" - 5'6\"", heightCm: '165 - 168 cm', recommendedSize: '56', note: 'Floor grazing with flats, ankle with 2" heels' },
  { heightRangeFt: "5'7\" - 5'8\"", heightCm: '170 - 173 cm', recommendedSize: '58', note: 'Elegant flowing tall fit' },
  { heightRangeFt: "5'9\" - 5'11\"", heightCm: '175 - 180 cm', recommendedSize: '60', note: 'Floor length for tall frames' },
  { heightRangeFt: "6'0\" +", heightCm: '183+ cm', recommendedSize: '62', note: 'Extra tall modest drape' },
];

export function SizeGuideModal({ open, onClose, defaultCategory }: SizeGuideModalProps) {
  const [selectedHeightIndex, setSelectedHeightIndex] = useState<number>(2); // defaults to 5'3"-5'4" -> 54
  const [wearingHeels, setWearingHeels] = useState<boolean>(false);

  if (!open) return null;

  const currentRecommendation = HEIGHT_MAPPINGS[selectedHeightIndex];
  // If wearing heels >= 2 inches, recommend +2 inches in length
  const recommendedLengthNumber = parseInt(currentRecommendation.recommendedSize, 10);
  const finalRecommendedSize = wearingHeels
    ? Math.min(62, recommendedLengthNumber + 2).toString()
    : currentRecommendation.recommendedSize;

  return (
    <div className="modal-backdrop" onClick={onClose} data-testid="modal-size-guide-backdrop">
      <div
        className="size-guide-modal animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        data-testid="modal-size-guide"
      >
        <div className="size-guide-header">
          <div className="size-guide-title-wrap">
            <Ruler size={18} strokeWidth={1.3} className="text-teal" />
            <h2 id="size-guide-title">Zeymah Size & Height Guide</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close size guide"
            data-testid="button-close-size-guide"
          >
            <X size={20} strokeWidth={1.3} />
          </button>
        </div>

        <div className="size-guide-body">
          {/* Interactive Calculator */}
          <div className="size-calculator-box">
            <div className="calculator-heading">
              <span className="step-tag">Step 1</span>
              <h3>Find Your Recommended Abaya Length</h3>
            </div>
            <p className="calculator-intro">
              Abayas are designed to fit generously across the bust and body. <strong>The size number represents the exact length in inches</strong> from shoulder to hem.
            </p>

            <div className="calculator-controls">
              <label className="calc-label" htmlFor="height-select">
                Select Your Height:
              </label>
              <select
                id="height-select"
                className="height-select"
                value={selectedHeightIndex}
                onChange={(e) => setSelectedHeightIndex(Number(e.target.value))}
                data-testid="select-customer-height"
              >
                {HEIGHT_MAPPINGS.map((m, idx) => (
                  <option key={idx} value={idx}>
                    {m.heightRangeFt} ({m.heightCm})
                  </option>
                ))}
              </select>

              <label className="heels-toggle">
                <input
                  type="checkbox"
                  checked={wearingHeels}
                  onChange={(e) => setWearingHeels(e.target.checked)}
                  data-testid="checkbox-wearing-heels"
                />
                <span>I frequently wear heels (2+ inches) with this abaya</span>
              </label>
            </div>

            <div className="recommendation-result" data-testid="box-recommended-size">
              <div className="result-label">Recommended Size:</div>
              <div className="result-badge">Size {finalRecommendedSize}</div>
              <div className="result-explanation">
                <CheckCircle size={14} className="text-emerald" />
                <span>
                  {wearingHeels
                    ? `Size ${finalRecommendedSize} gives ideal floor coverage when styled with heels.`
                    : currentRecommendation.note}
                </span>
              </div>
            </div>
          </div>

          {/* Sizing Chart Table */}
          <div className="size-chart-table-wrap">
            <h4>Abaya Measurement Chart (Inches)</h4>
            <table className="size-chart-table">
              <thead>
                <tr>
                  <th>Abaya Size</th>
                  <th>Customer Height</th>
                  <th>Garment Length</th>
                  <th>Bust Width</th>
                  <th>Sleeve Length</th>
                </tr>
              </thead>
              <tbody>
                {HEIGHT_MAPPINGS.map((row) => {
                  const isHighlighted = row.recommendedSize === finalRecommendedSize;
                  return (
                    <tr key={row.recommendedSize} className={isHighlighted ? 'highlighted-row' : ''}>
                      <td>
                        <strong>{row.recommendedSize}</strong>
                        {isHighlighted && <span className="your-size-pill">Your Size</span>}
                      </td>
                      <td>{row.heightRangeFt}</td>
                      <td>{row.recommendedSize}"</td>
                      <td>48" - 52" (Generous)</td>
                      <td>27" - 28"</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Fit Tips */}
          <div className="size-guide-tips">
            <div className="tip-item">
              <Info size={15} strokeWidth={1.5} className="tip-icon" />
              <div>
                <strong>Modest Cut:</strong> All Zeymah silhouettes feature generous room through the hips and bust. You do not need to size up for modesty.
              </div>
            </div>
            <div className="tip-item">
              <Info size={15} strokeWidth={1.5} className="tip-icon" />
              <div>
                <strong>Still unsure?</strong> If between two sizes, we recommend choosing the smaller size for flat shoes or the larger size for heels.
              </div>
            </div>
          </div>
        </div>

        <div className="size-guide-footer">
          <button type="button" className="button-dark" onClick={onClose}>
            Done & Return to Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
