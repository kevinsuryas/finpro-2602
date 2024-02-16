import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { PiPhoneCallBold } from "react-icons/pi";
import { FaRegFolderOpen } from "react-icons/fa";

export default function Contact () {
    return (
        <div className="bg-neutral mb-10">
            <h1 id='contact' className="text-4xl mt-[7rem] py-6 font-bold text-center"> Contact Us</h1>
            <div className="max-w-[1240px] mx-auto 0">
                <div className="flex flex-col md:flex-row flex justify-between items-center py-5">
                
                <div className="flex justify-center flex-1 flex-col items-center max-w-[250px] text-center ">
                    <PiPhoneCallBold className="text-[5rem] text-primary mb-5" />
                        <h1 className="text-2xl mb-5">BY PHONE</h1>
                        <p className="text-xs">(Monday to Friday: 9am - 5pm)</p>
                        <p>Jinbe Wash Jakarta</p>
                        <p>800-123-4567</p>
                        <button className='btn btn-primary font-bold my-6 mx-auto md:mx-0 py-3 text-white'>Call Us</button>
                    </div>
                    
                    <div className="flex justify-center flex-1 flex-col items-center max-w-[250px] text-center">
                    <FaRegFolderOpen className="text-[5rem] text-primary mb-5" />
                        <h1 className="text-2xl mb-5">START A NEW CASE</h1>
                        <p>Just send us your questions or concerns by starting a new case and we will give you the help you need</p>
                        <button className='btn btn-primary font-bold my-6 mx-auto md:mx-0 py-3 text-white'>Start Here</button>
                    </div>
                    
                    <div className="flex justify-center flex-1 flex-col items-center max-w-[250px]  text-center">
                    <IoChatbubbleEllipsesOutline className="text-[5rem] text-primary mb-5" />
                        <h1 className="text-2xl mb-5">LIVE CHAT</h1>
                        <p>Chat with a member of our in-house team</p>
                        <button className='btn btn-primary font-bold my-6 mx-auto md:mx-0 py-3 text-white'>Start Chat</button>
                    </div>
                </div>
            </div>
        </div>
    )
}