import {PngImageList} from './ConverterPngImageList';
import {SvgImageList} from './ConverterSvgImageList';

export const ConverterImages = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <ConverterImages.PngImageList />
      <ConverterImages.SvgImageList />
    </div>
  );
};

ConverterImages.PngImageList = PngImageList;
ConverterImages.SvgImageList = SvgImageList;
