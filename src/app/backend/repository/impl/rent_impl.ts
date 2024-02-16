import { PrismaClient, Rents } from "@prisma/client";
import prisma from "@/app/backend/config/prismaSingleton";
import { IRent } from "../irent";

export class RentRepository implements IRent {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  insert = async (rent: Omit<Rents, "id">): Promise<Rents | null> => {
    const resp = await this.repository.rents.create({
      data: {
        startDate : rent.startDate,
        returnDate : rent.returnDate,
        amountDue : rent.amountDue,
        active : rent.active,
        noOfDays : rent.noOfDays,
        customerId : rent.customerId,
        vehicleId : rent.vehicleId
      },
    });


    if (!resp) {
      return null;
    }

    return resp;
  };
}