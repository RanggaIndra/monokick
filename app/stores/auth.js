import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useFirebaseAuth } from 'vuefire'

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth()
    const db = useFirestore()

    const register = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            if (name) {
                await updateProfile(user, {
                    displayName: name
                })
            }

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: email,
                displayName: name,
                role: 'customer',
                createdAt: serverTimestamp(),
                phone: "",
                defaultShippingAddress: null,
            })

            return user
        } catch (error) {
            throw error
        }
    }

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        await signOut(auth)
    }

    return {
        register,
        login,
        logout
    }
})