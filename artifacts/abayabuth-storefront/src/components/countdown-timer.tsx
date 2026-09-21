import { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface CountdownTimerProps {
  cutoffHourLondon?: number; // 24hr format, e.g. 15 for 3:00 PM
}

export function CountdownTimer({ cutoffHourLondon = 15 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [isSameDay, setIsSameDay] = useState(true);

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      // Target today cutoff or tomorrow cutoff
      const target = new Date();
      target.setHours(cutoffHourLondon, 0, 0, 0);

      if (now.getTime() >= target.getTime()) {
        // past today cutoff, target tomorrow
        target.setDate(target.getDate() + 1);
        setIsSameDay(false);
      } else {
        setIsSameDay(true);
      }

      const diffMs = target.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [cutoffHourLondon]);

  if (!timeLeft) return null;

  return (
    <div className="dispatch-urgency-banner" data-testid="banner-dispatch-urgency">
      <div className="urgency-icon-pulse">
        <Clock size={14} className="urgency-icon" />
      </div>
      <div className="urgency-text">
        <span>
          Order in the next{' '}
          <strong>
            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </strong>{' '}
          for {isSameDay ? 'same-day UK dispatch' : 'priority dispatch tomorrow'}!
        </span>
      </div>
    </div>
  );
}
