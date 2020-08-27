
public class Pineapples extends PizzaDecorator{

	private final Pizza pizza;
	
	public Pineapples(Pizza pizza){
		this.pizza = pizza;
	}

	@Override
	public String getDesc() {
		return pizza.getDesc()+", Pineapples (2.83)";
	}


	@Override
	public double getPrice() {
		return pizza.getPrice()+2.83;
	}
	
	
}
