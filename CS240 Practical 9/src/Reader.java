public class Reader extends Thread {

// All threads which use the data being synchronised should 
// share the same DataAccessPolicyManager object to 
// coordinate access. The instance could be passed in to the 
// constructor for the Reader class.
private DataAccessPolicyManager2 accessManager;


   public Reader (DataAccessPolicyManager2 accessManager) {
   	this.accessManager = accessManager;
   }

   public void run() {
	while (true) {
		accessManager.acquireReadLock();
	   // Acquire readlock
		System.out.println("Reader acquired read lock");
           // Print message "Reader acquired read lock"

	   // Simulate reading with sleep
		try {
			Thread.sleep(1000);
		} catch(InterruptedException ex) {
			Thread.currentThread().interrupt();
		}
           // Print message "Reader finished, releasing read lock"
		System.out.println("Reader finished, releasing read lock");
	   // Release readlock
		accessManager.releaseReadLock();
	   // Sleep before repeating the loop
		try {
			Thread.sleep(1000);
		} catch(InterruptedException ex) {
			Thread.currentThread().interrupt();
		}
	}

   }
}
