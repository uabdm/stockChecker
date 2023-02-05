
// Get the 5 day EMA
export default async function getExpMA(stockSymbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=EMA&symbol=${stockSymbol}&interval=daily&time_period=5&series_type=open&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        const firstEMA = Object.values(data["Technical Analysis: EMA"])[0].EMA;
        return firstEMA;
    } catch (error) {
        console.error(error);
    }
}