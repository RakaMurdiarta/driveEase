import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, BaseApiResponse } from "./interface";

export type RegisterAdmin = {
  username: string;
  password: string;
};

export type RegisterAdminResponse = {
  id: string;
  username: string;
  password: string;
};

type ApproveOwner = {
  customerid: string;
};

export type CustomerListData = {
  id: string;
  customerId: string;
  status: string;
};

export type CustomerList = {
  data: CustomerListData[];
};

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

export class adminServiceController {
  public async register(
    data: RegisterAdmin
  ): Promise<ApiResponse<RegisterAdminResponse>> {
    /*
      @TODO : define api route for register into variable endpoint
      @type : string
    */
    const endpoint = "";
    try {
      const response = await axios.post(endpoint, data);
      return response;
    } catch (err) {
      const error: AxiosError<BaseApiResponse<any>> = err as any;

      throw error.response?.data;
    }
  }

  public async approveOwner(id: string): Promise<ApiResponse<string>> {
    const data: ApproveOwner = {
      customerid: id,
    };
    /*
      @TODO : define api route for approveOwner into variable endpoint
      @type : string
    */
      const endpoint = "/api/v1/admin/accept/request";
      try {
      const response = await axios.post(endpoint, data);
      return response;
    } catch (err) {
      const error: AxiosError<BaseApiResponse<any>> = err as any;

      throw error.response?.data;
    }
  }
}
