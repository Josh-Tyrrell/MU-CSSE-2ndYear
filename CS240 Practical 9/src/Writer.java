public class Writer extends Thread {

// All threads which use the data being synchronised should 
// share the same DataAccessPolicyManager object to 
// coordinate access. The instance could be passed in to the 
// constructor for the Reader class.

private DataAccessPolicyManager2 accessManager;


   public Writer (DataAccessPolicyManager2 accessManager) {
   	this.accessManager = accessManager;
   }

   public void run() {
	while (true) {

	   // Acquire writelock
		accessManager.acquireWriteLock();
           // Print message "writer acqui	red write lock"
		System.out.println("Writer acquired write lock");
	   // Simulate writing with sleep
		try {
			Thread.sleep(1000);
		} catch(InterruptedException ex) {
			Thread.currentThread().interrupt();
		}
	   // Print message "writer finished, releasing write lock
		System.out.println("Writer finished, releasing write lock");
	   // Release writelock
		accessManager.releaseWriteLock();
	   // Sleep before repeating the loop
		try {
			Thread.sleep(1000);
		} catch(InterruptedException ex) {
			Thread.currentThread().interrupt();
		}
	}

   }
}
