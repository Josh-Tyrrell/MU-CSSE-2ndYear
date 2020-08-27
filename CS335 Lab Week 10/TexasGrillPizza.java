
public class TexasGrillPizza extends MealDeals{
	
	@Override
	public String getDesc() {
		return "TexasGrillPizza (350)";
	}

	@Override
	public double getPrice() {
		return 350;
	}
	
	private Pizza pizza;

    @Override
    public Pizza getPizza() {
        pizza = new SimplyNonVegPizza();
        pizza = new Chicken(pizza);
        pizza = new Peppers(pizza);
        pizza = new RedOnions(pizza);
        return pizza;
    }

}
