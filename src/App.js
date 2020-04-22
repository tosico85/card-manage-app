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
		const { cardList } = await axios.get(
			"https://cardlist-manage.herokuapp.com/cards"
		);
		console.log(cardList);
		this.setState({ isLoading: false, cardList });
	}

	componentDidMount() {
		this.getCardList();
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
							{cardList.map((cardInfo, index) => {
								console.log(cardInfo, index);
								return (
									<CardInfo
										key={index}
										cardname={cardInfo.cardname}
										summary={cardInfo.summary}
										balance={cardInfo.balance}
										total={cardInfo.total}
										color={cardInfo.color}
									/>
								);
							})}
							<ButtonAddCard />
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;
