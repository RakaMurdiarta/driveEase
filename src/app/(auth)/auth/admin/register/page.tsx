"use client";

import AuthInput from "@/components/ui/form/input";
import loginValidation from "@/lib/validationSchema/loginValidation";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import {
  RegisterAdmin,
  adminServiceController,
} from "@/app/service/adminServiceController";
import { registerFormData } from "@/app/service/authServiceController";
import registerAdminValidation from "@/lib/validationSchema/registerAdminValidation";

const Page = () => {
  const [registerFormData, setRegisterFormData] = useState<RegisterAdmin>({
    username: "",
    password: "",
  });

  const adminService = new adminServiceController();
  const router = useRouter();

  const register = async (data: RegisterAdmin) => {
    /*
      @TODO : call register admin service here from class adminServiceController
    */
    await adminService
      .register(data)
      .then((resp) => {
        toast.success("Register Succesful!");
        setTimeout(() => {
          router.push("/");
        }, 2500);
      })
      .catch((err) => {
        toast.error(err.message ?? "Please try again!");
      });
  };

  return (
    <>
      <Formik
        initialValues={registerFormData}
        onSubmit={(values) => {
          register(values);
        }}
        validationSchema={registerAdminValidation}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <p className="mb-4">Register Admin</p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <AuthInput
                  error={errors.username}
                  name="Email"
                  type="text"
                  touched={touched.username}
                  value={values.username}
                  handleChange={handleChange("username")}
                />
                {touched.username && errors?.username && (
                  <p className="text-red-500 mt-0.5">{errors.username}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <AuthInput
                  error={errors.password}
                  name="Password"
                  type="password"
                  touched={touched.password}
                  value={values.password}
                  handleChange={handleChange("password")}
                />
                {touched.password && errors?.password && (
                  <p className="text-red-500 mt-0.5">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="my-8 text-center">
              <button
                type="submit"
                className="px-8 py-3 rounded border-2 border-neutral-200 text-xs uppercase leading-normal transition duration-150 ease-in-out  bg-slate-600 hover:bg-slate-700 font-bold text-white"
              >
                Register Admin
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Page;
