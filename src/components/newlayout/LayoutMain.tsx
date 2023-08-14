const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mt-8">
      <div className="mx-auto h-full w-full max-w-7xl bg-black/50 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
};

export default LayoutMain;
