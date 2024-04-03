"use client";
import React, { FC, useEffect } from "react";

import {
  Rental,
  Vehicle,
  vehicleServiceController,
} from "@/app/service/vehichleServiceController";
import { formatDateString, formatToRupiahIntl } from "../../utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type prop = {
  data: Rental[];
};

const RentedVehicles: FC<prop> = ({ data }) => {
  const now = new Date().toISOString();
  const router = useRouter();

  const vehicleService = new vehicleServiceController();
  const returnVehicle = async (id: string) => {
    await vehicleService
      .return(id)
      .then((resp) => {
        toast.success("Rented Vehicle Returned!");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message ?? "Please try again!");
      });
  };

  return (
    <div className="w-full flex flex-col gap-6 text-[#909090] py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-bold">
          My Rented <span className="text-black">Vehicle</span>
        </h1>
        <p>Here is some of my latest creations, hope you enjoy it!</p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((vehicle, index) => (
            <div
              key={index}
              className="group block relative overflow-hidden rounded-xl transition-all ease-in-out duration-300 hover:shadow-xl"
            >
              <div className="w-full h-full transition-all ease-in-out duration-300">
                <img
                  src={vehicle.vehicle.imageUrl}
                  alt={vehicle.vehicle.model}
                  className="w-full min-h-[300px] brightness-100 object-cover object-center brightness-100 group-hover:brightness-50 transition-all ease-in-out duration-300"
                />
              </div>
              <div className="bg-white w-full absolute bottom-[-150px] p-4 transition-all ease-in-out duration-300 group-hover:bottom-0 flex justify-between">
                <div className="flex flex-col gap-1 w-1/2">
                  <p className="font-bold text-base min-h-[3rem] overflow-ellipsis">
                    {vehicle.vehicle.model}
                  </p>
                  <p className="text-xs italic">Must return on:</p>
                  <p className="text-sm">
                    {formatDateString(vehicle.returnDate)}
                  </p>
                </div>
                <div className="h-auto flex flex-col w-1/2 gap-1 items-end justify-end">
                  <div>
                    <p className="text-xs italic text-end">Total:</p>
                    <p className="font-bold">
                      {formatToRupiahIntl(vehicle.amountDue)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      returnVehicle(vehicle.id);
                    }}
                    className={`px-2 py-1 rounded-sm border w-full transition-all ease-in-out hover:bg-slate-100 ${
                      vehicle.returnDate < now ? "bg-red-200" : "bg-green-200"
                    }`}
                  >
                    {vehicle.returnDate < now ? "Late Return" : "Return"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Data!</p>
        )}
      </div>
    </div>
  );
};

export default RentedVehicles;
