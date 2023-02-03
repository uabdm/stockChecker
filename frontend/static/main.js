// add an event listener on the submit button that reads the value submitted in the inputText Field
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    const stockSymbol = document.getElementById("inputText").value;
    stockChecker(stockSymbol);
});

async function stockChecker(stockSymbol) {
    const fiveDayEMA = await getExpMA(stockSymbol);
    const twentyDaySMA = await getSMA(stockSymbol);

    // calculate the percentage difference between the two values
    const percentageDiff = ((fiveDayEMA - twentyDaySMA) / twentyDaySMA) * 100;

    // get the element with id of content
    const content = document.getElementById("content");
    // add the output of the two functions to the content element
    content.innerHTML = `The 5 day EMA is ${fiveDayEMA} and the 20 day SMA is ${twentyDaySMA}. This equates to a percentage difference of ${percentageDiff}`;

    if (percentageDiff < 3 && percentageDiff > -3) {
        content.innerHTML = `The 5 day EMA is ${fiveDayEMA} and the 20 day SMA is ${twentyDaySMA}. This equates to a percentage difference of ${percentageDiff}. <strong>This is a buy signal</strong>`;
    } else {
        content.innerHTML = `The 5 day EMA is ${fiveDayEMA} and the 20 day SMA is ${twentyDaySMA}. This equates to a percentage difference of ${percentageDiff}.`;
    }
}


// Get the 5 day EMA
async function getExpMA(stockSymbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=EMA&symbol=${stockSymbol}&interval=daily&time_period=5&series_type=open&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        const firstEMA = Object.values(data["Technical Analysis: EMA"])[0].EMA;
        return firstEMA;
    } catch (error) {
        console.error(error);
    }
}

// get the 20 day SMA
async function getSMA(stockSymbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${stockSymbol}&interval=daily&time_period=20&series_type=open&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        const firstSMA = Object.values(data["Technical Analysis: SMA"])[0].SMA;
        return firstSMA;
    } catch (error) {
        console.error(error);
    }
}
