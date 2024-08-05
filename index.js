//intialize price for each products.
const prices = {
    'Apple': 850,
    'Banana': 555,
    'Orange': 200,
    'Grapes': 750,
    'Mango': 1150,
    'Pineapple': 1200,
    'Carrot': 555,
    'Beans': 350,
    'beet-root': 250,
    'Potato': 650,
    'Tomato': 775,
    'Onion': 600,
    'milk-powder': 1900,
    'Cheese': 2200,
    'Yogurt': 50,
    'Butter': 450,
    'Cream': 550,
    'Eggs': 700,
    'Chicken': 1350,
    'Salmon': 1200,
    'Beef': 2340,
    'Shrimp': 3200,
    'Pork': 2200,
    'Lamb': 2100,
    'Flour': 930,
    'Sugar': 320,
    'Baking Powder': 1670,
    'salt': 1980,
    'olive-oil': 760,
    'chocolate-powder': 896,
};

//add items to the order table
function addItem(name, category) {

    //parse the quantity for the each item
    const quantityInput = document.getElementById(`${name.toLowerCase().replace(' ', '-')}-quantity`);
    const quantity = parseFloat(quantityInput.value);

    //check quantity is greater than zero or not
    if (quantity > 0) {
        const price = prices[name] * quantity; //calculate price for the enter quantity
        const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
        const rows = tableBody.getElementsByTagName('tr');
        let itemExists = false;

        //check any products already in order table
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.cells[0].textContent === name) {
                //if items in order table update pice and quantity

                const existingQuantity = parseFloat(row.cells[2].textContent);
                row.cells[2].textContent = (existingQuantity + quantity).toFixed(1);
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + price).toFixed(2);
                itemExists = true;
                break;
            }
        }
//if products not in order table update the order table and add row for order details
        if (!itemExists) {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = name;
            row.insertCell(1).textContent = category;
            row.insertCell(2).textContent = quantity.toFixed(1);
            row.insertCell(3).textContent = price.toFixed(2);
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
        }
        updateTotalPrice(); //after upate the table count total price
        alert(`Added ${quantity.toFixed(1)} kg of ${name} to your order.\nThank For Choose Us...`);
    } else {
        alert(`Please enter a quantity greater than 0 for ${name}.`);//if quantity is not greater than zero notify user to eneter quantity greater than zero
    }
}

//remove item from orer table when click on remove button
function removeItem(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);//remove the order row
    updateTotalPrice(); //after remove the order, count total price again 
}

//update total price
function updateTotalPrice() {
    let totalPrice = 0;
    const rows = document.querySelectorAll('#order-table tbody tr'); //read all rows in the order table
    rows.forEach(row => {
        const price = parseFloat(row.children[3].textContent); //read prices from each products
        totalPrice += price; //sum to the prices
    });
    document.getElementById('total-price').textContent = `Rs${totalPrice.toFixed(2)}`; //update total in displyed on the web page
}

//add items to favorite
function addToFavourites() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    if (rows.length === 0) {

        //if there not any items in order give alert message to user
        alert('No items to add to favorite.\nplease choose products to add favorite...!');
        return;
    }
    
    const favourites = JSON.parse(localStorage.getItem('favourites')) || []; //store in the local storage.

    rows.forEach(row => {

        //get the order details from the table
        const itemName = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.children[2].textContent;
        const price = row.children[3].textContent;
            
        //check order is not in already in favorite array.
        if (!favourites.some(fav => fav.itemName === itemName)) {
            favourites.push({ itemName, category, quantity, price }); // order is not in array add it to favorite array.
        }
    });

    localStorage.setItem('favourites', JSON.stringify(favourites)); //updated the favorite array into the local storage.
    alert('Chosen products added to favourites.\nYou can apply it after you choose products.'); //give alert messsage to user to notify their order added to favorites
}

function applyFavourites() {
    //get the favorite array from local storage or get as empty array it is dosen't exist in local storage.
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    //check there are any favorite to apply 
    if (favourites.length === 0) {

        //if there are not any favorite give alert to user and exit the funtions
        alert('No favourites to apply.\nYou can add favorite to apply favorite..');
        return;
    }
    
    //table body from the order table.
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];

    //iterate over each favorite item
    favourites.forEach(fav => {
        const rows = tableBody.getElementsByTagName('tr'); //all rows from the order table.
        let itemExists = false;

        //check any item already exist in the order table.
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.cells[0].textContent === fav.itemName) {

                //if item already exist ,update the quantity and prices.
                const existingQuantity = parseFloat(row.cells[2].textContent);
                const quantityToAdd = parseFloat(fav.quantity);
                row.cells[2].textContent = (existingQuantity + quantityToAdd).toFixed(1);
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + (prices[fav.itemName] * quantityToAdd)).toFixed(2);
                itemExists = true;
                break;
            }
        }

        //if the items dosen't exsit update new row for order.
        if (!itemExists) {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = fav.itemName;
            row.insertCell(1).textContent = fav.category;
            row.insertCell(2).textContent = fav.quantity;
            row.insertCell(3).textContent = fav.price;
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
        }
    });

    //update the total price after appling the favorites.
    updateTotalPrice();

    //give alert to user to their order apply from favorite.
    alert('Your chosen products were applied.\nYou can customize it.');
}

function clearLocalStorage() {

    //remove the customer favorite from the local storage.
    localStorage.removeItem('favourites');

    //give alert messase user to notify the their favorite cleared .
    alert('Your favourites have been cleared.\nYou can choose again what you want!');
}

function navigateToCheckout() {

    //getting all rows from the order table.
    const rows = document.querySelectorAll('#order-table tbody tr');

    //check if there not any order in order table.
    if (rows.length === 0) {

        //if not  any items found in order table give alert and notify the user there are not any order to checkout.
        alert('No items in the order to Purchase...!');
        return;
    }

    //intialize array to store the order details.
    const orderDetails = [];

    //iterate all rows from the table.
    rows.forEach(row => {

        //get order details from each rows.
        const itemName = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.children[2].textContent;
        const price = row.children[3].textContent;

        //add the order details info to the order details array above we created.
        orderDetails.push({ itemName, category, quantity, price });
    });

    //store the order details in local storage.
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    //redirect user to pay.html page to checkout their order.
    window.location.href = 'pay.html';
}
