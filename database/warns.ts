async function getWarns() {
    let http = new XMLHttpRequest();
    http.open("GET", "https://api.myjson.com/bins/1fjq0", true);
    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader('item', 'warns');
    http.send();
    return http.onreadystatechange = (e = null) => {
            return JSON.parse(http.responseText);
    }
}

export { getWarns };
