const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const container = document.getElementById("container")
let totalPurchased = 0

// To hold all of the objects from the API.
let list = []

// Get data from the API and pass it to the renderItemList function.
function getData() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
    renderItemList(data)
    })
}

getData()
addFilterBtn()

// Push the objects to the array 'list' and renderItem().
function renderItemList(data) {
    Object.entries(data).forEach(items => {
      list.push(items[1])
      renderItem(items[1])
    })
}

// Add click event to button for filtering and calling getFilteredItems().
function addFilterBtn() {
    let filterBtn = document.getElementById("filter")

    filterBtn.addEventListener("click", () => {
        getFilteredItems()
    })
}

// Clear the existing divs in Container section tag.
function clearDiv(elementID) {
    document.getElementById(elementID).innerHTML = ""
}

// Filter items via filter() depending on rating.
function getFilteredItems() {
    const rating = parseInt(document.querySelector('input').value)
    let filteredItems = list.filter(items => items.rating >= rating)

    clearDiv("container")

    filteredItems.forEach(items => {
        renderItem(items)
    })
}

// Creates div with multiple elements, appending to container.
function renderItem(items) {
    let wrapper = document.createElement("div")

    wrapper.appendChild(createHorizontalLine())
    wrapper.appendChild(createHeading(items))
    wrapper.appendChild(createImage(items))
    wrapper.appendChild(createParagraph(items))
    wrapper.appendChild(createBuyButton(items))
    wrapper.appendChild(getPrice(items))
    wrapper.appendChild(getRating(items))
    wrapper.appendChild(getStock(items))

    container.appendChild(wrapper)
}

function createHorizontalLine() {
    return document.createElement("hr")
}

function createHeading(items) {
    let h2 = document.createElement("h2")
    h2.innerText = items.name
    return h2
}

// Create and add click event on image
function createImage(items) {
    let img = document.createElement("img")
    let imgObjects = items.images[0]
    img.src = imgObjects.src.small
    img.alt = imgObjects.alt
    img.addEventListener("click", () => {
            totalPurchased += items.price
            let total = document.getElementById("total")
            total.innerText = `Total price: ${totalPurchased} SEK`
            renderPurchaseList(items)
        })
    return img
}

function createParagraph(items) {
    let p = document.createElement("p")
    p.innerText = items.description
    return p
}

// Create and add click event to "Buy Now" button also updating totalprice and 
// through renderPurchaseList() updating list of items in the cart
function createBuyButton(items) {
    let btn = document.createElement("button")
    btn.innerText = "Buy Now"
    btn.addEventListener("click", () => {
        totalPurchased += items.price
        let total = document.getElementById("total")
        total.innerText = `Total price: ${totalPurchased} SEK`

        renderPurchaseList(items)
    })
    return btn
}

function getPrice(items) {
    let price = document.createElement("p")
    price.innerText = `Price: ${items.price}`
    return price
}

function getRating(items) {
    let rating = document.createElement("p")
    rating.innerText = `Rating: ${items.rating}`
    return rating
}

function getStock(items) {
    let stock = document.createElement("p")
    stock.innerText = `Stock: ${items.stock}`
    return stock
}

// Creates li elements and add to unordered list with items name and price
function renderPurchaseList(items) {
    const ul = document.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = `${items.name} - ${items.price} SEK`

    ul.prepend(li)
}

emptyCart()

// Add click event on button "emptyCart" with remove() 
function emptyCart() {
    let btn = document.getElementById("emptyCart")
    let cart = document.querySelector("ul")
    let total = document.getElementById("total")

    btn.addEventListener("click", () => {
        cart.innerHTML = ""
        total.innerText = "Total price:"
        totalPurchased = 0
    })
}
