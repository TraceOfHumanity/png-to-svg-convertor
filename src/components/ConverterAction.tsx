interface ActionButtonsProps {
  images: {name: string; data: string}[];
  svgs: {name: string; data: string}[];
  convertToSvg: () => void;
  downloadAllSvgs: () => void;
}
export const Actions = ({
  images,
  svgs,
  convertToSvg,
  downloadAllSvgs,
}: ActionButtonsProps) => {
  return (
    <div className='ml-auto flex w-fit items-center gap-2'>
      {images.length > 0 && (
        <button
          className='ml-auto flex w-fit items-center gap-2 rounded bg-black p-1 text-white'
          onClick={convertToSvg}
          disabled={images.length === 0}
        >
          Convert to SVG
        </button>
      )}
      {svgs.length > 0 && (
        <button
          className='ml-auto flex w-fit items-center gap-2 rounded bg-black p-1 text-white'
          onClick={downloadAllSvgs}
        >
          Download All SVGs
        </button>
      )}
    </div>
  );
};
