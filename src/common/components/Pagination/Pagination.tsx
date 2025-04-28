import { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '@/common/interfaces';

const Pagination: FC<React.ComponentProps<'nav'> & { className?: string }> = ({
  className,
  ...props
}) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={`mx-auto flex w-full justify-center ${className || ''}`}
    {...props}
  />
);

const PaginationContent: FC<React.ComponentProps<'ul'> & { className?: string }> = ({
  className,
  ...props
}) => <ul className={`flex flex-row items-center gap-1 ${className || ''}`} {...props} />;

const PaginationItem: FC<React.ComponentProps<'li'> & { className?: string }> = ({
  className,
  ...props
}) => <li className={className || ''} {...props} />;

interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: 'outline' | 'ghost';
}

const PaginationButton: FC<PaginationButtonProps> = ({
  className,
  isActive,
  variant = 'ghost',
  ...props
}) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={`
      inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors
      h-9 px-3
      ${
        variant === 'outline'
          ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
          : 'hover:bg-accent hover:text-accent-foreground'
      }
      ${isActive ? 'bg-accent text-accent-foreground' : ''}
      ${props.disabled ? 'pointer-events-none opacity-50' : ''}
      ${className || ''}
    `}
    {...props}
  />
);

export const CustomPagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <Pagination className='my-2'>
      <PaginationContent>
        <PaginationItem>
          <PaginationButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className='gap-1 px-2'
            variant={currentPage === 1 ? 'ghost' : 'outline'}
          >
            <ChevronLeft className='h-4 w-4' />
            <span>Назад</span>
          </PaginationButton>
        </PaginationItem>

        <PaginationItem>
          <span className='text-gray-700 flex items-center h-9 px-3'>
            Сторінка {currentPage} з {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='gap-1 px-2'
            variant={currentPage === totalPages ? 'ghost' : 'outline'}
          >
            <span>Вперед</span>
            <ChevronRight className='h-4 w-4' />
          </PaginationButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { CustomPagination as Pagination };
