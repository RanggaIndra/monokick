<script setup>
import { computed } from "vue";
import { useFirestore, useCurrentUser, useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart";
import EmptyState from "@/components/products/EmptyState.vue";

const user = useCurrentUser();
const db = useFirestore();
const cartStore = useCartStore();

const cartCollection = computed(() => (user.value ? collection(db, "users", user.value.uid, "cart") : null));
const cartItems = useCollection(cartCollection);

const subtotal = computed(() => {
  return cartItems.value?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
});

const formatIDR = (val) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
</script>

<template>
  <div class="container px-4 py-10 min-h-[70vh]">
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="!cartItems?.length" class="py-10">
      <EmptyState title="Your cart is empty" description="Looks like you haven't added any sneakers yet." action-label="Start Shopping" @reset="$router.push('/products')" />
    </div>

    <div v-else class="grid lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2 space-y-6">
        <div v-for="item in cartItems" :key="item.id" class="flex gap-4 p-4 border rounded-xl bg-card hover:border-primary/50 transition-colors">
          <div class="h-24 w-24 bg-secondary/30 rounded-lg overflow-hidden shrink-0">
            <img :src="item.imageUrl" class="h-full w-full object-cover" />
          </div>

          <div class="flex-1 flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold truncate">{{ item.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ item.brand }} - Size {{ item.size }}</p>
              </div>
              <button @click="cartStore.removeFromCart(item.id)" class="text-muted-foreground hover:text-red-500 transition-colors">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>

            <div class="flex justify-between items-end mt-2">
              <div class="flex items-center gap-3 bg-secondary/50 rounded-lg p-1">
                <button @click="cartStore.updateQuantity(item.id, item.quantity, -1)" class="p-1 hover:bg-white dark:hover:bg-black rounded-md transition">
                  <Minus class="w-3 h-3" />
                </button>
                <span class="text-sm font-medium w-4 text-center">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.id, item.quantity, 1)" class="p-1 hover:bg-white dark:hover:bg-black rounded-md transition">
                  <Plus class="w-3 h-3" />
                </button>
              </div>
              <p class="font-bold">{{ formatIDR(item.price * item.quantity) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="h-fit space-y-6 p-6 border rounded-xl bg-card">
        <h3 class="font-bold text-xl">Order Summary</h3>

        <div class="space-y-3 text-sm border-b pb-4">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Subtotal</span>
            <span>{{ formatIDR(subtotal) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Delivery</span>
            <span class="text-green-600">Free</span>
          </div>
        </div>

        <div class="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{{ formatIDR(subtotal) }}</span>
        </div>

        <NuxtLink to="/checkout" class="block">
          <Button class="w-full" size="lg"> Checkout <ArrowRight class="w-4 h-4 ml-2" /> </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
