
public class TestIteratorPattern {

	public static void main(String[] args) {
		ShapeStorage storage = new ShapeStorage();
 		storage.addShape("Polygon");
		storage.addShape("Hexagon");
		storage.addShape("Circle");
		storage.addShape("Rectangle");
		storage.addShape("Square");
		String particularShape = "Square";
		
		ShapeIterator iterator = new ShapeIterator(storage.getShapes());
		while(iterator.hasNext()){
			System.out.println(iterator.next());
		}

		System.out.println("Checking if "+particularShape+" is contained...");
		System.out.print("Result: ");
		System.out.println(iterator.contains(particularShape));
		
		System.out.println("Iterating in reverse...");
		
		while(iterator.hasPrev()) {
			System.out.println(iterator.prev());
		}
		
		System.out.println("Apply removing while iterating...");
		iterator = new ShapeIterator(storage.getShapes());
		while(iterator.hasNext()){
			System.out.println(iterator.next());
			iterator.remove();
		}
		
		
	}

}