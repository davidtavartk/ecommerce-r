'use client';

import { Modal, ModalOverlay, Dialog } from 'react-aria-components';
import Button from '../Button/Button';
import Image from 'next/image';
import { SuccessModalProps } from '../types/propTypes';

const SuccessModal = ({ isOpen, onClose, onContinueShopping }: SuccessModalProps) => {
  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onClose} className="fixed inset-0 z-50">
      <Modal className="h-full w-full max-w-none">
        <Dialog
          className="relative flex h-full w-full flex-col items-center justify-center gap-[74px] bg-white"
          aria-label="Order confirmation"
        >
          {/* Close button */}
          <button onClick={onClose} className="absolute top-10 right-10 cursor-pointer">
            <Image src="/svgs/x-icon.svg" alt="Close" width={40} height={40} />
          </button>

          {/* Success content */}
          <div className="flex flex-col items-center gap-10">
            {/* Success icon */}
            <div className="flex size-[76px] items-center justify-center rounded-full bg-[#F8F6F7]">
              <Image
                src="/svgs/checkmark-icon.svg"
                alt="Success"
                width={36}
                height={29}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <h2 className="text-[42px] font-semibold">Congrats!</h2>
              <p className="text-sm">Your order is placed successfully!</p>
            </div>
          </div>
          {/* Continue shopping button */}
          <Button onClick={onContinueShopping} className="p mt-4 w-[214px] px-5 py-2.5">
            Continue shopping
          </Button>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};

export default SuccessModal;
