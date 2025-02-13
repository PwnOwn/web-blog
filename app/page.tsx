
import MaterialDesignHero from "./components/pagehader";

export default function Home() {



  return (
    <main className="bg-[--light-bg] dark:bg-[#141314] text-black dark:text-white">
      <div className="">
        <MaterialDesignHero
          videoUrl="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a"
          date=""
          title="Q Blog"
          description="A community survey of design systems, from creation to implementation and beyond"
          titleSize="text-[48px] md:text-[64px]" // 自定义标题大小
        />
      </div>

    </main>
  );
}