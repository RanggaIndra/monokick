<script setup>
import { useFirestore, useCollection } from "vuefire";
import { collection, query, where, limit } from "firebase/firestore";
import { ArrowRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import ProductCard from "~/components/products/ProductCard.vue";
import DatabaseSeeder from "~/components/DatabaseSeeder.vue";

const db = useFirestore();

const popularQuery = query(collection(db, "products"), where("isPopular", "==", true), limit(4));
const popularProducts = useCollection(popularQuery);

const brands = useCollection(collection(db, "brands"));
</script>

<template>
  <div class="min-h-screen">
    <section class="container px-4 pt-10 pb-20 md:pt-20 md:pb-32">
      <div class="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-7xl font-black tracking-tighter text-foreground">
          WALK WITH <br class="hidden md:block" />
          <span class="text-muted-foreground">CONFIDENCE.</span>
        </h1>
        <p class="text-lg text-muted-foreground max-w-[600px]">Discover our exclusive collection of sneakers. From classic retro styles to the latest drops.</p>
        <div class="flex gap-4 pt-4">
          <NuxtLink to="/products">
            <Button size="lg" class="rounded-full px-8">Shop Now</Button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="container px-4 py-16 border-t border-border">
      <div class="flex items-end justify-between mb-10">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-foreground">Popular Right Now</h2>
          <p class="text-muted-foreground mt-2">The most sought-after styles this week.</p>
        </div>
        <NuxtLink to="/products">
          <Button variant="ghost" class="gap-2">View All <ArrowRight class="w-4 h-4" /></Button>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <ProductCard v-for="product in popularProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="py-20 bg-muted/30 border-y border-border">
      <div class="container px-4">
        <h2 class="text-center text-2xl font-bold mb-10 text-foreground">Our Partners</h2>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div v-for="brand in brands" :key="brand.name" class="h-12 w-24 flex items-center justify-center dark:brightness-0 dark:invert">
            <img :src="brand.logoUrl" :alt="brand.name" class="max-h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
