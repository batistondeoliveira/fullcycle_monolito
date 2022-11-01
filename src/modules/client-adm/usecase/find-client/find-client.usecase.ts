import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientAdmGateway from "../../gateway/client-adm.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase {
  private _clientRepository: ClientAdmGateway;
  
  constructor(clientRepository: ClientAdmGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {    
    const result = await this._clientRepository.find(input.id);
    
    return {
      id: result.id.id,
      name: result.name,
      email: result.email,
      document: result.document,
      address: result.address, 
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}