import React, { useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategorylist } from '../../../Store/actions';

const CategoryCarouselSection: React.FC = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const ref = useRef<HTMLDivElement | null>(null);
      const [hasFetched, setHasFetched] = useState(false);

 const [cropList, setCropList] = useState([])

  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
         if (!entry) return;

       if (entry.isIntersecting && !hasFetched) {
        let requser = {
                  page: 1,
                  size : 10
        }
         dispatch(getCategorylist(requser))
         setHasFetched(true);
       }
     },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [dispatch])

  const cropdetail: any = useSelector((state: any) => state.Category.Categorylist);
    
  useEffect(() => {
        setCropList(cropdetail)
    }, [cropdetail])

  const RedirectCall = (data: string, id: string ) => {
    if (data != null) {
      navigate(`/product/${data}/${id}`);
    }
  }

      const redirect  = () =>{
        navigate("/product-category")
      }

  return (
    <section className="py-10 overflow-hidden" ref={ref}>
      <div className=" max-w-1600 mx-auto px-4">
          
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-DarkBackground my-5 flex justify-center "> List of  <span className="text-lime-500">  Category </span> </h2>
          <div className="flex justify-end"><button  onClick={() => redirect()} className="mt-4 text-green-600 hover:text-green-500 font-medium flex  justify-end"  >  View All  </button> </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-6 max-w-1600">
          {cropList?.map((item:any, idx:number) => (
            <div key={idx} className="flex flex-col items-center text-center group cursor-pointer" onClick={() => RedirectCall(item?.name_eng, item?._id)}>
              <div className="bg-TitaniumWhite flex items-center justify-center group-hover:shadow-md transition rounded-full p-1"><LazyLoadImage effect="blur"   src={item?.category_pic} alt={item?.name_eng} className=" object-contain rounded-full border-2 border-green-600 h-[10rem] w-[10rem]" />  </div>
              <div className='mt-2 text-md md:text-[1rem] font-heading font-semibold   text-Cosmos'>  {item?.name_eng} </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarouselSection;
