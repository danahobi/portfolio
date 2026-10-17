import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db, auth, isOwner, handleFirestoreError, OperationType } from '../lib/firebase';
import { Project, Service, PricingPlan, Testimonial, FaqItem, SiteProfile } from '../types';
import {
  PROJECTS as DEFAULT_PROJECTS,
  SERVICES as DEFAULT_SERVICES,
  PRICING_PLANS as DEFAULT_PRICING,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  FAQ_ITEMS as DEFAULT_FAQS,
  PROFILE_INFO as DEFAULT_PROFILE
} from '../data/portfolioData';

// Firestore collection names
export const COLLECTIONS = {
  PROJECTS: 'projects',
  SERVICES: 'services',
  PRICING: 'pricingPlans',
  TESTIMONIALS: 'testimonials',
  FAQS: 'faqs',
  SETTINGS: 'settings',
} as const;

// Auto-seed database if empty (Only permitted for authenticated owner)
export async function seedInitialDataIfEmpty(): Promise<boolean> {
  // Never attempt write operations if user is not signed in as owner
  if (!auth.currentUser || !isOwner(auth.currentUser.email)) {
    return false;
  }
  try {
    const projectsSnap = await getDocs(collection(db, COLLECTIONS.PROJECTS));
    if (projectsSnap.empty) {
      console.log('Database empty, auto-seeding default portfolio data as authenticated owner...');
      await forceSeedDatabase();
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Could not auto-seed database:', error);
    return false;
  }
}

// Force seed database with all initial rich portfolio data
export async function forceSeedDatabase(): Promise<void> {
  if (!auth.currentUser || !isOwner(auth.currentUser.email)) {
    throw new Error('Only the authenticated portfolio owner (danahobi20@gmail.com) can seed the database.');
  }
  try {
    // 1. Seed Projects
    for (let i = 0; i < DEFAULT_PROJECTS.length; i++) {
      const p = DEFAULT_PROJECTS[i];
      const projectDoc: Project = {
        ...p,
        order: i + 1,
        featured: i < 3,
        hidden: false,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, COLLECTIONS.PROJECTS, p.id), projectDoc);
    }

    // 2. Seed Services
    for (let i = 0; i < DEFAULT_SERVICES.length; i++) {
      const s = DEFAULT_SERVICES[i];
      const serviceDoc: Service = {
        ...s,
        order: i + 1,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, COLLECTIONS.SERVICES, s.id), serviceDoc);
    }

    // 3. Seed Pricing Plans
    for (let i = 0; i < DEFAULT_PRICING.length; i++) {
      const plan = DEFAULT_PRICING[i];
      const planDoc: PricingPlan = {
        ...plan,
        order: i + 1,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, COLLECTIONS.PRICING, plan.id), planDoc);
    }

    // 4. Seed Testimonials
    for (let i = 0; i < DEFAULT_TESTIMONIALS.length; i++) {
      const t = DEFAULT_TESTIMONIALS[i];
      const testDoc: Testimonial = {
        ...t,
        order: i + 1,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, COLLECTIONS.TESTIMONIALS, t.id), testDoc);
    }

    // 5. Seed FAQs
    for (let i = 0; i < DEFAULT_FAQS.length; i++) {
      const f = DEFAULT_FAQS[i];
      const id = `faq-${i + 1}`;
      const faqDoc: FaqItem = {
        id,
        question: f.question,
        answer: f.answer,
        order: i + 1,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, COLLECTIONS.FAQS, id), faqDoc);
    }

    // 6. Seed Site Profile
    await setDoc(doc(db, COLLECTIONS.SETTINGS, 'profile'), {
      ...DEFAULT_PROFILE,
      updatedAt: new Date().toISOString()
    });

  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'seedInitialData');
  }
}

// ----------------- Projects API -----------------

export function subscribeToProjects(
  onSuccess: (projects: Project[]) => void,
  onError?: (error: unknown) => void
) {
  const q = query(collection(db, COLLECTIONS.PROJECTS), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onSuccess(DEFAULT_PROJECTS);
        return;
      }
      const items: Project[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as Project);
      });
      onSuccess(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, COLLECTIONS.PROJECTS);
    }
  );
}

export async function saveProject(project: Project): Promise<void> {
  const path = `${COLLECTIONS.PROJECTS}/${project.id}`;
  try {
    const docData: Project = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, COLLECTIONS.PROJECTS, project.id), docData);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteProject(projectId: string): Promise<void> {
  const path = `${COLLECTIONS.PROJECTS}/${projectId}`;
  try {
    await deleteDoc(doc(db, COLLECTIONS.PROJECTS, projectId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ----------------- Services API -----------------

export function subscribeToServices(
  onSuccess: (services: Service[]) => void,
  onError?: (error: unknown) => void
) {
  const q = query(collection(db, COLLECTIONS.SERVICES), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onSuccess(DEFAULT_SERVICES);
        return;
      }
      const items: Service[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as Service);
      });
      onSuccess(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, COLLECTIONS.SERVICES);
    }
  );
}

export async function saveService(service: Service): Promise<void> {
  const path = `${COLLECTIONS.SERVICES}/${service.id}`;
  try {
    await setDoc(doc(db, COLLECTIONS.SERVICES, service.id), {
      ...service,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ----------------- Pricing Plans API -----------------

export function subscribeToPricing(
  onSuccess: (plans: PricingPlan[]) => void,
  onError?: (error: unknown) => void
) {
  const q = query(collection(db, COLLECTIONS.PRICING), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onSuccess(DEFAULT_PRICING);
        return;
      }
      const items: PricingPlan[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as PricingPlan);
      });
      onSuccess(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, COLLECTIONS.PRICING);
    }
  );
}

export async function savePricingPlan(plan: PricingPlan): Promise<void> {
  const path = `${COLLECTIONS.PRICING}/${plan.id}`;
  try {
    await setDoc(doc(db, COLLECTIONS.PRICING, plan.id), {
      ...plan,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ----------------- Testimonials API -----------------

export function subscribeToTestimonials(
  onSuccess: (items: Testimonial[]) => void,
  onError?: (error: unknown) => void
) {
  const q = query(collection(db, COLLECTIONS.TESTIMONIALS), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onSuccess(DEFAULT_TESTIMONIALS);
        return;
      }
      const items: Testimonial[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as Testimonial);
      });
      onSuccess(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, COLLECTIONS.TESTIMONIALS);
    }
  );
}

export async function saveTestimonial(testimonial: Testimonial): Promise<void> {
  const path = `${COLLECTIONS.TESTIMONIALS}/${testimonial.id}`;
  try {
    await setDoc(doc(db, COLLECTIONS.TESTIMONIALS, testimonial.id), {
      ...testimonial,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  const path = `${COLLECTIONS.TESTIMONIALS}/${id}`;
  try {
    await deleteDoc(doc(db, COLLECTIONS.TESTIMONIALS, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ----------------- FAQs API -----------------

export function subscribeToFaqs(
  onSuccess: (items: FaqItem[]) => void,
  onError?: (error: unknown) => void
) {
  const q = query(collection(db, COLLECTIONS.FAQS), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onSuccess(DEFAULT_FAQS.map((f, i) => ({ id: `faq-${i+1}`, ...f, order: i+1 })));
        return;
      }
      const items: FaqItem[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as FaqItem);
      });
      onSuccess(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, COLLECTIONS.FAQS);
    }
  );
}

export async function saveFaq(faq: FaqItem): Promise<void> {
  const id = faq.id || `faq-${Date.now()}`;
  const path = `${COLLECTIONS.FAQS}/${id}`;
  try {
    await setDoc(doc(db, COLLECTIONS.FAQS, id), {
      ...faq,
      id,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteFaq(id: string): Promise<void> {
  const path = `${COLLECTIONS.FAQS}/${id}`;
  try {
    await deleteDoc(doc(db, COLLECTIONS.FAQS, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// ----------------- Site Settings / Profile API -----------------

export function subscribeToSiteProfile(
  onSuccess: (profile: SiteProfile) => void,
  onError?: (error: unknown) => void
) {
  return onSnapshot(
    doc(db, COLLECTIONS.SETTINGS, 'profile'),
    (snapshot) => {
      if (!snapshot.exists()) {
        onSuccess(DEFAULT_PROFILE);
        return;
      }
      onSuccess(snapshot.data() as SiteProfile);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, `${COLLECTIONS.SETTINGS}/profile`);
    }
  );
}

export async function saveSiteProfile(profile: Partial<SiteProfile>): Promise<void> {
  const path = `${COLLECTIONS.SETTINGS}/profile`;
  try {
    await setDoc(doc(db, COLLECTIONS.SETTINGS, 'profile'), {
      ...profile,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
