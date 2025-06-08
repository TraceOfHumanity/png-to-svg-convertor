import {useContext} from 'react';
import {ConverterContext} from '../context/ConverterContext';

export const SvgImagesList = () => {
  const {svgs} = useContext(ConverterContext);

  if (svgs.length === 0) return null;
  return (
    <div className="relative grid h-fit grid-cols-1 gap-4 after:absolute after:top-0 after:-left-2 after:h-full after:w-px after:bg-black after:opacity-50 after:content-[''] md:grid-cols-2 lg:grid-cols-3">
      <h2 className='col-span-full text-center text-2xl font-bold'>SVGs</h2>
      {svgs.map((svg, index) => (
        <div
          key={index}
          className='group relative flex flex-col gap-2 rounded-md border border-black p-1 backdrop-blur'
        >
          <div
            className='h-full w-full [&_svg]:h-full [&_svg]:w-full'
            dangerouslySetInnerHTML={{__html: svg.data}}
          />
          <p>{svg.name}</p>
        </div>
      ))}
    </div>
  );
};
