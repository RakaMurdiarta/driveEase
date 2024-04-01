export const dynamic = "force-dynamic";

import React from "react";
import AdminTable from "./adminTable";
import { CustomerListData } from "@/app/service/adminServiceController";
import { adminservice } from "@/app/backend/services/impl/admin_service_impl";

const Page = async () => {
  
  let requestList: CustomerListData[] | [];
  const getRequestList = async () => {
    const data = adminservice.getListRequestOwner();
    return data;
  };

  requestList = await getRequestList();

  return <AdminTable data={requestList} />;
};

export default Page;
