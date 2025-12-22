<script setup>
import { useRoute } from "vue-router";
import { useFirestore, useDocument, useCollection } from "vuefire";
import { doc, collection, query, where, limit } from "firebase/firestore";
import { useCartStore } from "@/stores/cart";
import { Loader2 } from "lucide-vue-next";

// Component
import ProductGallery from "@/components/products/ProductGallery.vue";
import ProductInfo from "@/components/products/ProductInfo.vue";
import ProductActions from "@/components/products/ProductActions.vue";
import ProductReviews from "@/components/products/ProductReviews.vue";
import ProductCard from "@/components/products/ProductCard.vue";

const route = useRoute();
const db = useFirestore();
const cartStore = useCartStore();
const productId = route.params.id;

const productRef = doc(db, "products", productId);
const product = useDocument(productRef);

const relatedQuery = query(collection(db, "products"), limit(4));
const relatedProducts = useCollection(relatedQuery);

const onAddToCart = async (size) => {
  await cartStore.addToCart(product.value, size);
};

const onBuyNow = async (size) => {
  await cartStore.addToCart(product.value, size);
  // Redirect to checkout
  // navigateTo('/checkout')
  alert("Redirecting to checkout...");
};

const onToggleFavorite = () => {
  alert("Added to wishlist (Feature coming soon!)");
};
</script>

<template>
  <div class="min-h-screen pb-20">
    <div v-if="!product" class="h-[60vh] flex items-center justify-center">
      <Loader2 class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <div v-else class="container px-4 py-8 md:py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20">
        <ProductGallery :imageUrl="product.imageUrl" />

        <div class="flex flex-col justify-start">
          <ProductInfo :product="product" />

          <div class="mt-8">
            <ProductActions :variants="product.variants" @add-to-cart="onAddToCart" @buy-now="onBuyNow" @toggle-favorite="onToggleFavorite" />
          </div>

          <div class="mt-6 flex flex-col gap-2 text-sm text-muted-foreground border-t pt-6">
            <p>Free Delivery and Returns</p>
            <p>Secure Payment: BCA, Mandiri, Credit Card</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2">
          <ProductReviews :productId="productId" />
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold">You might also like</h3>
          <div class="grid grid-cols-1 gap-6">
            <ProductCard v-for="item in relatedProducts" :key="item.id" :product="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
