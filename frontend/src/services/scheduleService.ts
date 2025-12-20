import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function enviarEmail(dados: any) {
  const API_URL = import.meta.env.VITE_API_URL || "http://192.168.0.197:3000";
  const response = await fetch(`${API_URL}/enviar-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar email");
  }

  return response.json();
}


export interface ScheduleData {
  name: string;
  email: string;
  phone: string;
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
  await enviarEmail({
    nome: data.name,
    telefone: data.phone,
    email: data.email,
    mensagem: data.message
  });
  
  try {
    const userRef = await createOrGetUser(data.email, data.name, data.phone);
    
    const scheduleRef = await addDoc(collection(userRef, 'sessao_agendada'), {
      name: data.name,
      phone: data.phone,
      message: data.message,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    return scheduleRef.id;
  } catch (firebaseError) {
    return 'email-sent-firebase-offline';
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
    throw error;
  }
};