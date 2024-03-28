import {
  $Enums,
  Customer,
  CustomerType,
  Owner,
  Rents,
  ReturnHistory,
  Vehicle,
} from "@prisma/client";
import CustomerRepository from "../../repository/impl/customer_impl";
import { ICustomerService } from "../iserviceCustomer";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";
import { VehcileRepository } from "../../repository/impl/vehicle_impl";
import { OwnerRepository } from "../../repository/impl/owner_impl";
import { RentRepository } from "../../repository/impl/rent_impl";
import { ReturnHistoryRepository } from "../../repository/impl/returnHistory_impl";
import { NewReturnType } from "../../repository/ireturnHistory";

class CustomerService implements ICustomerService {
  private readonly customerRepository: CustomerRepository;
  private readonly vehicleRepo: VehcileRepository;
  private readonly ownerRepo: OwnerRepository;
  private readonly rentRepo: RentRepository;
  private readonly returnRepo: ReturnHistoryRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.vehicleRepo = new VehcileRepository();
    this.ownerRepo = new OwnerRepository();
    this.rentRepo = new RentRepository();
    this.returnRepo = new ReturnHistoryRepository();
  }
  addCustomer = async (
    email: string,
    password: string,
    fullname: string,
    phone: string,
    type: CustomerType,
    cname?: string
  ): Promise<Customer> => {
    try {
      const customer = await this.customerRepository.insert(
        email,
        password,
        fullname,
        phone,
        type,
        cname
      );

      if (!customer) {
        throw new ApiError(
          "failed to create customer",
          HttpStatusCode.BadRequest
        );
      } else {
        return customer;
      }
    } catch (error: any) {
      throw error;
    }
  };
  postVehicle = async (
    vehicle: Omit<Vehicle, "id" | "ownerId">,
    customer_id: string
  ): Promise<Vehicle> => {
    const cvehicle: Vehicle | null = null;
    const owner: Owner | null = null;

    /* 

        @TODO : call method getOwnerByCustomerId from owner repository 
        @Description : check is customer is owner or not before add vehicle

    */

    if (!owner) {
      throw new ApiError(
        "You are not yet registered as an owner. Please make sure to contact the administrator to register as an owner.",
        HttpStatusCode.BadRequest
      );
    }

    /* 

        @TODO : call method addVehicle from vehicle repository 
    */
    //post vehicle
    if (!cvehicle) {
      throw new ApiError("failed post vehicle", HttpStatusCode.BadRequest);
    }

    return cvehicle;
  };

  getCustomerByEmail = async (email: string): Promise<Customer | null> => {
    /* 

        @TODO : call method insert from customer repository
        @param : email 
    */
    const customer = await this.customerRepository.getCustomerByEmail(email);

    if (!customer) {
      return null;
    }

    return customer;
  };

  createRequestOwner = async (customerId: string): Promise<string> => {
    const request = await this.customerRepository.requestOwner(customerId);

    if (!request) {
      throw new ApiError("failed request owner");
    }

    return request;
  };
  isOwner = async (customerId: string): Promise<string> => {
    return await this.customerRepository.isOwner(customerId);
  };

  createReturnHistory = async (rent_id: string): Promise<ReturnHistory> => {
    const getInfoRent = await this.rentRepo.getRentById(rent_id);

    if (!getInfoRent) {
      throw new ApiError("failed to get rent details");
    }
    const isLate = new Date() > getInfoRent.returnDate!;
    const data: NewReturnType = {
      customerId: getInfoRent.customerId,
      vehicleId: getInfoRent.vehicleId,
      returnDate: new Date(),
      isLate,
    };

    const returnRent = await this.returnRepo.insert(data);

    if (!returnRent) {
      throw new ApiError("failed to create return history");
    }

    return returnRent;
  };

  getListRentByCustomerId = async (custId: string): Promise<Rents[] | []> => {
    const rentList = await this.rentRepo.getListRentByCustomerId(custId);
    if (rentList.length <= 0) {
      return [];
    }

    return rentList;
  };

  getListVehicleByCustomerId = async (
    custId: string
  ): Promise<Vehicle[] | []> => {
    const vehicle = await this.customerRepository.getVehicleListByCustomerId(
      custId
    );

    if (vehicle.length <= 0) {
      return [];
    }

    return vehicle;
  };
}

export const customerService = new CustomerService();
