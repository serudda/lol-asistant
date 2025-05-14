import { Spinner, SpinnerSize } from '../../Spinner/Spinner';
import type { ButtonProps } from './Button';
import { Button } from './Button';

export interface LoadingButtonProps extends ButtonProps {
  /**
   * If true, the button will show a loading spinner and be
   * disabled.
   */
  isLoading?: boolean;
}

/**
 * A Button component that shows a loading spinner when
 * loading. The button is automatically disabled while
 * loading.
 */
export const LoadingButton = ({ children, isLoading = false, disabled = false, ...props }: LoadingButtonProps) => {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <>
          <Spinner size={SpinnerSize.sm} />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
