import stockChecker from './stockChecker.js';

function getWatchListContent(watchlist, i) {
    const watchlistInnerHTML = `<li style="list-style-type: none;"><a style="color:#28a745" href="https://stockcharts.com/h-sc/ui?s=${watchlist[i]}" target="_blank">${watchlist[i]}</a><i id=${watchlist[i]} class="fas fa-trash pl-3" onClick="removeStock(event)"></i></li>`;
    return watchlistInnerHTML;
}

// Define the removeStock function initially so its available when the removeStock onclick event is triggered
window.removeStock = function(event) {
    let stockSymbol = event.target.id;
    let watchlist = JSON.parse(localStorage.getItem("watchlist"));
    let index = watchlist.indexOf(stockSymbol);
    watchlist.splice(index, 1);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    const watchlistcontent = document.getElementById("watchlist");
    watchlistcontent.innerHTML = '';
    for (let i = 0; i < watchlist.length; i++) {
        watchlistcontent.innerHTML += getWatchListContent(watchlist, i);
    }
}


// initially load the watchlist from local storage and add the stock symbols to the watchlistcontent element
const watchlistcontent = document.getElementById("watchlist");
let watchlist = JSON.parse(localStorage.getItem("watchlist"));
if (watchlist !== null) {
    for (let i = 0; i < watchlist.length; i++) {
        watchlistcontent.innerHTML += getWatchListContent(watchlist, i);
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
    const watchlistcontent = document.getElementById("watchlist");
    // get the watchlist from local storage and pull out the separate stock symbols
    // loop through the stock symbols and add them to the watchlistcontent element
    watchlist = JSON.parse(localStorage.getItem("watchlist"));
    watchlistcontent.innerHTML = '';
    for (let i = 0; i < watchlist.length; i++) {
        watchlistcontent.innerHTML += getWatchListContent(watchlist, i);
    }
});






