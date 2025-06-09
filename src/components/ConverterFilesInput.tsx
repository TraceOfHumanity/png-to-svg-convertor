import {useContext} from 'react';
import {FaUpload} from 'react-icons/fa';
import {ConverterContext} from '../context/ConverterContext';
import {ConverterContextType} from '../types/ConverterTypes';

export const FilesInput = () => {
  const {handleImageUpload} = useContext(
    ConverterContext,
  ) as ConverterContextType;

  return (
    <div className='border-mainText relative min-h-40 w-full rounded-md border-2 border-dashed backdrop-blur-3xl duration-200 hover:bg-slate-950/5'>
      <input
        className='h-full w-full opacity-0'
        type='file'
        accept='image/png'
        multiple
        onChange={handleImageUpload}
      />
      <div className='text-mainText pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
        <p>Drag and drop or click to select images</p>
        <FaUpload className='inline-block text-2xl' />
      </div>
    </div>
  );
};
