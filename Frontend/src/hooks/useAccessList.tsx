import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Permission {
  add: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
}

 const UseAccessList = (permissionsData: any[], moduleName: string) => {
  const [accessList, setAccessList] = useState<Permission>({
    add: false,
    view: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    const userType = Cookies.get("userType");

    if (userType === "admin") {
      setAccessList({ add: true, view: true, edit: true, delete: true });
    } else {
      const modulePermissions = permissionsData?.find(
        (item: any) => item.module_name === moduleName
      )?.permissions;

      setAccessList(modulePermissions || { add: false, view: false, edit: false, delete: false });
    }
  }, [permissionsData, moduleName]);

  return accessList;
};

export default UseAccessList
