
import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { GetProductViewlist } from "../../Store/actions";
import { useEffect, useState, } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router";
import moment from "moment";
import LoaderPage from "../../components/loader";
const IMG_URL = import.meta.env["VITE_API_URL"];

interface DescriptionData{
  id:number;
  englishHeader :string;
  englishValue :string;
  gujaratiHeader :string;
  gujaratiValue :string;
}

interface TechName{
  gujarati_tech_name: string;
  english_tech_name : string;
}
interface CompanyData{  
  name_eng : string; 
  name_guj :string;
}

interface Category{ 
  name_eng: string; 
  name_guj :string;
}

interface PackingType { 
   type_eng: string 
   type_guj : string;
}

interface Name{
  gujaratiname: string;
  englishname : string;
}

interface ProductDetails{
  added_at: string;
avl_qty: number;
batch_no: string;
c_gst: number;
company: CompanyData;
categories : Category;
description: DescriptionData[];
discount: number;
hsn_code: string;
is_active: boolean;
is_deleted: boolean;
name: Name;
packaging: number;
packagingtype: PackingType;
price: number;
product_pics: [];
rating: any;
s_gst: number;
tech_name: TechName;
_id: string;
}

const ProductDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ProductDatalist, setProductDatalist] = useState<ProductDetails>();
  const [loader, setLoader] = useState(false);

  useEffect(() =>{
    if(id){
        dispatch(GetProductViewlist({ id : id}))   
        setLoader(true);
    }
  },[id]);
  
  const { singleProductlist } = useSelector((state: any) => ({
    singleProductlist: state.Product.singleProductlist,
  }));

  useEffect(() => {
    if(singleProductlist){
      setProductDatalist(singleProductlist ? singleProductlist?.data : null);
      setLoader(false);
    }

  }, [singleProductlist]);

  let Name = "Product Details";
  let ParentName = "Product List";
  let ParentLink = "/product/list";

  return (
    <>

      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
            {loader ? <LoaderPage /> :
          <>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
       
          <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                      <div>
                        <div className="flex gap-x-5">
                              {ProductDatalist && ProductDatalist?.product_pics.map((item:any) =>(
                                <img  className="w-28 h-28 rounded-full"  src={  `${IMG_URL}/public/product/${item}`}  alt="product photo"   />
                              ))}
                          </div>
                        <div className="grid grid-cols-3 gap-3 mt-[3rem]">

                        <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Name </h3>
                            <p className="text-gray-900 dark:text-gray-400">
                              <div className="flex flex-col"></div>
                                <div>{ProductDatalist?.name?.englishname || "N/A"}  </div>
                                <div>({ProductDatalist?.name?.gujaratiname || "N/A"})  </div>
                              </p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Technical Name ( Eng )</h3>
                            <p className="text-gray-900 dark:text-gray-400">{ProductDatalist?.tech_name?.english_tech_name || "N/A"}</p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Technical Name ( Guj )</h3>
                            <p className="text-gray-900 dark:text-gray-400">{ProductDatalist?.tech_name?.gujarati_tech_name || "N/A"}</p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Price</h3>
                            <p className="text-gray-900 dark:text-gray-400">{ProductDatalist?.price || "N/A"} Rs.</p>
                          </div>

                          

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Packing</h3>
                            <p className="text-gray-900 dark:text-gray-400"> { ProductDatalist?.packaging }{ProductDatalist?.packagingtype?.type_eng || "N/A"}  ( {ProductDatalist?.packagingtype?.type_guj || "N/A"} )</p>
                          </div>
          
                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Available Qty</h3>
                            <p className="text-gray-900 dark:text-gray-400"> {ProductDatalist?.avl_qty || "N/A"}</p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">CGST</h3>
                            <p className="text-gray-900 dark:text-gray-400">{ProductDatalist?.c_gst || 0}%.</p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">SGST</h3>
                            <p className="text-gray-900 dark:text-gray-400">{ProductDatalist?.s_gst ||  0}%.</p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Discount (Rs.)</h3>
                            <p className="text-gray-900 dark:text-gray-400"> {ProductDatalist?.discount ||  0}</p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold"> Category</h3>
                            <p className="text-gray-900 dark:text-gray-400">{ProductDatalist?.categories?.name_eng || "N/A"} </p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold"> Company</h3>
                            <p className="text-gray-900 dark:text-gray-400">{ProductDatalist?.company?.name_eng  || "N/A"} </p>
                          </div>

                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Batch No.</h3>
                            <p className="text-gray-900 dark:text-gray-400"> {ProductDatalist?.batch_no.replace(/"/g, '') || "N/A"}</p>
                          </div>
          
                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold"> HSN Code</h3>
                            <p className="text-gray-900 dark:text-gray-400">{ProductDatalist?.hsn_code.replace(/"/g, '') || "N/A"} </p>
                          </div>
          
                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-50 font-semibold">Created Date</h3>
                            <p className="text-gray-900 dark:text-gray-400">
                              {ProductDatalist?.added_at ? moment(ProductDatalist.added_at).format("DD-MM-YYYY hh:mm:ss") : "N/A"}
                            </p>
                          </div>
          
                          <div className="p-4 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Status</h3>
                            <p className="text-gray-900 dark:text-gray-400">   {ProductDatalist?.is_active == true ? "Active" : "Inactive"} </p>
                          </div>
                        </div>


                        {ProductDatalist?.description.map((item:any, k:number) =>(
                            <div className="my-4">
                                <h2 className="dark:text-gray-200">Product Description : {item.id}</h2>
                                <div key={k} className="dark:text-gray-300  border dark:border-gray-500 rounded-xl">
                                  
                                    <div className="p-2 flex">
                                      <div className="flex-1"> English Header : { item?.englishHeader} </div>
                                      <div className="flex-1"> Gujarati Header : { item?.gujaratiHeader} </div>
                                    </div>
                                    <div className="p-2 flex">
                                      <div className="flex-1"> English Value : { item?.englishValue} </div>
                                      <div className="flex-1"> Gujarati Value : { item?.gujaratiValue} </div>
                                    </div>
                                </div>
                            </div>
                        ))}   
                      </div>
          </div>
</>
}
      </NavbarSidebarLayout>
      

    </>
  );
};

export default ProductDetailsPage;