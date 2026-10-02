import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';

export interface InquiryData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'archived';
}

const COLLECTION_NAME = 'inquiries';

/**
 * Submit inquiry to Firestore database.
 * Also keeps an offline copy in localStorage so the user never loses a lead.
 */
export async function submitInquiry(data: Omit<InquiryData, 'id' | 'createdAt' | 'status'> & { phone?: string; service?: string }): Promise<string> {
  const payload: Omit<InquiryData, 'id'> = {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || '',
    service: data.service?.trim() || 'General SEO Inquiry',
    message: data.message.trim(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  // Local storage backup
  try {
    const existing = JSON.parse(localStorage.getItem('mubeen_local_inquiries') || '[]');
    existing.unshift({ ...payload, id: 'local_' + Date.now() });
    localStorage.setItem('mubeen_local_inquiries', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn('Could not backup inquiry locally:', e);
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
    return docRef.id;
  } catch (error) {
    console.error('Failed to submit inquiry to Firestore:', error);
    // If permission or network error, let caller know while local backup is preserved
    handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
  }
}

/**
 * Fetch all inquiries for the admin panel.
 */
export async function getInquiries(): Promise<InquiryData[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const inquiries: InquiryData[] = [];
    snapshot.forEach((d) => {
      inquiries.push({ id: d.id, ...d.data() } as InquiryData);
    });
    return inquiries;
  } catch (error) {
    // Fall back to local inquiries if offline or permission denied
    console.warn('Falling back to local stored inquiries:', error);
    try {
      const local = JSON.parse(localStorage.getItem('mubeen_local_inquiries') || '[]');
      return local as InquiryData[];
    } catch {
      return [];
    }
  }
}

/**
 * Update inquiry status (e.g. mark as 'contacted')
 */
export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'archived'): Promise<void> {
  if (id.startsWith('local_')) {
    try {
      const existing: InquiryData[] = JSON.parse(localStorage.getItem('mubeen_local_inquiries') || '[]');
      const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
      localStorage.setItem('mubeen_local_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return;
  }

  const docPath = `${COLLECTION_NAME}/${id}`;
  try {
    await updateDoc(doc(db, COLLECTION_NAME, id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

/**
 * Delete an inquiry
 */
export async function deleteInquiry(id: string): Promise<void> {
  if (id.startsWith('local_')) {
    try {
      const existing: InquiryData[] = JSON.parse(localStorage.getItem('mubeen_local_inquiries') || '[]');
      const filtered = existing.filter((item) => item.id !== id);
      localStorage.setItem('mubeen_local_inquiries', JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
    return;
  }

  const docPath = `${COLLECTION_NAME}/${id}`;
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
