export const MainContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="container mx-auto flex h-screen max-h-screen flex-col gap-4 overflow-y-auto px-4 py-8 md:px-8 md:py-16">
      {children}
    </div>
  );
};
