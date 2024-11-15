import { ChartCandlestick } from 'lucide-react';

export function BrandLogo() {
  return (
    <span className="flex items-center gap-2 font-semibold flex-shrink-0 text-lg">
      <ChartCandlestick className='size-8' />
      <span>PriceFlex</span>
    </span>
  )
}
