/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBill = /* GraphQL */ `
  subscription OnCreateBill(
    $id: ID
    $name: String
    $month: String
    $paid: Boolean
    $amount: Float
  ) {
    onCreateBill(
      id: $id
      name: $name
      month: $month
      paid: $paid
      amount: $amount
    ) {
      id
      name
      month
      paid
      amount
    }
  }
`;
export const onUpdateBill = /* GraphQL */ `
  subscription OnUpdateBill(
    $id: ID
    $name: String
    $month: String
    $paid: Boolean
    $amount: Float
  ) {
    onUpdateBill(
      id: $id
      name: $name
      month: $month
      paid: $paid
      amount: $amount
    ) {
      id
      name
      month
      paid
      amount
    }
  }
`;
export const onDeleteBill = /* GraphQL */ `
  subscription OnDeleteBill(
    $id: ID
    $name: String
    $month: String
    $paid: Boolean
    $amount: Float
  ) {
    onDeleteBill(
      id: $id
      name: $name
      month: $month
      paid: $paid
      amount: $amount
    ) {
      id
      name
      month
      paid
      amount
    }
  }
`;
