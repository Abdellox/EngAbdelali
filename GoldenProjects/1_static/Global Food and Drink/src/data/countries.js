export const regions = {
  asia: { name: 'Asia', color: '#DC143C' },
  europe: { name: 'Europe', color: '#4169E1' },
  africa: { name: 'Africa', color: '#FF8C00' },
  northAmerica: { name: 'North America', color: '#32CD32' },
  southAmerica: { name: 'South America', color: '#FFD700' },
  middleEast: { name: 'Middle East', color: '#9370DB' },
  oceania: { name: 'Oceania', color: '#20B2AA' }
};

const createFood = (name, description, type, spicy, image, history, recipe) => ({
  name, description, type, spicy, image, history, recipe
});

const createDrink = (name, description, type, image, history, recipe) => ({
  name, description, type, image, history, recipe
});

export const countries = [
  {
    id: 'mexico',
    name: 'Mexico',
    flag: '🇲🇽',
    region: 'northAmerica',
    greeting: '¡Buen provecho!',
    foods: [
      createFood('Tacos al Pastor', 'Marinated pork with pineapple on corn tortillas', 'main', 2, '🌮',
        'Tacos al Pastor originated in the 1930s when Lebanese immigrants brought shawarma to Mexico. Mexican cooks adapted it using local ingredients, creating this iconic fusion dish.',
        ['Marinate pork in achiote paste, pineapple juice, vinegar, and spices for 4 hours', 'Stack marinated pork on a vertical spit (trompo)', 'Roast while rotating, shaving off cooked meat', 'Serve on small corn tortillas with diced onion, cilantro, and pineapple', 'Add lime juice and salsa to taste']),
      createFood('Quesadillas', 'Grilled tortillas filled with cheese', 'main', 1, '🫓',
        'Quesadillas date back to colonial Mexico when Spanish cheese-making merged with indigenous tortilla traditions.',
        ['Heat griddle over medium heat', 'Place tortilla on griddle', 'Sprinkle cheese on half', 'Add optional fillings', 'Fold and cook until golden', 'Serve with salsa']),
      createFood('Tamales', 'Steamed corn dough with filling', 'main', 1, '🫔',
        'Tamales have been made in Mesoamerica for over 8,000 years by Aztecs and Mayans.',
        ['Soak corn husks 30 minutes', 'Beat lard with masa', 'Spread masa on husks', 'Add filling', 'Fold and steam 1.5 hours']),
      createFood('Pozole', 'Traditional soup with hominy', 'main', 2, '🍲',
        'Pozole was a ceremonial dish in pre-Columbian times, served during special occasions.',
        ['Simmer pork 2 hours', 'Add hominy, cook 1 hour', 'Season with dried chiles', 'Serve with toppings']),
      createFood('Churros', 'Fried dough with cinnamon sugar', 'dessert', 0, '🥨',
        'Churros came from Spanish shepherds who created them as an easy mountain treat.',
        ['Boil water with butter', 'Add flour, stir into dough', 'Pipe into hot oil', 'Fry until golden', 'Roll in cinnamon sugar'])
    ],
    drinks: [
      createDrink('Horchata', 'Sweet rice milk with cinnamon', 'soft', '🥛',
        'Horchata came to Mexico from Spain. The Mexican version uses rice instead of tiger nuts.',
        ['Soak rice overnight', 'Blend with water', 'Strain through cheesecloth', 'Add sugar and vanilla', 'Serve over ice']),
      createDrink('Jamaica', 'Hibiscus flower tea', 'tea', '🍵',
        'Jamaica became popular in Mexico during colonial times and is now a staple refreshment.',
        ['Boil water', 'Add hibiscus flowers', 'Steep 15-20 minutes', 'Add sugar and lime', 'Serve cold']),
      createDrink('Tequila', 'Distilled spirit from blue agave', 'alcohol', '🥃',
        'Tequila evolved from pulque, an ancient Aztec fermented agave drink.',
        ['Harvest blue agave', 'Steam agave hearts', 'Extract and ferment juice', 'Distill twice', 'Age in oak barrels'])
    ],
    culturalFacts: [
      'Mexican cuisine is a UNESCO Intangible Cultural Heritage',
      'Corn, beans, and chili peppers are the holy trinity of Mexican cooking',
      'Day of the Dead features special foods like pan de muerto'
    ]
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    region: 'asia',
    greeting: 'いただきます (Itadakimasu)',
    foods: [
      createFood('Sushi', 'Vinegared rice with raw fish', 'main', 0, '🍣',
        'Sushi originated as a preservation method in Southeast Asia, evolving into an art form in Japan.',
        ['Cook and season sushi rice', 'Slice fresh fish thinly', 'Form rice into ovals', 'Top with fish', 'Serve with wasabi and soy sauce']),
      createFood('Ramen', 'Noodle soup with toppings', 'main', 1, '🍜',
        'Ramen came from China in the late 1800s and became uniquely Japanese with regional variations.',
        ['Make broth (tonkotsu, miso, or shoyu)', 'Cook fresh ramen noodles', 'Prepare toppings', 'Assemble bowl with broth and noodles', 'Add toppings']),
      createFood('Tempura', 'Battered fried seafood', 'main', 0, '🍤',
        'Tempura was introduced by Portuguese missionaries in the 16th century.',
        ['Make light batter with ice water', 'Coat seafood and vegetables', 'Fry in hot oil briefly', 'Drain and serve with dipping sauce']),
      createFood('Takoyaki', 'Octopus balls', 'street', 0, '🐙',
        'Takoyaki was invented in Osaka in 1935 and became a popular street food.',
        ['Make batter with dashi', 'Fill takoyaki pan', 'Add octopus pieces', 'Turn balls as they cook', 'Top with sauce and bonito flakes']),
      createFood('Mochi', 'Chewy rice cake', 'dessert', 0, '🍡',
        'Mochi has been made in Japan for over 2,000 years, often for celebrations.',
        ['Steam glutinous rice', 'Pound rice until smooth', 'Shape into balls', 'Fill with sweet bean paste', 'Dust with cornstarch'])
    ],
    drinks: [
      createDrink('Matcha', 'Powdered green tea', 'tea', '🍵',
        'Matcha has been used in Japanese tea ceremonies for over 800 years.',
        ['Sift matcha powder', 'Add hot water (not boiling)', 'Whisk vigorously in M pattern', 'Serve immediately']),
      createDrink('Sake', 'Traditional rice wine', 'alcohol', '🍶',
        'Sake brewing dates back over 2,000 years in Japan.',
        ['Polish rice grains', 'Steam rice', 'Add koji mold', 'Ferment with yeast', 'Press and filter', 'Age and bottle']),
      createDrink('Ramune', 'Carbonated soda with marble', 'soft', '🥤',
        'Ramune was introduced in 1876 and became iconic with its unique marble stopper.',
        ['Commercial production', 'Sealed with glass marble', 'Push marble to open', 'Enjoy fruity flavors'])
    ],
    culturalFacts: [
      'Japanese cuisine emphasizes seasonality and presentation',
      'Umami is the fifth taste, discovered in Japan',
      'Eating sushi with hands is traditional'
    ]
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    region: 'europe',
    greeting: 'Buon appetito!',
    foods: [
      createFood('Margherita Pizza', 'Classic pizza with tomato and mozzarella', 'main', 0, '🍕',
        'Created in 1889 in Naples for Queen Margherita, featuring the colors of the Italian flag.',
        ['Make pizza dough and let rise', 'Stretch dough into circle', 'Spread tomato sauce', 'Add fresh mozzarella', 'Bake at 500°F', 'Top with fresh basil']),
      createFood('Pasta Carbonara', 'Pasta with eggs and pancetta', 'main', 0, '🍝',
        'Carbonara originated in Rome, possibly created by coal miners (carbonari).',
        ['Cook pasta al dente', 'Fry pancetta until crispy', 'Beat eggs with pecorino cheese', 'Toss hot pasta with egg mixture', 'Add pancetta and black pepper']),
      createFood('Risotto', 'Creamy rice dish', 'main', 0, '🍚',
        'Risotto originated in Northern Italy where rice paddies are abundant.',
        ['Toast arborio rice in butter', 'Add wine, let absorb', 'Gradually add hot broth', 'Stir constantly 20 minutes', 'Finish with butter and parmesan']),
      createFood('Tiramisu', 'Coffee-flavored dessert', 'dessert', 0, '🍰',
        'Tiramisu was created in the 1960s in Veneto, meaning "pick me up" in Italian.',
        ['Dip ladyfingers in espresso', 'Layer with mascarpone mixture', 'Repeat layers', 'Dust with cocoa powder', 'Refrigerate overnight']),
      createFood('Gelato', 'Italian ice cream', 'dessert', 0, '🍨',
        'Gelato dates back to Renaissance Florence, perfected by Bernardo Buontalenti.',
        ['Heat milk with sugar', 'Add flavorings', 'Churn at warmer temperature than ice cream', 'Serve at slightly warmer temp for intense flavor'])
    ],
    drinks: [
      createDrink('Espresso', 'Strong concentrated coffee', 'coffee', '☕',
        'Espresso was invented in Milan in 1884 with the first espresso machine.',
        ['Grind coffee beans finely', 'Tamp grounds in portafilter', 'Extract under pressure for 25-30 seconds', 'Serve immediately in small cup']),
      createDrink('Limoncello', 'Lemon liqueur', 'alcohol', '🍋',
        'Limoncello originated in Southern Italy, traditionally made with Sorrento lemons.',
        ['Steep lemon zest in vodka 1 week', 'Make simple syrup', 'Mix alcohol with syrup', 'Bottle and freeze', 'Serve ice cold']),
      createDrink('Aperol Spritz', 'Aperitif cocktail', 'cocktail', '🍹',
        'Aperol Spritz became popular in Venice in the 1950s as a light aperitif.',
        ['Fill glass with ice', 'Add 3 parts prosecco', 'Add 2 parts Aperol', 'Add splash of soda', 'Garnish with orange slice'])
    ],
    culturalFacts: [
      'Italian cuisine varies greatly by region',
      'Cappuccino is traditionally only drunk in the morning',
      'Pasta shapes are matched to specific sauces'
    ]
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    region: 'northAmerica',
    greeting: 'Enjoy your meal!',
    foods: [
      createFood('Burgers', 'Ground beef patty in a bun', 'main', 0, '🍔',
        'The hamburger was popularized at the 1904 St. Louis World\'s Fair.',
        ['Form ground beef into patties', 'Season with salt and pepper', 'Grill or pan-fry to desired doneness', 'Toast buns', 'Assemble with toppings']),
      createFood('BBQ Ribs', 'Slow-cooked pork ribs', 'main', 1, '🍖',
        'American BBQ has roots in indigenous, African, and European cooking traditions.',
        ['Remove membrane from ribs', 'Apply dry rub', 'Smoke at 225°F for 5-6 hours', 'Brush with BBQ sauce', 'Finish on high heat']),
      createFood('Fried Chicken', 'Crispy breaded chicken', 'main', 0, '🍗',
        'Southern fried chicken combines Scottish frying techniques with African seasonings.',
        ['Brine chicken overnight', 'Dredge in seasoned flour', 'Dip in buttermilk', 'Coat again in flour', 'Fry in oil until golden']),
      createFood('Mac and Cheese', 'Pasta with cheese sauce', 'main', 0, '🧀',
        'Thomas Jefferson popularized mac and cheese in America after tasting it in France.',
        ['Cook macaroni', 'Make cheese sauce with butter, flour, milk', 'Add cheddar cheese', 'Mix with pasta', 'Bake with breadcrumb topping']),
      createFood('Apple Pie', 'Classic American dessert', 'dessert', 0, '🥧',
        'Apple pie became an American symbol, though the recipe came from England.',
        ['Make pie crust', 'Slice apples and toss with sugar and cinnamon', 'Fill crust with apples', 'Top with second crust', 'Bake until golden'])
    ],
    drinks: [
      createDrink('Iced Tea', 'Sweet or unsweetened cold tea', 'tea', '🧃',
        'Iced tea was popularized at the 1904 St. Louis World\'s Fair.',
        ['Brew strong black tea', 'Add sugar while hot (for sweet tea)', 'Let cool', 'Serve over ice with lemon']),
      createDrink('Root Beer', 'Sweet carbonated soft drink', 'soft', '🥤',
        'Root beer was created by pharmacist Charles Hires in 1876.',
        ['Commercial production from sassafras and other roots', 'Sweetened and carbonated', 'Served ice cold']),
      createDrink('Bourbon', 'American whiskey', 'alcohol', '🥃',
        'Bourbon originated in Kentucky in the 18th century.',
        ['Mash corn, rye, and barley', 'Ferment with yeast', 'Distill twice', 'Age in charred oak barrels', 'Bottle at minimum 40% alcohol'])
    ],
    culturalFacts: [
      'American cuisine is a melting pot of global influences',
      'Regional BBQ styles vary dramatically across states',
      'Food trucks have become a major culinary trend'
    ]
  },
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    region: 'asia',
    greeting: 'स्वादिष्ट भोजन (Swadisht Bhojan)',
    foods: [
      createFood('Butter Chicken', 'Creamy tomato curry', 'main', 2, '🍛',
        'Butter Chicken was created in Delhi in the 1950s by Kundan Lal Gujral.',
        ['Marinate chicken in yogurt and spices', 'Grill or tandoor cook chicken', 'Make tomato-cream sauce', 'Simmer chicken in sauce', 'Finish with butter and cream']),
      createFood('Biryani', 'Fragrant rice with meat', 'main', 2, '🍚',
        'Biryani came to India with Mughal emperors, blending Persian and Indian cuisines.',
        ['Marinate meat in yogurt and spices', 'Parboil basmati rice', 'Layer rice and meat', 'Add saffron milk', 'Cook on low heat (dum)']),
      createFood('Samosas', 'Fried pastry with filling', 'street', 1, '🥟',
        'Samosas originated in the Middle East and came to India in the 13th century.',
        ['Make dough with flour and oil', 'Prepare spiced potato filling', 'Form triangular pockets', 'Deep fry until golden', 'Serve with chutney']),
      createFood('Dosa', 'Crispy rice crepe', 'main', 1, '🫓',
        'Dosa originated in South India over 2,000 years ago.',
        ['Soak rice and lentils overnight', 'Grind into batter and ferment', 'Spread thin on hot griddle', 'Cook until crispy', 'Serve with sambar and chutney']),
      createFood('Gulab Jamun', 'Sweet milk balls in syrup', 'dessert', 0, '🍡',
        'Gulab Jamun came to India from Persia, becoming a beloved dessert.',
        ['Make dough with milk powder', 'Form small balls', 'Deep fry until brown', 'Soak in rose-cardamom syrup', 'Serve warm'])
    ],
    drinks: [
      createDrink('Chai', 'Spiced milk tea', 'tea', '🍵',
        'Chai became popular in India during British colonial rule, with added spices.',
        ['Boil water with tea leaves', 'Add spices (cardamom, ginger, cinnamon)', 'Add milk and sugar', 'Simmer and strain', 'Serve hot']),
      createDrink('Lassi', 'Yogurt-based drink', 'soft', '🥛',
        'Lassi originated in Punjab and has been enjoyed for thousands of years.',
        ['Blend yogurt with water', 'Add sugar or salt', 'Add flavoring (mango, rose)', 'Blend until frothy', 'Serve chilled']),
      createDrink('Masala Soda', 'Spiced carbonated drink', 'soft', '🥤',
        'Masala soda is a popular Indian street drink combining soda with spices.',
        ['Fill glass with ice', 'Add lemon juice and spices', 'Pour soda water', 'Add black salt', 'Stir and serve'])
    ],
    culturalFacts: [
      'Indian cuisine uses over 40 different spices',
      'Many Indians follow vegetarian diets for religious reasons',
      'Eating with hands is traditional in many regions'
    ]
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    region: 'europe',
    greeting: 'Bon appétit!',
    foods: [
      createFood('Croissant', 'Buttery flaky pastry', 'dessert', 0, '🥐',
        'Croissants were inspired by Austrian kipferl, perfected by French bakers.',
        ['Make dough and refrigerate', 'Laminate with butter', 'Fold multiple times', 'Shape into crescents', 'Proof and bake']),
      createFood('Coq au Vin', 'Chicken braised in wine', 'main', 0, '🍗',
        'This peasant dish dates back to ancient Gaul, refined by Julia Child.',
        ['Marinate chicken in wine', 'Brown bacon and chicken', 'Sauté vegetables', 'Braise in wine', 'Simmer until tender']),
      createFood('Ratatouille', 'Provençal vegetable stew', 'main', 0, '🍲',
        'Ratatouille originated in Nice as a humble peasant dish.',
        ['Slice vegetables thinly', 'Sauté each separately', 'Make tomato sauce', 'Layer vegetables', 'Bake until tender']),
      createFood('Crêpes', 'Thin pancakes', 'dessert', 0, '🥞',
        'Crêpes originated in Brittany in the 13th century.',
        ['Make thin batter', 'Let rest 30 minutes', 'Cook in hot pan', 'Flip when edges lift', 'Fill with sweet or savory']),
      createFood('Macarons', 'Almond meringue cookies', 'dessert', 0, '🍪',
        'Modern macarons were created by Ladurée in the 1930s.',
        ['Age egg whites', 'Make meringue', 'Fold in almond flour', 'Pipe circles', 'Let form skin', 'Bake and sandwich'])
    ],
    drinks: [
      createDrink('Wine', 'World-renowned wines', 'alcohol', '🍷',
        'French winemaking dates back to the 6th century BC.',
        ['Harvest grapes', 'Crush and ferment', 'Press and age', 'Bottle and age further']),
      createDrink('Champagne', 'Sparkling wine', 'alcohol', '🍾',
        'Dom Pérignon pioneered champagne in the 17th century.',
        ['Make base wine', 'Blend wines', 'Secondary fermentation in bottle', 'Age on lees', 'Disgorge and cork']),
      createDrink('Café au Lait', 'Coffee with hot milk', 'coffee', '☕',
        'Café au lait became popular in French homes in the 17th century.',
        ['Brew strong coffee', 'Heat milk', 'Pour equal parts simultaneously', 'Serve in bowl'])
    ],
    culturalFacts: [
      'French cuisine is the foundation of Western culinary arts',
      'France has over 400 types of cheese',
      'Meals are considered social events'
    ]
  },
  {
    id: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    region: 'middleEast',
    greeting: 'Afiyet olsun!',
    foods: [
      createFood('Kebab', 'Grilled meat on skewers', 'main', 1, '🍢',
        'Kebabs have been made in Turkey for centuries, with many regional variations.',
        ['Marinate meat in yogurt and spices', 'Thread onto skewers', 'Grill over charcoal', 'Serve with rice and vegetables', 'Add yogurt sauce']),
      createFood('Döner', 'Rotating spit-roasted meat', 'street', 1, '🥙',
        'Döner kebab was invented in 19th century Ottoman Empire, now popular worldwide.',
        ['Stack seasoned meat on vertical spit', 'Roast while rotating', 'Shave off cooked layers', 'Serve in pita with vegetables', 'Add sauces']),
      createFood('Manti', 'Turkish dumplings', 'main', 1, '🥟',
        'Manti came to Turkey from Central Asia, becoming a beloved comfort food.',
        ['Make thin dough', 'Fill with spiced meat', 'Fold into small parcels', 'Boil or steam', 'Serve with yogurt and butter sauce']),
      createFood('Baklava', 'Layered pastry with nuts', 'dessert', 0, '🥮',
        'Baklava was perfected in Ottoman palace kitchens in the 15th century.',
        ['Layer phyllo dough with butter', 'Add ground pistachios or walnuts', 'Cut into diamonds', 'Bake until golden', 'Pour honey syrup over hot baklava']),
      createFood('Lahmacun', 'Turkish flatbread pizza', 'street', 2, '🫓',
        'Lahmacun originated in southeastern Turkey and Armenia.',
        ['Make thin dough', 'Spread spiced minced meat mixture', 'Bake in hot oven', 'Roll with vegetables and lemon', 'Eat like a wrap'])
    ],
    drinks: [
      createDrink('Turkish Coffee', 'Strong unfiltered coffee', 'coffee', '☕',
        'Turkish coffee dates back to the 16th century Ottoman Empire.',
        ['Grind coffee to powder', 'Mix with water and sugar in cezve', 'Heat until foamy', 'Pour into small cups with grounds', 'Let grounds settle before drinking']),
      createDrink('Ayran', 'Salted yogurt drink', 'soft', '🥛',
        'Ayran has been consumed in Turkey for over 1,000 years.',
        ['Mix yogurt with cold water', 'Add salt to taste', 'Whisk or blend until frothy', 'Serve chilled']),
      createDrink('Raki', 'Anise-flavored spirit', 'alcohol', '🥃',
        'Raki is Turkey\'s national drink, often called "lion\'s milk" when mixed with water.',
        ['Distill grapes twice', 'Add aniseed', 'Dilute with water (turns milky white)', 'Serve with meze'])
    ],
    culturalFacts: [
      'Turkish cuisine bridges Europe and Asia',
      'Tea is the most consumed beverage in Turkey',
      'Breakfast is an elaborate meal with many dishes'
    ]
  },
  {
    id: 'greece',
    name: 'Greece',
    flag: '🇬🇷',
    region: 'europe',
    greeting: 'Καλή όρεξη (Kalí órexi)!',
    foods: [
      createFood('Moussaka', 'Layered eggplant casserole', 'main', 0, '🍆',
        'Moussaka has ancient roots but the modern version was created in the 1920s.',
        ['Slice and fry eggplant', 'Make meat sauce with cinnamon', 'Prepare béchamel sauce', 'Layer eggplant, meat, and sauce', 'Bake until golden']),
      createFood('Souvlaki', 'Grilled meat skewers', 'street', 0, '🍢',
        'Souvlaki dates back to ancient Greece, mentioned in Homer\'s writings.',
        ['Cut meat into cubes', 'Marinate in lemon, olive oil, and oregano', 'Thread onto skewers', 'Grill over charcoal', 'Serve in pita with tzatziki']),
      createFood('Greek Salad', 'Fresh vegetable salad', 'main', 0, '🥗',
        'Greek salad (Horiatiki) is a simple peasant dish showcasing fresh ingredients.',
        ['Chop tomatoes, cucumbers, onions, peppers', 'Add Kalamata olives', 'Top with feta cheese block', 'Drizzle with olive oil and oregano', 'No lettuce in authentic version']),
      createFood('Spanakopita', 'Spinach and feta pie', 'main', 0, '🥧',
        'Spanakopita has been made in Greece for centuries using phyllo dough.',
        ['Sauté spinach with onions', 'Mix with feta and eggs', 'Layer phyllo sheets with butter', 'Add filling', 'Bake until crispy']),
      createFood('Baklava', 'Honey and nut pastry', 'dessert', 0, '🍯',
        'Greek baklava uses walnuts and honey, claimed by both Greece and Turkey.',
        ['Layer phyllo with melted butter', 'Add chopped walnuts and cinnamon', 'Cut into diamonds', 'Bake until golden', 'Pour honey syrup over hot pastry'])
    ],
    drinks: [
      createDrink('Ouzo', 'Anise-flavored aperitif', 'alcohol', '🥃',
        'Ouzo became Greece\'s national drink in the 19th century.',
        ['Distill grapes or grain', 'Add anise and other herbs', 'Dilute with water (turns cloudy)', 'Serve with meze']),
      createDrink('Greek Coffee', 'Strong boiled coffee', 'coffee', '☕',
        'Greek coffee is similar to Turkish coffee, prepared in a briki.',
        ['Add coffee and sugar to briki', 'Add cold water', 'Heat slowly until foamy', 'Pour into cup with foam', 'Let grounds settle']),
      createDrink('Frappé', 'Iced coffee drink', 'coffee', '🧊',
        'Frappé was invented in Greece in 1957 and became a cultural icon.',
        ['Add instant coffee, sugar, and water to shaker', 'Shake vigorously until frothy', 'Pour over ice', 'Add cold water or milk', 'Serve with straw'])
    ],
    culturalFacts: [
      'Greek cuisine emphasizes fresh, simple ingredients',
      'Olive oil is used abundantly in Greek cooking',
      'Meals are social occasions meant to be shared'
    ]
  },
  {
    id: 'lebanon',
    name: 'Lebanon',
    flag: '🇱🇧',
    region: 'middleEast',
    greeting: 'Sahtein!',
    foods: [
      createFood('Hummus', 'Chickpea and tahini dip', 'main', 0, '🫘',
        'Hummus has been made in the Levant for centuries, with Lebanon claiming its perfection.',
        ['Soak and cook chickpeas', 'Blend with tahini, lemon, garlic', 'Add ice water for creaminess', 'Drizzle with olive oil', 'Serve with pita bread']),
      createFood('Falafel', 'Fried chickpea balls', 'street', 0, '🧆',
        'Falafel likely originated in Egypt but became iconic in Lebanese cuisine.',
        ['Soak chickpeas overnight', 'Grind with herbs and spices', 'Form into balls', 'Deep fry until crispy', 'Serve in pita with tahini']),
      createFood('Tabbouleh', 'Parsley and bulgur salad', 'main', 0, '🥗',
        'Tabbouleh originated in the mountains of Lebanon and Syria.',
        ['Soak bulgur wheat', 'Chop parsley finely (lots of it)', 'Add tomatoes, onions, mint', 'Dress with lemon and olive oil', 'Serve fresh']),
      createFood('Shawarma', 'Spiced meat wrap', 'street', 1, '🌯',
        'Shawarma evolved from Turkish döner in the Levant region.',
        ['Marinate meat in spices', 'Stack on vertical spit', 'Roast while rotating', 'Shave off thin slices', 'Wrap in pita with garlic sauce']),
      createFood('Baklava', 'Phyllo pastry with nuts', 'dessert', 0, '🥮',
        'Lebanese baklava uses orange blossom water and pistachios.',
        ['Layer phyllo with ghee', 'Add pistachios', 'Cut into diamonds', 'Bake until golden', 'Pour orange blossom syrup'])
    ],
    drinks: [
      createDrink('Arak', 'Anise-flavored spirit', 'alcohol', '🥃',
        'Arak has been distilled in Lebanon for centuries.',
        ['Distill grapes three times', 'Add aniseed', 'Mix with water and ice (turns white)', 'Serve with mezze']),
      createDrink('Jallab', 'Date and rose syrup drink', 'soft', '🥤',
        'Jallab is a traditional Ramadan drink in Lebanon.',
        ['Mix date molasses with rose water', 'Add water and ice', 'Top with pine nuts and raisins', 'Serve chilled']),
      createDrink('Lebanese Coffee', 'Cardamom-spiced coffee', 'coffee', '☕',
        'Lebanese coffee is similar to Turkish but often includes cardamom.',
        ['Grind coffee with cardamom', 'Boil in rakweh pot', 'Pour with foam', 'Serve in small cups'])
    ],
    culturalFacts: [
      'Lebanese cuisine is known for its mezze (small plates)',
      'Hospitality is central to Lebanese food culture',
      'Fresh herbs are used abundantly'
    ]
  },
  {
    id: 'southkorea',
    name: 'South Korea',
    flag: '🇰🇷',
    region: 'asia',
    greeting: '잘 먹겠습니다 (Jal meokgesseumnida)',
    foods: [
      createFood('Kimchi', 'Fermented spicy cabbage', 'main', 3, '🥬',
        'Kimchi has been made in Korea for over 2,000 years, essential to every meal.',
        ['Salt napa cabbage', 'Make paste with chili, garlic, ginger', 'Coat cabbage with paste', 'Add fish sauce and vegetables', 'Ferment for days to weeks']),
      createFood('Bibimbap', 'Mixed rice with vegetables', 'main', 2, '🍚',
        'Bibimbap originated in Jeonju, meaning "mixed rice" in Korean.',
        ['Cook rice', 'Prepare various vegetables', 'Add fried egg on top', 'Add gochujang sauce', 'Mix everything together before eating']),
      createFood('Korean BBQ', 'Grilled marinated meat', 'main', 1, '🥩',
        'Korean BBQ (Gogigui) became popular after the Korean War.',
        ['Marinate beef in soy, sugar, garlic', 'Grill at the table', 'Wrap in lettuce leaves', 'Add ssamjang sauce', 'Eat with banchan side dishes']),
      createFood('Tteokbokki', 'Spicy rice cakes', 'street', 3, '🍢',
        'Tteokbokki became a popular street food in the 1950s.',
        ['Simmer rice cakes in gochujang sauce', 'Add fish cakes and vegetables', 'Cook until sauce thickens', 'Serve hot and spicy']),
      createFood('Bingsu', 'Shaved ice dessert', 'dessert', 0, '🍧',
        'Bingsu evolved from a simple ice treat to elaborate desserts.',
        ['Shave frozen milk into fine snow', 'Top with sweet red beans', 'Add fruit, mochi, condensed milk', 'Serve immediately'])
    ],
    drinks: [
      createDrink('Soju', 'Clear distilled spirit', 'alcohol', '🍶',
        'Soju has been Korea\'s national drink since the 14th century.',
        ['Distill rice, wheat, or barley', 'Dilute to 16-25% alcohol', 'Serve in shot glasses', 'Traditional drinking etiquette applies']),
      createDrink('Makgeolli', 'Milky rice wine', 'alcohol', '🥛',
        'Makgeolli is Korea\'s oldest alcoholic beverage, dating back 2,000 years.',
        ['Ferment rice with nuruk (starter)', 'Strain partially (cloudy)', 'Serve in bowls', 'Shake before pouring']),
      createDrink('Banana Milk', 'Sweet banana-flavored milk', 'soft', '🥛',
        'Banana milk was created in 1974 to encourage milk consumption.',
        ['Mix milk with banana flavoring', 'Add sugar', 'Serve in iconic yellow bottle', 'Drink chilled'])
    ],
    culturalFacts: [
      'Korean meals always include multiple banchan (side dishes)',
      'Sharing food is central to Korean dining culture',
      'Fermentation is key to many Korean dishes'
    ]
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    flag: '🇻🇳',
    region: 'asia',
    greeting: 'Chúc ngon miệng!',
    foods: [
      createFood('Pho', 'Rice noodle soup', 'main', 1, '🍜',
        'Pho originated in northern Vietnam in the early 20th century.',
        ['Simmer beef bones for hours', 'Add star anise, cinnamon, ginger', 'Cook rice noodles', 'Slice beef thinly', 'Assemble with herbs and lime']),
      createFood('Banh Mi', 'Vietnamese sandwich', 'street', 1, '🥖',
        'Banh mi combines French baguette with Vietnamese ingredients.',
        ['Split crispy baguette', 'Spread pâté and mayo', 'Add pickled vegetables', 'Add grilled meat or tofu', 'Top with cilantro and chilies']),
      createFood('Spring Rolls', 'Fresh rice paper rolls', 'main', 0, '🥢',
        'Vietnamese spring rolls are fresh, unlike fried Chinese versions.',
        ['Soak rice paper in water', 'Add lettuce, herbs, noodles', 'Add shrimp or pork', 'Roll tightly', 'Serve with peanut sauce']),
      createFood('Bun Cha', 'Grilled pork with noodles', 'main', 1, '🍜',
        'Bun cha is a Hanoi specialty, famously eaten by Obama and Bourdain.',
        ['Grill marinated pork patties', 'Prepare fish sauce dressing', 'Cook rice noodles', 'Serve with fresh herbs', 'Dip everything in sauce']),
      createFood('Che', 'Sweet dessert soup', 'dessert', 0, '🍨',
        'Che is a category of Vietnamese sweet soups and puddings.',
        ['Cook beans or tapioca', 'Add coconut milk', 'Sweeten with sugar', 'Add fruit or jelly', 'Serve warm or cold'])
    ],
    drinks: [
      createDrink('Vietnamese Coffee', 'Strong coffee with condensed milk', 'coffee', '☕',
        'Vietnamese coffee culture developed during French colonial rule.',
        ['Brew dark roast coffee in phin filter', 'Let drip slowly into cup', 'Add sweetened condensed milk', 'Stir and serve hot or iced']),
      createDrink('Tra Da', 'Iced tea', 'tea', '🧊',
        'Tra da is served free at most Vietnamese restaurants.',
        ['Brew green or jasmine tea', 'Let cool', 'Serve over ice', 'Sometimes sweetened']),
      createDrink('Sugarcane Juice', 'Fresh pressed cane juice', 'soft', '🥤',
        'Sugarcane juice is a popular street drink in Vietnam.',
        ['Press fresh sugarcane stalks', 'Add lime juice', 'Serve over ice', 'Drink immediately'])
    ],
    culturalFacts: [
      'Vietnamese cuisine balances five elements: spicy, sour, bitter, salty, sweet',
      'Fresh herbs are essential to every meal',
      'Street food culture is vibrant and diverse'
    ]
  },
  {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦',
    region: 'africa',
    greeting: 'بالصحة والراحة (Bssaha w raha)!',
    foods: [
      createFood('Tagine', 'Slow-cooked stew', 'main', 1, '🍲',
        'Tagine is named after the conical clay pot it\'s cooked in, used for centuries.',
        ['Brown meat in tagine pot', 'Add onions, spices, dried fruit', 'Add vegetables', 'Simmer slowly for hours', 'Serve with couscous']),
      createFood('Couscous', 'Steamed semolina grains', 'main', 0, '🍚',
        'Couscous originated with Berbers in North Africa over 1,000 years ago.',
        ['Steam couscous in couscoussier', 'Fluff with butter', 'Prepare vegetable and meat stew', 'Serve couscous topped with stew', 'Traditionally eaten on Fridays']),
      createFood('Pastilla', 'Sweet and savory pie', 'main', 0, '🥧',
        'Pastilla combines Moorish and Berber influences, traditionally made with pigeon.',
        ['Cook chicken with spices', 'Make almond paste with sugar and cinnamon', 'Layer phyllo dough', 'Add chicken and almond layers', 'Bake and dust with powdered sugar']),
      createFood('Harira', 'Tomato and lentil soup', 'main', 1, '🍲',
        'Harira is traditionally eaten to break fast during Ramadan.',
        ['Sauté onions, celery, spices', 'Add tomatoes, lentils, chickpeas', 'Simmer until thick', 'Add vermicelli', 'Finish with lemon and cilantro']),
      createFood('Moroccan Cookies', 'Almond and sesame cookies', 'dessert', 0, '🍪',
        'Moroccan cookies are served with mint tea for hospitality.',
        ['Make dough with almonds and butter', 'Shape into crescents or balls', 'Bake until golden', 'Roll in powdered sugar', 'Serve with tea'])
    ],
    drinks: [
      createDrink('Mint Tea', 'Sweet green tea with mint', 'tea', '🍵',
        'Moroccan mint tea is a symbol of hospitality, served throughout the day.',
        ['Brew green tea', 'Add fresh mint leaves', 'Add lots of sugar', 'Pour from height to create foam', 'Serve in small glasses']),
      createDrink('Avocado Juice', 'Creamy avocado smoothie', 'soft', '🥑',
        'Avocado juice is a popular Moroccan treat.',
        ['Blend avocado with milk', 'Add sugar and vanilla', 'Add ice', 'Blend until smooth', 'Serve immediately']),
      createDrink('Almond Milk', 'Sweet almond drink', 'soft', '🥛',
        'Almond milk is served at celebrations and special occasions.',
        ['Blend almonds with water', 'Strain through cheesecloth', 'Add sugar and orange blossom water', 'Serve chilled'])
    ],
    culturalFacts: [
      'Moroccan cuisine blends Berber, Arab, and Mediterranean influences',
      'Eating with hands from communal dishes is traditional',
      'Spices like cumin, saffron, and cinnamon are essential'
    ]
  },
  {
    id: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    region: 'asia',
    greeting: 'ทานให้อร่อย (Than hai aroi)',
    foods: [
      createFood('Pad Thai', 'Stir-fried rice noodles', 'main', 1, '🍜',
        'Pad Thai was created in the 1930s as part of a nationalist campaign.',
        ['Soak rice noodles', 'Stir-fry shrimp or chicken', 'Add noodles, tamarind, fish sauce', 'Toss with bean sprouts', 'Serve with lime and peanuts']),
      createFood('Tom Yum', 'Spicy and sour soup', 'main', 3, '🍲',
        'Tom Yum represents Thai culinary philosophy of balancing flavors.',
        ['Boil water with lemongrass and galangal', 'Add shrimp and mushrooms', 'Season with fish sauce and lime', 'Add Thai chili paste', 'Finish with cilantro']),
      createFood('Green Curry', 'Coconut curry', 'main', 3, '🍛',
        'Green curry originated in Central Thailand during King Rama VI\'s reign.',
        ['Make green curry paste', 'Fry paste in coconut cream', 'Add chicken or vegetables', 'Pour in coconut milk', 'Add Thai basil']),
      createFood('Som Tam', 'Green papaya salad', 'street', 2, '🥗',
        'Som Tam originated in Laos and Northeastern Thailand.',
        ['Pound garlic and chilies', 'Add palm sugar and fish sauce', 'Pound in green beans and tomatoes', 'Add shredded papaya', 'Mix in peanuts']),
      createFood('Mango Sticky Rice', 'Sweet rice with mango', 'dessert', 0, '🥭',
        'This dessert is especially popular during mango season.',
        ['Steam sticky rice', 'Mix with coconut milk and sugar', 'Slice ripe mango', 'Serve rice with mango', 'Drizzle with coconut cream'])
    ],
    drinks: [
      createDrink('Thai Iced Tea', 'Sweet orange tea', 'tea', '🧋',
        'Thai iced tea was introduced in the 1940s.',
        ['Brew strong black tea with spices', 'Add sugar', 'Pour over ice', 'Top with evaporated milk', 'Stir before drinking']),
      createDrink('Nam Manao', 'Fresh lime soda', 'soft', '🍋',
        'Nam Manao is Thailand\'s refreshing answer to lemonade.',
        ['Squeeze fresh limes', 'Add sugar and salt', 'Fill with ice and soda', 'Stir well']),
      createDrink('Singha Beer', 'Thai lager', 'alcohol', '🍺',
        'Singha was first brewed in 1933, Thailand\'s oldest beer.',
        ['Commercial brewing', 'Best served ice cold', 'Pairs with Thai food'])
    ],
    culturalFacts: [
      'Thai cuisine balances five fundamental flavors',
      'Rice is so central that "to eat" means "to eat rice"',
      'Thai food is eaten with spoon and fork, not chopsticks'
    ]
  },
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    region: 'southAmerica',
    greeting: 'Bom apetite!',
    foods: [
      createFood('Feijoada', 'Black bean stew', 'main', 1, '🍲',
        'Feijoada is Brazil\'s national dish, adapted by enslaved Africans.',
        ['Soak black beans overnight', 'Brown various pork cuts', 'Simmer beans with meat for 3 hours', 'Serve with rice and orange slices']),
      createFood('Pão de Queijo', 'Cheese bread', 'street', 0, '🧀',
        'These cheese breads originated in Minas Gerais in the 18th century.',
        ['Mix tapioca flour with milk and oil', 'Beat in eggs', 'Fold in cheese', 'Bake until puffed']),
      createFood('Moqueca', 'Fish stew with coconut', 'main', 1, '🐟',
        'Moqueca has indigenous origins with African and Portuguese influences.',
        ['Marinate fish in lime', 'Sauté vegetables', 'Add fish and coconut milk', 'Simmer gently', 'Serve in clay pot']),
      createFood('Coxinha', 'Chicken croquette', 'street', 0, '🍗',
        'Coxinha was created in São Paulo in the 19th century.',
        ['Make dough with chicken broth', 'Fill with shredded chicken', 'Shape into teardrops', 'Bread and deep fry']),
      createFood('Brigadeiro', 'Chocolate truffle', 'dessert', 0, '🍫',
        'Brigadeiro was created in the 1940s during a political campaign.',
        ['Mix condensed milk, cocoa, butter', 'Cook until thick', 'Roll into balls', 'Coat with sprinkles'])
    ],
    drinks: [
      createDrink('Caipirinha', 'Cachaça cocktail', 'cocktail', '🍹',
        'Caipirinha is Brazil\'s national cocktail, created in São Paulo.',
        ['Muddle lime with sugar', 'Add ice', 'Pour cachaça', 'Stir well']),
      createDrink('Guaraná', 'Amazonian berry soda', 'soft', '🥤',
        'Guaraná Antarctica launched in 1921, Brazil\'s most popular soda.',
        ['Made from guaraná berries', 'Sweet fruity flavor', 'Served ice cold']),
      createDrink('Cafezinho', 'Strong sweet coffee', 'coffee', '☕',
        'Cafezinho is served throughout the day in Brazil.',
        ['Brew very strong coffee', 'Add sugar while brewing', 'Serve in small cups'])
    ],
    culturalFacts: [
      'Brazil is the world\'s largest coffee producer',
      'Brazilian cuisine blends indigenous, African, and Portuguese influences',
      'Churrasco (BBQ) is a major social tradition'
    ]
  },
  {
    id: 'china',
    name: 'China',
    flag: '🇨🇳',
    region: 'asia',
    greeting: '慢慢吃 (Màn màn chī)',
    foods: [
      createFood('Peking Duck', 'Crispy roasted duck', 'main', 0, '🦆',
        'Peking Duck dates back to the Imperial era, Yuan Dynasty (1271-1368).',
        ['Air-dry duck for 24 hours', 'Glaze with maltose syrup', 'Roast in special oven', 'Slice and serve with pancakes', 'Add scallions and hoisin sauce']),
      createFood('Dim Sum', 'Small steamed dishes', 'main', 0, '🥟',
        'Dim sum originated in Guangdong teahouses along the Silk Road.',
        ['Prepare various fillings', 'Make thin dumpling wrappers', 'Fill and pleat dumplings', 'Steam in bamboo baskets', 'Serve with tea']),
      createFood('Kung Pao Chicken', 'Spicy stir-fry', 'main', 3, '🍗',
        'Named after Qing Dynasty official Ding Baozhen, a Sichuan specialty.',
        ['Marinate diced chicken', 'Stir-fry Sichuan peppercorns', 'Add chicken', 'Add sauce', 'Toss with peanuts']),
      createFood('Xiaolongbao', 'Soup dumplings', 'street', 0, '🥟',
        'These soup dumplings originated in Shanghai in the 19th century.',
        ['Make filling with pork and gelatinized broth', 'Prepare thin wrappers', 'Fill and pleat', 'Steam 6-8 minutes', 'Serve with vinegar']),
      createFood('Mooncake', 'Dense pastry', 'dessert', 0, '🥮',
        'Mooncakes are eaten during Mid-Autumn Festival, dating to Tang Dynasty.',
        ['Make dough with golden syrup', 'Prepare lotus seed paste', 'Wrap filling in dough', 'Press into molds', 'Bake until golden'])
    ],
    drinks: [
      createDrink('Green Tea', 'Traditional Chinese tea', 'tea', '🍵',
        'Tea cultivation in China dates back 5,000 years.',
        ['Heat water to 175-180°F', 'Add green tea leaves', 'Steep 2-3 minutes', 'Strain and serve', 'Can re-steep leaves']),
      createDrink('Baijiu', 'Strong distilled spirit', 'alcohol', '🥃',
        'Baijiu is China\'s national drink, with 5,000 years of history.',
        ['Ferment sorghum', 'Distill multiple times', 'Age in ceramic vessels', 'Serve at room temperature']),
      createDrink('Bubble Tea', 'Tea with tapioca pearls', 'tea', '🧋',
        'Bubble tea was invented in Taiwan in the 1980s.',
        ['Cook tapioca pearls', 'Brew tea and cool', 'Add milk or fruit', 'Add pearls', 'Serve with wide straw'])
    ],
    culturalFacts: [
      'Chinese cuisine has eight major regional styles',
      'The concept of yin and yang applies to food balance',
      'Chopsticks have been used for over 3,000 years'
    ]
  },
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    region: 'europe',
    greeting: '¡Buen provecho!',
    foods: [
      createFood('Paella', 'Saffron rice with seafood', 'main', 0, '🥘',
        'Paella originated in Valencia in the 18th century.',
        ['Heat olive oil in paella pan', 'Sauté chicken or seafood', 'Add rice and saffron', 'Pour in broth', 'Cook until crispy bottom forms']),
      createFood('Tapas', 'Small plates', 'street', 1, '🍤',
        'Tapas tradition began when King Alfonso X ordered wine with food.',
        ['Prepare variety of dishes', 'Patatas bravas', 'Gambas al ajillo', 'Jamón ibérico', 'Serve with wine']),
      createFood('Gazpacho', 'Cold tomato soup', 'main', 0, '🍅',
        'Gazpacho originated in Andalusia as a peasant dish.',
        ['Blend tomatoes, cucumber, pepper', 'Add olive oil and vinegar', 'Strain for smooth texture', 'Chill for 2 hours', 'Serve with croutons']),
      createFood('Churros', 'Fried dough', 'dessert', 0, '🥨',
        'Spanish churros are traditionally eaten for breakfast.',
        ['Make dough with water and flour', 'Pipe into hot oil', 'Fry until golden', 'Roll in sugar', 'Dip in thick hot chocolate']),
      createFood('Jamón Ibérico', 'Cured ham', 'main', 0, '🥓',
        'Jamón Ibérico is one of Spain\'s most prized foods.',
        ['Raise Iberian pigs on acorns', 'Salt the hind legs', 'Cure for 24-48 months', 'Slice paper-thin'])
    ],
    drinks: [
      createDrink('Sangria', 'Red wine punch', 'cocktail', '🍷',
        'Sangria dates back to the Middle Ages.',
        ['Pour red wine into pitcher', 'Add brandy and liqueur', 'Add sliced fruit', 'Refrigerate 4 hours', 'Serve over ice']),
      createDrink('Horchata', 'Tiger nut drink', 'soft', '🥛',
        'Spanish horchata originated in Valencia from Moorish times.',
        ['Soak tiger nuts overnight', 'Blend with water', 'Strain through cheesecloth', 'Add sugar and cinnamon', 'Serve ice cold']),
      createDrink('Cava', 'Spanish sparkling wine', 'alcohol', '🍾',
        'Cava production began in Catalonia in the 1870s.',
        ['Produce base wine', 'Secondary fermentation in bottle', 'Age for minimum 9 months', 'Disgorge and cork'])
    ],
    culturalFacts: [
      'Spain has more bars per capita than any European country',
      'Lunch is the main meal, eaten between 2-4 PM',
      'The siesta tradition is still practiced'
    ]
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'europe',
    greeting: 'Guten Appetit!',
    foods: [
      createFood('Bratwurst', 'Grilled sausage', 'main', 0, '🌭',
        'Bratwurst has been made in Germany since the 14th century.',
        ['Grind pork with spices', 'Stuff into casings', 'Grill or pan-fry', 'Serve with mustard and bread', 'Each region has its own style']),
      createFood('Schnitzel', 'Breaded fried cutlet', 'main', 0, '🍖',
        'Wiener Schnitzel came from Austria but is beloved in Germany.',
        ['Pound veal or pork thin', 'Coat in flour, egg, breadcrumbs', 'Fry in butter until golden', 'Serve with lemon', 'Traditional with potato salad']),
      createFood('Sauerkraut', 'Fermented cabbage', 'main', 0, '🥬',
        'Sauerkraut has been made in Germany for centuries.',
        ['Shred cabbage finely', 'Salt and massage', 'Pack into jars', 'Ferment for weeks', 'Serve warm or cold']),
      createFood('Pretzels', 'Twisted bread', 'street', 0, '🥨',
        'Pretzels originated in German monasteries in the Middle Ages.',
        ['Make dough and let rise', 'Shape into pretzel form', 'Dip in lye solution', 'Sprinkle with coarse salt', 'Bake until brown']),
      createFood('Black Forest Cake', 'Chocolate cherry cake', 'dessert', 0, '🍰',
        'Black Forest Cake originated in the Black Forest region.',
        ['Bake chocolate cake layers', 'Soak with kirsch', 'Layer with whipped cream and cherries', 'Cover with cream', 'Decorate with chocolate shavings'])
    ],
    drinks: [
      createDrink('Beer', 'German lager and ales', 'alcohol', '🍺',
        'German beer purity law (Reinheitsgebot) dates to 1516.',
        ['Brew with water, hops, barley, yeast only', 'Ferment and age', 'Serve in proper glassware', 'Each region has specialties']),
      createDrink('Glühwein', 'Mulled wine', 'alcohol', '🍷',
        'Glühwein is traditional at German Christmas markets.',
        ['Heat red wine with spices', 'Add cinnamon, cloves, star anise', 'Sweeten with sugar', 'Add orange slices', 'Serve hot']),
      createDrink('Apfelschorle', 'Apple juice spritzer', 'soft', '🍎',
        'Apfelschorle is Germany\'s most popular non-alcoholic drink.',
        ['Mix apple juice with sparkling water', 'Usually 50/50 ratio', 'Serve chilled'])
    ],
    culturalFacts: [
      'Germany has over 1,500 types of sausages',
      'Beer gardens are central to German social life',
      'Bread is taken very seriously with 300+ varieties'
    ]
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'europe',
    greeting: 'Enjoy!',
    foods: [
      createFood('Fish and Chips', 'Fried fish with fries', 'main', 0, '🐟',
        'Fish and chips became popular in the 19th century industrial era.',
        ['Batter cod or haddock', 'Deep fry until crispy', 'Cut potatoes into chips', 'Fry until golden', 'Serve with malt vinegar and mushy peas']),
      createFood('Full English Breakfast', 'Traditional breakfast', 'main', 0, '🍳',
        'The full English breakfast dates back to the Victorian era.',
        ['Fry bacon, sausages, eggs', 'Grill tomatoes and mushrooms', 'Make baked beans', 'Toast bread', 'Serve all together']),
      createFood('Shepherd\'s Pie', 'Meat and potato casserole', 'main', 0, '🥧',
        'Shepherd\'s pie was created to use leftover roasted meat.',
        ['Cook ground lamb with vegetables', 'Make mashed potatoes', 'Layer meat in dish', 'Top with mashed potatoes', 'Bake until golden']),
      createFood('Scones', 'Tea time pastry', 'dessert', 0, '🧁',
        'Scones are essential to British afternoon tea tradition.',
        ['Mix flour, butter, sugar', 'Add milk to form dough', 'Cut into rounds', 'Bake until risen', 'Serve with jam and clotted cream']),
      createFood('Sticky Toffee Pudding', 'Date cake with toffee sauce', 'dessert', 0, '🍰',
        'Sticky toffee pudding was created in the 1970s in England.',
        ['Make date cake', 'Bake until moist', 'Make toffee sauce', 'Pour sauce over warm cake', 'Serve with vanilla ice cream'])
    ],
    drinks: [
      createDrink('Tea', 'Black tea with milk', 'tea', '🍵',
        'Tea became Britain\'s national drink in the 17th century.',
        ['Brew strong black tea', 'Add milk (debate: milk first or after)', 'Add sugar if desired', 'Serve with biscuits']),
      createDrink('Pimm\'s', 'Gin-based cocktail', 'cocktail', '🍹',
        'Pimm\'s was created in 1823 and is quintessentially British.',
        ['Mix Pimm\'s No. 1 with lemonade', 'Add cucumber, strawberries, mint', 'Serve over ice', 'Perfect for summer']),
      createDrink('Ale', 'Traditional British beer', 'alcohol', '🍺',
        'British ale has been brewed for over 1,000 years.',
        ['Brew with top-fermenting yeast', 'Serve at cellar temperature', 'Traditional pub drink'])
    ],
    culturalFacts: [
      'Afternoon tea is a cherished British tradition',
      'Pub culture is central to British social life',
      'Sunday roast is a weekly family tradition'
    ]
  },
  {
    id: 'argentina',
    name: 'Argentina',
    flag: '🇦🇷',
    region: 'southAmerica',
    greeting: '¡Buen provecho!',
    foods: [
      createFood('Asado', 'Argentine BBQ', 'main', 0, '🥩',
        'Asado is Argentina\'s national dish, a social tradition dating back centuries.',
        ['Season beef cuts with salt only', 'Grill over wood fire', 'Cook slowly for hours', 'Serve with chimichurri', 'Eat with family and friends']),
      createFood('Empanadas', 'Stuffed pastries', 'street', 0, '🥟',
        'Empanadas came to Argentina from Spain, becoming uniquely Argentine.',
        ['Make dough with flour and lard', 'Prepare beef filling with spices', 'Fill and fold into half-moons', 'Bake or fry', 'Serve hot']),
      createFood('Milanesa', 'Breaded meat cutlet', 'main', 0, '🍖',
        'Milanesa was brought by Italian immigrants in the 19th century.',
        ['Pound beef thin', 'Coat in breadcrumbs', 'Fry until golden', 'Serve with fries or in sandwich', 'Popular comfort food']),
      createFood('Dulce de Leche', 'Caramelized milk', 'dessert', 0, '🍯',
        'Dulce de leche is Argentina\'s most beloved sweet.',
        ['Simmer milk with sugar for hours', 'Stir constantly', 'Cook until thick and caramel-colored', 'Use in desserts or spread on bread']),
      createFood('Alfajores', 'Cookie sandwich', 'dessert', 0, '🍪',
        'Alfajores came from Spain but became iconic in Argentina.',
        ['Make shortbread cookies', 'Sandwich with dulce de leche', 'Roll edges in coconut', 'Some versions dipped in chocolate'])
    ],
    drinks: [
      createDrink('Mate', 'Herbal tea', 'tea', '🧉',
        'Mate is Argentina\'s national drink, shared socially for centuries.',
        ['Fill gourd with yerba mate', 'Add hot (not boiling) water', 'Sip through metal straw (bombilla)', 'Refill and pass to next person', 'Social ritual']),
      createDrink('Malbec Wine', 'Red wine', 'alcohol', '🍷',
        'Argentine Malbec became world-famous in the 20th century.',
        ['Grow Malbec grapes in Mendoza', 'Ferment and age', 'Pairs perfectly with asado']),
      createDrink('Fernet con Coca', 'Bitter liqueur with cola', 'cocktail', '🥤',
        'Fernet con Coca is hugely popular in Argentina, especially Córdoba.',
        ['Fill glass with ice', 'Add Fernet Branca', 'Top with Coca-Cola', 'Stir and serve'])
    ],
    culturalFacts: [
      'Asado is a social event, not just a meal',
      'Mate drinking is a bonding ritual',
      'Dinner is typically eaten very late, after 9 PM'
    ]
  },
  {
    id: 'peru',
    name: 'Peru',
    flag: '🇵🇪',
    region: 'southAmerica',
    greeting: '¡Buen provecho!',
    foods: [
      createFood('Ceviche', 'Raw fish in citrus', 'main', 1, '🐟',
        'Ceviche is Peru\'s national dish, with pre-Columbian origins.',
        ['Cut fresh fish into cubes', 'Marinate in lime juice', 'Add red onion, chili, cilantro', 'Let "cook" in acid 10 minutes', 'Serve with sweet potato and corn']),
      createFood('Lomo Saltado', 'Stir-fried beef', 'main', 0, '🥩',
        'Lomo Saltado reflects Chinese-Peruvian fusion (Chifa cuisine).',
        ['Stir-fry beef strips on high heat', 'Add onions, tomatoes, peppers', 'Season with soy sauce and vinegar', 'Add french fries', 'Serve with rice']),
      createFood('Aji de Gallina', 'Creamy chicken stew', 'main', 1, '🍗',
        'Aji de Gallina has Spanish and indigenous Peruvian roots.',
        ['Shred cooked chicken', 'Make sauce with aji amarillo peppers', 'Add bread, milk, cheese', 'Simmer until creamy', 'Serve over rice with olives and eggs']),
      createFood('Anticuchos', 'Grilled beef heart skewers', 'street', 1, '🍢',
        'Anticuchos date back to the Inca Empire, now popular street food.',
        ['Marinate beef heart in spices', 'Thread onto skewers', 'Grill over charcoal', 'Baste with marinade', 'Serve with potatoes and corn']),
      createFood('Picarones', 'Sweet potato donuts', 'dessert', 0, '🍩',
        'Picarones were created during colonial times as a cheaper alternative to churros.',
        ['Make dough with sweet potato and squash', 'Let ferment', 'Fry in rings', 'Drizzle with chancaca syrup', 'Serve warm'])
    ],
    drinks: [
      createDrink('Pisco Sour', 'Grape brandy cocktail', 'cocktail', '🍹',
        'Pisco Sour is Peru\'s national cocktail, created in Lima in the 1920s.',
        ['Shake pisco with lime juice', 'Add simple syrup and egg white', 'Shake vigorously with ice', 'Strain into glass', 'Top with Angostura bitters']),
      createDrink('Chicha Morada', 'Purple corn drink', 'soft', '🥤',
        'Chicha Morada has been made since Inca times.',
        ['Boil purple corn with pineapple', 'Add cinnamon and cloves', 'Strain and sweeten', 'Add lime juice', 'Serve chilled']),
      createDrink('Inca Kola', 'Golden soda', 'soft', '🥤',
        'Inca Kola was created in Peru in 1935 and outsells Coca-Cola there.',
        ['Commercial production', 'Sweet bubblegum-like flavor', 'Bright yellow color', 'Pairs with Peruvian food'])
    ],
    culturalFacts: [
      'Peruvian cuisine is considered one of the world\'s best',
      'Peru has over 3,000 varieties of potatoes',
      'Ceviche is traditionally eaten for lunch, not dinner'
    ]
  }
];
