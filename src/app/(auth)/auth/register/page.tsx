"use client";
import {
  AuthServiceController,
  loginResponse,
  registerFormData,
} from "@/app/service/authServiceController";
import { BaseApiResponse } from "@/app/service/interface";
import AuthInput from "@/components/ui/form/input";
import registerCompanyValidation from "@/lib/validationSchema/registerCompanyValidation";
import registerValidation from "@/lib/validationSchema/registerValidation";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const radioValue = [{ value: "individu" }, { value: "company" }];
  const [isCompany, setIsCompany] = useState(false);

  const [registerFormData, setRegisterFormData] = useState<registerFormData>({
    email: "",
    password: "",
    fullname: "",
    cname: "",
    phone: "",
    customer_type: "individu",
  });

  const authService = new AuthServiceController();
  const router = useRouter();

  const register = async (data: registerFormData) => {
    /*
      @TODO : call register service here from class AuthServiceController
    */

    await authService
      .register(data)
      .then((resp) => {
        toast.success("Successfully register proceed to log in!");
        setTimeout(() => {
          router.push("/auth/login");
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
        validationSchema={
          isCompany ? registerCompanyValidation : registerValidation
        }
      >
        {({ errors, touched, values, handleChange, setTouched, setValues }) => (
          <Form>
            <p className="mb-4 font-semibold text-xl">Register a new account</p>
            <div className="flex flex-col gap-4">
              <div id="customerType" className="flex gap-2">
                {radioValue.map((item, index) => (
                  <label
                    onClick={() => {
                      if (item.value !== values.customer_type) {
                        setTouched({
                          email: false,
                          password: false,
                          fullname: false,
                          cname: false,
                          phone: false,
                        });
                        setValues({
                          email: "",
                          password: "",
                          fullname: "",
                          cname: "",
                          phone: "",
                          customer_type: item.value,
                        });
                      }
                      if (item.value === "company") {
                        setIsCompany(true);
                      } else {
                        setIsCompany(false);
                      }
                    }}
                    key={index}
                    className={`w-6/12 py-4 rounded flex justify-center items-center uppercase text-center transition-all ease-in-out border-2 border-neutral-200  ${
                      values.customer_type === item.value
                        ? "bg-slate-600 text-white font-semibold"
                        : "bg-transparent hover:bg-slate-200"
                    } `}
                  >
                    <Field
                      type="radio"
                      name="customer_type"
                      value={item.value}
                      className="hidden"
                    />
                    {item.value}
                  </label>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <AuthInput
                  error={errors.email}
                  name="Email"
                  type="email"
                  touched={touched.email}
                  value={values.email}
                  handleChange={handleChange("email")}
                />
                {touched.email && errors?.email && (
                  <p className="text-red-500 mt-0.5">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <AuthInput
                  error={errors.password}
                  name="Password"
                  type="password"
                  touched={touched.email}
                  value={values.password}
                  handleChange={handleChange("password")}
                />
                {touched.password && errors?.password && (
                  <p className="text-red-500 mt-0.5">{errors.password}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <AuthInput
                  error={errors.fullname}
                  name="Fullname"
                  type="text"
                  touched={touched.fullname}
                  value={values.fullname}
                  handleChange={handleChange("fullname")}
                />
                {touched.fullname && errors?.fullname && (
                  <p className="text-red-500 mt-0.5">{errors.fullname}</p>
                )}
              </div>
              {isCompany && (
                <div className="flex flex-col gap-1">
                  <AuthInput
                    error={errors.cname}
                    name="CompanyName"
                    type="text"
                    touched={touched.cname}
                    value={values.cname}
                    handleChange={handleChange("cname")}
                  />
                  {touched.cname && errors?.cname && (
                    <p className="text-red-500 mt-0.5">{errors.cname}</p>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <AuthInput
                  error={errors.phone}
                  name="Phone"
                  type="text"
                  touched={touched.phone}
                  value={values.phone}
                  handleChange={handleChange("phone")}
                />
                {touched.phone && errors?.phone && (
                  <p className="text-red-500 mt-0.5">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="my-6 text-center">
              <button
                type="submit"
                className="px-8 py-3 rounded border-2 border-neutral-200 text-xs uppercase leading-normal transition duration-150 ease-in-out  bg-slate-600 hover:bg-slate-700 font-bold text-white"
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex items-center justify-between">
        <p className="mb-0 mr-2">Already have an account?</p>
        <a
          href="/auth/login"
          className="px-8 py-3 rounded border-2 border-neutral-200 text-xs uppercase leading-normal transition duration-150 ease-in-out  bg-transparent hover:bg-slate-100 font-bold text-black"
        >
          Login
        </a>
      </div>
    </>
  );
};

export default Page;
