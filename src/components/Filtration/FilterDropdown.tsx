import { useEffect, useState } from 'react';
import { Popover, Button as AriaButton, DialogTrigger } from 'react-aria-components';
import { RHFInput } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import Image from 'next/image';
import { FilterFormData, filterSchema } from './schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface FilterDropdownProps {
  onApplyFilter: (priceFrom: string, priceTo: string) => void;
  currentPriceFrom?: string;
  currentPriceTo?: string;
}

const FilterDropdown = ({ onApplyFilter, currentPriceFrom, currentPriceTo }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm<FilterFormData>({
    resolver: isEditing ? undefined : zodResolver(filterSchema),
    mode: 'onSubmit',
    defaultValues: {
      priceFrom: currentPriceFrom || '',
      priceTo: currentPriceTo || '',
    },
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    methods.setValue('priceFrom', currentPriceFrom || '');
    methods.setValue('priceTo', currentPriceTo || '');
  }, [currentPriceFrom, currentPriceTo, methods]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent these characters from being typed
    const forbiddenKeys = ['-', '+', '.', 'e', 'E', ','];

    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let value = target.value;

    // Clean up any forbidden characters that might have slipped through
    value = value.replace(/[^0-9]/g, '');

    // Remove leading zeros
    if (value.startsWith('0') && value.length > 1) {
      value = value.replace(/^0+/, '');
    }

    target.value = value;
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleInput(e);

    setIsEditing(true);

    // errors are cleared after any validation
    setTimeout(() => {
      methods.clearErrors();
    }, 0);
  };

  const handlePopoverChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setIsEditing(false);
      methods.clearErrors();
      methods.setValue('priceFrom', currentPriceFrom || '');
      methods.setValue('priceTo', currentPriceTo || '');
    }
  };

  const onSubmit = (data: FilterFormData) => {
    setIsEditing(false);

    const result = filterSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        methods.setError(issue.path[0] as keyof FilterFormData, {
          message: issue.message,
        });
      });
      return;
    }

    onApplyFilter(data.priceFrom, data.priceTo);
    setIsOpen(false);
  };

  return (
    <DialogTrigger>
      <AriaButton className="flex cursor-pointer items-center gap-2" onPress={() => handlePopoverChange(!isOpen)}>
        <Image
          src="/svgs/filter-icon.svg"
          alt="Filter"
          width={24}
          height={24}
          style={{ width: '24px', height: '24px' }}
          priority
        />
        <span>Filter</span>
      </AriaButton>

      <Popover
        isOpen={isOpen}
        onOpenChange={handlePopoverChange}
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
                    onInput={handleInputChange}
                    onKeyDown={handleKeyDown}
                    inputClassName="w-full px-3.5 py-2.5 rounded-lg"
                  />
                </div>

                <div className="flex-1">
                  <RHFInput
                    name="priceTo"
                    placeholder="To"
                    type="number"
                    onInput={handleInputChange}
                    onKeyDown={handleKeyDown}
                    inputClassName="w-full px-3.5 py-2.5 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="mt-2.5 w-[124px] px-5 py-2.5">
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
