import { ArrowPath } from 'components/icons/Index';

export const Loading = () => {
  return (
    <div
      className={`
        h-screen
        flex justify-center items-center
        bg-very-light-gray dark:bg-very-dark-blue
      `}
    >
      <div className="animate-spin text-very-dark dark:text-very-light-gray">{ArrowPath(10)}</div>
    </div>
  );
};
