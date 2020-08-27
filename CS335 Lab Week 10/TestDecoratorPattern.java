import java.text.DecimalFormat;

public class TestDecoratorPattern {
	
	public static void main(String[] args) {
		
		DecimalFormat dformat = new DecimalFormat("#.##");
		Pizza pizza = new SimplyVegPizza();
		
		pizza = new RomaTomatoes(pizza);
		pizza = new GreenOlives(pizza);
		pizza = new Spinach(pizza);
		
		System.out.println("Desc: "+pizza.getDesc());
		System.out.println("Price: "+dformat.format(pizza.getPrice()));
		
		pizza = new SimplyNonVegPizza();
		
		pizza = new Meat(pizza);
		pizza = new Cheese(pizza);
		pizza = new Cheese(pizza);
		pizza = new Ham(pizza);
		
		System.out.println("Desc: "+pizza.getDesc());
		System.out.println("Price: "+dformat.format(pizza.getPrice()));
		
		MealDeals meal1 = new TexasGrillPizza();

        System.out.println("Texas Grill Pizza: "+meal1.getPizza().getDesc());
        System.out.println("Price: "+dformat.format(meal1.getPizza().getPrice()));

        MealDeals meal2 = new NapoliPizza();

        System.out.println("Napoli Pizza: "+meal2.getPizza().getDesc());
        System.out.println("Price: "+dformat.format(meal2.getPizza().getPrice()*0.8));

        MealDeals meal3 = new VegDelightPizza();

        System.out.println("Vegetarian Delight Pizza: "+meal3.getPizza().getDesc());
        System.out.println("Price: "+dformat.format(meal3.getPizza().getPrice()*0.8));
		

	}

}
