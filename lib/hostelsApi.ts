import { supabase } from './supabaseClient';

export async function getAllHostels() {
  const { data, error } = await supabase
    .from('hostels')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function getHostelById(id: string) {
  const { data, error } = await supabase
    .from('hostels')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createHostel(hostel: Omit<any, 'id'>) {
  const { data, error } = await supabase
    .from('hostels')
    .insert([hostel])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateHostel(id: string, updates: Partial<any>) {
  const { data, error } = await supabase
    .from('hostels')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteHostel(id: string) {
  const { error } = await supabase
    .from('hostels')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

export async function getHostelsByAdmin(adminId: string) {
  const { data, error } = await supabase
    .from('hostels')
    .select('*')
    .order('name')
    .eq('admin_id', adminId);
  
  if (error) throw error;
  return data;
} 