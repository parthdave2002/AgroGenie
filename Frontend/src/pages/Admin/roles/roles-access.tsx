import type { FC } from "react";
import { useState, useEffect, lazy } from "react";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ResetRolesAccesslist, SaveRolesAccesslist, getRolesAccesslist } from "../../../Store/actions";
const ExampleBreadcrumb = lazy(() => import("../../../components/common/breadcrumb/breadcrumb"));
const NavbarSidebarLayout = lazy(() => import("../../../layouts/navbar-sidebar"));

const RolesAccessPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedPermissions, setSelectedPermissions] = useState<{ [key: string]: { [key: string]: boolean } }>({});

  useEffect(() => {
    let reqUser = { id: id };
    dispatch(getRolesAccesslist(reqUser));
  }, []);

  const { SaveDatalist, GetDatalist } = useSelector((state: any) => ({
    SaveDatalist: state.RoleAccess.SaveRolesAccesslist,
    GetDatalist: state.RoleAccess.GetRolesAccesslist,
  }));

  useEffect(() => {
    if (SaveDatalist?.success == true) {
      dispatch(ResetRolesAccesslist());
      navigate(ParentLink);
    }
  }, [SaveDatalist]);

  useEffect(() => {
    if (Array.isArray(GetDatalist?.data)) {
      const formattedData: { [key: string]: { [key: string]: boolean } } = {};
      GetDatalist?.data.forEach((module: any) => {
        formattedData[module.module_name] = module.permissions;
      });
      setSelectedPermissions(formattedData);
    }
  }, [GetDatalist]);

  const getFormattedData = () => {
    return Object.entries(selectedPermissions || {}).map(([module, permissions]) => ({
      module_name: module,
      permissions,
    }));
  };

  const handleCheckboxChange = (role: string, permission: string) => {
    setSelectedPermissions((prevState: any) => ({
      ...prevState,
      [role]: {
        ...prevState[role],
        [permission]: !prevState[role]?.[permission], // Toggle value
      },
    }));
  };

  // Select all checkboxes for a specific permission type
  const handleSelectAll = (permission: string) => {
    const allChecked = roles.every((role) => selectedPermissions[role]?.[permission]);
    const updatedPermissions = { ...selectedPermissions };

    roles.forEach((role) => {
      if (!updatedPermissions[role]) {
        updatedPermissions[role] = {};
      }
      updatedPermissions[role][permission] = !allChecked; // Toggle select all
    });

    setSelectedPermissions(updatedPermissions);
  };

  const SaveFuncall = async () => {
    const permissionData = await getFormattedData();
    let rqeuserdata = {
      role_id: id,
      modules: permissionData,
    };
    dispatch(SaveRolesAccesslist(rqeuserdata));
  };

  const permissions = ["view", "add", "edit", "delete"];
  const roles = ["Dashboard", "User", "Roles", "Customer", "Product", "Order", "Lead", "Report", "Packing Type", "Company", "Category", "Banner", "Taglog", "Crop", "Warehouse"];

  let Name = "Role Access List";
  let ParentName = "Role List";
  let ParentLink = "/roles/list";

  return (
    <NavbarSidebarLayout  isSidebar={true} isNavbar={true} >
      <ExampleBreadcrumb Name={Name} ParentName={ParentName} ParentLink={ParentLink} />
      <div className="mt-[2rem] bg-White dark:bg-Cosmos p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-none dark:bg-Cosmos rounded-lg shadow-md dark:text-White">
            <thead>
              <tr className="bg-TitaniumWhite dark:bg-Cosmos text-left">
                <th className="p-3 border border-WhiteMarble dark:border-TranquilBlack">Name</th>
                {permissions.map((perm) => (
                  <th key={perm} className="p-3 border border-WhiteMarble dark:border-TranquilBlack text-center">
                    <div className="flex gap-x-3 justify-center items-center">
                      <span>{perm}</span>
                      <input
                        type="checkbox"
                        className="w-5 h-5 border-SoothingBlueGrey focus:ring-0 focus:border-none rounded-md"
                        checked={roles.every((role) => selectedPermissions[role]?.[perm])} // Check if all are selected
                        onChange={() => handleSelectAll(perm)}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {roles.map((role: string, index: number) => (
                <tr key={role} className={index % 2 === 0 ? "bg-White dark:bg-Cosmos" : "bg-White dark:bg-Cosmos"}>
                  <td className="p-3 border border-WhiteMarble dark:border-TranquilBlack">{role}</td>
                  {permissions.map((perm, permIndex) => (
                    <td key={permIndex} className="p-3 border border-WhiteMarble dark:border-TranquilBlack text-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 border-SoothingBlueGrey focus:ring-0 focus:border-none rounded-md"
                        checked={!!selectedPermissions[role]?.[perm]}
                        onChange={() => handleCheckboxChange(role, perm)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-x-3 justify-end mt-[3rem]">
          <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" onClick={() => SaveFuncall()}>
            Save Permission
          </Button>
          <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/roles/list")}>
            Close
          </Button>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default RolesAccessPage;
