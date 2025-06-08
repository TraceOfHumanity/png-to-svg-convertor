import {useConvertor} from "./useConvertor";
import {Converter} from "./components/Converter";

function App() {
  const {
    images,
    svgs,
    isLoading,
    handleImageUpload,
    convertToSvg,
    downloadAllSvgs,
  } = useConvertor();

  return (
    <Converter>
      <Converter.Title />
      <Converter.FilesInput handleImageUpload={handleImageUpload} />
      <Converter.Actions
        images={images}
        svgs={svgs}
        convertToSvg={convertToSvg}
        downloadAllSvgs={downloadAllSvgs}
      />
      <div className="grid grid-cols-2 gap-4">
        {images.length > 0 && <Converter.PngImagesList images={images} />}
        {svgs.length > 0 && <Converter.SvgImagesList svgs={svgs} />}
      </div>
      {<Converter.Loader isLoading={isLoading} />}
    </Converter>
  );
}

export default App;
