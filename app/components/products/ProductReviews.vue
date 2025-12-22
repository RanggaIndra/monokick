<script setup>
import { useFirestore, useCollection } from "vuefire";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const db = useFirestore();
const reviewsQuery = query(collection(db, "ratings"), where("productId", "==", props.productId), orderBy("createdAt", "desc"), limit(5));
const reviews = useCollection(reviewsQuery);
</script>

<template>
  <div class="space-y-6 pt-10">
    <h3 class="text-xl font-bold">Reviews ({{ reviews.length }})</h3>

    <div class="grid gap-6">
      <div v-for="review in reviews" :key="review.id" class="flex gap-4 p-4 rounded-lg bg-secondary/20">
        <Avatar>
          <AvatarFallback>{{ review.userName?.charAt(0) || "U" }}</AvatarFallback>
        </Avatar>
        <div class="space-y-1">
          <div class="flex items-center justify-between w-full">
            <p class="font-semibold text-sm">{{ review.userName }}</p>
            <span class="text-xs text-muted-foreground">Verified Buyer</span>
          </div>
          <div class="flex text-yellow-500 text-xs mb-1">
            <span v-for="i in 5" :key="i">
              {{ i <= review.rating ? "★" : "☆" }}
            </span>
          </div>
          <p class="text-sm text-muted-foreground">{{ review.comment }}</p>
        </div>
      </div>

      <div v-if="reviews.length === 0" class="text-center py-8 text-muted-foreground">No reviews yet. Be the first to review!</div>
    </div>
  </div>
</template>
