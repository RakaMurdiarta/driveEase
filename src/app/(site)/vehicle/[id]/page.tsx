import React from "react";
import DetailVehicles from "./detailVehicle";
import { newVehicleServices } from "@/app/backend/services/impl/vehicle_services_impl";
import { Vehicle } from "@prisma/client";

const Page = async ({ params }: { params: { id: string } }) => {
  let vehicleData: Vehicle | null;

  const getDetailVehicle = async (id: string) => {
    const vehicle = newVehicleServices.getVehicleById(id);
    return vehicle;
  };

  vehicleData = (await getDetailVehicle(params.id)) as Vehicle;
  console.log(vehicleData);

  return <DetailVehicles vehicle={vehicleData} />;
};

export default Page;
