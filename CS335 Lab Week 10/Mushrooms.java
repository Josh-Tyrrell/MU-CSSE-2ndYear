
public class Mushrooms extends PizzaDecorator{

	private final Pizza pizza;
	
	public Mushrooms(Pizza pizza){
		this.pizza = pizza;
	}

	@Override
	public String getDesc() {
		return pizza.getDesc()+", Mushrooms (1.59)";
	}


	@Override
	public double getPrice() {
		return pizza.getPrice()+1.59;
	}

}
