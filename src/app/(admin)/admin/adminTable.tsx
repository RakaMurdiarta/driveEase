"use client";
import {
  CustomerList,
  adminServiceController,
} from "@/app/service/adminServiceController";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import React, { FC, useState, Fragment } from "react";
import { toast } from "react-toastify";

const AdminTable: FC<CustomerList> = ({ data }) => {
  const [selectedId, setSelectedID] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (id: string) => {
    setIsOpen(true);
    console.log(id);
    setSelectedID(id);
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const adminService = new adminServiceController();
  const approveOwner = async () => {
    await adminService
      .approveOwner(selectedId)
      .then((resp) => {
        window.location.reload();
        toast.success("Approved!");
      })
      .catch((err : any) => {
        toast.error(err.message ?? "Please try again!");
      });
  };
  return (
    <>
      <div className="w-full flex flex-col gap-6 text-[#909090] py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            Admin <span className="text-black">Dashboard</span>
          </h1>
          <p>Welcome back, Admin!</p>
        </div>
        {data.length > 0 ? (
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-1">#</th>
                <th className="py-3 px-5">ID</th>
                <th className="py-3 px-5 text-center">Status</th>
                <th className="py-3 px-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="border-b border-gray-200" key={item.id}>
                  <td className="py-2 px-1">{index + 1}</td>
                  <td className="py-2 px-5">{item.customerId}</td>
                  <td className="py-2 px-5 text-center">
                    <div
                      className={`p-2 rounded-md ${
                        item.status === "accepted"
                          ? "bg-green-500 text-white font-medium"
                          : "bg-yellow-500 text-white font-medium"
                      }`}
                    >
                      {item.status}
                    </div>
                  </td>
                  <td className="py-2 px-5 text-center">
                    {/* Example action buttons with Tailwind CSS */}
                    <button className="">
                      {item.status === "accepted" ? (
                        <CheckCircleIcon className=" text-green-500 w-10 h-10" />
                      ) : (
                        <ExclamationCircleIcon
                          className=" text-yellow-500 w-10 h-10"
                          onClick={() => {
                            openModal(item.customerId);
                          }}
                        />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Data</p>
        )}
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
                  <div className="flex flex-col gap-1 text-center font- mb-4">
                    <p>Are you sure want to approve</p>
                    <p className="font-bold">{selectedId}</p>
                    <p>as an owner?</p>
                  </div>
                  <div className=" flex gap-2">
                    <button
                      onClick={approveOwner}
                      className="w-6/12 p-2 rounded-sm bg-slate-500 font-medium text-white border"
                    >
                      Approve
                    </button>
                    <button
                      onClick={toggleModal}
                      className="w-6/12 p-2  rounded-sm font-medium border"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AdminTable;
