// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Eatfinity Recipe Suggestions & Meal Planning initialized');

    // Add event listener for the dietary form
    document.getElementById('dietaryForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const maxCalories = event.target[0].value;
        const allergies = event.target[1].value.split(',').map(item => item.trim());
        
        getRecipeSuggestions({ calories: maxCalories, allergies: allergies });
    });

   // Add event listener for the meal plan form
   document.getElementById('mealPlanForm').addEventListener('submit', function(event) {
       event.preventDefault(); // Prevent form submission
       const mealName = document.getElementById('mealName').value;
       const mealDate = document.getElementById('mealDate').value;

       addToMealPlan(mealName, mealDate);
   });
});

// Fetch recipe suggestions based on dietary requirements
function getRecipeSuggestions(dietaryRequirements) {
    console.log('Fetching recipe suggestions for:', dietaryRequirements);
    
    // Simulated recipes (replace with actual API call)
    const recipes = [
        { name: "Vegetable Stir Fry", calories: 250, allergens: [], description: "A quick and healthy stir fry with seasonal vegetables." },
        { name: "Chicken Salad", calories: 350, allergens: ["nuts"], description: "Grilled chicken on a bed of mixed greens with a light dressing." },
        { name: "Quinoa Bowl", calories: 300, allergens: [], description: "Nutritious quinoa topped with fresh vegetables and avocado." },
        { name: "Beef Tacos", calories: 450, allergens: ["gluten"], description: "Spicy beef tacos served with fresh salsa." },
        { name: "Fruit Smoothie", calories: 200, allergens: [], description: "A refreshing smoothie made with assorted fruits." },
        { name: "Pasta Primavera", calories: 400, allergens: ["gluten"], description: "Pasta tossed with fresh vegetables in a light sauce." }
    ];
    
    // Filter recipes based on user input
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.calories <= dietaryRequirements.calories &&
               !dietaryRequirements.allergies.some(allergy => recipe.allergens.includes(allergy));
    });

    // Display results
    displayRecipes(filteredRecipes);
}

// Function to display recipes in the list
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    
    // Clear previous results
    recipeList.innerHTML = '';

    if (recipes.length > 0) {
        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class='card mb-4'>
                    <div class='card-body'>
                        <h5 class='card-title'>${recipe.name}</h5>
                        <p class='card-text'>${recipe.description}</p>
                        <p><strong>Calories:</strong> ${recipe.calories}</p>
                    </div>
                </div>`;
            recipeList.appendChild(card);
        });
        
        // Add a fade-in effect for the new cards
        setTimeout(() => {
            recipeList.style.opacity = '1';
        }, 100);
        
        recipeList.style.opacity = '0'; // Start hidden for fade-in effect
        setTimeout(() => {
            recipeList.style.opacity = '1'; // Fade in after cards are added
        }, 100);
        
    } else {
        recipeList.innerHTML = '<div class="col-md-12"><div class="alert alert-warning">No recipes found matching your criteria.</div></div>';
    }
}

// Function to add meals to the meal plan
function addToMealPlan(mealName, mealDate) {
   const mealPlanList = document.getElementById('mealPlanList');
   const listItem = document.createElement('li');
   listItem.className = 'list-group-item';
   listItem.textContent = `${mealName} - ${mealDate}`;
   
   mealPlanList.appendChild(listItem);

   // Clear input fields after adding to the meal plan
   document.getElementById('mealName').value = '';
   document.getElementById('mealDate').value = '';
}