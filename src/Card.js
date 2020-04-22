import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

function CardInfo({ cardname, summary, balance, total, color }) {
	console.log(cardname);
	return (
		<div className="card_content">
			<div className="card_info">
				<h3 className="card_name">{cardname}</h3>
				<span className="card_summary">{summary}</span>
				<span className="card_money">
					{balance}/{total}
				</span>
			</div>
			<div className="modify_card_info">
				<Button color="primary">금액수정</Button>
				<Button color="primary">카드사용</Button>
				<IconButton aria-label="delete">
					<DeleteIcon fontSize="small" />
				</IconButton>
			</div>
		</div>
	);
}

CardInfo.prototype = {
	cardname: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	balance: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
};

export default CardInfo;
