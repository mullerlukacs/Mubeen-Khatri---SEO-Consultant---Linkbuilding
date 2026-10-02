import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';

export interface AddonItem {
  id?: string;
  title: string;
  description: string;
  price?: string;
  category: string;
  isActive: boolean;
  deliveryTime?: string;
}

export const DEFAULT_ADDONS: AddonItem[] = [
  {
    id: 'addon-schema',
    title: 'Schema.org & Rich Snippets Setup',
    description: 'Custom JSON-LD schema implementation (LocalBusiness, Services, FAQ) to earn Google star ratings and search rich snippets.',
    price: 'Custom / Project',
    category: 'Technical SEO',
    isActive: true,
    deliveryTime: '2–3 Days',
  },
  {
    id: 'addon-speed',
    title: 'Core Web Vitals & PageSpeed Booster',
    description: 'Comprehensive mobile speed optimization to hit 90+ PageSpeed scores, asset minification, and caching for higher rank signals.',
    price: 'Custom / Project',
    category: 'Performance',
    isActive: true,
    deliveryTime: '3–5 Days',
  },
  {
    id: 'addon-wiki-audit',
    title: 'Wikipedia Citation Health Check',
    description: 'Detailed policy compliance audit and reference monitoring to ensure Wikipedia citations remain permanent and authoritative.',
    price: 'Monthly / Ongoing',
    category: 'Link Building',
    isActive: true,
    deliveryTime: 'Continuous',
  },
  {
    id: 'addon-competitor',
    title: 'Competitor Backlink Gap Intelligence',
    description: 'Reverse-engineering top 3 competitors in your niche to identify high-authority guest post and backlink placements.',
    price: 'Single Audit',
    category: 'Strategy',
    isActive: true,
    deliveryTime: '3 Days',
  },
];

const COLLECTION_NAME = 'addons';

export async function getAddons(): Promise<AddonItem[]> {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (snapshot.empty) {
      // Seed default addons to local storage or return defaults
      const local = localStorage.getItem('mubeen_addons');
      if (local) return JSON.parse(local);
      return DEFAULT_ADDONS;
    }
    const addons: AddonItem[] = [];
    snapshot.forEach((d) => {
      addons.push({ id: d.id, ...d.data() } as AddonItem);
    });
    return addons;
  } catch (error) {
    console.warn('Falling back to default addons:', error);
    try {
      const local = localStorage.getItem('mubeen_addons');
      if (local) return JSON.parse(local);
    } catch {
      // fallback
    }
    return DEFAULT_ADDONS;
  }
}

export async function saveAddon(addon: AddonItem): Promise<string> {
  const payload = {
    title: addon.title,
    description: addon.description,
    price: addon.price || 'Contact for Quote',
    category: addon.category || 'General',
    isActive: addon.isActive ?? true,
    deliveryTime: addon.deliveryTime || '1–3 Days',
    updatedAt: new Date().toISOString(),
  };

  try {
    if (addon.id && !addon.id.startsWith('addon-') && !addon.id.startsWith('local_')) {
      await updateDoc(doc(db, COLLECTION_NAME, addon.id), payload);
      return addon.id;
    } else {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
      return docRef.id;
    }
  } catch (error) {
    console.warn('Saving addon locally:', error);
    const existing = await getAddons();
    const newId = addon.id || 'local_' + Date.now();
    const updated = [...existing.filter((a) => a.id !== addon.id), { ...addon, id: newId }];
    localStorage.setItem('mubeen_addons', JSON.stringify(updated));
    return newId;
  }
}

export async function deleteAddon(id: string): Promise<void> {
  try {
    if (!id.startsWith('addon-') && !id.startsWith('local_')) {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    }
    const existing = await getAddons();
    const updated = existing.filter((a) => a.id !== id);
    localStorage.setItem('mubeen_addons', JSON.stringify(updated));
  } catch (error) {
    console.warn('Removing addon locally:', error);
    const existing = await getAddons();
    const updated = existing.filter((a) => a.id !== id);
    localStorage.setItem('mubeen_addons', JSON.stringify(updated));
  }
}
