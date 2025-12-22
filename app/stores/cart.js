import { defineStore } from 'pinia'
import { useFirestore, useCurrentUser } from 'vuefire'
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'

export const useCartStore = defineStore('cart', () => {
    const db = useFirestore()
    const user = useCurrentUser()

    const addToCart = async (ProductCard, size) => {
        if (!user.value) {
            alert("Please login to add items to cart!")
            return
        }

        try {
            const cartRef = doc(db, 'users', user.value.uid, 'cart', product.id + '-' + size)

            await setDoc(cartRef, {
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                size: size,
                quantity: 1
            }, { merge: true })

            alert("Added to cart!")
        } catch (e) {
            console.error("Error adding to cart", e)
            alert("Failed to add to cart.")
        }
    }

    return {
        addToCart
    }
})