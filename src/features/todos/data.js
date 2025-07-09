
import { api } from '@/lib/api';

export async function getTodos() {
  return api.getTodos();
}
