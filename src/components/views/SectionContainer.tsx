import { ReactNode } from "react";

export const SectionContainer = ({
  children,
  text = "",
}: {
  children: ReactNode;
  text?: string;
}) => {
  if (text) {
    return (
      <section className="w-full py-12 max-w-7xl grow">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">{text}</h2>
          {children}
        </div>
      </section>
    );
  } else {
    return (
      <section className="w-full py-12 max-w-7xl grow">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">{children}</div>
      </section>
    );
  }
};
