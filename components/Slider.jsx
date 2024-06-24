"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { BsFillSquareFill } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

export default function Slider(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pauseAutoSlide, setPauseAutoSlide] = useState(false);
    const [isChangingSlide, setIsChangingSlide] = useState(false);
    const autoplayRef = (useRef < NodeJS.Timeout) | (null > null);

    const settings = {
        maxItems: 4,
        speed: 500,
        autoplay: true,
        autoSlideSpeed: 15000,
    };

    const slides = [
        {
            imageUrl: "/img/slider-1.jpg",
            title: "Delivering Excellent Solutions",
            text: "We deliver excellent solutions without compromise in time & quality, meeting your specifications exactly when you need it.",
        },
        {
            imageUrl: "/img/slider-2.jpg",
            title: "Empowering Industries",
            text: "We are the leading provider of hands-on practical engineering training and services tailored to your specific needs and situations.",
        },
        {
            imageUrl: "/img/slider-3.jpg",
            title: "Creating Customer Value",
            text: "At TTS Integrated, we provide value that exceeds expectations through efficient application of our talents and technology in a safe and profitable manner.",
        },
        {
            imageUrl: "/img/trucks.jpg",
            title: "Technology Driven Approach",
            text: "Leveraging advanced technologies and tracking systems, we provide real-time visibility and transparency throughout the transportation process, keeping you informed every step of the way.",
        },
    ];
    const lastSlideIndex =
        slides.length <= settings.maxItems
            ? slides.length - 1
            : settings.maxItems - 1;

    const goToSlide = useCallback(
        (slideIndex) => {
            if (!isChangingSlide) {
                setCurrentIndex(slideIndex);
                setIsChangingSlide(true);

                setTimeout(() => {
                    setIsChangingSlide(false);
                }, settings.speed);
            }
        },
        [isChangingSlide, settings.speed]
    );

    const nextSlide = useCallback(() => {
        const isLastSlide = currentIndex === lastSlideIndex;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    }, [currentIndex, lastSlideIndex, goToSlide]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex <= 0;
        const newIndex = isFirstSlide ? lastSlideIndex : currentIndex - 1;
        goToSlide(newIndex);
    };

    useEffect(() => {
        if (settings.autoplay && !pauseAutoSlide) {
            clearTimeout(autoplayRef.current);
            autoplayRef.current = setTimeout(() => {
                nextSlide();
            }, settings.autoSlideSpeed);
        }
    }, [
        currentIndex,
        pauseAutoSlide,
        isChangingSlide,
        settings.autoplay,
        settings.autoSlideSpeed,
        nextSlide,
        autoplayRef,
    ]);

    return (
        <div className="max-w-full h-[580px] w-full m-auto relative group">
            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${slides[currentIndex].imageUrl})`,
                }}
                className="w-full h-full bg-center bg-cover duration-500"
            ></div>

            {/* Text */}
            <div className="absolute top-[30%] w-full text-center text-white px-20 md:px-30 lg:px-40 xl:px-80">
                <h1 className="text-3xl md:text-6xl font-bold">
                    {slides[currentIndex].title}
                </h1>
                <p className="py-6">{slides[currentIndex].text}</p>
            </div>

            {/* Left Arrow */}
            <div
                className="text-4xl cursor-pointer bg-white/20 hover:bg-white/30 group-hover:text-gray-50 text-gray-100/40 p-2 absolute top-[30%] -translate-x-0 -translate-y-[-50%] left-0"
                onClick={prevSlide}
                onMouseEnter={() => setPauseAutoSlide(true)}
                onMouseLeave={() => setPauseAutoSlide(false)}
            >
                <FaAngleLeft className="my-6" />
            </div>
            {/* Right Arrow */}
            <div
                className="text-4xl cursor-pointer bg-white/20 hover:bg-white/30 group-hover:text-gray-50 text-gray-100/40 p-2 absolute top-[30%] -translate-x-0 -translate-y-[-50%] right-0"
                onClick={nextSlide}
                onMouseEnter={() => setPauseAutoSlide(true)}
                onMouseLeave={() => setPauseAutoSlide(false)}
            >
                <FaAngleRight className="my-6" />
            </div>

            {/* Slider Navigation Dots */}
            <div className="flex top-4 justify-center py-2">
                {slides
                    .slice(0, lastSlideIndex + 1)
                    .map((slide, slideIndex) => (
                        <div
                            key={"slider-" + slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            onMouseEnter={() => setPauseAutoSlide(true)}
                            onMouseLeave={() => setPauseAutoSlide(false)}
                            className={`text-lg cursor-pointer mx-2 ${
                                slideIndex === currentIndex
                                    ? "text-gray-950"
                                    : "text-gray-400"
                            }`}
                        >
                            <BsFillSquareFill />
                        </div>
                    ))}
            </div>
        </div>
    );
}
