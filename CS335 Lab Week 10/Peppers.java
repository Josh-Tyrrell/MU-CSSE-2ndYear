
public class Peppers extends PizzaDecorator{

	private final Pizza pizza;
	
	public Peppers(Pizza pizza){
		this.pizza = pizza;
	}

	@Override
	public String getDesc() {
		return pizza.getDesc()+", Pineapples (1.79)";
	}


	@Override
	public double getPrice() {
		return pizza.getPrice()+1.79;
	}

}
