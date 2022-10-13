import { pagesQuery$data } from "src/relay/__generated__/pagesQuery.graphql";

describe("cart.query", () => {
  it("return right data", async () => {
    const {
      executionResult: {
        data: {
          cart: { id, totalItems, items },
        },
      },
    } = await graphqlServer.inject<pagesQuery$data>({
      document: `query {
        cart(id: "63482cb11921456c7c4aed87") {
          id
          totalItems
          items {
            id
            name
            quantity
          }
        }
      }`,
    });

    expect(id).toBe("63482cb11921456c7c4aed87");
    expect(totalItems).toBe(0);
    expect(items).toEqual([]);
  });
});
