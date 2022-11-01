import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address.value-object";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a clien", async () => {
    const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUseCase,
      findUsecase: undefined,
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      document: "Doc-1",
      address: new Address({
        street: "Street 1",
        number: "Number 1",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "Zip 1",
      }),  
    };

    await facade.add(input)

    const client = await ClientModel.findOne({ where: { id: "1" }});

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.document).toEqual(input.document);
    expect(client.street).toEqual(input.address.street);
    expect(client.number).toEqual(input.address.number);
    expect(client.complement).toEqual(input.address.complement);
    expect(client.city).toEqual(input.address.city);
    expect(client.state).toEqual(input.address.state);
    expect(client.zipCode).toEqual(input.address.zipCode);    
  });

  it("should find a client", async () => {
    const repository = new ClientRepository();    
    const addUseCase = new AddClientUseCase(repository);
    const findUsecase = new FindClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUseCase,
      findUsecase: findUsecase,
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      document: "Doc-1",
      address: new Address({
        street: "Street 1",
        number: "Number 1",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "Zip 1",
      }),
    };

    await facade.add(input);

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);    
    expect(client.document).toEqual(input.document);
    expect(client.address.street).toEqual(input.address.street);
    expect(client.address.number).toEqual(input.address.number);
    expect(client.address.complement).toEqual(input.address.complement);
    expect(client.address.city).toEqual(input.address.city);
    expect(client.address.state).toEqual(input.address.state);
    expect(client.address.zipCode).toEqual(input.address.zipCode);   
  });
});