import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Title = ({ children }: Props) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white inline-flex items-center justify-center">
        {children}
      </h1>
    </div>
  );
};

export default Title;
