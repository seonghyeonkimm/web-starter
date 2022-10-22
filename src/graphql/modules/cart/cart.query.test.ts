type QueryDataType = {
  cart: {
    id: string;
  };
};

describe("cart.query", () => {
  it("return right data", async () => {
    const {
      executionResult: {
        data: {
          cart: { id },
        },
      },
    } = await graphqlServer.inject<QueryDataType>({
      document: `query {
        cart(id: "634a7e4467d45160072cdc7d") {
          id
        }
      }`,
    });

    expect(id).toBe("634a7e4467d45160072cdc7d");
  });
});

export {};
