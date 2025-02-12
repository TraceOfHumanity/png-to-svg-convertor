import { useState } from "react";
import { trace } from "potrace";
import JSZip from "jszip";
import { MainContainer } from "./components/MainContainer";
import { Title } from "./components/Title";
import { FaUpload } from "react-icons/fa";

function App() {
  const [images, setImages] = useState<{ name: string; data: string }[]>([]);
  const [svgs, setSvgs] = useState<{ name: string; data: string }[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: { name: string; data: string }[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({ name: file.name, data: e.target?.result as string });
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const convertToSvg = async () => {
    const newSvgs: { name: string; data: string }[] = [];
    for (const img of images) {
      const svgString = await new Promise<string>((resolve, reject) => {
        trace(img.data, (err, svg) => {
          if (err) reject(err);
          else resolve(svg);
        });
      });
      newSvgs.push({ name: img.name.replace(/\.png$/, ".svg"), data: svgString });
    }
    setSvgs(newSvgs);
  };

  const downloadAllSvgs = () => {
    const zip = new JSZip();
    svgs.forEach(({ name, data }) => {
      zip.file(name, data);
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted_svgs.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <MainContainer>
      <Title />
      <div className="border-2 w-full min-h-40 border-dashed border-mainText backdrop-blur-3xl rounded-md hover:bg-slate-950/5 duration-200 relative">
        <input className="w-full h-full opacity-0" type="file" accept="image/png" multiple onChange={handleImageUpload} />
        <div className="text-mainText text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <p>Drag and drop or click to select images</p>
        <FaUpload className="text-2xl inline-block" />
      </div>
      </div>
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.data} alt={img.name} width={200} />
          <p>{img.name}</p>
        </div>
      ))}
      <button onClick={convertToSvg} disabled={images.length === 0}>Convert to SVG</button>
      {svgs.length > 0 && <button onClick={downloadAllSvgs}>Download All SVGs</button>}
      {svgs.map((svg, index) => (
        <div key={index}>
          <div dangerouslySetInnerHTML={{ __html: svg.data }} />
          <p>{svg.name}</p>
        </div>
      ))}
    </MainContainer>
  );
}

export default App;
