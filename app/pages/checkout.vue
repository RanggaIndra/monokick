<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useFirestore, useCurrentUser, useCollection } from "vuefire";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CreditCard, Banknote, Truck } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cart";
import SuccessModal from "~/components/common/SuccessModal.vue";

const router = useRouter();
const user = useCurrentUser();
const db = useFirestore();
const cartStore = useCartStore();

const loading = ref(false);
const showSuccess = ref(false);
const form = ref({
  fullName: user.value?.displayName || "",
  phone: "",
  address: "",
  city: "",
  zip: "",
});
const paymentMethod = ref("transfer");

const cartCollection = computed(() => (user.value ? collection(db, "users", user.value.uid, "cart") : null));
const cartItems = useCollection(cartCollection);
const total = computed(() => cartItems.value?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0);

const formatIDR = (val) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

const handlePlaceOrder = async () => {
  if (!form.value.address || !form.value.phone) return alert("Please fill all details");

  loading.value = true;
  try {
    await addDoc(collection(db, "orders"), {
      userId: user.value.uid,
      items: cartItems.value,
      total: total.value,
      shippingDetails: { ...form.value },
      paymentMethod: paymentMethod.value,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    await cartStore.clearCart();

    showSuccess.value = true;
  } catch (e) {
    console.error(e);
    alert("Failed to place order");
  } finally {
    loading.value = false;
  }
};

const onModalClose = () => {
  showSuccess.value = false;
  router.push("/");
};
</script>

<template>
  <div class="container px-4 py-10">
    <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
      <div class="space-y-8">
        <div>
          <h1 class="text-3xl font-bold">Checkout</h1>
          <p class="text-muted-foreground">Complete your order details.</p>
        </div>

        <div class="space-y-4">
          <h3 class="font-semibold text-lg flex items-center gap-2"><Truck class="w-5 h-5" /> Shipping Address</h3>
          <div class="grid gap-4">
            <Input v-model="form.fullName" placeholder="Full Name" />
            <Input v-model="form.phone" placeholder="Phone Number" type="tel" />
            <Input v-model="form.address" placeholder="Street Address" />
            <div class="grid grid-cols-2 gap-4">
              <Input v-model="form.city" placeholder="City" />
              <Input v-model="form.zip" placeholder="Zip Code" />
            </div>
          </div>
        </div>

        <div class="space-y-4 pt-4 border-t">
          <h3 class="font-semibold text-lg">Payment Method</h3>
          <div class="grid grid-cols-2 gap-4">
            <div
              @click="paymentMethod = 'transfer'"
              :class="['border p-4 rounded-xl cursor-pointer transition-all flex flex-col items-center gap-2 text-center', paymentMethod === 'transfer' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted']"
            >
              <Banknote class="w-6 h-6" />
              <span class="text-sm font-medium">Bank Transfer</span>
            </div>
            <div
              @click="paymentMethod = 'card'"
              :class="['border p-4 rounded-xl cursor-pointer transition-all flex flex-col items-center gap-2 text-center', paymentMethod === 'card' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted']"
            >
              <CreditCard class="w-6 h-6" />
              <span class="text-sm font-medium">Credit Card</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-fit bg-secondary/20 p-6 rounded-2xl space-y-6">
        <h3 class="font-bold text-xl">Your Order</h3>

        <div class="max-h-[300px] overflow-y-auto space-y-4 pr-2">
          <div v-for="item in cartItems" :key="item.id" class="flex gap-4 text-sm">
            <div class="h-16 w-16 bg-white rounded-md overflow-hidden shrink-0">
              <img :src="item.imageUrl" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <p class="font-medium line-clamp-1">{{ item.name }}</p>
              <p class="text-muted-foreground">Qty: {{ item.quantity }}</p>
            </div>
            <p class="font-medium">{{ formatIDR(item.price * item.quantity) }}</p>
          </div>
        </div>

        <div class="border-t pt-4 space-y-2">
          <div class="flex justify-between font-bold text-lg">
            <span>Total Pay</span>
            <span>{{ formatIDR(total) }}</span>
          </div>
        </div>

        <Button class="w-full text-lg h-12" @click="handlePlaceOrder" :disabled="loading">
          {{ loading ? "Processing..." : "Place Order" }}
        </Button>
      </div>
    </div>

    <SuccessModal :is-open="showSuccess" title="Order Placed Successfully!" description="Thank you for your purchase. We will process your order immediately." button-text="Back to Home" @close="onModalClose" />
  </div>
</template>
