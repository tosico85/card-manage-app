import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class ButtonAddCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isAdding: false };
	}

	addCard() {
		this.setState({ isAdding: true });
	}

	setCancal() {
		this.setState({ isAdding: false });
	}

	saveCardInfo() {
		const cardname = document.querySelector(".card-info__name").value;
		const summary = document.querySelector(".card-info__summary").value;
		const total = document.querySelector(".card-info__total").value;

		this.props.onAddCard({
			cardname,
			summary,
			total,
			balance: total,
			color: "",
		});

		this.setState({ isAdding: false });
	}

	render() {
		const { isAdding } = this.state;
		return (
			<div className="card_add_content">
				{!isAdding ? (
					<div className="card_add_button" onClick={() => this.addCard()}>
						<h1>+</h1>
					</div>
				) : (
					<div className="card_input_content">
						<div className="card_info">
							<div className="card-input-box">
								<h4>카드명</h4>
								<input
									type="text"
									className="card-info__name"
									placeholder="카드명 입력"
								/>
							</div>
							<div className="card-input-box">
								<h4>카드 설명</h4>
								<input
									type="text"
									className="card-info__summary"
									placeholder="카드 설명 입력"
								/>
							</div>
							<div className="card-input-box">
								<h4>잔액</h4>
								<input
									type="number"
									className="card-info__total"
									placeholder="잔액 입력"
								/>
							</div>
						</div>
						<div className="insert_card_info">
							<div className="input-form">
								<Button
									className="insert_balance"
									onClick={() => {
										this.saveCardInfo();
									}}
									color="primary">
									저장
								</Button>
								<Button
									className="insert_cancel"
									onClick={() => {
										this.setCancal();
									}}
									color="primary">
									취소
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default ButtonAddCard;
