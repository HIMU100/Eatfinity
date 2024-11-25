document.addEventListener('DOMContentLoaded', function() {
    console.log('Eatfinity Recipe Suggestions & Meal Planning initialized');

    document.getElementById('dietaryForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const maxCalories = event.target[0].value;
        const allergies = event.target[1].value.split(',').map(item => item.trim());
        
        getRecipeSuggestions({ calories: maxCalories, allergies: allergies });
    });

   document.getElementById('mealPlanForm').addEventListener('submit', function(event) {
       event.preventDefault(); 
       const mealName = document.getElementById('mealName').value;
       const mealDate = document.getElementById('mealDate').value;

       addToMealPlan(mealName, mealDate);
   });
});

function getRecipeSuggestions(dietaryRequirements) {
    console.log('Fetching recipe suggestions for:', dietaryRequirements);
    
    const recipes = [
        { name: "Vegetable Stir Fry", calories: 250, allergens: [], description: "A quick and healthy stir fry with seasonal vegetables." },
        { name: "Chicken Salad", calories: 350, allergens: ["nuts"], description: "Grilled chicken on a bed of mixed greens with a light dressing." },
        { name: "Quinoa Bowl", calories: 300, allergens: [], description: "Nutritious quinoa topped with fresh vegetables and avocado." },
        { name: "Beef Tacos", calories: 450, allergens: ["gluten"], description: "Spicy beef tacos served with fresh salsa." },
        { name: "Fruit Smoothie", calories: 200, allergens: [], description: "A refreshing smoothie made with assorted fruits." },
        { name: "Pasta Primavera", calories: 400, allergens: ["gluten"], description: "Pasta tossed with fresh vegetables in a light sauce." }
    ];
    
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.calories <= dietaryRequirements.calories &&
               !dietaryRequirements.allergies.some(allergy => recipe.allergens.includes(allergy));
    });

    displayRecipes(filteredRecipes);
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    
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
        
        setTimeout(() => {
            recipeList.style.opacity = '1';
        }, 100);
        
        recipeList.style.opacity = '0'; 
        setTimeout(() => {
            recipeList.style.opacity = '1'; 
        }, 100);
        
    } else {
        recipeList.innerHTML = '<div class="col-md-12"><div class="alert alert-warning">No recipes found matching your criteria.</div></div>';
    }
}

function addToMealPlan(mealName, mealDate) {
   const mealPlanList = document.getElementById('mealPlanList');
   const listItem = document.createElement('li');
   listItem.className = 'list-group-item';
   listItem.textContent = `${mealName} - ${mealDate}`;
   
   mealPlanList.appendChild(listItem);

   document.getElementById('mealName').value = '';
   document.getElementById('mealDate').value = '';
}