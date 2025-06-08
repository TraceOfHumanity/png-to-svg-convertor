import {useContext} from 'react';
import {ConverterContext} from '../context/ConverterContext';

export const Loader = () => {
  const {isLoading} = useContext(ConverterContext);
  if (!isLoading) return null;
  return (
    <div className='fixed top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-black/50'>
      <img src='/loader.svg' alt='loading' className='w-16' />
    </div>
  );
};
