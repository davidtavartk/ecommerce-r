import { useState } from 'react';
import { Popover, Button as AriaButton, DialogTrigger } from 'react-aria-components';
import { Input } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import Image from 'next/image';

interface FilterDropdownProps {
  onApplyFilter: (priceFrom: string, priceTo: string) => void;
}

const FilterDropdown = ({ onApplyFilter }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const handleApply = () => {
    onApplyFilter(priceFrom, priceTo);
    setIsOpen(false);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    // If input starts with 0, replace it entirely
    if (target.value.startsWith('0')) {
      target.value = target.value.replace(/^0+/, '');
    }

    // Remove any non-digit characters
    target.value = target.value.replace(/[^0-9]/g, '');
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
        <div className="flex flex-col gap-5">
          <h3 className="font-semibold">Select price</h3>

          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5">
              <div className="flex-1">
                <Input
                  name="priceFrom"
                  placeholder="From"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  onInput={handleInput}
                  isRequired
                  inputClassName="w-full px-3.5 py-2.5 rounded-lg"
                  type="number"
                />
              </div>

              <div className="flex-1">
                <Input
                  name="priceTo"
                  placeholder="To"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  onInput={handleInput}
                  isRequired
                  inputClassName="w-full px-3.5 py-2.5 rounded-lg"
                  type="number"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleApply} className="w-[124px] px-5 py-2.5">
                Apply
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </DialogTrigger>
  );
};

export default FilterDropdown;
