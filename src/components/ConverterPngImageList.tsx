import {useContext} from 'react';
import {ConverterContext} from '../context/ConverterContext';
import {ConverterContextType} from '../types/ConverterTypes';

export const PngImageList = () => {
  const {images} = useContext(ConverterContext) as ConverterContextType;

  if (images.length === 0) return null;
  return (
    <div className='relative grid h-fit grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <h2 className='col-span-full text-center text-2xl font-bold'>PNGs</h2>
      {images.map((img, index) => (
        <div
          key={index}
          className='group relative flex flex-col gap-2 rounded-md border border-black p-1 backdrop-blur'
        >
          <img className='mx-auto' src={img.data} alt={img.name} />
          <p>{img.name}</p>
        </div>
      ))}
    </div>
  );
};
