<script setup lang="ts">
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

defineProps<{
  product: {
    id: string;
    name: string;
    price: number;
    brand: string;
    category: string;
    imageUrl: string;
    isNew?: boolean;
  };
}>();

// Helper to format IDR
const formatIDR = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <NuxtLink :to="`/products/${product.id}`">
    <Card class="group relative border-0 shadow-none bg-transparent cursor-pointer h-full">
      <div class="aspect-square relative overflow-hidden rounded-xl bg-secondary/50 mb-4 border border-border">
        <Badge v-if="product.isNew" variant="default" class="absolute top-3 left-3 z-10"> NEW </Badge>

        <img :src="product.imageUrl" :alt="product.name" class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
      </div>

      <div class="space-y-1">
        <p class="text-sm text-muted-foreground">{{ product.brand }}</p>
        <h3 class="font-bold text-lg leading-none truncate text-foreground group-hover:text-primary transition-colors">
          {{ product.name }}
        </h3>
        <p class="font-medium mt-2 text-primary">{{ formatIDR(product.price) }}</p>
      </div>
    </Card>
  </NuxtLink>
</template>
