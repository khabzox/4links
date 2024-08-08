// app/api/getLink/[shortId]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/config/firebase';

import {
    getDocs,
    getDoc,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";
  import { ref, uploadBytes } from "firebase/storage";

export async function GET(request, { params }) {
  const { shortId } = params;
  const docRef = doc(db, 'links', shortId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return NextResponse.json(docSnap.data());
  } else {
    return NextResponse.error();
  }
}
