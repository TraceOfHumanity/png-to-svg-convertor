import {PngImagesList} from './ConverterPngImagesList';
import {SvgImagesList} from './ConverterSvgImagesList';

export const ConverterImages = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <ConverterImages.PngImagesList />
      <ConverterImages.SvgImagesList />
    </div>
  );
};

ConverterImages.PngImagesList = PngImagesList;
ConverterImages.SvgImagesList = SvgImagesList;
