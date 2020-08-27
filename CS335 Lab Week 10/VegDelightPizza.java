
public class VegDelightPizza extends MealDeals{
	
	@Override
	public String getDesc() {
		return "VegDelightPizza (400)";
	}

	@Override
	public double getPrice() {
		return 400;
	}
	
	private Pizza pizza;
	
	@Override
    public Pizza getPizza() {
        pizza = new SimplyVegPizza();
        pizza = new Spinach(pizza);
        pizza = new GreenOlives(pizza);
        pizza = new RedOnions(pizza);
        pizza = new Broccoli(pizza);
        return pizza;
    }

}
