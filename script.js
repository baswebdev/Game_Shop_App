document.addEventListener("DOMContentLoaded", function () {
    const gameList = document.getElementById("game-list");
    const gameDetails = document.getElementById("game-details");
    const cartList = document.getElementById("cart");
    const cartTotal = document.getElementById("total-amount");
    const checkoutButton = document.getElementById("checkout");

    const games = [
        { id: 1, name: "Spiel 1", description: "Eine ausführliche Beschreibung von Spiel 1.", price: 20.90, 
          image: "img/1.png", image1: "img/1.png", image2: "img/1.1.png", image3: "img/1.2.png" },
        { id: 2, name: "Spiel 2", description: "Eine ausführliche Beschreibung von Spiel 2.", price: 29.90, 
          image: "img/2.png", image1: "img/2.png", image2: "img/2.1.png", image3: "img/2.2.png" },
        { id: 3, name: "Spiel 3", description: "Eine ausführliche Beschreibung von Spiel 3.", price: 14.90, 
          image: "img/3.png", image1: "img/3.png", image2: "img/3.1.png", image3: "img/3.2.png" }
    ];

    const cart = [];

    function showGameDetails(game) {
        gameDetails.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${game.image}" alt="${game.name}">
            <p>${game.description}</p>
            <img src="${game.image1}" alt="Bild 1">
            <img src="${game.image2}" alt="Bild 2">
            <img src="${game.image3}" alt="Bild 3">
            <p>Preis: CHF ${game.price.toFixed(2)}</p>
            <button id="add-to-cart">In den Warenkorb</button>
        `;
        const addToCartButton = document.getElementById("add-to-cart");
        addToCartButton.addEventListener("click", function () {
            addToCart(game);
        });
    }

    function addToCart(game) {
        const existingItem = cart.find(item => item.id === game.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: game.id, name: game.name, price: game.price, quantity: 1 });
        }
        updateUI();
    }

    function removeFromCart(game) {
        const existingItem = cart.find(item => item.id === game.id);
        if (existingItem) {
            existingItem.quantity -= 1;
            if (existingItem.quantity === 0) {
                const index = cart.indexOf(existingItem);
                cart.splice(index, 1);
            }
        }
        updateUI();
    }

    function displayCart() {
        cartList.innerHTML = "";
        cart.forEach(game => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${game.name} - CHF ${game.price.toFixed(2)} x${game.quantity}</span>
                <button class="remove-from-cart">Löschen</button>
            `;
            cartList.appendChild(li);

            const removeButtons = li.getElementsByClassName("remove-from-cart");
            for (const button of removeButtons) {
                button.addEventListener("click", () => removeFromCart(game));
            }
        });
    }

    function updateUI() {
        displayGameList();
        displayCart();
        calculateTotal();
    }

    function checkout() {
        alert("Vielen Dank für Ihre Bestellung!");
    }

    checkoutButton.addEventListener("click", checkout);

    function displayGameList() {
        gameList.innerHTML = "";
        games.forEach(game => {
            const li = document.createElement("li");
            li.dataset.id = game.id;
            const img = document.createElement("img");
            img.src = game.image;
            img.alt = game.name;
            const span = document.createElement("span");
            span.textContent = game.name;
            li.appendChild(img);
            li.appendChild(span);
            li.addEventListener("click", () => showGameDetails(game));
            gameList.appendChild(li);
        });
    }

    function calculateTotal() {
        let total = cart.reduce((sum, game) => sum + game.price * game.quantity, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    updateUI();
});

