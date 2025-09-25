export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface CircleButtonProps {
  photoSrc?: string;
  size?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface LoginRequiredProps {
  onLoginClick: () => void;
  onContinueShoppingClick: () => void;
  title?: string;
  description?: string;
}

export interface AvatarInputProps {
  name: string;
  size?: number;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueShopping: () => void;
}

export interface FilterDropdownProps {
  onApplyFilter: (priceFrom: string, priceTo: string) => void;
  currentPriceFrom?: string;
  currentPriceTo?: string;
}

export interface SortDropdownProps {
  onSortChange: (sortType: string) => void;
  currentSort?: string;
}
