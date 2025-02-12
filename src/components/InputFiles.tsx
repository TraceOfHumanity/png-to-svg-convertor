import { FaUpload } from "react-icons/fa"

interface InputFilesProps {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputFiles = ({ handleImageUpload }: InputFilesProps) => {
  return (
    <div className="border-2 w-full min-h-40 border-dashed border-mainText backdrop-blur-3xl rounded-md hover:bg-slate-950/5 duration-200 relative">
    <input className="w-full h-full opacity-0" type="file" accept="image/png" multiple onChange={handleImageUpload} />
    <div className="text-mainText text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <p>Drag and drop or click to select images</p>
      <FaUpload className="text-2xl inline-block" />
    </div>
  </div>
  )
}
