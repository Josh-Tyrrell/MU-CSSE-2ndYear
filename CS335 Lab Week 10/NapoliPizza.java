
public class NapoliPizza extends MealDeals{
	
	@Override
	public String getDesc() {
		return "NapoliPizza (380)";
	}

	@Override
	public double getPrice() {
		return 380;
	}
	
	private Pizza pizza;
	@Override
    public Pizza getPizza() {
        pizza = new SimplyVegPizza();
        pizza = new FetaCheese(pizza);
        pizza = new Spinach(pizza);
        pizza = new RomaTomatoes(pizza);
        pizza = new GreenOlives(pizza);
        return pizza;
    }

}
