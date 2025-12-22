<script setup>
import { useCurrentUser } from "vuefire";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ShoppingCart } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const colorMode = useColorMode();
const user = useCurrentUser();
const authStore = useAuthStore();
const router = useRouter();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/auth/login");
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-16 items-center justify-between px-4">
        <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
          <span class="font-bold text-xl tracking-tight">MONO<span class="text-gray-500">KICKS</span></span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <NuxtLink to="/" class="hover:text-foreground transition-colors">Home</NuxtLink>
          <NuxtLink to="/products" class="hover:text-foreground transition-colors">Shoes</NuxtLink>
          <NuxtLink to="/about" class="hover:text-foreground transition-colors">About</NuxtLink>
        </nav>

        <div class="flex items-center gap-4">
          <Button variant="ghost" size="icon" @click="toggleTheme">
            <span v-if="colorMode.value === 'dark'">☀️</span>
            <span v-else>🌑</span>
          </Button>

          <div v-if="user">
            <NuxtLink to="/cart">
              <Button variant="ghost" size="icon" class="relative">
                <ShoppingCart class="h-5 w-5" />
              </Button>
            </NuxtLink>
          </div>

          <div v-if="user">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar class="h-8 w-8 cursor-pointer border hover:opacity-80 transition">
                  <AvatarImage :src="user.photoURL" />
                  <AvatarFallback>{{ user.email?.charAt(0).toUpperCase() }}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="router.push('/profile')">Profile</DropdownMenuItem>
                <DropdownMenuItem @click="handleLogout" class="text-red-500 focus:text-red-500">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div v-else>
            <NuxtLink to="/auth/login">
              <Button variant="default" size="sm">Login</Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t py-8 mt-8">
      <div class="container flex flex-col items-center justify-between gap-4 md:flex-row px-4">
        <p class="text-center text-sm text-muted-foreground">© 2025 MonoKicks. Built with Nuxt & Firebase.</p>
        <div class="flex gap-4 text-sm text-muted-foreground">
          <a href="#" class="hover:text-foreground">Privacy</a>
          <a href="#" class="hover:text-foreground">Terms</a>
        </div>
      </div>
    </footer>
  </div>
</template>
