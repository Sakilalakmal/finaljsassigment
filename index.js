const prices = {
    'Apple': 200,
    'Banana': 200,
    'Orange': 200,
    'Grapes': 200,
    'Mango': 200,
    'Pineapple': 200,
    'Carrot': 200,
    'Beans': 200,
    'beet-root': 200,
    'Potato': 200,
    'Tomato': 200,
    'Onion': 200,
    'milk-powder': 200,
    'Cheese': 200,
    'Yogurt': 200,
    'Butter': 200,
    'Cream': 200,
    'Eggs': 200,
    'Chicken': 200,
    'Salmon': 200,
    'Beef': 200,
    'Shrimp': 200,
    'Pork': 200,
    'Lamb': 200,
    'Flour': 200,
    'Sugar': 200,
    'Baking Powder': 200,
    'salt': 200,
    'bell-pepper': 200,
    'chocolate-powder': 200,
};

function addItem(name, category) {
    const quantityInput = document.getElementById(`${name.toLowerCase().replace(' ', '-')}-quantity`);
    const quantity = parseFloat(quantityInput.value);
    if (quantity > 0) {
        const price = prices[name] * quantity;
        const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
        const rows = tableBody.getElementsByTagName('tr');
        let itemExists = false;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.cells[0].textContent === name) {
                const existingQuantity = parseFloat(row.cells[2].textContent);
                row.cells[2].textContent = (existingQuantity + quantity).toFixed(1);
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + price).toFixed(2);
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = name;
            row.insertCell(1).textContent = category;
            row.insertCell(2).textContent = quantity.toFixed(1);
            row.insertCell(3).textContent = price.toFixed(2);
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
        }
        updateTotalPrice();
        alert(`Added ${quantity.toFixed(1)} kg of ${name} to your order.\nThank For Choose Us...`);
    } else {
        alert(`Please enter a quantity greater than 0 for ${name}.`);
    }
}

function removeItem(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotalPrice();
}

function updateTotalPrice() {
    let totalPrice = 0;
    const rows = document.querySelectorAll('#order-table tbody tr');
    rows.forEach(row => {
        const price = parseFloat(row.children[3].textContent);
        totalPrice += price;
    });
    document.getElementById('total-price').textContent = `Rs${totalPrice.toFixed(2)}`;
}

function addToFavourites() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    if (rows.length === 0) {
        alert('No items to add to favorite.\nplease choose products to add favorite...!');
        return;
    }
    
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    rows.forEach(row => {
        const itemName = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.children[2].textContent;
        const price = row.children[3].textContent;

        if (!favourites.some(fav => fav.itemName === itemName)) {
            favourites.push({ itemName, category, quantity, price });
        }
    });

    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Chosen products added to favourites.\nYou can apply it after you choose products.');
}

function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (favourites.length === 0) {
        alert('No favourites to apply.\nYou can add favorite to apply favorite..');
        return;
    }
    
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];

    favourites.forEach(fav => {
        const rows = tableBody.getElementsByTagName('tr');
        let itemExists = false;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.cells[0].textContent === fav.itemName) {
                const existingQuantity = parseFloat(row.cells[2].textContent);
                const quantityToAdd = parseFloat(fav.quantity);
                row.cells[2].textContent = (existingQuantity + quantityToAdd).toFixed(1);
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + (prices[fav.itemName] * quantityToAdd)).toFixed(2);
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = fav.itemName;
            row.insertCell(1).textContent = fav.category;
            row.insertCell(2).textContent = fav.quantity;
            row.insertCell(3).textContent = fav.price;
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
        }
    });

    updateTotalPrice();
    alert('Your chosen products were applied.\nYou can customize it.');
}

function clearLocalStorage() {
    localStorage.removeItem('favourites');
    alert('Your favourites have been cleared.\nYou can choose again what you want!');
}

function navigateToCheckout() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    if (rows.length === 0) {
        alert('No items in the order to Purchase...!');
        return;
    }

    const orderDetails = [];
    rows.forEach(row => {
        const itemName = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.children[2].textContent;
        const price = row.children[3].textContent;
        orderDetails.push({ itemName, category, quantity, price });
    });
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = 'pay.html';
}
