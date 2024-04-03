import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { Payload } from "@/app/backend/interfaces/jwt";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import { newRentServices } from "@/app/backend/services/impl/rentService_impl";
import {
  ApiResponse,
  MiddlewareAuthorization,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { validator } from "@/app/backend/utils/validator/helper";
import {
  AddVehicle,
  RegisterCustomer,
  Rent,
} from "@/app/backend/utils/validator/schema";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError("invalid request method", HttpStatusCode.BadRequest);
    }

    const {id} = await MiddlewareAuthorization(req) as Payload

    const body = await req.json();

    const {from , until , total, vehicle_id} = await validator.validate(Rent, body);
 
    const rent = await newRentServices.rent(id , vehicle_id , from , until , total);

    return new ResponseHandler().success(
      {invoiceId : rent},
      undefined,
      HttpStatusCode.Ok
    );
  } catch (error: any) {
    return handleError(error);
  }
}
