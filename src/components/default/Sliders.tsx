import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface SlideInterface {
    topic?: string;
    desc: string;
    url: string;
}

function Sliders() {
    const slides: SlideInterface[] = [
        {
            topic: "From carbon credits to climate commitments",
            desc: "การซื้อขายเครดิตคาร์บอนเป็นขั้นตอนแรกที่ช่วยให้ธุรกิจสามารถลดการปล่อยมลพิษได้ และนำไปสู่ความมุ่งมั่นในการอนุรักษ์สิ่งแวดล้อมในระยะยาว",
            url: "https://kunakair.com/wp-content/uploads/2022/07/control-de-emisiones-industriales.jpg",
        },
        {
            topic: `From carbon credit trading to a sustainable future`,
            desc: "การซื้อขายเครดิตคาร์บอนเป็นก้าวสำคัญในการสร้างอนาคตที่ยั่งยืนสำหรับสิ่งแวดล้อมและโลกใบนี้",
            url: "https://www.zf.com/master/media/corporate/m_zf_com/sustainability/stages_1/BG_Sustainable_FS_2048px_Redux_og_sharing_image.jpg",
        },
        {
            topic: "From emissions to ambitions",
            desc: "การปล่อยมลพิษ (เช่น ก๊าซเรือนกระจก) ไปสู่การตั้งเป้าหมายหรือความมุ่งมั่นที่จะลดหรือหยุดการปล่อยมลพิษเหล่านี้",
            url: "https://c0.wallpaperflare.com/preview/878/509/75/green-woods-across-cloudy-mountain.jpg",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Function to preload images
    const preloadImages = () => {
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.url;
        });
    };

    useEffect(() => {
        // Preload images when component mounts
        preloadImages();
    }, []);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative h-[calc(100vh-80px)] group">
            <div className="w-full h-full flex flex-col md:flex-row">
                {/* IMAGE */}
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                    className="relative flex w-full h-full bg-center bg-cover duration-500 justify-center items-center"
                >
                    {/* Dark overlay */}
                    <div className="absolute w-full h-full opacity-45 bg-black z-10"></div>
                    {/* TEXT */}
                    <div className="absolute z-30 h-1/2 flex flex-col justify-center items-center text-center gap-8">
                        <p className="text-white text-8xl font-semibold w-full">
                            {slides[currentIndex].topic}
                        </p>
                        <div className="h-[2px] w-1/2 bg-gray-300" />
                        <div className="w-1/2">
                            <div
                                className={`${currentIndex === 0 ? "text-white" : "text-white"
                                    } text-xl font-semibold`}
                            >
                                {slides[currentIndex].desc}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Left Arrow */}
            <div
                className="z-40 group-hover:flex hidden group-hover:justify-center group-hover:items-center absolute top-1/2 left-5 text-black bg-white rounded-full h-10 w-10"
                onClick={prevSlide}
            >
                <FaAngleLeft size={24} />
            </div>

            {/* Right Arrow */}
            <div
                className="z-40 hidden group-hover:flex group-hover:justify-center group-hover:items-center absolute top-1/2 right-5 text-black bg-white rounded-full h-10 w-10"
                onClick={nextSlide}
            >
                <FaAngleRight size={24} />
            </div>
        </div>
    );
}

export default Sliders;
