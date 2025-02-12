import { useState } from "react";
import { trace } from "potrace"; // Потрібно встановити бібліотеку: npm install potrace

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [svg, setSvg] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const convertToSvg = async () => {
    if (!image) return;
    const svgString = await new Promise<string>((resolve, reject) => {
      trace(image, (err, svg) => {
        if (err) reject(err);
        else resolve(svg);
      });
    });
    setSvg(svgString);
  };

  const downloadSvg = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted-image.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>PNG to SVG Converter</h1>
      <input type="file" accept="image/png" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" width={200} />}
      <button onClick={convertToSvg} disabled={!image}>Convert to SVG</button>
      {svg && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: svg }} />
          <button onClick={downloadSvg}>Download SVG</button>
        </div>
      )}
    </div>
  );
}

export default App;
