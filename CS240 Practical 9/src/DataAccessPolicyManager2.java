public class DataAccessPolicyManager2
// This class implements methods to solve the second readers writers problem
// Writers are prioritised over readers 
{
	private int readerCount, writerCount;
	private Semaphore mutexReaderCount, mutexWriterCount, rdr, wrt;
 
   public DataAccessPolicyManager2 () {
	   readerCount = 0;
	   writerCount = 0;
	   mutexReaderCount = new Semaphore(1);
	   mutexWriterCount = new Semaphore(1);
	   rdr = new Semaphore(1);
	   wrt = new Semaphore(1);
   }

   public void acquireReadLock() {
	   rdr.acquire();
	   mutexReaderCount.acquire();
	   readerCount++;
	   if(readerCount == 1)  wrt.acquire();
	   
	   mutexReaderCount.release();
	   rdr.release();
   }	

   public void releaseReadLock() {
	   mutexReaderCount.acquire();
	   readerCount--;
	   if(readerCount == 0)  wrt.release();
	   
	   mutexReaderCount.release();
   }

   public void acquireWriteLock() {
	   mutexWriterCount.acquire();
	   writerCount++;
	   if(writerCount == 1)  rdr.acquire();
	   
	   mutexWriterCount.release();
	   wrt.acquire();
   }
 
   public void releaseWriteLock() {
	   wrt.release();
	   mutexWriterCount.acquire();
	   writerCount--;
	   if(writerCount == 0)  rdr.release();
	   
	   mutexWriterCount.release();
   }
}
