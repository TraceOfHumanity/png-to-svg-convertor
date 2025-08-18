import {useState} from 'react';
import {trace} from 'potrace';
import JSZip from 'jszip';
import {ConverterContextType} from '../types/ConverterTypes';

export const useConvertor = (): ConverterContextType => {
  const [images, setImages] = useState<ConverterContextType['images']>([]);
  const [svgs, setSvgs] = useState<ConverterContextType['svgs']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ConverterContextType['images'] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({name: file.name, data: e.target?.result as string});
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const convertToSvg = async () => {
    const newSvgs: {name: string; data: string}[] = [];
    setIsLoading(true);
    for (const img of images) {
      const svgString = await new Promise<string>((resolve, reject) => {
        trace(img.data, (err, svg) => {
          if (err) reject(err);
          else resolve(svg);
        });
      });
      newSvgs.push({
        name: img.name.replace(/\.png$/, '.svg'),
        data: svgString,
      });
    }
    setSvgs(newSvgs);
    setIsLoading(false);
  };

  const downloadAllSvgs = () => {
    const zip = new JSZip();
    svgs.forEach(({name, data}) => {
      zip.file(name, data);
    });
    zip.generateAsync({type: 'blob'}).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_svgs.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return {
    images,
    svgs,
    isLoading,
    handleImageUpload,
    convertToSvg,
    downloadAllSvgs,
  };
};
