type Image = {
  name: string;
  data: string;
};

export type ConverterContextType = {
  images: Image[];
  svgs: Image[];
  isLoading: boolean;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  convertToSvg: () => void;
  downloadAllSvgs: () => void;
};
