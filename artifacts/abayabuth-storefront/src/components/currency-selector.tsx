import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { CURRENCIES, type CurrencyCode } from '@/data/currency';
import { useStorefront } from '@/components/storefront';

interface CurrencySelectorProps {
  variant?: 'header' | 'footer' | 'mobile';
}

export function CurrencySelector({ variant = 'header' }: CurrencySelectorProps) {
  const { currency, setCurrency } = useStorefront();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentConfig = CURRENCIES[currency];

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    setOpen(false);
  };

  return (
    <div className={`currency-selector ${variant}`} ref={containerRef} data-testid={`currency-selector-${variant}`}>
      <button
        type="button"
        className="currency-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={`Selected currency: ${currentConfig.name}. Click to change.`}
        data-testid="button-currency-trigger"
      >
        <span className="currency-flag" aria-hidden="true">{currentConfig.flag}</span>
        <span className="currency-code">{currentConfig.code} ({currentConfig.symbol})</span>
        <ChevronDown size={11} className={`currency-arrow ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="currency-dropdown" role="listbox" data-testid="dropdown-currency-options">
          <div className="currency-dropdown-header">Select Currency & Region</div>
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
            const item = CURRENCIES[code];
            const isSelected = code === currency;
            return (
              <button
                key={code}
                type="button"
                className={`currency-option ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelect(code)}
                role="option"
                aria-selected={isSelected}
                data-testid={`option-currency-${code}`}
              >
                <span className="currency-option-flag" aria-hidden="true">{item.flag}</span>
                <div className="currency-option-info">
                  <span className="currency-option-name">{item.name}</span>
                  <span className="currency-option-symbol">{item.symbol} {item.code}</span>
                </div>
                {isSelected && <span className="currency-check">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
