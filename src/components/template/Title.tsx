interface TitleProps {
  title: string;
}

export const Title = (props: TitleProps) => {
  return (
    <>
      <h1
        className={`
          font-semibold text-xl sm:text-2xl text-very-dark-blue
          dark:text-white
        `}
      >
        {props.title}
      </h1>
    </>
  );
};
