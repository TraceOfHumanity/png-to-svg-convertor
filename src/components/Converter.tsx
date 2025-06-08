import { Actions } from "./ConverterAction";
import { FilesInput } from "./ConverterFilesInput";
import { Loader } from "./ConverterLoader";
import { PngImagesList } from "./ConverterPngImagesList";
import { SvgImagesList } from "./ConverterSvgImagesList";
import {Title} from "./ConverterTitle";

export const Converter = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="container mx-auto flex h-screen max-h-screen flex-col gap-4 overflow-y-auto px-4 py-8 md:px-8 md:py-16">
      {children}
    </div>
  );
};

Converter.Title = Title;
Converter.FilesInput = FilesInput;
Converter.Actions = Actions;
Converter.Loader = Loader;
Converter.PngImagesList = PngImagesList;
Converter.SvgImagesList = SvgImagesList;

