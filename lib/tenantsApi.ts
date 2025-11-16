import { supabase } from './supabaseClient';

export async function getAllTenants() {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function getTenantById(id: string) {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createTenant(tenant: Omit<any, 'id'> & { password?: string }) {
  const { password, name, email, phone, ...rest } = tenant as any;

  // First, create a corresponding user record for this tenant
  const { data: user, error: userError } = await supabase
    .from('users')
    .insert([
      {
        email,
        password,
        role: 'tenant',
        full_name: name,
        phone,
      },
    ])
    .select('id')
    .single();

  if (userError || !user) {
    throw userError;
  }

  // Then, create the tenant linked to that user
  const { data, error } = await supabase
    .from('tenants')
    .insert([
      {
        ...rest,
        name,
        email,
        phone,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTenant(id: string, updates: Partial<any>) {
  const { data, error } = await supabase
    .from('tenants')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteTenant(id: string) {
  const { error } = await supabase
    .from('tenants')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
} 