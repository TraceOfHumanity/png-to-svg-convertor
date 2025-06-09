import {Actions} from './ConverterAction';
import {FilesInput} from './ConverterFilesInput';
import {Loader} from './ConverterLoader';
import {Title} from './ConverterTitle';
import {ConverterContext} from '../context/ConverterContext';
import {useConvertor} from '../hooks/useConvertor';
import {ConverterImages} from './ConverterImages';

export const Converter = ({children}: {children: React.ReactNode}) => {
  const contextValue = useConvertor();

  return (
    <ConverterContext.Provider value={contextValue}>
      <div className='container mx-auto flex h-screen max-h-screen flex-col gap-4 overflow-y-auto px-4 py-8 md:px-8 md:py-16'>
        {children}
      </div>
    </ConverterContext.Provider>
  );
};

Converter.Title = Title;
Converter.FilesInput = FilesInput;
Converter.Actions = Actions;
Converter.Loader = Loader;
Converter.Images = ConverterImages;
