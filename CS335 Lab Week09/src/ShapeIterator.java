import java.util.Iterator;

public class ShapeIterator implements Iterator<Shape>{

	private Shape [] shapes;
	int pos;
	
	public ShapeIterator(Shape []shapes){
		this.shapes = shapes;
	}
	@Override
	public boolean hasNext() {
		if(pos >= shapes.length || shapes[pos] == null)
			return false;
		return true;
	}

	@Override
	public Shape next() {
		return shapes[pos++];
	}
	
	public boolean hasPrev() {
		if((pos -1) <= 0 || shapes[pos-1] == null) {
			return false;
		}
		return true;
	}
	
	public Shape prev() {
		return shapes[(pos--)-1];
	}
	

	@Override
	public void remove() {
		if(pos <=0 )
			throw new IllegalStateException("Illegal position");
		if(shapes[pos-1] !=null){
			for (int i= pos-1; i<(shapes.length-1);i++){
				shapes[i] = shapes[i+1];
			}
			shapes[shapes.length-1] = null;
		}
	}
	
	public boolean contains(String shape) {
		for(int i = 0; i < shapes.length; i++) {
			if(shape == shapes[i].getName()) {	
				return true;
			}
		}
		return false;
	}
	
	
}