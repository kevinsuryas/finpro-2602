'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import { RxDotFilled } from "react-icons/rx"

export default function Location () {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/location`, {
                    method: 'GET',
                    cache: 'no-store'
                });
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevslide = (slides:any) => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextslide = (slides:any) => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)

    }

    const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex)
    }

    return(
        <>
        <div className="text-4xl font-bold text-center mt-20 mb-20">
             Our Location
        </div>

            <div className="breadcrumbs">
                <div className="flex items-center justify-center gap-5 mb-20 mt-5 bread">
                        <ul>
                    <div className="flex gap-5 gap-5 carousel carousel-end max-w  ">
                           
                                {
                                    data.map((item: any, index) => {
                                        return(
                                            <div className="card w-96 bg-base-100 shadow-xl carousel-item">
                                                <figure><Image className='w-[30rem] h-[15rem]' src={item.image} alt="image" width={1000} height={1000} /></figure>
                                                <div className="card-body">
                                                    <h2 className="card-title">{item.name}</h2>
                                                    <p>Address: {item.address}</p>
                                                    <p>Phone: {item.phone}</p>
                                                    <div className="card-actions justify-end">
                                                    <button className="btn btn-primary">Buy Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        })      
                                    }
                    </div>
                                    </ul> 
                </div>
            </div>
<div>
    hshdsdhdhs
</div>
            


        </>
    )
}