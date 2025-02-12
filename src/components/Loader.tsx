interface LoaderProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) return null;
  return (
    <div className="flex items-center justify-center">
      <img src="/loader.svg" alt="loading" className="w-16" />
    </div>
  );
};
