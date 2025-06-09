import {useContext} from 'react';
import {ConverterContext} from '../context/ConverterContext';
import {ConverterContextType} from '../types/ConverterTypes';

export const Actions = () => {
  const {images, svgs, convertToSvg, downloadAllSvgs} = useContext(
    ConverterContext,
  ) as ConverterContextType;

  return (
    <div className='ml-auto flex w-fit items-center gap-2'>
      {images.length > 0 && (
        <button
          className='ml-auto flex w-fit items-center gap-2 rounded bg-black p-1 text-white'
          onClick={convertToSvg}
          disabled={images.length === 0}
        >
          Convert to SVG
        </button>
      )}
      {svgs.length > 0 && (
        <button
          className='ml-auto flex w-fit items-center gap-2 rounded bg-black p-1 text-white'
          onClick={downloadAllSvgs}
        >
          Download All SVGs
        </button>
      )}
    </div>
  );
};
