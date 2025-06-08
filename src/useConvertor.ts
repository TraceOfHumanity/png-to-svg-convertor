import {useState} from 'react';
import {trace} from 'potrace';
import JSZip from 'jszip';

export const useConvertor = () => {
  const [images, setImages] = useState<{name: string; data: string}[]>([]);
  const [svgs, setSvgs] = useState<{name: string; data: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: {name: string; data: string}[] = [];
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
