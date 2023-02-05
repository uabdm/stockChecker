// get the 20 day SMA
export default async function getSMA(stockSymbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${stockSymbol}&interval=daily&time_period=20&series_type=open&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        const firstSMA = Object.values(data["Technical Analysis: SMA"])[0].SMA;
        return firstSMA;
    } catch (error) {
        console.error(error);
    }
}