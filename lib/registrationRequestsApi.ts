// Registration requests feature has been removed.
// These placeholder functions remain only so imports continue to work
// without touching any database tables.

export async function getAllRegistrationRequests() {
  return [];
}

export async function getRegistrationRequestById(id: string) {
  return null;
}

export async function createRegistrationRequest(request: Omit<any, 'id'>) {
  return null;
}

export async function updateRegistrationRequest(id: string, updates: Partial<any>) {
  return null;
}

export async function deleteRegistrationRequest(id: string) {
  return true;
}
 