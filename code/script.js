
// Element variables
const menu = document.getElementById("menu");
const shoppingCart = document.getElementById("shopping-cart");

// Menu items format: title, description, price
const menuItems = [
    {title: "Fries", desc: "Delicious curly fries", price: 2.99},
    {title: "Burger", desc: "Most exquisite cheeseburger", price: 9.00}
]

// Items in cart list
const shoppingCartItems = [];

// Add events
menu.addEventListener("click", (event) => {
    // Check if the event clicked is the purchase button
    if (event.target.className === 'add-to-cart') {
        // Get the product title and price
        const productDiv = event.target.parentNode;
        const title = productDiv.querySelector(".product-title").textContent;
        const price = parseFloat(productDiv.querySelector(".product-price").textContent.slice(1));

        addToCart(title, price);
    }
});
shoppingCart.addEventListener("click", (event) => {
    if (event.target.className === 'del-from-cart') {
        const cartItemDiv = event.target.parentNode;

        const title = cartItemDiv.querySelector(".cart-item-desc").textContent.split(" - ")[0];

        // Remove from cart
        removeFromCart(title);

        // Update shopping cart display
        updateShoppingCartDisplay();
    }
});


// functions
function addProduct(title, description, price) {
    // Product html variable
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const titleElement = document.createElement("h3");
    titleElement.className = "product-title";
    titleElement.textContent = title;

    const descElement = document.createElement("p");
    descElement.className = "product-description";
    descElement.textContent = description;

    const priceElement = document.createElement("p");
    priceElement.className = "product-price";
    priceElement.textContent = "$" + price.toFixed(2);

    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "add-to-cart";
    addToCartBtn.textContent = "Add to cart";

    // Append product details to the product div
    productDiv.appendChild(titleElement);
    productDiv.appendChild(descElement);
    productDiv.appendChild(priceElement);
    productDiv.appendChild(addToCartBtn);

    // Append product to menu
    menu.appendChild(productDiv);
}

function addToCart(title, price) {
    shoppingCartItems.push({title: title, price: price});

    // Update the shopping cart display
    updateShoppingCartDisplay();
}

function removeFromCart(title) {
    const productIndex = shoppingCartItems.findIndex((item) => item.title === title);

    if (productIndex !== -1) {
        shoppingCartItems.splice(productIndex, 1);
    }
}

function updateShoppingCartDisplay() {
    shoppingCart.innerHTML = "";
    let total = 0.0;
    shoppingCartItems.forEach(item => {
        const cartItemDiv = document.createElement("div");
        const removeItemBtn = document.createElement("button");
        const itemText = document.createElement("p");

        cartItemDiv.className = "cart-item";
        itemText.className = "cart-item-desc";
        removeItemBtn.className = "del-from-cart";
        itemText.textContent = `${item.title} - $${item.price.toFixed(2)}`;
        removeItemBtn.textContent = "Del";

        cartItemDiv.appendChild(itemText);
        cartItemDiv.appendChild(removeItemBtn);
        shoppingCart.appendChild(cartItemDiv);

        // Tallying the total price
        total += item.price;
    })
    const orderTotal = document.createElement("p");
    const orderBtn = document.createElement("button");
    orderTotal.className = "order-desc";
    orderTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    orderBtn.id = "place-order";
    orderBtn.innerHTML = "Place Order";

    shoppingCart.appendChild(orderTotal);
    shoppingCart.appendChild(orderBtn);
}

menuItems.forEach(item => {
    addProduct(item.title, item.desc, item.price);
});
