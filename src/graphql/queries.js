/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBill = /* GraphQL */ `
  query GetBill($id: ID!) {
    getBill(id: $id) {
      id
      name
      month
      paid
      amount
    }
  }
`;
export const listBills = /* GraphQL */ `
  query ListBills(
    $filter: TableBillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        month
        paid
        amount
      }
      nextToken
    }
  }
`;
