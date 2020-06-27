import React, { useState, useEffect } from "react";
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/dist/v4';
import { numberToCurrency, currencyToNumber } from "./Helper.js";

//-------------- Define State ---/
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
	//-------------- State values ---/
	// All expenses, add expense
	const [expenses, setExpenses] = useState(initialExpenses);
	// Single expense
	const [charge, setCharge] = useState("");
	// Single amout
	const [amount, setAmount] = useState("");
	// Alert
	const [alert, setAlert] = useState({ show: false });
	// Edit
	const [edit, setEdit] = useState(false);
	// Edit item
	const [id, setId] = useState(0);

	//-------------- useEffect ---/
	useEffect(()=>{
		localStorage.setItem("expenses", JSON.stringify(expenses));
	}, [expenses]);

	//-------------- Functionality ---/
	// Handle charge
	const handleCharge = e => {
		setCharge(e.target.value);
	};

	// Handle amount
	const handleAmount = (e) => {
		setAmount(e.target.value);
	};

	// Handle submit
	const handleSubmit = e => {
		e.preventDefault();

		if (charge && amount) {
			if (edit) {
				let tempExpenses = expenses.map(item => {
					return item.id === id ? { ...item, charge, amount } : item;;
				});
				setExpenses(tempExpenses);
				setEdit(false);
				handleAlert({
					type: "success",
					text: "Item edited !",
				});
			} else {
				const singleExpense = { id: uuid(), charge, amount };
				setExpenses([...expenses, singleExpense]);
				handleAlert({ type: "success", text: "item added" });	
			}
			console.log([expenses]);
			setCharge("");
			setAmount("");
		} else {
			handleAlert({
			  type: "Danger",
			  text: "Charge can't be empty value and amount value has to be bigger than zero",
			});
		}
	};

	// Handle submit
	const handleAlert = ({ type, text }) => {
		setAlert({ show: true, type, text });
		setTimeout(() => {
			setAlert({ show: false });
		}, 3000);
	};

	// Clear all items
	const clearItems = () => {
		setExpenses([]);
		handleAlert({ type: "danger", text: "All item deleted" });
	}

	// Handle delete
	const handleDelete = (id) => {
		let tempExpenses = expenses.filter(item => item.id !== id)
		setExpenses(tempExpenses);
		handleAlert({ type: "danger", text: "Item deleted" });
	}

	// Handle edit
	const handleEdit = (id) => {
		let expense = expenses.find(item => item.id === id);
		let {charge, amount} = expense;
		setCharge(charge);
		setAmount(amount);
		setEdit(true);
		setId(id);
	}

	return (
		<>
			{alert.show && <Alert type={alert.type} text={alert.text} />}
			<Alert />
			<h1>Budget calculator</h1>
			<main className="App">
			<ExpenseForm
				charge={charge}
				amount={amount}
				handleAmount={handleAmount}
				handleCharge={handleCharge}
				handleSubmit={handleSubmit}
				numberToCurrency={numberToCurrency}
				edit={edit}
			/>
			<ExpenseList
				expenses={expenses}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				clearItems={clearItems}
				numberToCurrency={numberToCurrency}
			/>
			</main>
			<h1>
				Total spending : {" "}
				<span className="total">
					${" "}
					{expenses.reduce((acc, curr) => {
						return (acc += parseInt(curr.amount));
					}, 0)}
				</span>
			</h1>
		</>
	);
}

export default App;