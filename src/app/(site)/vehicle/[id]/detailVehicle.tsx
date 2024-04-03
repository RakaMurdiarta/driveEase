"use client";
import { formatToRupiahIntl } from "@/app/(site)/utils";
import { Form, Formik } from "formik";
import {
  Rent,
  vehicleServiceController,
} from "@/app/service/vehichleServiceController";
import React, { FC, Fragment, useEffect, useState } from "react";
import rentValidation from "@/lib/validationSchema/rentValidation";
import { toast } from "react-toastify";
import { Vehicle } from "@prisma/client";
import useDatePicker from "@/hooks/useDatepicker";
import Datepicker, {
  DateRangeType,
  DateValueType,
} from "react-tailwindcss-datepicker";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

type prop = {
  vehicle: Vehicle | null;
};

const DetailVehicles: FC<prop> = ({ vehicle }) => {
  const { toggle, isOpen, todayDateString, tomorrowDateString } =
    useDatePicker();
  const router = useRouter();
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: todayDateString,
    endDate: tomorrowDateString,
  });

  const handleChangeDate = (e: DateValueType) => {
    const endDate = e?.endDate;
    const startDate = e?.startDate;

    console.log("test");

    if (endDate === startDate) {
      toggle();
    } else {
      setDateValue(e);
    }
  };

  const vehicleService = new vehicleServiceController();
  const rent = async (values: DateRangeType) => {
    const data: Rent = {
      from: values.startDate as string,
      until: values.endDate as string,
      total: vehicle !== null ? vehicle.price : 0,
      vehicle_id: vehicle !== null ? vehicle.id : "",
    };
    console.log(data);
    await vehicleService
      .rent(data)
      .then((resp) => {
        toast.success("Vehicle Rented!");
        router.push("/my/rented");
      })
      .catch((err) => {
        toast.error(err.message ?? "Please try again!");
      });
  };

  return (
    <>
      {vehicle !== null ? (
        <div className="w-full flex flex-col gap-6 text-[#909090] py-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-bold">{vehicle.model}</h1>
            <p>owner: {vehicle.ownerId}</p>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-7/12 h-[320px] rounded-md overflow-hidden mx-auto">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.model}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="w-7/12 flex flex-col gap-2">
              <div>
                <p className="text-2xl text-black font-bold">{vehicle.model}</p>
                <p className="italic text-xl">
                  {vehicle.type} - {vehicle.year}
                </p>
              </div>
              <div>
                <p className="italic text-md">Price</p>
                <p className="text-2xl font-bold text-black">
                  {formatToRupiahIntl(vehicle.price)}
                  <span className="font-normal">/day</span>
                </p>
              </div>
              <Formik
                initialValues={dateValue as DateRangeType}
                onSubmit={(values) => {
                  rent(values);
                  console.log(values);
                }}
                validationSchema={rentValidation}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form>
                    <p className="">Please input your rental duration!</p>
                    <p className="italic mb-4 text-sm">example: 2024-02-14</p>
                    <div>
                      <Datepicker
                        popoverDirection="down"
                        minDate={new Date()}
                        displayFormat={"MMMM DD YYYY"}
                        placeholder={"Select rent date"}
                        value={dateValue}
                        separator="-"
                        onChange={(e) => {
                          handleChangeDate(e);
                          setFieldValue("endDate", e?.endDate);
                          setFieldValue("startDate", e?.startDate);
                        }}
                        inputClassName="w-full rounded-md border border-white text-text-primary font-normal bg-bg-secondary p-2"
                      />
                    </div>
                    {touched.startDate && errors.startDate && (
                      <p className="text-red-500 mt-0.5">{errors.startDate}</p>
                    )}

                    <div className="mt-2 text-center ">
                      <button
                        type="submit"
                        className="w-full h-full px-8 py-4 rounded border-2 border-neutral-200 text-xs uppercase leading-normal transition duration-150 ease-in-out  bg-slate-600 hover:bg-slate-700 font-bold text-white"
                      >
                        Rent!
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={toggle}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/50" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto  z-[101]">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <div className="max-w-[400px]">
                        <div className="p-2 flex flex-col justify-center items-center gap-4">
                          <div className="flex flex-col gap-2 justify-center items-center">
                            <ExclamationTriangleIcon className="w-24 h-24 text-yellow-500" />
                            <p className="text-xl text-yellow-500 font-bold">
                              Ooops!
                            </p>
                          </div>
                          <p className="text-center">
                            Please choose a different start and end date to
                            proceed.
                          </p>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      ) : (
        <div>No Vehicle Data!</div>
      )}
    </>
  );
};

export default DetailVehicles;
