interface PngImagesListProps {
  images: {name: string; data: string}[];
}

export const PngImagesList = ({images}: PngImagesListProps) => {
  return (
    <div className='relative grid h-fit grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <h2 className='col-span-full text-center text-2xl font-bold'>PNGs</h2>
      {images.map((img, index) => (
        <div
          key={index}
          className='group relative flex flex-col gap-2 rounded-md border border-black p-1 backdrop-blur'
        >
          <img className='mx-auto' src={img.data} alt={img.name} width={200} />
          <p>{img.name}</p>
        </div>
      ))}
    </div>
  );
};
