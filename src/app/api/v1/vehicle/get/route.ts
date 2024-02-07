import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { adminservice } from "@/app/backend/services/impl/admin_service_impl";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import { ownerservice } from "@/app/backend/services/impl/owner_service_impl";
import {
  ApiResponse,
  MiddlewareAuthorization,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { validator } from "@/app/backend/utils/validator/helper";
import {
  AdminRegister,
  RegisterCustomer,
} from "@/app/backend/utils/validator/schema";
import { Admin } from "@prisma/client";
import { Payload } from "@/app/backend/interfaces/jwt";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { newVehicleServices } from "@/app/backend/services/impl/vehicle_services_impl";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "GET") {
      throw new ApiError(
        "invalid request method",
        HttpStatusCode.MethodNotAllowed
      );
    }
    
    const { searchParams } = new URL(req.url)

    const id = searchParams.get("id")

    if(!id){
      throw new ApiError("params is not found",HttpStatusCode.BadRequest)
    }


     
    const vehicle = await newVehicleServices.getVehicleById(id);

    return new ResponseHandler().success(
      vehicle,
      undefined,
      HttpStatusCode.Ok
    );
  } catch (error: any) {
    return handleError(error);
  }
}
