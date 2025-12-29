import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/lib/firebase";


export async function enviarEmail(dados: any) {
  const response = await fetch("/api/enviar-email", {
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

const auth = getAuth();

export const createOrGetUser = async (
  name: string,
  phone?: string
) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await setDoc(userRef, {
      name,
      email: user.email,
      phone: phone || "",
      createdAt: serverTimestamp()
    });
  }

  return userRef;
};

export const saveScheduleRequest = async (data: ScheduleData) => {
  try {
    const userRef = await createOrGetUser(data.name, data.phone);

    const scheduleRef = await addDoc(
      collection(userRef, "sessao_agendada"),
      {
        name: data.name,
        phone: data.phone,
        message: data.message,
        createdAt: serverTimestamp(),
        status: "pending"
      }
    );

    await enviarEmail({
      nome: data.name,
      telefone: data.phone,
      email: data.email,
      mensagem: data.message
    });

    return scheduleRef.id;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};


export const saveTestResult = async (testData: TestData) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const userRef = doc(db, "users", user.uid);

    const testRef = await addDoc(collection(userRef, "teste"), {
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
