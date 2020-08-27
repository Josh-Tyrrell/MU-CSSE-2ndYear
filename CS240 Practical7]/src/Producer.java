/**
 * 
 */

/**
 * @author dkelly
 *
 */
import java.util.Date;
public class Producer implements Runnable {
	private Buffer buffer;
	private int id;

	public Producer(Buffer buffer, int id) {
		this.buffer = buffer;
		this.id = id;
	}

	public void run() {
		Date message;
		
		while (true) {
			message = new Date(); // produce an item
			try {
				Thread.sleep(3000); // Sleep for 1000 ms
			} catch (InterruptedException e){}
			buffer.insert(message);
			System.out.println("inserted:"+message.toString());
			System.out.println("Producer ID: "+id);
		}
	}
}