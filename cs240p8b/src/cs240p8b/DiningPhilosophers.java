package cs240p8b;


public class DiningPhilosophers {
	public static void main(String args[]) {
		Semaphore chopSticks[];
		Philosopher workerThread[];
		Semaphore space[];
		
		chopSticks = new Semaphore[5];
		space = new Semaphore[4];
		
		for(int i = 0; i < 4; i++)  {
			space[i] = new Semaphore(1);
		}
		
		for(int i = 0; i < 5; i++) {
			chopSticks[i] = new Semaphore(1);
		}
		workerThread = new Philosopher[5];
		
		for(int i = 0; i < 5; i++) {
			workerThread[i] = new Philosopher(i, chopSticks, space);
			workerThread[i].start();
		}
		
	}
}
