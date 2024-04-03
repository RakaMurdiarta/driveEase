import { PrismaClient, ReturnHistory } from "@prisma/client";
import { IReturnHistory, NewReturnType } from "../ireturnHistory";
import prisma from "@/app/backend/config/prismaSingleton";

export class ReturnHistoryRepository implements IReturnHistory {
  private readonly repository: PrismaClient;

  constructor() {
    this.repository = prisma;
  }

  insert = async (data: NewReturnType): Promise<ReturnHistory | null> => {
    const resp = await this.repository.returnHistory.create({
      data: {
        returnDate: data.returnDate,
        customerId: data.customerId,
        vehicleId: data.vehicleId,
        isLate: data.isLate,
      },
    });

    return resp
  };
}
//relate to trigger deploy after changes