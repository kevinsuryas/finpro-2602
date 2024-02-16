'use client'
import { useState } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import { RxDotFilled } from "react-icons/rx"


export default function Hero () {
    const slides = [
        {
            url: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://images.unsplash.com/photo-1635274605638-d44babc08a4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevslide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextslide = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)

    }

    const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex)
    }
    return(
        <>
        <div className="max-w-[1440px] h-[780px] w-full m-auto py-16 px-4 relative group">
            <div style={{backgroundImage: `url(${slides[currentIndex].url})`}}className="w-full h-full rounded-2xl bg-center bg-cover duration-500">
                {/* Left Arrow */}
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactLeft size={30} onClick={prevslide}/>
                </div>
                {/* Right Arrow */}
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactRight size={30} onClick={nextslide}/>
                </div>
                <div className="flex justify-center py-2 absolute bottom-5 text-center w-full ">
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
                            <RxDotFilled/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
       </>
    )
}