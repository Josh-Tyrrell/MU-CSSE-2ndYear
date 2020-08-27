
public class DiningPhilosophers {
	public static void main(String args[]) {
		Semaphore chopSticks[];
		Philosopher workerThread[];
		
		chopSticks = new Semaphore[5];
		for(int i = 0; i < 5; i++) {
			chopSticks[i] = new Semaphore(1);
		}
		workerThread = new Philosopher[5];
		
		for(int i = 0; i < 5; i++) {
			workerThread[i] = new Philosopher(i, chopSticks);
			workerThread[i].start();
		}
		
	}
}
