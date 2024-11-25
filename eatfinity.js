document.addEventListener('DOMContentLoaded', function() {
    console.log('Eatfinity app initialized');
});

function scanGrocery() {
   alert('Grocery scanning activated! This feature will use your camera to scan barcodes.');
}

function showNearbyDonations() {
   alert('Searching for nearby donations... This feature will use geolocation to find food sharing opportunities near you.');
}

function showFeedback() {
   alert('Feedback and Quality Assurance page is under construction.');
}

function getRecipeSuggestions(dietaryRequirements) {
   console.log('Fetching recipe suggestions for:', dietaryRequirements);
   const recipes = [
       { name: "Vegetable Stir Fry", calories: 250, allergens: [] },
       { name: "Chicken Salad", calories: 350, allergens: ["nuts"] },
       { name: "Quinoa Bowl", calories: 300, allergens: [] },
   ];
   
   const filteredRecipes = recipes.filter(recipe => {
       return !dietaryRequirements.allergies.some(allergy => recipe.allergens.includes(allergy));
   });

   console.log('Suggested Recipes:', filteredRecipes);
}

function updateMealPlan(mealPlan) {
   console.log('Updating meal plan with:', mealPlan);
}

function activateVoiceCommand(command) {
   console.log('Voice command activated:', command);
   
   switch (command.toLowerCase()) {
       case "what's expiring soon?":
           checkExpiringItems();
           break;
       case "suggest a recipe":
           getRecipeSuggestions({ allergies: [] }); 
           break;
       default:
           console.log("Command not recognized.");
           break;
   }
}

function checkExpiringItems() {
   console.log('Checking for expiring items...');
   
   const expiringItems = [
       { name: "Milk", expirationDate: "2024-11-25" },
       { name: "Eggs", expirationDate: "2024-11-30" },
       { name: "Spinach", expirationDate: "2024-12-01" },
   ];

   if (expiringItems.length > 0) {
       const itemList = expiringItems.map(item => `${item.name} (expires on ${item.expirationDate})`).join('\n');
       alert(`You have the following items expiring soon:\n${itemList}`);
   } else {
       alert("No items are expiring soon!");
   }
}

function updateUserProfile(profileData) {
   console.log('Updating user profile with:', profileData);
}

function simulateRecipeSearch() {
   const dietaryRequirements = {
       calories: 500,
       allergies: ["nuts"],
       nutrients: ["protein"]
   };
   
   getRecipeSuggestions(dietaryRequirements);
}

function simulateVoiceCommand() {
   const command = prompt("Say a command:");
   activateVoiceCommand(command);
}