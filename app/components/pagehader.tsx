"use client"

import React, { useRef, useState } from 'react';
export default function MaterialDesignHero() {
    const videoRef = useRef<HTMLVideoElement | null>(null); // Correctly type the ref
    const [isPlaying, setIsPlaying] = useState(true);
  
    const togglePlay = () => {
      const video = videoRef.current;
  
      if (video) { // Check if video exists before using it
        if (isPlaying) {
          video.pause();
        } else {
          video.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        console.log("Video element not yet available."); // Or handle it differently
      }
    };
  
  
    // Even better, using optional chaining:
    const togglePlayOptional = () => {
      videoRef.current?.paused ? videoRef.current?.play() : videoRef.current?.pause();
      setIsPlaying(!isPlaying);
    };
    return (
        <header className="w-full max-w-full min-h-[544px] mx-auto pl-4 block md:min-h-[200px]">
            <div className="grid gap-2 grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 grid-flow-row mt-[8px] ml-6 mr-6">
                {/* Text Block */}
                <div className="flex flex-col justify-center p-[40px] md:p-[40px] rounded-[24px] bg-[var(--mio-theme-color-surface-1)] bg-[0_50%] bg-cover">
                    <div className="flex flex-col justify-center max-w-[840px] m-0 h-full md:h-[500px]">
                        <div className="text-[14px] mb-2 md:text-[16px] font-google-sans">
                            Dec 16, 2020
                        </div>
                        <div className="title">
                            <h1 className="text-[28px] md:text-[40px] font-bold mb-2 font-google-sans">The State of Design Systems: 2020</h1>
                            <div className="description text-[12px] md:text-[16px] font-google-sans">
                                A community survey of design systems, from creation to implementation and beyond
                            </div>
                        </div>
                    </div>
                </div>


                {/* Image Block */}
                {/* <div className="relative h-[200px] md:h-full w-full rounded-[24px] overflow-hidden">
                    <video
                        src="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a"
                        className="object-cover w-full h-full"
                        autoPlay
                        loop
                        muted
                    />
                </div> */}
                <div className="relative h-[200px] md:h-full w-full rounded-[24px] overflow-hidden">
                    <video
                        ref={videoRef}
                        src="https://kstatic.googleusercontent.com/files/65da8f0326427a8e71bfa678348f3fa1a4bb1660e0b013591eb3bfd9df455bd5a3334249de61229029be7d2fd7cf18d4e143728b7e0702b6bde6251a9c64511a" // 替换为你的视频 URL
                        className="object-cover w-full h-full"
                        autoPlay
                        loop
                        muted
                    />
                    <button
                        onClick={togglePlay}
                        className="m-2 flex absolute right-0 bg-[--theme-color-tertiary-container] bottom-0 flex-shrink-0 items-center justify-center w-12 h-12 min-w-0 m-1 p-0 transition-all duration-200 ease-linear border-0 rounded-full bg-tertiary-container text-on-surface-variant shadow-md cursor-pointer"
                    >
                        {isPlaying ? (
                            <i className="material-symbols-outlined">pause</i>
                        ) : (
                            <i className="material-symbols-outlined">play_arrow</i>
                        )}
                    </button>
                </div>

            </div>
        </header>






    )
}