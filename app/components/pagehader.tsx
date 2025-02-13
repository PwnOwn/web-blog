"use client"

import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("Video element not yet available.");
    }
  };

  return (
    <div className="relative h-[200px] md:h-full w-full rounded-[24px] overflow-hidden ">
      <video
        ref={videoRef}
        src={videoUrl}
        className="object-cover w-full h-full"
        autoPlay
        loop
        muted
      />
      <button
        onClick={togglePlay}
        className="m-2 flex absolute right-0 bg-[--theme-color-tertiary-container] dark:bg-[#553F5D] bottom-0 flex-shrink-0 items-center justify-center w-12 h-12 min-w-0 m-1 p-0 transition-all duration-200 ease-linear border-0 rounded-full bg-tertiary-container text-on-surface-variant shadow-md cursor-pointer"
      >
        {isPlaying ? (
          <i className="material-symbols-outlined">pause</i>
        ) : (
          <i className="material-symbols-outlined">play_arrow</i>
        )}
      </button>
    </div>
  );
};

interface TextBlockProps {
  date: string;
  title: string;
  description: string;
  titleSize?: string; // 新增：标题字体大小
}

const TextBlock: React.FC<TextBlockProps> = ({ date, title, description, titleSize = "text-[28px] md:text-[40px]" }) => {
  return (
    <div className="flex flex-col justify-center p-[80px] md:p-[80px] rounded-[24px] bg-[var(--mio-theme-color-surface-1)] dark:bg-[#1C1B1D] bg-[0_50%] bg-cover">
      <div className="flex flex-col justify-center max-w-[840px] m-0 h-full md:md:min-h-[400px]">
        <div className="text-[14px] mb-2 md:text-[16px] font-google-sans">
          {date}
        </div>
        <div className="title">
        <h1 className={`${titleSize} font-bold mb-2 font-google-sans`}>
            {title}
          </h1>
          <div className="description text-[12px] md:text-[16px] font-google-sans">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MaterialDesignHeroProps {
  videoUrl: string;
  date: string;
  title: string;
  description: string;
  titleSize?: string; 
}

const MaterialDesignHero: React.FC<MaterialDesignHeroProps> = ({ videoUrl, date, title, description, titleSize }) => {
  return (
    <header className="w-full max-w-full min-h-[544px] mx-auto pl-[8px] sm:pl-[4px] pr-[8px] md:min-h-[300px]">
      <div className="grid gap-2 grid-cols-1 grid-rows-2 sm:ml-4 sm:mr-4 md:grid-cols-2 md:grid-rows-1 md:ml-6 md:mr-6 grid-flow-row mt-[8px]">
        <TextBlock date={date} title={title} description={description}  titleSize={titleSize}/>
        <VideoPlayer videoUrl={videoUrl} />
      </div>
    </header>
  );
};

export default MaterialDesignHero;