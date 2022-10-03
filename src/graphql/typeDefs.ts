export default /* GraphQL */`

input AddToCartInput {
  cartId: ID!
  description: String
  id: ID
  image: String
  name: String!
  price: Int!
  quantity: Int = 1
}

type Cart {
  id: ID!
  items: [CartItem!]!
  subTotal: Money!
  totalItems: Int!
}

type CartItem {
  description: String
  id: ID!
  image: String
  lineTotal: Money!
  name: String!
  quantity: Int!
  unitTotal: Money!
}

type Money {
  amount: Int!
  formatted: String!
}

type Mutation {
  addCartItem(input: AddToCartInput!): Cart
  removeCartItem(input: RemoveFromCartInput!): Cart
}

type Query {
  cart(id: ID): Cart
}

input RemoveFromCartInput {
  id: ID!
}
`