import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a friendly and helpful McDonald's AI assistant. Your role is to help customers with:

1. **Menu Information**: Provide details about menu items, including burgers, chicken, breakfast items, sides, desserts, and beverages.
2. **Ordering Assistance**: Help customers build their orders, suggest meal combinations, and answer questions about customization options.
3. **Nutritional Information**: Share calorie counts, allergen information, and dietary options (vegetarian options, etc.).
4. **Deals & Promotions**: Inform customers about current deals, value meals, and special offers.
5. **Store Information**: Answer general questions about McDonald's locations, hours, and services (drive-thru, mobile ordering, delivery).

Key Menu Items to Know:
- **Burgers**: Big Mac, Quarter Pounder, McDouble, Cheeseburger, Hamburger
- **Chicken**: McNuggets, McChicken, Spicy Chicken, Crispy Chicken Sandwich
- **Breakfast**: Egg McMuffin, Sausage McMuffin, Hotcakes, Hash Browns
- **Sides**: French Fries (Small, Medium, Large), Apple Slices
- **Drinks**: Coca-Cola, Sprite, Fanta, Sweet Tea, Coffee, McCafé beverages
- **Desserts**: McFlurry, Apple Pie, Cookies, Sundaes

Always be:
- Friendly and conversational
- Helpful and informative
- Accurate about menu items
- Enthusiastic about McDonald's products
- Clear about what you can and cannot do (you're an AI assistant, not connected to actual ordering systems)

If someone asks to place an actual order, politely explain that you're an informational assistant and direct them to the McDonald's app, website, or in-store ordering.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Simulate AI response with predefined logic
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage.content.toLowerCase();

    let response = '';

    // Menu queries
    if (userInput.includes('menu') || userInput.includes('what can i order')) {
      response = "Our menu includes:\n\n🍔 **Burgers**: Big Mac, Quarter Pounder, McDouble, Cheeseburger\n🍗 **Chicken**: McNuggets, McChicken, Crispy Chicken Sandwich\n🥞 **Breakfast**: Egg McMuffin, Sausage McMuffin, Hotcakes\n🍟 **Sides**: World-famous Fries, Apple Slices\n🥤 **Drinks**: Coca-Cola, Sprite, Coffee, McCafé\n🍦 **Desserts**: McFlurry, Apple Pie, Sundaes\n\nWhat would you like to know more about?";
    }
    // Big Mac queries
    else if (userInput.includes('big mac')) {
      response = "The Big Mac is our iconic burger! 🍔\n\nIt features:\n- Two 100% beef patties\n- Special Big Mac sauce\n- Lettuce, cheese, pickles, onions\n- Sesame seed bun\n\nCalories: ~550\n\nWould you like to know about meal options or other menu items?";
    }
    // McNuggets queries
    else if (userInput.includes('nugget') || userInput.includes('mcnugget')) {
      response = "Our Chicken McNuggets are a fan favorite! 🍗\n\nAvailable in:\n- 4-piece\n- 6-piece\n- 10-piece\n- 20-piece\n\nMade with white meat chicken and served with your choice of dipping sauce (BBQ, Sweet & Sour, Honey Mustard, Ranch, Spicy Buffalo).\n\nWant to know about meal deals?";
    }
    // Breakfast queries
    else if (userInput.includes('breakfast')) {
      response = "Our breakfast menu is available until 10:30 AM! 🥞\n\nPopular items:\n- Egg McMuffin\n- Sausage McMuffin with Egg\n- Bacon, Egg & Cheese Biscuit\n- Hotcakes\n- Hash Browns\n- Coffee & McCafé beverages\n\nWhat would you like to try?";
    }
    // Deals and promotions
    else if (userInput.includes('deal') || userInput.includes('promotion') || userInput.includes('special')) {
      response = "Great timing! 🎉\n\nCheck out our current offers:\n- Value Menu starting at $1\n- Bundle Box Meals\n- Mobile app exclusive deals\n- Daily McCafé deals\n\nDownload the McDonald's app for personalized offers and easy mobile ordering!";
    }
    // Nutrition queries
    else if (userInput.includes('calorie') || userInput.includes('nutrition') || userInput.includes('healthy')) {
      response = "I can help with nutritional information! 🥗\n\nSome lighter options:\n- Grilled Chicken Sandwich\n- Side Salad\n- Apple Slices\n- Fruit & Maple Oatmeal\n\nAll our menu items have detailed nutritional information available. What specific item would you like to know about?";
    }
    // Ordering help
    else if (userInput.includes('order') || userInput.includes('buy')) {
      response = "I'd love to help you order! 📱\n\nYou can order through:\n1. **McDonald's Mobile App** - Easiest way with exclusive deals\n2. **McDelivery** - Through our app or delivery partners\n3. **Drive-Thru** - Quick and convenient\n4. **In-Store** - At the counter or kiosk\n\nI'm an AI assistant, so I can help you decide what to order, but I can't place the actual order. What sounds good to you today?";
    }
    // Greeting
    else if (userInput.includes('hello') || userInput.includes('hi ') || userInput.includes('hey')) {
      response = "Hello! Welcome to McDonald's! 😊 I'm here to help you with menu information, deals, nutrition facts, and more. What can I help you with today?";
    }
    // Thanks
    else if (userInput.includes('thank')) {
      response = "You're very welcome! 😊 Is there anything else I can help you with today? I'm here to answer questions about our menu, deals, or anything else McDonald's related!";
    }
    // Default response
    else {
      response = "I'm happy to help! I can assist you with:\n\n• Menu items and descriptions\n• Nutritional information\n• Current deals and promotions\n• Ordering options\n• General McDonald's questions\n\nWhat would you like to know?";
    }

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
