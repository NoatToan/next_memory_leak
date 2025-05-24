'use server';

import { revalidatePath } from 'next/cache';
import { createSession } from '../lib/session';

let rawData: Todo[] = Array.from(Array(50)).fill(1);

// src/app/Todo.ts
export interface Todo {
  id: number;
  text: string;
}

export async function fetchMockTest() {
  // Return mock data
  return {
    message: 'Data fetched successfully',
    timestamp: new Date().toISOString(),
    data: rawData,
  };
}

export async function fetchAddTodo(params: any) {
  rawData = [
    ...Array.from(Array(1000))
      .fill(1)
      .map((_, index) => ({
        id: index + 1 + rawData.length,
        text: `Todo ${new Date().toDateString()}`,
      })),
  ].concat(rawData);
  createSession();
  console.log('rawData', rawData.length);
  revalidatePath('/', 'layout');
}
