import { FC, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import moment from "moment";
import LoaderPage from "../../../components/common/loader/loader";
import { ProductDetails } from "../../../types/types";
import { GetProductViewlist } from "../../../Store/actions";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

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
  
  const singleProductlist = useSelector((state: any) => state.Product.singleProductlist);

  useEffect(() => {
    if(singleProductlist){
      setProductDatalist(singleProductlist ? singleProductlist?.data : null);
      setLoader(false);
    }
  }, [singleProductlist]);

  const details = [
    {
      label: "Name",
      value: (
        <>
          <div>{ProductDatalist?.name?.englishname || "N/A"}</div>
          <div>({ProductDatalist?.name?.gujaratiname || "N/A"})</div>
        </>
      ),
    },
    {
      label: "Technical Name (Eng)",
      value: ProductDatalist?.tech_name?.english_tech_name,
    },
    {
      label: "Technical Name (Guj)",
      value: ProductDatalist?.tech_name?.gujarati_tech_name,
    },
    { label: "Price", value: ProductDatalist?.price ? `${ProductDatalist.price} Rs.` : "N/A" },
    {
      label: "Packing",
      value: `${ProductDatalist?.packaging || ""} ${
        ProductDatalist?.packagingtype?.type_eng || "N/A"
      } (${ProductDatalist?.packagingtype?.type_guj || "N/A"})`,
    },
    { label: "Available Qty", value: ProductDatalist?.avl_qty },
    { label: "CGST", value: `${ProductDatalist?.c_gst || 0}%` },
    { label: "SGST", value: `${ProductDatalist?.s_gst || 0}%` },
    { label: "Discount (Rs.)", value: ProductDatalist?.discount || 0 },
    { label: "Category", value: ProductDatalist?.categories?.name_eng },
    { label: "Company", value: ProductDatalist?.company?.name_eng },
    { label: "Batch No.", value: ProductDatalist?.batch_no?.replace(/"/g, "") },
    { label: "HSN Code", value: ProductDatalist?.hsn_code?.replace(/"/g, "") },
    {
      label: "Created Date",
      value: ProductDatalist?.added_at
        ? moment(ProductDatalist.added_at).format("DD-MM-YYYY HH:mm:ss")
        : "N/A",
    },
    { label: "Status", value: ProductDatalist?.is_active ? "Active" : "Inactive" },
  ];

  let Name = "Product Details";
  let ParentName = "Product List";
  let ParentLink = "/product/list";

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        {loader ? (
          <LoaderPage />
        ) : (
          <>
            <ExampleBreadcrumb
              Name={Name}
              ParentName={ParentName}
              ParentLink={ParentLink}
            />

            <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
              <div>
                <div className="flex gap-x-5">
                  {ProductDatalist &&
                    ProductDatalist?.product_pics.map(
                      (item: any, k: number) => (
                        <img
                          key={k}
                          className="w-28 h-28 rounded-full"
                          src={item}
                          alt="product photo"
                        />
                      ),
                    )}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-[3rem]">
                  {details.map((item, index) => (
                    <div key={index} className="detailswrapper">
                      <h3 className="detailslebel">{item.label}</h3>
                      <p className="detailsvalue">{item.value || "N/A"}</p>
                    </div>
                  ))}
                </div>

                {ProductDatalist?.description.map((item: any, k: number) => (
                  <div className="my-4" key={k}>
                    <h2 className="dark:text-gray-200">
                      Product Description : {item.id}
                    </h2>
                    <div
                      key={k}
                      className="dark:text-gray-300  border dark:border-gray-500 rounded-xl"
                    >
                      <div className="p-2 flex">
                        <div className="flex-1">
                          {" "}
                          English Header : {item?.englishHeader}{" "}
                        </div>
                        <div className="flex-1">
                          {" "}
                          Gujarati Header : {item?.gujaratiHeader}{" "}
                        </div>
                      </div>
                      <div className="p-2 flex">
                        <div className="flex-1">
                          {" "}
                          English Value : {item?.englishValue}{" "}
                        </div>
                        <div className="flex-1">
                          {" "}
                          Gujarati Value : {item?.gujaratiValue}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </NavbarSidebarLayout>
    </>
  );
};

export default ProductDetailsPage;