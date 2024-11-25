// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Eatfinity Grocery Scanning initialized');

    // Add event listener for clearing scanned items
    document.getElementById('clearButton').addEventListener('click', clearScannedItems);
});

// Grocery Scanning functionality
function scanGrocery() {
    const barcodeInput = document.getElementById('barcodeInput');
    const barcode = barcodeInput.value.trim();

    if (barcode) {
        // Simulate scanning item and adding to list
        const expirationDate = getRandomExpirationDate();
        const statusClass = getStatusClass(expirationDate);
        
        const listItem = document.createElement('li');
        listItem.className = `list-group-item ${statusClass}`;
        listItem.innerHTML = `
            Item scanned: ${barcode} (Expiration Date: ${expirationDate}) 
            <button class='btn btn-sm btn-warning float-right' onclick='markAsUsed(this)'>Mark as Used</button>`;
        
        // Add fade-in effect for new items
        listItem.style.opacity = '0';
        document.getElementById('scannedItemsList').appendChild(listItem);

        setTimeout(() => {
            listItem.style.opacity = '1';
        }, 10);

        // Clear input field and refocus
        barcodeInput.value = '';
        barcodeInput.focus();
        
        // Optional alert for successful scan
        alert(`Successfully scanned ${barcode}!`);
        
        // Scroll to the newly added item
        listItem.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        
    } else {
        alert('Please enter a valid barcode.');
    }
}

// Function to generate a random expiration date
function getRandomExpirationDate() {
   const today = new Date();
   const expirationDate = new Date(today);
   expirationDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
   return expirationDate.toLocaleDateString();
}

// Function to determine the status of the item based on expiration date
function getStatusClass(expirationDate) {
   const today = new Date();
   const expDate = new Date(expirationDate);

   const diffTime = expDate - today; // Difference in milliseconds
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

   if (diffDays <= 3) return 'expired';         // Less than or equal to 3 days
   else if (diffDays <= 7) return 'near-expiry'; // Between 4 and 7 days
   else return 'fresh';                          // More than 7 days
}

// Function to mark an item as used
function markAsUsed(button) {
   const listItem = button.parentElement;
   listItem.style.textDecoration = 'line-through'; // Strikethrough effect
   button.disabled = true; // Disable the button after marking as used
}

// Function to clear all scanned items
function clearScannedItems() {
   const scannedItemsList = document.getElementById('scannedItemsList');

   // Add fade-out effect before clearing
   scannedItemsList.style.opacity = '0';

   setTimeout(() => {
       scannedItemsList.innerHTML = '';
       scannedItemsList.style.opacity = '1';
   }, 500);
}