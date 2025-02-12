
interface SvgImagesListProps {
  svgs: { name: string; data: string }[];
}

export const SvgImagesList = ({ svgs }: SvgImagesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 relative after:content-[''] after:absolute after:w-px after:bg-black after:h-full after:-left-2 after:top-0 after:opacity-50 h-fit">
      <h2 className="text-2xl font-bold col-span-full text-center">SVGs</h2>
      {svgs.map((svg, index) => (
        <div key={index} className="flex flex-col gap-2 relative group border border-black rounded-md p-1 backdrop-blur">
          <div className="w-full h-full [&_svg]:w-full [&_svg]:h-full" dangerouslySetInnerHTML={{ __html: svg.data }} />
          <p>{svg.name}</p>
        </div>
      ))}
    </div>
  )
}
