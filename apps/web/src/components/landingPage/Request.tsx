import Image from "next/image"
export default function Request () {
    return (
        <>
        <div className='bg-secondary w-full py-16 px-4'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <Image className='w-[500px] mx-auto my-4' src='/Delivery.png' alt='image' width={1000} height={1000} />
                <div className='flex flex-col justify-center'>
                    <h1 className='md:text-6xl sm:text-4xl text-3xl font-bold py-2'>Our Services</h1>
                    <p className='py-4 text-2xl'> We're always looking for ways to make laundry and dry cleaning more convenient. 
                    In addition to our delivery service, we also provide pick up service. So get your laundry clean and fragrant right now !</p>
                    <button className='btn btn-primary w-[250px] h-[4rem] font-bold text-2xl my-6 mx-auto md:mx-0 py-3 text-white'>Request Pick Up</button>
                </div>
            </div>
        </div>
        </>
    )
}