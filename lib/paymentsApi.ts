import { supabase } from './supabaseClient';

export async function getAllPayments() {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getPaymentById(id: string) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createPayment(payment: Omit<any, 'id'>) {
  const { data, error } = await supabase
    .from('payments')
    .insert([payment])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updatePayment(id: string, updates: Partial<any>) {
  const { data, error } = await supabase
    .from('payments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deletePayment(id: string) {
  const { error } = await supabase
    .from('payments')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
} 