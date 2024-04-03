export const dynamic = "force-dynamic";
import React from "react";
import { newVehicleServices } from "../backend/services/impl/vehicle_services_impl";
import VehicleList from "./vehicleList";
import { Vehicle } from "../service/vehichleServiceController";

const Page = async () => {
  let allVehicle: Vehicle[] | [];
  
  const getAllVehicle = async () => {
    const vehicle = newVehicleServices.getListvehicles();
    return vehicle;
  };

  allVehicle = (await getAllVehicle()) as Vehicle[];

  return <VehicleList data={allVehicle} />;
};

export default Page;
