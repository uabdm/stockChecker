// Get the current price of the stock
export default async function getCurrentPrice(stockSymbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        const currentPrice = data["Global Quote"]["05. price"];
        return currentPrice;
    } catch (error) {
        console.error(error);
    }
}