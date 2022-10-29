import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/product-adm.facade.factory";
import { ProductModel } from "../repository/product.model";

describe("ProductAdmFacadeFactory test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should check product stock", async () => {    
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: "1" });

    expect(result.productId).toBe(input.id);
    expect(result.stock).toEqual(input.stock);
  });
});