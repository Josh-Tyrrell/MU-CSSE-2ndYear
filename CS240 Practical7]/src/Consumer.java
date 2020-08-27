
import java.util.Date;
public class Consumer implements Runnable {
	private Buffer buffer;
	private int id;

	public Consumer (Buffer buffer, int id) {
		this.buffer = buffer;
		this.id = id;
	}

	public void run() {
		Date message;
		while (true) {
			try {
				Thread.sleep(4000); // Sleep for 1000 ms
			} catch (InterruptedException e) {}
			message = (Date) buffer.remove();
			System.out.println("Removed: "+message.toString());
			System.out.println("Consumer ID: "+id);
		}
	}
}