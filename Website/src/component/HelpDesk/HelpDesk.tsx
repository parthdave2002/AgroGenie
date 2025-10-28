import React, { useState } from 'react'
import { FaPhoneSlash, FaWhatsapp } from 'react-icons/fa';
import { IoCloseSharp, IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineQuestionMark, MdSupportAgent } from 'react-icons/md'
import { TfiHeadphoneAlt } from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom';
import HelpModal from './HelpModal';
import { useTranslation } from 'react-i18next';

const HelpDesk = () => {
  const {t} = useTranslation()
  const nagivate =useNavigate()

   const [isOpen, setIsOpen] = useState(false);
    const RedirectCall =(data:string) =>{
      nagivate(data);
      setIsOpen(false)
    }

    const [ isOpenDelteModel,setisOpenDelteModel] = useState(false);
    const OpenModal = () =>{
        setIsOpen(false)
        setisOpenDelteModel(true)
    }

    const Closemodal = () =>{
      setisOpenDelteModel(false)
    }
  return (
    <>
      <div className="fixed bottom-28 right-6 z-[9998] flex flex-col items-end space-y-2">
        {isOpen && (
          <>
            <button className="flex items-center w-[12rem] space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full shadow-md" onClick={() => OpenModal()}>  <MdOutlineQuestionMark /> <span> {t("Need Help")}</span> </button>
            <button className="flex items-center w-[12rem] space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full shadow-md" onClick={() => RedirectCall("/contactus")}>  <TfiHeadphoneAlt /> <span> {t("Contact Us")}</span>  </button>
          </>
        )}
        <button className="fixed bottom-6 right-6 rounded-full bg-green-600 hover:bg-green-700 p-0.5 shadow-lg text-white transition animate-bounce" onClick={() => setIsOpen(!isOpen)} >    {isOpen ? <IoCloseSharp className='text-[2.5rem]' /> : <img src='/images/support-icon-2.webp' className='rounded-full'  height={50} width={50} />}   </button>

      </div>
      {isOpenDelteModel ? <HelpModal isOpenDelteModel={isOpenDelteModel} setisOpenDelteModel={Closemodal} /> : null}
    </>
  )
}

export default HelpDesk