import React from "react";
import axios from "axios";
import ButtonAppBar from "./AppBar";
import CardInfo from "./Card";
import ButtonAddCard from "./AddCard";
import "./App.css";

/* function getCardList() {}
async getMovies() {
  const {
    data: {
      data: { movies },
    },
  } = await axios.get(
    'https://yts-proxy.now.sh/list_movies.json?sort_by=rating',
  );
  console.log(movies);
  this.setState({ isLoading: false, movies });
} */

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true, cardList: [] };
	}

	async getCardList() {
		/* const { cardList } = {
			cardList: [
				{
					cardname: "경기지역화폐",
					summary: "배달음식 전용",
					balance: 100000,
					total: 100000,
					color: "",
				},
			],
		}; */
		//"https://cardlist-manage.herokuapp.com/data/cardlist.json"
		let {
			data: { cardlist },
			//} = await axios.get("http://localhost:3001/cards/list");
		} = await axios.get("https://cardlist-manage.herokuapp.com/cards/list");

		console.log(cardlist);
		cardlist = cardlist || [];
		this.setState({ isLoading: false, cardList: cardlist });
	}

	componentDidMount() {
		this.getCardList();
	}

	handleChageBalance(cardInfo, index) {
		let card = this.state.cardList.concat();
		card[index] = cardInfo;
		console.log(card);
		this.refreshData(card);
	}

	addCard(cardInfo) {
		let cardlist = this.state.cardList.concat();
		cardlist.push(cardInfo);
		this.refreshData(cardlist);
		//console.log(cardlist);
	}

	deleteCard(index) {
		let cardlist = this.state.cardList.concat();
		cardlist.splice(index, 1);
		this.refreshData(cardlist);
	}

	async refreshData(cardList) {
		await axios({
			method: "post",
			url: "https://cardlist-manage.herokuapp.com/cards/update",
			//url: "http://localhost:3001/cards/update",
			data: { cardlist: cardList },
		}).then((result) => {
			this.setState({ cardList });
		});
	}

	render() {
		const { cardList, isLoading } = this.state;
		//console.log(cardList);

		return (
			<div className="container">
				{isLoading ? (
					<div className="loading-bar">
						<h1>Loading ...</h1>
					</div>
				) : (
					<div className="App">
						<ButtonAppBar />
						<div className="card-list">
							{Array.from(cardList).map((cardInfo, index) => {
								console.log(cardInfo, index);
								return (
									<CardInfo
										key={index}
										cardname={cardInfo.cardname}
										summary={cardInfo.summary}
										balance={cardInfo.balance}
										total={cardInfo.total}
										color={cardInfo.color}
										onChangeBalance={(cardInfo) => {
											this.handleChageBalance(cardInfo, index);
										}}
										onDeleteCard={() => this.deleteCard(index)}
									/>
								);
							})}

							<ButtonAddCard onAddCard={(cardInfo) => this.addCard(cardInfo)} />
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;
