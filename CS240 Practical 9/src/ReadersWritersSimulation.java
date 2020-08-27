public class ReadersWritersSimulation {
	public static void main (String args[]) {
		DataAccessPolicyManager2 accessManager = new DataAccessPolicyManager2();
		Reader reader1 = new Reader(accessManager);
		Reader reader2 = new Reader(accessManager);
		Reader reader3 = new Reader(accessManager);
		Writer writer = new Writer(accessManager);
		
		reader1.start();
		reader2.start();
		reader3.start();
		writer.start();
	}
}
