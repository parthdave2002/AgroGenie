
import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCategorylist } from "../../Store/actions";
import { useEffect, useState, } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router";
import moment from "moment";

const CategoryDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() =>{
    if(id){
        // setLoading(true)
        dispatch(getCategorylist({ id : id}))   
    }
  },[id]);
  
  const { Categorylist } = useSelector((state: any) => ({
    Categorylist: state.PackingType.Categorylist,
  }));

  useEffect(() => {  
    setCategoryList(Categorylist ? Categorylist : null);
  }, [Categorylist]);

  let Name = "Cateogry Details";
  let ParentName = "Cateogry List";
  let ParentLink = "/category/list";

  const SingleUserDataList = [
    {
      "is_active": true,
      "_id": "67ab2c70371d4b1e04ef3514",
      "name": "seed",
      "created_at": "1997-01-12",
      "created_by": "Demo Sales executive",
    }
  ] 

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div  className="mt-[2rem] bg-white dark:bg-gray-800 p-4"> 
          <div>
            {SingleUserDataList && SingleUserDataList.map((data: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Name</h3>
                  <p className="text-gray-900 dark:text-white">{data?.name || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created Date</h3>
                  <p className="text-gray-900 dark:text-white">
                    {data?.created_at ? moment(data.created_at).format("DD-MM-YYYY HH:mm:ss") : "N/A"}
                  </p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Status</h3>
                  <p className="text-white text-sm font-bold py-1 px-3 rounded-lg">
                    {data?.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default CategoryDetailsPage;