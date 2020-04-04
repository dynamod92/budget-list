import { gql } from "apollo-boost";

export const createBill = gql`
  mutation CreateBill($input: CreateBillInput!) {
    createBill(input: $input) {
      id
      userId
      name
      month
      paid
      amount
    }
  }
`;
export const updateBill = gql`
  mutation UpdateBill($input: UpdateBillInput!) {
    updateBill(input: $input) {
      id
      userId
      name
      month
      paid
      amount
    }
  }
`;
export const deleteBill = gql`
  mutation DeleteBill($input: DeleteBillInput!) {
    deleteBill(input: $input) {
      id
      userId
      name
      month
      paid
      amount
    }
  }
`;
