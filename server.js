const PORT = 8080;
const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('cross-fetch');
app.use(cors());

const username = 'Yaden7';
const password = 'YoonisAden2965';

// This is the route that we will hit to get the deals
app.get('/deals', async (req, res) => {
	// This is the body of the request that we will send to the API
	try {
		const body = {
			source: 'amazon_search',
			domain: 'com',
			query: 'Deal of the day',
			parse: true,
			pages: 1,
		};

		// This variable is the response from the API usiung the fetch function
		const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
			},
		});

		// This data is what we get back from the API
		const data = await response.json();

        // console.log(JSON.stringify(data, null, 2));
		// This is the array of deals
		const results = data.results[0].content.results.organic
		// This is the array of deals that have a price strikethrough
		const filteredDeals = results.filter(deal => deal.price_strikethrough);

		const sortedByBestDeal = filteredDeals.sort((b, a) => 
		    ((a.price_strikethrough -a.price) / a.price_strikethrough *100) -
            ((b.price_strikethough -b.price) / b.price_strikethrough *100)
        )
        res.send(sortedByBestDeal);
	} catch (err) {
		console.error(err);
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
