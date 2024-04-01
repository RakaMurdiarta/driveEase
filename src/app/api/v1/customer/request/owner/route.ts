import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { Payload } from "@/app/backend/interfaces/jwt";
import { adminservice } from "@/app/backend/services/impl/admin_service_impl";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
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
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "GET") {
      throw new ApiError("invalid request method", HttpStatusCode.BadRequest);
    }

    const { id } = (await MiddlewareAuthorization(req)) as Payload;

    const reqOwner = await customerService.createRequestOwner(id);

    return new ResponseHandler<string>().success(
      reqOwner,
      undefined,
      HttpStatusCode.Created
    );
  } catch (error: any) {
    return handleError(error);
  }
}
