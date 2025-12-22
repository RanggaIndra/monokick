<script setup>
import { ref } from "vue";
import { Heart, ShoppingCart, Check } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const props = defineProps({
  variants: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
});

const emit = defineEmits(["add-to-cart", "buy-now", "toggle-favorite"]);

const selectedSize = ref(null);

const handleAddToCart = () => {
  if (!selectedSize.value) return alert("Please select a size");
  emit("add-to-cart", selectedSize.value);
};

const handleBuyNow = () => {
  if (!selectedSize.value) return alert("Please select a size");
  emit("buy-now", selectedSize.value);
};
</script>

<template>
  <div class="space-y-8 py-6 border-y border-border">
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <label class="text-sm font-medium">Select Size</label>
        <span class="text-xs text-muted-foreground">Size Guide</span>
      </div>
      <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
        <button
          v-for="variant in variants"
          :key="variant.size"
          @click="selectedSize = variant.size"
          :disabled="variant.stock <= 0"
          :class="[
            'h-12 border rounded-md flex items-center justify-center text-sm font-medium transition-all relative',
            selectedSize === variant.size ? 'border-primary ring-1 ring-primary bg-primary/5 text-primary' : 'border-input hover:border-foreground/50 bg-background',
            variant.stock <= 0 ? 'opacity-50 cursor-not-allowed bg-muted' : '',
          ]"
        >
          {{ variant.size }}
          <div v-if="selectedSize === variant.size" class="absolute top-0 right-0 -mt-1 -mr-1">
            <span class="flex h-3 w-3 rounded-full bg-primary"></span>
          </div>
        </button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <Button size="lg" class="flex-1 text-base font-semibold" @click="handleAddToCart" :disabled="loading">
        <ShoppingCart class="w-4 h-4 mr-2" />
        Add to Cart
      </Button>

      <Button size="lg" variant="secondary" class="flex-1 text-base font-semibold" @click="handleBuyNow" :disabled="loading"> Buy Now </Button>

      <Button size="lg" variant="outline" class="px-4" @click="$emit('toggle-favorite')">
        <Heart class="w-5 h-5" />
      </Button>
    </div>
  </div>
</template>
