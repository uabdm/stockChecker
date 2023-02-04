// initially load the watchlist from local storage and add the stock symbols to the watchlistcontent element
const watchlistcontent = document.getElementById("watchlist");
let watchlist = JSON.parse(localStorage.getItem("watchlist"));
if (watchlist !== null) {
    for (let i = 0; i < watchlist.length; i++) {
        watchlistcontent.innerHTML += `<li>${watchlist[i]}<i id=${watchlist[i]} class="fas fa-trash pl-3"></i></li>`;
    }
}

// add an event listener on the submit button that reads the value submitted in the inputText Field
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    const stockSymbol = document.getElementById("inputText").value;
    stockChecker(stockSymbol);
});

// add event listener to the watchlist button that adds the stock symbol to the watchlist
const watchlistButton = document.getElementById("addtowatchlist");
watchlistButton.addEventListener("click", function(e) {
    console.log('watchlist button');
    let stockSymbol = document.getElementById("inputText").value.toUpperCase();
    // get the watchlist from local storage
    let watchlist = JSON.parse(localStorage.getItem("watchlist"));
    // if the watchlist is empty, create a new array and add the stock symbol to it
    if (watchlist === null) {
        watchlist = [];
        watchlist.push(stockSymbol);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } else {
        // if the watchlist is not empty, check if the stock symbol is already in the watchlist
        if (watchlist.indexOf(stockSymbol) === -1) {
            // if the stock symbol is not in the watchlist, add it
            watchlist.push(stockSymbol);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
        } else {
            // if the stock symbol is already in the watchlist, do nothing
            console.log('Stock symbol already in watchlist');
        }
    }
    console.log(watchlist);
    const watchlistcontent = document.getElementById("watchlist");
    // get the watchlist from local storage and pull out the separate stock symbols
    // loop through the stock symbols and add them to the watchlistcontent element
    watchlist = JSON.parse(localStorage.getItem("watchlist"));
    watchlistcontent.innerHTML = '';
    for (let i = 0; i < watchlist.length; i++) {
        watchlistcontent.innerHTML += `<li>${watchlist[i]}<i id=${watchlist[i]} class="fas fa-trash pl-3"></i></li>`;
    }
});

async function stockChecker(stockSymbol) {
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

// Get the current price of the stock
async function getCurrentPrice(stockSymbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        const currentPrice = data["Global Quote"]["05. price"];
        return currentPrice;
    } catch (error) {
        console.error(error);
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
        console.log(data);
        const firstSMA = Object.values(data["Technical Analysis: SMA"])[0].SMA;
        return firstSMA;
    } catch (error) {
        console.error(error);
    }
}

// add event listeners to all the trash icons
// if the trash icon is clicked, remove the stock symbol from the watchlist
const trashIcons = document.querySelectorAll(".fa-trash");
trashIcons.forEach(function(trashIcon) {
    trashIcon.addEventListener("click", function(e) {
        let stockSymbol = e.target.id;
        // get the watchlist from local storage
        let watchlist = JSON.parse(localStorage.getItem("watchlist"));
        // if the watchlist is not empty, check if the stock symbol is already in the watchlist
        if (watchlist.indexOf(stockSymbol) !== -1) {
            // if the stock symbol is in the watchlist, remove it
            watchlist.splice(watchlist.indexOf(stockSymbol), 1);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
        } else {
            // if the stock symbol is not in the watchlist, do nothing
            console.log('Stock symbol not in watchlist');
        }
        const watchlistcontent = document.getElementById("watchlist");
        // get the watchlist from local storage and pull out the separate stock symbols
        // loop through the stock symbols and add them to the watchlistcontent element
        watchlist = JSON.parse(localStorage.getItem("watchlist"));
        watchlistcontent.innerHTML = '';
        for (let i = 0; i < watchlist.length; i++) {
            watchlistcontent.innerHTML += `<li>${watchlist[i]}<i id=${watchlist[i]} class="fas fa-trash pl-3"></i></li>`;
        }
    });
});
