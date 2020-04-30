import React from "react";
//import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

//import { render } from "@testing-library/react";

class CardInfo extends React.Component {
	//console.log(cardname);
	constructor(props) {
		super(props);
		//const { cardname, summary, balance, total, color } = props;
		this.state = { isModify: false };
	}

	setModify() {
		this.setState({ isModify: true });
	}

	setCancal() {
		this.setState({ isModify: false });
	}

	saveBalance() {
		const inputBalance = document.querySelector(".input-money__modify");
		const modifiedInfo = Object.assign({}, this.props);
		delete modifiedInfo.onChangeBalance;
		delete modifiedInfo.onDeleteCard;
		//console.log(inputBalance.value);

		modifiedInfo.balance = inputBalance.value;
		this.props.onChangeBalance(modifiedInfo);
		this.setState({ isModify: false });
	}

	render() {
		const { isModify } = this.state;

		return (
			<div className="card_content">
				<div className="card_info">
					<h3 className="card_name">{this.props.cardname}</h3>
					<span className="card_summary">{this.props.summary}</span>
					<span className="card_money">
						{this.props.balance}/{this.props.total}
					</span>
				</div>
				<div className="modify_card_info">
					{isModify ? (
						<div className="input-form">
							<input
								type="number"
								className="input-money__modify"
								placeholder="수정금액 입력"
							/>
							<Button
								className="modify_balance"
								onClick={() => {
									this.saveBalance();
								}}
								color="primary">
								저장
							</Button>
							<Button
								className="modify_cancel"
								onClick={() => {
									this.setCancal();
								}}
								color="primary">
								취소
							</Button>
						</div>
					) : (
						<Button
							className="modify_balance"
							onClick={() => {
								this.setModify();
							}}
							color="primary">
							금액수정
						</Button>
					)}
					<IconButton
						onClick={() => this.props.onDeleteCard()}
						aria-label="delete">
						<DeleteIcon fontSize="small" />
					</IconButton>
				</div>
			</div>
		);
	}
}

/* CardInfo.prototype = {
	cardname: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	balance: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
};
 */
export default CardInfo;
