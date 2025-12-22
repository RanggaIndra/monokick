import { defineStore } from 'pinia'
import { useFirestore, useCurrentUser } from 'vuefire'
import { doc, setDoc, deleteDoc, collection, getDocs, writeBatch } from 'firebase/firestore'

export const useCartStore = defineStore('cart', () => {
    const db = useFirestore()
    const user = useCurrentUser()

    const getCartRef = (productId, size) => {
        if (!user.value) return null
        return doc(db, 'users', user.value.uid, 'cart', `${productId}-${size}`)
    }

    const addToCart = async (product, size) => {
        if (!user.value) {
            alert("Please login to add items to cart!")
            return false
        }

        try {
            const cartDoc = getCartRef(product.id, size)
            await setDoc(cartDoc, {
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                size: size,
                quantity: 1
            }, { merge: true })

            return true
        } catch (e) {
            console.error("Error adding to cart", e)
            alert("Failed to add to cart.")
        }
    }

    const removeFromCart = async (itemId) => {
        if (!user.value) return
        await deleteDoc(doc(db, 'users', user.value.uid, 'cart', itemId))
    }

    const updateQuantity = async (itemId, currentQuantity, change) => {
        if (!user.value) return
        const newQuantity = currentQuantity + change

        if (newQuantity < 1) return

        await setDoc(doc(db, 'users', user.value.uid, 'cart', itemId), {
            quantity: newQuantity
        }, { merge: true })
    }

    const clearCart = async () => {
        if (!user.value) return

        const cartCol = collection(db, 'users', user.value.uid, 'cart')
        const snapshot = await getDocs(cartCol)
        const batch = writeBatch(db)

        snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        await batch.commit()
    }

    return {
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    }
})