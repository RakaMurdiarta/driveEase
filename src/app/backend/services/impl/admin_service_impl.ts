import { $Enums, Admin, OwnerRequestHistory } from "@prisma/client";
import { AdminRepository } from "../../repository/impl/admin_impl";
import { OwnerRepository } from "../../repository/impl/owner_impl";
import { IAdminService } from "../iserviceAdmin";
import { ApiError } from "../../exception/baseError";
import { HttpStatusCode } from "axios";

class AdminService implements IAdminService {
  private readonly adminrepo: AdminRepository;
  private readonly ownerRepo: OwnerRepository;

  constructor() {
    this.adminrepo = new AdminRepository();
    this.ownerRepo = new OwnerRepository();
  }

  addAdmin = async (admin: Omit<Admin, "id">): Promise<Admin> => {
    //should remove this when get data from admin repository
    const adm: Admin | null = null;
    /* 

        @TODO : call method insert from admin repository 
    */

    if (!adm) {
      throw new ApiError("failed create admin", HttpStatusCode.BadRequest);
    }
    return adm;
  };

  acceptOwnerRequest = async (customerId: string): Promise<boolean> => {
    const resp = await this.adminrepo.acceptRequestOwner(customerId);

    if (resp) {
      await this.ownerRepo.insert(customerId);
    }
    //addOwner
    return resp;
  };

  getListRequestOwner = async (): Promise<OwnerRequestHistory[]> => {
    return await this.adminrepo.getListRequesttOwner();
  };

  getAdminByEmail = async (
    email: string
  ): Promise<{ id: string; username: string; password: string } | null> => {
    //should remove this when get data from admin repository
    const admin = await this.adminrepo.getAdminByEmail(email)    

      if(!admin){
        return null
      }

      return admin

  };
}

export const adminservice = new AdminService();
