import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ScheduleData {
  name: string;
  email: string;
  phone: string;
  preferredMode: string;
  preferredTimes: string[];
  message: string;
}

export interface TestData {
  answers: number[];
  score: number;
  result: string;
}

const createOrGetUser = async (email: string, name: string, phone?: string) => {
  const userRef = doc(db, 'users', email);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    await setDoc(userRef, {
      name,
      email,
      phone: phone || '',
      createdAt: serverTimestamp()
    });
  }
  
  return userRef;
};

export const saveScheduleRequest = async (data: ScheduleData) => {
  try {
    const userRef = await createOrGetUser(data.email, data.name, data.phone);
    
    const scheduleRef = await addDoc(collection(userRef, 'sessao_agendada'), {
      name: data.name,
      phone: data.phone,
      preferredMode: data.preferredMode,
      preferredTimes: data.preferredTimes,
      message: data.message,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    
    return scheduleRef.id;
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error);
    throw error;
  }
};

export const saveTestResult = async (email: string, name: string, testData: TestData) => {
  try {
    const userRef = await createOrGetUser(email, name);
    
    const testRef = await addDoc(collection(userRef, 'teste'), {
      answers: testData.answers,
      score: testData.score,
      result: testData.result,
      createdAt: serverTimestamp()
    });
    
    return testRef.id;
  } catch (error) {
    console.error('Erro ao salvar resultado do teste:', error);
    throw error;
  }
};