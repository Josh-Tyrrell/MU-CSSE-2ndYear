package cs240p8b;

class Philosopher extends Thread {
	private int myName;
	private Semaphore chopSticks[];
	private Semaphore space[];
	//
	// This is the constructor function which is executed when a Philosopher
	// thread is first created
	//
	public Philosopher(int myName, Semaphore chopSticks[], Semaphore space[]) {
			this.myName = myName; // 'this' distinguishes the local private variable from the
			this.space = space;
			this.chopSticks = chopSticks;
		}
		//
		// This is what each philosopher thread executes
		//
	public void run() {
		while (true) {
			System.out.println("Philosopher "+myName+" thinking.");
		try {
			sleep ((int)(Math.random()*20000));
		} catch (InterruptedException e) {}
		
		space[(myName+1)%4].acquire();
		System.out.println("Philosopher "+myName+" hungry.");
		chopSticks[myName].acquire(); // Acquire right
		chopSticks[(myName+1)%5].acquire(); // Acquire left
		
		System.out.println("Philosopher "+myName+" eating.");
		
		try { // Simulate eating activity for a random time
			sleep ((int)(Math.random()*10000));
		} catch (InterruptedException e) {}
		
		chopSticks[myName].release(); // Release right
		chopSticks[(myName+1)%5].release(); // Release left
		space[(myName+1)%4].release();
		}
	}
}