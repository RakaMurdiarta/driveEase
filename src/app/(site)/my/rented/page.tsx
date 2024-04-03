// "use client";
import { Rental } from "@/app/service/vehichleServiceController";
import React from "react";
import RentedVehicles from "./rentedVehicles";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import UserController from "@/utils/controllers/userController";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import { Rents } from "@prisma/client";
import { newVehicleServices } from "@/app/backend/services/impl/vehicle_services_impl";
import { NextRequest, NextResponse } from "next/server";

const Page = async () => {
  const cookie = cookies().get("jwt") as RequestCookie;
  const token = cookie.value as string;
  const user = new UserController(token);
  const userId = user.userId;

  let rentedVehicles: Rental[];

  rentedVehicles = (await customerService.getListRentByCustomerId(
    userId
  )) as Rental[];

  return <RentedVehicles data={rentedVehicles} />;
};

export default Page;
