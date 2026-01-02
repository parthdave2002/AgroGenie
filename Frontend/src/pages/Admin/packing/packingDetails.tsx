
import { FC,  lazy, useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPackingTypelist } from "../../../Store/actions";
import { useParams } from "react-router";
import NavbarSidebarLayout from "../../../layouts/navbar-sidebar";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));

const PackingDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [PackingTypeList, setPackingTypeList] = useState([]);

  useEffect(() =>{
    if(id){
        // setLoading(true)
        dispatch(getPackingTypelist({ id : id}))   
    }
  },[id]);
  
  const { Packingtypelist } = useSelector((state: any) => ({
    Packingtypelist: state.PackingType.Packingtypelist,
  }));

  useEffect(() => {  
    setPackingTypeList(Packingtypelist ? Packingtypelist : null);
  }, [Packingtypelist]);

  let Name = "PackingType Details";
  let ParentName = "PackingType List";
  let ParentLink = "/packing-type/list";

  return (
    <>
      <NavbarSidebarLayout   isSidebar={true} isNavbar={true} >
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div  className="mt-[2rem] bg-white dark:bg-gray-800 p-4"> 
          {PackingTypeList && PackingTypeList.map((item:any, k:number) =>(
              <div  key={k}> {item.type}</div>
          ))}  
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default PackingDetailsPage;