import Address from "../../@shared/domain/value-object/address.value-object";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindClientOutputDto } from "../usecase/find-client/find-client.usecase.dto";
import { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeInputDto } from "./client-adm.facade.dto";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";

export interface UseCaseProps {
  findUsecase: UseCaseInterface,
  addUsecase: UseCaseInterface,
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _addUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._addUsecase = usecaseProps.addUsecase;
    this._findUsecase = usecaseProps.findUsecase;
  }

  async add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
    const usecase = await this._addUsecase.execute(input);
    return {
      id: usecase.id,
      name: usecase.name,
      email: usecase.email,
      document: usecase.document,
      address: {
        street: usecase.address.street, 
        number: usecase.address.number,
        complement: usecase.address.complement,
        city: usecase.address.city,
        state: usecase.address.state,
        zipCode: usecase.address.zipCode
      },
      createdAt: usecase.createdAt,
      updatedAt: usecase.updatedAt,
    };
  }

  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientOutputDto> {
    return await this._findUsecase.execute(input);
  }
}