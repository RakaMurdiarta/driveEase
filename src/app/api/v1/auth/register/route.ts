import { ApiError, BaseError } from "@/app/backend/exception/baseError";
import { customerService } from "@/app/backend/services/impl/customer_service_impl";
import {
  ApiResponse,
  Bcrypt,
  ResponseHandler,
  handleError,
} from "@/app/backend/utils/helper";
import { validator } from "@/app/backend/utils/validator/helper";
import { RegisterCustomer } from "@/app/backend/utils/validator/schema";
import { Customer } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      throw new ApiError("invalid request method", HttpStatusCode.BadRequest);
    }

    const body = await req.json();

    const { customer_type, email, fname, lname, password, phone } =
      await validator.validate(RegisterCustomer, body);

    //get customer
    const customerisExist = await customerService.getCustomerByEmail(email);

    //hash password

    const hashpass = await Bcrypt.createHashPassword(password);

    if (customerisExist) {
      throw new ApiError("email was taken", HttpStatusCode.BadRequest);
    }

    const customer: Customer = await customerService.addCustomer(
      email,
      hashpass,
      fname,
      lname,
      phone,
      customer_type
    );

    const { password: ignorePassword, ...rest } = customer;

    return new ResponseHandler().success(rest, undefined, HttpStatusCode.Ok);
  } catch (error: any) {
    return handleError(error);
  }
}
