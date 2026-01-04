import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import { getProductlist } from '../../Store/Product/action';
import { useLocation, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GlobalLoader from '../../component/Loader/Loader';
import { getCategorylist, getCroplist } from '../../Store/actions';

const ProductSection = () => {
  const [is_loader, set_is_loader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cropList, setCropList] = useState([])

  useEffect(() => {
    dispatch(getCategorylist())
  }, [dispatch])

  const cropdetail: any = useSelector((state: any) => state.Category.Categorylist);
    
  useEffect(() => {
        setCropList(cropdetail)
    }, [cropdetail])

  const RedirectCall = (data: string) => {
    if (data != null) {
      navigate(`/product/${data}`);
    }
  }

  return (
    <div >
      {is_loader ? <GlobalLoader /> :
        <section className=" relative  py-10  bg-gray-50  bg-[url('/images/ad-bg-pattern.png')]  bg-repeat bg-[length:600px_600px] ">
          <div className="flex flex-col space-y-8 relative z-10">

            <div className=" max-w-1600 mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 my-5 flex justify-center ">  <span className="text-lime-500"> Seeds / Products </span> </h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-1600">
                {cropList?.map((item: any, idx: number) => (
                  <div key={idx} className="flex flex-col items-center text-center group cursor-pointer" >
                    <div className="bg-gray-100 flex items-center justify-center group-hover:shadow-md transition rounded-full p-1" onClick={() => RedirectCall(item?._id)}>
                      <LazyLoadImage effect="blur" src={item?.category_pic} alt={item?.name_eng} className=" object-contain rounded-full border-2 border-green-600 h-[10rem] w-[10rem]" />  </div>
                    <div className='mt-2 text-md md:text-[1rem] font-heading font-semibold   text-gray-800'> {item?.name_eng} </div>
                  </div>
                ))}
              </div>
            </div>

            <ToastContainer />
          </div>
        </section>
      }
    </div>
  )
}

export default ProductSection