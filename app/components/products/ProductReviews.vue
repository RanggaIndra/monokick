<script setup>
import { computed } from "vue";
import { useFirestore, useCollection, useCurrentUser } from "vuefire";
import { collection, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const db = useFirestore();
const user = useCurrentUser();

const reviewsQuery = computed(() => {
  collection(db, "ratings"), where("productId", "==", props.productId);
});

const reviews = useCollection(reviewsQuery);

const addTestReview = async () => {
  await addDoc(collection(db, "ratings"), {
    productId: props.productId,
    userName: user.value?.displayName || "Anonymous User",
    rating: 5,
    comment: "This is a test review for this specific product ID!",
    createdAt: serverTimestamp(),
  });
  alert("Review added! It should appear now.");
};
</script>

<template>
  <div class="space-y-6 pt-10">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-bold">Reviews ({{ reviews?.length || 0 }})</h3>

      <Button v-if="user" variant="outline" size="sm" @click="addTestReview"> + Add Test Review </Button>
    </div>

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

      <div v-if="!reviews?.length" class="text-center py-8 text-muted-foreground bg-muted/20 rounded-xl">No reviews yet. Click the button above to add one!</div>
    </div>
  </div>
</template>
