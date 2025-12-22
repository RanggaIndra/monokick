<script setup>
import { ref, computed } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection } from "firebase/firestore";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "~/components/products/ProductCard.vue";
import EmptyState from "~/components/products/EmptyState.vue";

const db = useFirestore();

const products = useCollection(collection(db, "products"));
const brands = useCollection(collection(db, "brands"));

const searchQuery = ref("");
const selectedBrand = ref("All");

const filteredProducts = computed(() => {
  if (!products.value) return [];

  return products.value.filter((product) => {
    const matchesBrand = selectedBrand.value === "All" || product.brand === selectedBrand.value;

    const query = searchQuery.value.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);

    return matchesBrand && matchesSearch;
  });
});

const clearFilters = () => {
  searchQuery.value = "";
  selectedBrand.value = "All";
};
</script>

<template>
  <div class="container px-4 py-8 min-h-screen">
    <div class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-10">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-foreground">All Shoes</h1>
        <p class="text-muted-foreground mt-1">Showing {{ filteredProducts.length }} results</p>
      </div>

      <div class="relative w-full md:w-80">
        <Search class="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input v-model="searchQuery" placeholder="Search sneakers..." class="pl-9 bg-background border-input text-foreground" />
      </div>
    </div>

    <div class="flex flex-wrap gap-2 mb-10 pb-4 border-b border-border">
      <Button size="sm" :variant="selectedBrand === 'All' ? 'default' : 'outline'" @click="selectedBrand = 'All'"> All Brands </Button>

      <Button v-for="brand in brands" :key="brand.id" size="sm" :variant="selectedBrand === brand.name ? 'default' : 'outline'" @click="selectedBrand = brand.name">
        {{ brand.name }}
      </Button>
    </div>

    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <div v-else class="mt-20">
      <EmptyState :title="searchQuery ? `No results for '${searchQuery}'` : 'No products found'" action-label="Clear Filters" @reset="clearFilters" />
    </div>
  </div>
</template>
