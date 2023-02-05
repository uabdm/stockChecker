import getCurrentPrice from './getCurrentPrice';
import getExpMA from './getExpMA';
import getSMA from './getSMA';

export default async function stockChecker(stockSymbol) {
    let currentPrice = await getCurrentPrice(stockSymbol);
    let fiveDayEMA = await getExpMA(stockSymbol);
    let twentyDaySMA = await getSMA(stockSymbol);

     // Cast the three variables above to decimals and trim to two decimal places
    currentPrice = parseFloat(currentPrice).toFixed(2);
    fiveDayEMA = parseFloat(fiveDayEMA).toFixed(2);
    twentyDaySMA = parseFloat(twentyDaySMA).toFixed(2);

    // calculate the percentage difference between the two values
    let percentageDiff = ((fiveDayEMA - twentyDaySMA) / twentyDaySMA) * 100;
    percentageDiff = percentageDiff.toFixed(2);

    // get the element with id of content
    const content = document.getElementById("content");

    // add the output of the two functions to the content element
    // check the percentage difference and if it is less than 3% add to watchlist
    if (percentageDiff < 3 && percentageDiff > -3) {
        content.innerHTML = `<p>Current price: ${currentPrice}</p>The 5 day EMA is ${fiveDayEMA} and the 20 day SMA is ${twentyDaySMA}. This equates to a percentage difference of ${percentageDiff}. <strong>Add to watchlist.</strong>`;
    } else {
        content.innerHTML = `<p>Current price: ${currentPrice}</p>The 5 day EMA is ${fiveDayEMA} and the 20 day SMA is ${twentyDaySMA}. This equates to a percentage difference of ${percentageDiff}.`;
    }
}