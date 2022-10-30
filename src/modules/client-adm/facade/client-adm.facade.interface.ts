import { FindClientOutputDto } from "../usecase/find-client/find-client.usecase.dto";
import { AddClientFacadeInputDto, FindClientFacadeInputDto } from "./client-adm.facade.dto";

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(input: FindClientFacadeInputDto): Promise<FindClientOutputDto>;
}
