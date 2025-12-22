<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const formatIDR = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <div class="space-y-4">
    <div class="space-y-2">
      <h3 class="font-medium text-muted-foreground">{{ product.brand }}</h3>
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{{ product.name }}</h1>
    </div>

    <div class="flex items-center gap-4">
      <p class="text-2xl font-bold text-primary">
        {{ formatIDR(product.price) }}
      </p>
      <div v-if="product.rating" class="flex items-center text-sm text-muted-foreground">
        <span class="text-yellow-500 mr-1">★</span>
        {{ product.rating }} ({{ product.reviewCount || 0 }} reviews)
      </div>
    </div>

    <div class="prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed">
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>
