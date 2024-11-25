// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Eatfinity Community Food Sharing initialized');
 
    // Populate shelter dropdown
    populateShelterDropdown();
 
    // Add event listener for the donation form
    document.getElementById('donationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const foodItem = event.target[0].value;
        const quantity = event.target[1].value;
        const foodQuality = event.target[2].value;
        const selectedShelter = event.target[3].value;
 
        // Generate a freshness status based on quality input
        const freshnessStatus = getFreshnessStatus(foodQuality);
 
        listDonation(foodItem, quantity, freshnessStatus, selectedShelter);
        
        // Clear input fields after submission
        event.target.reset();
        
        // Focus back on the food item input for convenience
        event.target[0].focus();
        
        // Display nearby shelters (for demonstration purposes)
        displayNearbyShelters();
        
        // Initialize star rating system
        initStarRating();
        
        // Reset rating message
        document.getElementById('ratingMessage').textContent = '';
        
        // Set up rating click event
        setupRatingClick();
    });
 });
 
 // Function to populate shelter dropdown
 function populateShelterDropdown() {
    const shelters = [
        { name: "Shelter A", contact: "123-456-7890", hours: "9 AM - 5 PM", pickupRequirements: "ID required." },
        { name: "Shelter B", contact: "987-654-3210", hours: "10 AM - 6 PM", pickupRequirements: "No requirements." },
        { name: "Food Bank C", contact: "555-123-4567", hours: "8 AM - 4 PM", pickupRequirements: "Registration needed." },
        { name: "Community Kitchen D", contact: "555-765-4321", hours: "11 AM - 7 PM", pickupRequirements: "First come, first served." }
    ];
 
    const shelterSelect = document.getElementById('shelterSelect');
    shelters.forEach(shelter => {
        const option = document.createElement('option');
        option.value = shelter.name; // Set value to shelter name
        option.textContent = `${shelter.name} (Contact: ${shelter.contact})`; // Display name and contact info
        shelterSelect.appendChild(option);
    });
 }
 
 // Function to determine freshness status based on quality input
 function getFreshnessStatus(quality) {
    if (quality === 'Good') return 'fresh';
    if (quality === 'Fair') return 'near-expiry';
    if (quality === 'Poor') return 'expired';
 }
 
 // Function to add a donation to the list
 function listDonation(foodItem, quantity, freshnessStatus, selectedShelter) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
 
    // Set color indicator based on freshness status
    let indicatorClass = '';
    if (freshnessStatus === 'fresh') {
        indicatorClass = 'green-indicator';
    } else if (freshnessStatus === 'near-expiry') {
        indicatorClass = 'yellow-indicator';
    } else if (freshnessStatus === 'expired') {
        indicatorClass = 'red-indicator';
    }
 
    listItem.innerHTML = `
        ${foodItem} - Quantity: ${quantity} 
        (<span class="${indicatorClass}">${freshnessStatus.charAt(0).toUpperCase() + freshnessStatus.slice(1)}</span>)
        - Donated to: ${selectedShelter}`;
    
    // Add a fade-in effect for new items
    listItem.style.opacity = '0';
    
    document.getElementById('donationList').appendChild(listItem);
    
    // Fade-in animation
    setTimeout(() => {
        listItem.style.opacity = '1';
        listItem.style.transition = 'opacity 0.5s ease-in';
    }, 10);
 }
 
 // Function to initialize star rating system
 function initStarRating() {
    const starRatingContainer = document.getElementById('starRating');
    starRatingContainer.innerHTML = ''; // Clear previous stars
 
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★'; // Unicode star character
        star.dataset.value = i; // Store value in data attribute
 
        star.addEventListener('click', function() {
            const ratingValue = this.dataset.value;
            document.getElementById('ratingMessage').textContent = `You rated this donation ${ratingValue} out of 5 stars!`;
            highlightStars(ratingValue);
        });
 
        starRatingContainer.appendChild(star);
    }
 }
 
 // Function to highlight stars based on rating value
 function highlightStars(ratingValue) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < ratingValue) {
            star.style.color = 'gold'; // Highlight selected stars
        } else {
            star.style.color = ''; // Reset color for unselected stars
        }
    });
 }
 
 // Function to display nearby shelters (mock data for demonstration)
 function displayNearbyShelters() {
    const shelterListDisplay = document.getElementById('shelterListDisplay');
    shelterListDisplay.innerHTML = ''; // Clear previous shelters
 
    const shelters = [
        { name: "Shelter A", contact: "123-456-7890", hours: "9 AM - 5 PM", pickupRequirements: "ID required." },
        { name: "Shelter B", contact: "987-654-3210", hours: "10 AM - 6 PM", pickupRequirements: "No requirements." },
        { name: "Food Bank C", contact: "555-123-4567", hours: "8 AM - 4 PM", pickupRequirements: "Registration needed." },
        { name: "Community Kitchen D", contact: "555-765-4321", hours: "11 AM - 7 PM", pickupRequirements: "First come, first served." }
    ];
 
    shelters.forEach(shelter => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `<strong>${shelter.name}</strong><br>Contact: ${shelter.contact}<br>Hours: ${shelter.hours}<br>Pickup Requirements: ${shelter.pickupRequirements}`;
       shelterListDisplay.appendChild(listItem);
  });
 }