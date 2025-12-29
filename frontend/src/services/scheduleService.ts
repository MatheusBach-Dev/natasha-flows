import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
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

export interface TestimonialData {
  name: string;
  text: string;
  rating: number;
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


export const saveTestResult = async (email: string, name: string, testData: TestData) => {
  try {
    const userRef = await createOrGetUser(email, name);

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

export const saveTestimonial = async (testimonialData: TestimonialData) => {
  try {
    const testimonialRef = await addDoc(collection(db, "testimonials"), {
      name: testimonialData.name,
      text: testimonialData.text,
      rating: testimonialData.rating,
      createdAt: serverTimestamp(),
      approved: false 
    });

    return testimonialRef.id;
  } catch (error) {
    console.error('Erro ao salvar testimonial:', error);
    throw error;
  }
};
