import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, BaseApiResponse } from "./interface";

export type loginFormData = {
  email: string;
  password: string;
};
export type registerFormData = {
  customer_type: string;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  cname: string;
};

export type loginResponse = {
  token: string;
  isAdmin: string;
};

export class AuthServiceController {
  public async login(data: loginFormData): Promise<ApiResponse<loginResponse>> {
    /*
      @TODO : define api route for login into variable endpoint
      @type : string
    */

      const endpoint = "/api/v1/auth/login";
      try {
      const response = await axios.post(endpoint, data);
      return response;
    } catch (err) {
      const error: AxiosError<BaseApiResponse<any>> = err as any;

      throw error.response?.data;
    }
  }

  public async register(data: registerFormData): Promise<any> {
    /*
      @TODO : define api route for register into variable endpoint
      @type : string
    */
    const endpoint = "/api/v1/auth/register";
    const requestData = {
      customer_type: data.customer_type,
      email: data.email,
      fullname: data.fullname,
      password: data.password,
      phone: data.phone,
    };

    const newRequestData = { ...requestData, cname: data.cname };

    try {
      const response = await axios.post(
        endpoint,
        data.cname !== "" ? newRequestData : requestData
      );
      return response;
    } catch (err) {
      const error: AxiosError<BaseApiResponse<any>> = err as any;

      throw error.response?.data;
    }
  }
}
