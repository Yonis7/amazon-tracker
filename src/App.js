import { useState, useEffect } from 'react';
import Card from './components/Card';
import Header from './components/Header';

const App = () => {
	// Step 1: Create a state variable to store deals
	const [deals, setDeals] = useState(null);

	const getDeals = async () => {
		try {
			// Step 2: Send a GET request to the server
			const response = await fetch('http://localhost:8080/deals', {
				method: 'GET',
			});

			// Step 3: Parse the response as JSON
			const data = await response.json();

			// Step 4: Update the deals state variable with the data from the API
			setDeals(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getDeals();
	}, []);

	return (
		<div className="app">
			<Header />
			<nav>
				<button className="primary">Amazon</button>
				<button className="primary" disabled>
					Ali Expresss
				</button>
				<button className="primary" disabled>
					Ebay
				</button>
				<button className="primary" disabled>
					Etsy
				</button>
			</nav>
			<div>
				<h2>Best deal!</h2>
				<div className="feed">
					{deals?.map(deal => <Card key={deal.pos} item={deal} />
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
