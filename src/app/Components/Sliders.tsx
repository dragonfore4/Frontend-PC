import React, { useState } from "react";

interface SlideInterface {
  test: string;
  url: string;
}

function Sliders() {
  const slides: SlideInterface[] = [
    {
      test: "HelloSlide1",
      url: "https://images.pexels.com/photos/27913669/pexels-photo-27913669.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      test: "HelloSlide2",
      url: "https://images.pexels.com/photos/28110792/pexels-photo-28110792.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      test: "HelloSlide3",
      url: "https://images.pexels.com/photos/27702837/pexels-photo-27702837.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const prevSlide = () => {
    const isFirstSlide = currentIndex == 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex == slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="h-[calc(100vh-80px)] relative group">
      <div className="w-full h-full flex flex-col md:flex-row">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="bg-green-200 flex w-full h-full bg-center bg-cover duration-500"
        ></div>
        <div className="w-full h-full bg-slate-100 text-black flex justify-center items-center">{slides[currentIndex].test}</div>
      </div>
      {/* Left Arrow */}
      <div
        className="hidden group-hover:block absolute top-[50%] translate-y-[-50%] left-5 text-white"
        onClick={prevSlide}
      >
        Left
      </div>
      {/* Right Arrow */}
      <div
        className="hidden group-hover:block absolute top-[50%] translate-y-[-50%] right-5 text-white"
        onClick={nextSlide}
      >
        right
      </div>
    </div>
  );
}

export default Sliders;
