import { gql } from "apollo-boost";

export const getBill = gql`
  query GetBill($id: ID!) {
    getBill(id: $id) {
      id
      userId
      name
      month
      paid
      amount
    }
  }
`;
export const listBills = gql`
  query ListBills(
    $filter: TableBillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        name
        month
        paid
        amount
      }
      nextToken
    }
  }
`;
