import { sortOptions } from '@/constants/consts';
import Image from 'next/image';
import { useState } from 'react';
import { Button as AriaButton, Popover } from 'react-aria-components';
import { DialogTrigger } from 'react-aria-components';

interface SortDropdownProps {
  onSortChange: (sortType: string) => void;
}

const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');

  const handleSortSelect = (sortType: string) => {
    setSelectedSort(sortType);
    setIsOpen(false);
    onSortChange(sortType);
  };

  return (
    <DialogTrigger>
      <AriaButton className="flex cursor-pointer items-center gap-1" onPress={() => setIsOpen(!isOpen)}>
        <span>Sort By</span>
        <Image src="/svgs/arrow-left.svg" alt="dropdown arrow" width={20} height={20} className="rotate-270" />
      </AriaButton>

      <Popover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="border-l-gray w-[223px] rounded-lg border bg-white p-4"
        placement="bottom end"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">Sort By</h2>

          {sortOptions.map((option) => (
            <span
              key={option.key}
              className="cursor-pointer py-2 text-sm transition-all duration-300 hover:scale-105"
              onClick={() => handleSortSelect(option.key)}
            >
              {option.label}
            </span>
          ))}
        </div>
      </Popover>
    </DialogTrigger>
  );
};

export default SortDropdown;
