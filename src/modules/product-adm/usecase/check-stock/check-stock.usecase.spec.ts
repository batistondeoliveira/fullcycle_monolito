import Product from "../../domain/product.entity";

const product = new Product({
  id: new Id("1"),
  name: "Product",
  description: "Product description",
  purchasePrice: 100,
  stock: 10,
});

const MockRespository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("CheckStock usecase unit test", () => {
  it("should get stock of a product", async () => {
    const productRespository = MockRespository();
    const checkStockUseCase = new CheckStockUseCase(productRespository);
    const input = {
      productId: "1",
    };

    const result = await checkStockUseCase.execute(input);

    expect(productRespository.find).toHaveBeenCalled();
    expect(result.productId).toBe("1");
    expect(result.stock).toBe(10);
  });
})