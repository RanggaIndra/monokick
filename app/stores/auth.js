import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth()

    const register = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            if (name) {
                await updateProfile(userCredential.user, {
                    displayName: name
                })
            }

            return userCredential.user
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