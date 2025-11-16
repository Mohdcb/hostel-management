import { supabase } from './supabaseClient';

export async function getAllRooms() {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .order('number');
  
  if (error) throw error;
  return data;
}

export async function getRoomById(id: string) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createRoom(room: Omit<any, 'id'>) {
  const { data, error } = await supabase
    .from('rooms')
    .insert([room])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateRoom(id: string, updates: Partial<any>) {
  const { data, error } = await supabase
    .from('rooms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteRoom(id: string) {
  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
} 