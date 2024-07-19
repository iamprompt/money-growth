import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'

export const AccountAccordionItemSkeleton = () => {
  return (
    <AccordionItem
      className="border rounded-lg overflow-hidden"
      value={`accordion_skeleton`}
    >
      <AccordionTrigger
        arrow={false}
        className="data-[state=open]:border-none [&[data-state=open]>svg.accordion-arrow]:rotate-0"
      >
        <div className="flex justify-between flex-1 items-center">
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 sm:size-10 rounded-md border shrink-0" />
            <div>
              <Skeleton className="h-3.5 my-0.5 w-24" />
              <Skeleton className="h-3 my-0.5 w-28" />
            </div>
          </div>
          <div className="items-end flex flex-col">
            <Skeleton className="h-4 my-0.5 w-20"></Skeleton>
            <Skeleton className="h-2.5 w-32"></Skeleton>
          </div>
        </div>
      </AccordionTrigger>
    </AccordionItem>
  )
}
