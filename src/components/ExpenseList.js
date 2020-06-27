import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems, numberToCurrency }) => {
	return (
		<>
			<ul className="list">
				{expenses.map((expense) => {
				return (
					<Item
					key={expense.id}
					expense={expense}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					numberToCurrency={numberToCurrency}
					/>
				);
				})}
			</ul>
			{expenses.length > 0 && (
				<button className="btn" onClick={clearItems}>
				Clear expenses
				<MdDelete className="btn-icon" />
				</button>
			)}
		</>
	);
};

export default ExpenseList;
