import { useState } from 'react';
import { Popover, Button as AriaButton, DialogTrigger } from 'react-aria-components';
import { RHFInput } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import Image from 'next/image';
import { FilterFormData, filterSchema } from './schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface FilterDropdownProps {
  onApplyFilter: (priceFrom: string, priceTo: string) => void;
}

const FilterDropdown = ({ onApplyFilter }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      priceFrom: '',
      priceTo: '',
    },
  });

  const { handleSubmit } = methods;

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // If input starts with 0, replace it entirely
    if (target.value.startsWith('0')) {
      target.value = target.value.replace(/^0+/, '');
    }

    // Remove any non-digit characters
    target.value = target.value.replace(/[^0-9]/g, '');
  };

  const onSubmit = (data: FilterFormData) => {
    onApplyFilter(data.priceFrom, data.priceTo);
    setIsOpen(false);
  };

  return (
    <DialogTrigger>
      <AriaButton className="flex cursor-pointer items-center gap-2" onPress={() => setIsOpen(!isOpen)}>
        <Image src="/svgs/filter-icon.svg" alt="Filter" width={24} height={24} />
        <span>Filter</span>
      </AriaButton>

      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="border-l-gray rounded-lg border bg-white p-4"
        placement="bottom end"
        crossOffset={16}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h3 className="font-semibold">Select price</h3>

            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <RHFInput
                    name="priceFrom"
                    placeholder="From"
                    type="number"
                    // value={priceFrom}
                    onInput={handleInput}
                    isRequired
                    inputClassName="w-full px-3.5 py-2.5 rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <RHFInput
                    name="priceTo"
                    placeholder="To"
                    type="number"
                    // value={priceTo}
                    onInput={handleInput}
                    isRequired
                    inputClassName="w-full px-3.5 py-2.5 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="w-[124px] px-5 py-2.5">
                  Apply
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Popover>
    </DialogTrigger>
  );
};

export default FilterDropdown;
