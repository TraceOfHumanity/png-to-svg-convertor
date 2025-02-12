
interface ActionButtonsProps {
  images: { name: string; data: string }[];
  svgs: { name: string; data: string }[];
  convertToSvg: () => void;
  downloadAllSvgs: () => void;
}
export const ActionButtons = ({ images, svgs, convertToSvg, downloadAllSvgs }: ActionButtonsProps) => {
  return (
    <div className="flex items-center gap-2 w-fit ml-auto">
      {images.length > 0 && <button className="flex items-center gap-2 w-fit ml-auto bg-black text-white rounded p-1" onClick={convertToSvg} disabled={images.length === 0}>Convert to SVG</button>}
      {svgs.length > 0 && <button className="flex items-center gap-2 w-fit ml-auto bg-black text-white rounded p-1" onClick={downloadAllSvgs}>Download All SVGs</button>}
    </div>
  )
}
