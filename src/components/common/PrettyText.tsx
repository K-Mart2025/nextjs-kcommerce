const PrettyText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center p-16 m-auto text-center align-middle h-96 size-9/12">
      <p className="m-auto text-2xl opacity-75">{children}</p>
    </div>
  );
};

export default PrettyText;
