import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
    deleteDoc,
    doc,
    serverTimestamp,
    Timestamp,
    getDoc
} from 'firebase/firestore';

export interface Project {
    id: string;
    userId: string;
    title: string;
    type: 'pptx' | 'xlsx' | 'docx' | 'pdf';
    status: 'completed' | 'processing' | 'draft';
    createdAt: Date;
    fileUrl?: string;
    previewUrl?: string; // For future use
}

const PROJECTS_COLLECTION = 'projects';

export const ProjectsService = {
    // Create a new project
    createProject: async (userId: string, data: Omit<Project, 'id' | 'userId' | 'createdAt'>) => {
        try {
            const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
                ...data,
                userId,
                createdAt: serverTimestamp()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    },

    // Get all projects for a user
    getUserProjects: async (userId: string): Promise<Project[]> => {
        try {
            const q = query(
                collection(db, PROJECTS_COLLECTION),
                where("userId", "==", userId),
                orderBy("createdAt", "desc")
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Convert Firestore Timestamp to Date
                    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
                } as Project;
            });
        } catch (error: any) {
            console.error("Error fetching projects:", error);
            if (error?.code === 'failed-precondition') {
                console.error("Missing Index? Check this URL:", error?.message);
            }
            throw error;
        }
    },

    // Get a single project
    getProject: async (projectId: string) => {
        try {
            const docRef = doc(db, PROJECTS_COLLECTION, projectId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    ...data,
                    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
                } as Project;
            }
            return null;
        } catch (error) {
            console.error("Error fetching project:", error);
            throw error;
        }
    },
    deleteProject: async (projectId: string) => {
        try {
            await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    }
};
