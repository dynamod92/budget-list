import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./styles/App.css";
import { listBills } from "./graphql/queries";
import { createBill, updateBill, deleteBill } from "./graphql/mutations";

import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Jumbotron,
  Table,
  Toast,
} from "react-bootstrap";

document.onkeydown = function (e) {
  e = e || window.event;
  switch (e.which || e.keyCode) {
    case 13:
      document.getElementById("addItem").click();
      document.getElementById("name").focus();
      break;
    default:
      break;
  }
};

const BudgetApp = () => {
  let [budgetItems, setBudgetItems] = useState([]);
  let [name, setName] = useState("");
  let [amount, setAmount] = useState(0);

  const { loading, error, data } = useQuery(listBills);

  useEffect(() => {
    if (!loading && !error) {
      setBudgetItems(data.listBills.items);
    }
  }, [loading, error, data]);

  const [createBillItem] = useMutation(createBill, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
  });

  const [updateBillItem] = useMutation(updateBill, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
  });

  const [deleteBillItem] = useMutation(deleteBill, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const addBudgetItem = (item) => {
    console.log(item);
    createBillItem({ variables: { input: item } });
  };

  const removeBudgetItem = (id) => {
    deleteBillItem({ variables: { input: { id } } });
  };
  const setBudgetItemPaid = (id) => {
    updateBillItem({ variables: { input: { id, paid: true } } });
  };

  const setBudgetItemUnpaid = (id) => {
    updateBillItem({ variables: { input: { id, paid: false } } });
  };

  const sumTotalBill = (paidStatus) => {
    let total = 0;
    budgetItems.map((item) => {
      if (item.paid === paidStatus) total += item.amount;
      return item;
    });

    return total;
  };

  const showModal = (alertMessage) => {
    return (
      <Toast>
        <Toast.Header>
          <strong className="mr-auto">Woopsies</strong>
        </Toast.Header>
        <Toast.Body>{alertMessage}</Toast.Body>
      </Toast>
    );
  };

  const checkValidity = () => {
    const { nameValid, amountValid } = {
      nameValid: name.length > 0,
      amountValid: typeof amount == "number",
    };

    if (nameValid === false) {
      showModal("Don't you want to know what bill you're tracking? 🤔");
    } else if (amountValid === false) {
      showModal("Your bill amount has to be a number 😬");
    } else {
      addBudgetItem({
        name,
        amount,
        paid: false,
        month: '2020-04',
        userId: "test",
      });
      setName("");
      setAmount("");
    }
  };

  const listBudgetItems = (paidStatus) => {
    const filteredItems = data.listBills.items.filter(
      (item) => item.paid === paidStatus
    );

    return (
      <Table style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            {!paidStatus && <th>Pay dat bill!</th>}
            {paidStatus && <th>Unpay Bill</th>}
            <th>Bill</th>
            <th>Amount</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 &&
            filteredItems.map((item) => (
              <tr key={item.id}>
                {!paidStatus && (
                  <td>
                    <span
                      style={{ marginLeft: "1rem", cursor: "pointer" }}
                      role="img"
                      aria-label="money-with-wings-emoji"
                      onClick={(event) => setBudgetItemPaid(item.id)}
                    >
                      💸
                    </span>
                  </td>
                )}
                {paidStatus && (
                  <td>
                    <span
                      style={{ marginLeft: "1rem", cursor: "pointer" }}
                      role="img"
                      aria-label="money-with-wings-emoji"
                      onClick={(event) => setBudgetItemUnpaid(item.id)}
                    >
                      🎲
                    </span>
                  </td>
                )}
                <td key={"name" + item.id}>{item.name}</td>
                <td key={"amount" + item.id}>${item.amount}</td>
                <td key={"remove" + item.id}>
                  <span
                    style={{ marginLeft: "1rem", cursor: "pointer" }}
                    role="img"
                    aria-label="red-x-emoji"
                    onClick={(event) => removeBudgetItem(item.id)}
                  >
                    ❌
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
        <thead>
          <tr>
            <th colSpan="2">
              Total {paidStatus ? "amount paid:" : "amount due:"}
            </th>
            <th colSpan="2">${sumTotalBill(paidStatus)}</th>
          </tr>
        </thead>
      </Table>
    );
  };

  return (
    <div className="App">
      <Jumbotron style={{ backgroundColor: "white" }}>
        <h1>
          <span role="img" aria-label="money-with-wings-emoji">
            March Bills 💸
          </span>
        </h1>
        <Container>
          <Row>
            <Col sm={{ span: 7, offset: 3 }}>{listBudgetItems(false)}</Col>
          </Row>

          <Row>
            <Col sm={{ span: 4, offset: 3 }}>
              <Form.Control
                required
                type="text"
                placeholder="item name"
                name="name"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></Form.Control>
            </Col>
            <Col sm={2}>
              <Form.Control
                required
                placeholder="enter amount"
                type="number"
                name="amount"
                value={amount}
                onChange={(event) => setAmount(parseFloat(event.target.value))}
              ></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                id="addItem"
                style={{ margin: "2.5rem" }}
                onClick={() => checkValidity()}
              >
                Add Item
              </Button>
            </Col>
          </Row>

          <Row>
            <Col sm={{ span: 7, offset: 3 }}>{listBudgetItems(true)}</Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default BudgetApp;
