import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindClientOutputDto } from "../usecase/find-client/find-client.usecase.dto";
import { AddClientFacadeInputDto, FindClientFacadeInputDto } from "./client-adm.facade.dto";
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

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUsecase.execute(input);
  }

  find(input: FindClientFacadeInputDto): Promise<FindClientOutputDto> {
    throw new Error("Method not implemented.");
  }
}