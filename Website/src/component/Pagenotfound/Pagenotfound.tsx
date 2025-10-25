import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const PagenotfoundSection = () => {
    const navigate = useNavigate()
    const RedirectCall = () =>{
        navigate("/")
    }

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-6 text-center" style={{ backgroundImage: "url('/images/slide-3.jpg')" }} >

        <div className="min-h-screen flex flex-col items-center justify-center  text-center px-6 relative overflow-hidden">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">   Sorry This Page Can’t Be Found  </h1>
            {/* <p className="text-gray-600 text-lg max-w-xl mb-8">
                Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                suspendisse ultrices gravida commodo viverra maecenas accumsan
            </p> */}

            <div onClick={RedirectCall}  className="inline-flex cursor-pointer items-center px-6 py-3 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold rounded-md transition">
                Goto Home <FaArrowRight className="ml-2" />
            </div>
        </div>
    </div>
  )
}

export default PagenotfoundSection