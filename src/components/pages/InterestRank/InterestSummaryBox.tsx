import { numerizeDecimal } from '@/lib/number'

type InterestSummaryBoxProps = {
  amount: number
  remaining?: number
  averageInterest: number
  totalInterest: number
}

export const InterestSummaryBox = ({
  amount,
  remaining = 0,
  averageInterest,
  totalInterest,
}: InterestSummaryBoxProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between p-4 border border-border rounded-lg my-4">
      <div>
        <div className="text-xl font-light  text-center sm:text-left">
          รวมเงินฝาก{' '}
          <span className="font-semibold">{numerizeDecimal(amount)}</span> บาท
        </div>
        {remaining > 0 && (
          <div className="text-gray-400 text-center sm:text-left">
            เหลือ {numerizeDecimal(remaining)} บาท
          </div>
        )}
      </div>
      <div className="text-center sm:text-right">
        <div className="text-xl font-semibold">
          ดอกเบี้ยเฉลี่ย {numerizeDecimal(averageInterest)}% ต่อปี
        </div>
        <div className="text-md font-light text-gray-400">
          จะได้รับดอกเบี้ยประมาณ {numerizeDecimal(totalInterest)} บาท
        </div>
      </div>
    </div>
  )
}
