import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const StorageService = {
    // Upload a file to Firebase Storage
    async uploadFile(userId: string, file: File): Promise<string> {
        try {
            const timestamp = Date.now();
            const path = `uploads/${userId}/${timestamp}_${file.name}`;
            const storageRef = ref(storage, path);

            console.log(`Uploading file to ${path}...`);
            const snapshot = await uploadBytes(storageRef, file);
            console.log("Upload snapshot:", snapshot);

            const url = await getDownloadURL(snapshot.ref);
            console.log("Download URL:", url);
            return url;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }
};
