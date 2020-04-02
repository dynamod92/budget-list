import React, { useState } from "react";
import "./App.css";
import defaultBudgetItems from "./defaultBudgetItems";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Jumbotron,
  Table,
  Toast
} from "react-bootstrap";

document.onkeydown = function(e) {
  e = e || window.event;
  switch (e.which || e.keyCode) {
    case 13:
      document.getElementById("addItem").click();
      document.getElementById("title").focus();
      break;
    default:
      break;
  }
};

const App = () => {
  let [budgetItems, setBudgetItems] = useState(defaultBudgetItems);
  let [title, setTitle] = useState("");
  let [amount, setAmount] = useState(0);

  const sumTotalBill = paidStatus => {
    let total = 0;
    budgetItems.map(item => {
      if (item.paid === paidStatus) total += item.amount;
      return item;
    });

    return total;
  };

  const removeBudgetItem = index => {
    setBudgetItems([...budgetItems.filter(item => item.index !== index)]);
  };
  const setBudgetItemPaid = index => {
    setBudgetItems([
      ...budgetItems.map(item => {
        if (item.index === index) item.paid = true;
        return item;
      })
    ]);
  };

  const setBudgetItemUnpaid = index => {
    setBudgetItems([
      ...budgetItems.map(item => {
        if (item.index === index) item.paid = false;
        return item;
      })
    ]);
  };

  const showModal = alertMessage => {
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
    const { titleValid, amountValid } = {
      titleValid: title.length > 0,
      amountValid: typeof amount == "number"
    };

    if (titleValid === false) {
      showModal("Don't you want to know what bill you're tracking? 🤔");
    } else if (amountValid === false) {
      showModal("Your bill amount has to be a number 😬");
    } else {
      setBudgetItems([
        ...budgetItems,
        { index: budgetItems.length, title, amount, paid: false }
      ]);
      setTitle("");
      setAmount("");
    }
  };

  const listBudgetItems = paidStatus => {
    const filteredItems = budgetItems.filter(item => item.paid === paidStatus);

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
            filteredItems.map(item => (
              <tr key={item.index}>
                {!paidStatus && (
                  <td>
                    <span
                      style={{ marginLeft: "1rem", cursor: "pointer" }}
                      role="img"
                      aria-label="money-with-wings-emoji"
                      onClick={event => setBudgetItemPaid(item.index)}
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
                      onClick={event => setBudgetItemUnpaid(item.index)}
                    >
                      🎲
                    </span>
                  </td>
                )}
                <td key={"title" + item.index}>{item.title}</td>
                <td key={"amount" + item.index}>${item.amount}</td>
                <td key={"remove" + item.index}>
                  <span
                    style={{ marginLeft: "1rem", cursor: "pointer" }}
                    role="img"
                    aria-label="red-x-emoji"
                    onClick={event => removeBudgetItem(item.index)}
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
                name="title"
                id="title"
                value={title}
                onChange={event => setTitle(event.target.value)}
              ></Form.Control>
            </Col>
            <Col sm={2}>
              <Form.Control
                required
                placeholder="enter amount"
                type="number"
                name="amount"
                value={amount}
                onChange={event => setAmount(parseFloat(event.target.value))}
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

export default App;
