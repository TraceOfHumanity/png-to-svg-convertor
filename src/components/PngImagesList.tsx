
interface PngImagesListProps {
  images: { name: string; data: string }[];
}

export const PngImagesList = ({ images }: PngImagesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 pb-5 md:pb-16">
    {images.map((img, index) => (
      <div key={index} className="flex flex-col gap-2 relative group border border-black rounded-md p-1 backdrop-blur">
        <img className="mx-auto" src={img.data} alt={img.name} width={200} />
        <p>{img.name}</p>
      </div>
    ))}
  </div>
  )
}
