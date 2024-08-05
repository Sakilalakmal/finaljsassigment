document.addEventListener("DOMContentLoaded", function () {
    //attached the submit event listner to the ceckout form.

    document.getElementById("checkout-form").addEventListener("submit", submitOrder);
    //call the funtion populate order details on the page load
    populateOrderDetails();
});

function submitOrder(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    //retrieve form input 
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const town = document.getElementById("town").value;
    const zip = document.getElementById("zip").value;
    const recoveryAddress = document.getElementById("recoveryAddress").value;
    const paymentType = document.getElementById("paymentType").value;
    const cardName = document.getElementById("cardName").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    // Validate the user inputs.
    if (name && email && phone && address && town && zip && paymentType && cardName && expiryDate && cvv) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5); // Assuming delivery takes 5 days
        
        //create delivery date.
        const formattedDate = deliveryDate.toLocaleDateString("en-US", {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        //show alert to customer included name,adress,town,zip code and delivery date.
        alert(`Thank you for your purchase, ${name}! Your order will be delivered to ${address}, ${town}, ${zip} by ${formattedDate}.`);
    } else {
        //if customer dosen't fill every input in form give alert to customer to fill all fields.
        alert("Please fill in all required fields to checkout your order...!");
    }
}

// Function to populate order details on the pay.html page
function populateOrderDetails() {

    //retrieve the order detaild from localstorage or initialize an empty array.
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];

    //get the table body elemnt order details will be appended.
    const tableBody = document.querySelector('#checkout-order-table tbody');
    
    //initialize variable for the total price.
    let totalPrice = 0;

    //iterate other every details.
    orderDetails.forEach(detail => {

        //create new row in table
        const row = document.createElement('tr');

        //populate the row with customer order details
        row.innerHTML = `
            <td>${detail.itemName}</td>
            <td>${detail.category}</td>
            <td>${detail.quantity}</td>
            <td>${detail.price}</td>
        `;
        //append table row to table body
        tableBody.appendChild(row);

        // Extract price from the string, remove '$' and convert to number
        const priceValue = parseFloat(detail.price.replace('Rs.', ''));
        
        //add the price to the total pric
        totalPrice += priceValue;
    });

    //show the total price wich element have id named'total-price'
    document.getElementById('total-price').textContent = `Rs ${totalPrice.toFixed(2)}`;
}