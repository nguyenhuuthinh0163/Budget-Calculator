import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
	charge,
	amount,
	handleCharge,
	handleAmount,
	handleSubmit,
	edit,
	numberToCurrency
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="form-center">
				<div className="form-group">
					<label htmlFor="charge">charge</label>
					<input
						type="text"
						className="form-control"
						id="charge"
						name="charge"
						placeholder="e.g. rent"
						value={charge}
						onChange={handleCharge}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="amout">amount</label>
					<input
						type="text"
						className="form-control"
						id="amount"
						name="amount"
						placeholder="e.g. 100"
						value={numberToCurrency(amount)}
						onChange={handleAmount}
					/>
				</div>
			</div>
			<button type="submit" className="btn">
				{edit ? "Edit" : "Submit"}
				<MdSend className="btn-icon" />
			</button>
		</form>
	);
};

export default ExpenseForm;
