async function getCurrency() {
    let http = new XMLHttpRequest();
    http.open("GET", "https://api.myjson.com/bins/1fjq0", true);
    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader('item', 'currency');
    http.send();
    http.onreadystatechange = (e = null) => {
            return JSON.parse(http.responseText);
    }
}

export { getCurrency };