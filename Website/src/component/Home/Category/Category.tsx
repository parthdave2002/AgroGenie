import React, { useEffect, useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategorylist, getCroplist } from '../../../Store/actions';

const CategoryCarouselSection: React.FC = () => {
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


      const RedictCall = (data:any) =>{
        navigate("/product-category",{ state: { filter: data } })
      }
      const redirect  = () =>{
        navigate("/product-category")
      }

  return (
    <section className="py-10 overflow-hidden">
      <div className=" max-w-1600 mx-auto px-4">
          
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 my-5 flex justify-center "> List of  <span className="text-lime-500">  Category </span> </h2>
          <div className="flex justify-end"><button  onClick={() => redirect()} className="mt-4 text-green-600 hover:text-green-500 font-medium flex  justify-end"  >  View All  </button> </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-1600">
          {cropList?.map((item:any, idx:number) => (
            <div key={idx} className="flex flex-col items-center text-center group cursor-pointer" onClick={() => RedictCall(item?.name_eng)}>
              <div className="bg-gray-100 flex items-center justify-center group-hover:shadow-md transition rounded-full p-1"><LazyLoadImage effect="blur"   src={item?.category_pic} alt={item?.name_eng} className=" object-contain rounded-full border-2 border-green-600 h-[10rem] w-[10rem]" />  </div>
              <div className='mt-2 text-md md:text-[1rem] font-heading font-semibold   text-gray-800'>  {item?.name_eng} </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarouselSection;
