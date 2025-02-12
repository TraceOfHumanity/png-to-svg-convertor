import { useState } from "react";
import { trace } from "potrace"; // Потрібно встановити бібліотеку: npm install potrace

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

  const downloadSvg = (name: string, data: string) => {
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>PNG to SVG Converter</h1>
      <input type="file" accept="image/png" multiple onChange={handleImageUpload} />
      {images.map((img, index) => (
        <div key={index}>
          <img src={img.data} alt={img.name} width={200} />
          <p>{img.name}</p>
        </div>
      ))}
      <button onClick={convertToSvg} disabled={images.length === 0}>Convert to SVG</button>
      {svgs.map((svg, index) => (
        <div key={index}>
          <div dangerouslySetInnerHTML={{ __html: svg.data }} />
          <p>{svg.name}</p>
          <button onClick={() => downloadSvg(svg.name, svg.data)}>Download SVG</button>
        </div>
      ))}
    </div>
  );
}

export default App;
