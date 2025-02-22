import {Title} from "./components/Title";
import {InputFiles} from "./components/InputFiles";
import {PngImagesList} from "./components/PngImagesList";
import {SvgImagesList} from "./components/SvgImagesList";
import {ActionButtons} from "./components/ActionButtons";
import {Loader} from "./components/Loader";
import {useConvertor} from "./useConvertor";
import {MainContainer} from "./components/MainContainer";
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
    <MainContainer>
      <Title />
      <InputFiles handleImageUpload={handleImageUpload} />
      <ActionButtons
        images={images}
        svgs={svgs}
        convertToSvg={convertToSvg}
        downloadAllSvgs={downloadAllSvgs}
      />
      <div className="grid grid-cols-2 gap-4">
        {images.length > 0 && <PngImagesList images={images} />}
        {svgs.length > 0 && <SvgImagesList svgs={svgs} />}
      </div>
      {<Loader isLoading={isLoading} />}
    </MainContainer>
  );
}

export default App;
