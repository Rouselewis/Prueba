import { classNames } from '@/helpers';
type Props = {
  className?: string;
  error?: any;
};

export const CustomError = ({ className, error }: Props) => {
  return (
    <p
      className={classNames(
        ' text-sm text-customRed',
        error && 'py-1',
        className
      )}
    >
      {error}
    </p>
  );
};
