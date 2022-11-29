import { FindClientOutputDto } from "../usecase/find-client/find-client.usecase.dto";
import { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeInputDto } from "./client-adm.facade.dto";

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto>;
  find(input: FindClientFacadeInputDto): Promise<FindClientOutputDto>;
}
