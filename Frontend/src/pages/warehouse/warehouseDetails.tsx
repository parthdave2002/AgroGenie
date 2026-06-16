
import { lazy,FC, useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWarehouselist } from "../../Store/actions";
import { useParams } from "react-router";
import moment from "moment";
const ExampleBreadcrumb = lazy(() => import("../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../layouts/navbar-sidebar"));

const WarehouseDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [WarehouselistData, setWarehouselistData] = useState<any | null>(null);

  useEffect(() =>{
    if(id){
      dispatch(getWarehouselist({ id : id}))   
    }
  },[id]);
  
  const Warehouselist = useSelector((state: any) => state.Warehouse.Warehouselist);
  useEffect(() => {  
    setWarehouselistData(Warehouselist ? Warehouselist : null);
  }, [Warehouselist]);

  let Name = "Warehouse Details";
  let ParentName = "Warehouse List";
  let ParentLink = "/warehouse/list";

  console.log(WarehouselistData);

  return (
    <>
      <NavbarSidebarLayout isSidebar={true} isNavbar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div  className="mt-[2rem] bg-White dark:bg-Cosmos p-4"> 
          <div className="overflow-x-auto"> 
            <div>
              <h2 className="text-xl font-bold mb-4">Warehouse Details</h2>
              {WarehouselistData && (
                <div>
                  <p><strong>Name:</strong> {WarehouselistData.name}</p>
                  <p><strong>Location:</strong> {WarehouselistData.location}</p>
                  <p><strong>Address:</strong> {WarehouselistData.address}</p>
                  <p><strong>Status:</strong> {WarehouselistData.is_active ? "Active" : "Inactive"}</p>
                  <p><strong>Created At:</strong> {moment(WarehouselistData.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
                  <p><strong>Updated At:</strong> {moment(WarehouselistData.updated_at).format("YYYY-MM-DD HH:mm:ss")}</p>
                </div>
              )}
            </div>
          </div> 
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default WarehouseDetailsPage;