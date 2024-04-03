"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { FC, useState, Fragment } from "react";
import {
  AddVehicle,
  vehicleServiceController,
} from "@/app/service/vehichleServiceController";
import { formatDateString, formatToRupiahIntl } from "../../utils";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import AuthInput from "@/components/ui/form/input";
import addVehicleValidation from "@/lib/validationSchema/addVehicleValidation";
import { Vehicle } from "@prisma/client";

type prop = {
  data: Vehicle[];
};

const MyVehicles: FC<prop> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addVehicleFormData, setaddVehicleFormData] = useState<AddVehicle>({
    model: "",
    year: undefined,
    identityNumber: "",
    price: undefined,
    type: "",
    imageUrl: "",
  });
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const vehicleService = new vehicleServiceController();
  const addVehicle = async (data: AddVehicle) => {
    /*
      @TODO : call addVehicle service here from class vehicleServiceController
    */

    await vehicleService
      .add(data)
      .then((resp) => {
        toast.success("Vehicle added!");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.message ?? "Please try again!");
      });
  };

  return (
    <>
      <div className="w-full flex flex-col gap-6 text-[#909090] py-10 relative">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            My <span className="text-black">Vehicle</span>
          </h1>
          <p>Here is some of my latest creations, hope you enjoy it!</p>
        </div>
        <button
          onClick={toggleModal}
          className=" w-max px-3 py-2 rounded-sm border bg-slate-600 text-white font-semibold"
        >
          + Add Vehicle
        </button>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
          {data.length > 0 ? (
            data.map((vehicle, index) => (
              <div
                key={index}
                className="group block relative overflow-hidden rounded-xl transition-all ease-in-out duration-300 hover:shadow-xl"
              >
                <div className="w-full h-full transition-all ease-in-out duration-300">
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.model}
                    className="w-full min-h-[300px] brightness-100 object-cover object-center brightness-100 group-hover:brightness-50 transition-all ease-in-out duration-300"
                  />
                </div>
                <div className="bg-white w-full absolute bottom-[-150px] p-4 transition-all ease-in-out duration-300 group-hover:bottom-0 flex justify-between">
                  <div className="flex flex-col gap-1 w-1/2">
                    <p className="font-bold text-base min-h-[3rem] overflow-ellipsis">
                      {vehicle.model}
                    </p>
                    <p className="text-xs italic">Plate Number</p>
                    <p className="text-sm">{vehicle.identityNumber}</p>
                  </div>
                  <div className="h-auto flex flex-col w-1/2 gap-1 items-end justify-end">
                    <div>
                      <p className="text-xs italic text-end">Price</p>
                      <p className="font-bold">
                        {formatToRupiahIntl(vehicle.price)}
                        <span className="font-normal">/day</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Data!</p>
          )}
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={toggleModal}>
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
                  <Formik
                    initialValues={addVehicleFormData}
                    onSubmit={(values) => {
                      addVehicle(values);
                    }}
                    validationSchema={addVehicleValidation}
                  >
                    {({ errors, touched, values, handleChange }) => (
                      <Form>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1">
                            <AuthInput
                              error={errors.model}
                              name="Model"
                              type="text"
                              touched={touched.model}
                              value={values.model}
                              handleChange={handleChange("model")}
                            />
                            {touched.model && errors?.model && (
                              <p className="text-red-500 mt-0.5">
                                {errors.model}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <AuthInput
                              error={errors.identityNumber}
                              name="identityNumber"
                              type="text"
                              touched={touched.identityNumber}
                              value={values.identityNumber}
                              handleChange={handleChange("identityNumber")}
                            />
                            {touched.identityNumber &&
                              errors?.identityNumber && (
                                <p className="text-red-500 mt-0.5">
                                  {errors.identityNumber}
                                </p>
                              )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <AuthInput
                              error={errors.year}
                              name="year"
                              type="number"
                              touched={touched.year}
                              value={values.year}
                              handleChange={handleChange("year")}
                            />
                            {touched.year && errors?.year && (
                              <p className="text-red-500 mt-0.5">
                                {errors.year}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <AuthInput
                              error={errors.type}
                              name="type"
                              type="text"
                              touched={touched.type}
                              value={values.type}
                              handleChange={handleChange("type")}
                            />
                            {touched.type && errors?.type && (
                              <p className="text-red-500 mt-0.5">
                                {errors.type}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <AuthInput
                              error={errors.price}
                              name="price"
                              type="number"
                              touched={touched.price}
                              value={values.price}
                              handleChange={handleChange("price")}
                            />
                            {touched.price && errors?.price && (
                              <p className="text-red-500 mt-0.5">
                                {errors.price}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <AuthInput
                              error={errors.imageUrl}
                              name="imageUrl"
                              type="text"
                              touched={touched.imageUrl}
                              value={values.imageUrl}
                              handleChange={handleChange("imageUrl")}
                            />
                            {touched.imageUrl && errors?.imageUrl && (
                              <p className="text-red-500 mt-0.5">
                                {errors.imageUrl}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 text-center">
                          <button
                            type="submit"
                            className="w-full px-8 py-1 rounded border-2 border-neutral-200 text-xs uppercase leading-normal transition duration-150 ease-in-out  bg-slate-600 hover:bg-slate-700 font-bold text-white"
                          >
                            Add!
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MyVehicles;
