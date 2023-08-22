type LayoutMainProps = {
  children: React.ReactNode;
};

const LayoutMain = ({ children }: LayoutMainProps) => {
  return (
    <div className="flex px-8 flex-col min-h-screen items-center justify-center bg-gradient-to-br from-black/70 to-black/60 via-black/59">
      {children}
    </div>
  );
};

export default LayoutMain;
