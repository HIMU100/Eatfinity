document.addEventListener('DOMContentLoaded', function() {
    console.log('Eatfinity Grocery Scanning initialized');
    document.getElementById('clearButton').addEventListener('click', clearScannedItems);
});

function scanGrocery() {
    const barcodeInput = document.getElementById('barcodeInput');
    const barcode = barcodeInput.value.trim();

    if (barcode) {
        const expirationDate = getRandomExpirationDate();
        const statusClass = getStatusClass(expirationDate);
        
        const listItem = document.createElement('li');
        listItem.className = `list-group-item ${statusClass}`;
        listItem.innerHTML = `
            Item scanned: ${barcode} (Expiration Date: ${expirationDate}) 
            <button class='btn btn-sm btn-warning float-right' onclick='markAsUsed(this)'>Mark as Used</button>`;
        
        listItem.style.opacity = '0';
        document.getElementById('scannedItemsList').appendChild(listItem);

        setTimeout(() => {
            listItem.style.opacity = '1';
        }, 10);

        barcodeInput.value = '';
        barcodeInput.focus();
        
        alert(`Successfully scanned ${barcode}!`);
        
        listItem.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        
    } else {
        alert('Please enter a valid barcode.');
    }
}

function getRandomExpirationDate() {
   const today = new Date();
   const expirationDate = new Date(today);
   expirationDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
   return expirationDate.toLocaleDateString();
}

function getStatusClass(expirationDate) {
   const today = new Date();
   const expDate = new Date(expirationDate);

   const diffTime = expDate - today;
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

   if (diffDays <= 3) return 'expired';         
   else if (diffDays <= 7) return 'near-expiry'; 
   else return 'fresh';                          
}

function markAsUsed(button) {
   const listItem = button.parentElement;
   listItem.style.textDecoration = 'line-through'; 
   button.disabled = true; 
}

function clearScannedItems() {
   const scannedItemsList = document.getElementById('scannedItemsList');

   scannedItemsList.style.opacity = '0';

   setTimeout(() => {
       scannedItemsList.innerHTML = '';
       scannedItemsList.style.opacity = '1';
   }, 500);
}