import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const FirebaseStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const testRef = doc(db, 'test', 'connection');
    
    const unsubscribe = onSnapshot(
      testRef,
      () => setIsOnline(true),
      () => setIsOnline(false)
    );

    return () => unsubscribe();
  }, []);

  if (isOnline === null) return null;

  return (
    <div className={`fixed top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-50 ${
      isOnline 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      Firebase: {isOnline ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
};

export default FirebaseStatus;