interface LoaderProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) return null;
  return (
    <div className="flex items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/50">
      <img src="/loader.svg" alt="loading" className="w-16" />
    </div>
  );
};
