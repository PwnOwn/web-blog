import Image from "next/image"

export default function MaterialDesignHero() {
    return (
<header className="w-full max-w-full min-h-[544px] mx-auto pl-4 block">
  <div className="grid gap-2 grid-cols-1 md:grid-cols-2 grid-flow-row mt-[8px] ml-6 mr-6">
    {/* Text Block */}
    <div className="flex flex-col justify-center relative p-[154px] rounded-[24px] bg-[var(--mio-theme-color-surface-1)] bg-[0_50%] bg-cover bg-no-repeat">
      <div className="flex flex-col justify-center max-w-[840px] m-0 h-full md:h-[300px]">
        <div className="text-[16px] mb-4 font-google-sans">
          Dec 16, 2020
        </div>
        <div className="title">
          <h1 className="text-[40px] font-bold mb-2 font-google-sans">The State of Design Systems: 2020</h1>
          <div className="description text-[16px] font-google-sans">
            A community survey of design systems, from creation to implementation and beyond
          </div>
        </div>
      </div>
    </div>

    {/* Image Block */}
    <div className="relative h-full w-full rounded-[24px] overflow-hidden">
      <Image
        src="/pic.jpg"
        alt="Material Design abstract shapes"
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  </div>
</header>



    )
}