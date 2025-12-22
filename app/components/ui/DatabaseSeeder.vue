<script setup lang="ts">
import { useFirestore } from "vuefire";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

const db = useFirestore();

// --- DATA SOURCE ---
const brands = [
  { name: "Nike", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Adidas", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { name: "New Balance", logoUrl: "https://e7.pngegg.com/pngimages/279/119/png-clipart-new-balance-logo-new-balance-logo-icons-logos-emojis-tech-companies.png" },
  { name: "Jordan", logoUrl: "https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg" },
  { name: "Vans", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Vans-logo.svg" },
  { name: "Puma", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_Logo.png" },
  { name: "Asics", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Asics_Logo.svg" },
];

const products = [
  {
    name: "Nike Dunk Low Retro Panda",
    brand: "Nike",
    category: "Sneakers",
    color: "Black/White",
    description: "The street staple. Black and white leather overlays that go with absolutely everything.",
    imageUrl: "https://images.stockx.com/images/Nike-Dunk-Low-Retro-White-Black-2021-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=700&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611001718",
    price: 1699000,
    shipping: 20000,
    isPopular: true,
    isNew: false,
    rating: 4.8,
    reviewCount: 124,
    variants: [
      { size: "38", stock: 5 },
      { size: "39", stock: 8 },
      { size: "40", stock: 12 },
      { size: "41", stock: 0 },
      { size: "42", stock: 4 },
    ],
  },
  {
    name: "Adidas Samba OG",
    brand: "Adidas",
    category: "Sneakers",
    color: "Cloud White/Core Black",
    description: "Born on the pitch, the Samba is a timeless icon of street style.",
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/bf53bbca4f114c0e86235489d81d4e0e_9366/Samba_OG_Shoes_White_B75806_01_standard.jpg",
    price: 2200000,
    shipping: 20000,
    isPopular: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 89,
    variants: [
      { size: "40", stock: 10 },
      { size: "41", stock: 15 },
      { size: "42", stock: 8 },
      { size: "43", stock: 5 },
    ],
  },
  {
    name: "New Balance 530",
    brand: "New Balance",
    category: "Running",
    color: "White/Silver Metallic",
    description: "A throwback to classic running styles from the 90s and 2000s.",
    imageUrl: "https://nb.scene7.com/is/image/NB/mr530sg_nb_02_i?$pdpflexf2$&wid=440&hei=440",
    price: 1499000,
    shipping: 25000,
    isPopular: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 56,
    variants: [
      { size: "37", stock: 20 },
      { size: "38", stock: 15 },
      { size: "39", stock: 10 },
      { size: "40", stock: 5 },
    ],
  },
  {
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    category: "Sneakers",
    color: "White/White",
    description: "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon.",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
    price: 1549000,
    shipping: 20000,
    isPopular: false,
    isNew: false,
    rating: 4.5,
    reviewCount: 200,
    variants: [
      { size: "39", stock: 20 },
      { size: "40", stock: 20 },
      { size: "41", stock: 20 },
      { size: "42", stock: 20 },
    ],
  },
  {
    name: "Jordan 1 Retro High OG",
    brand: "Jordan",
    category: "Basketball",
    color: "University Blue/Black",
    description: "Familiar colors, fresh blocking. The AJ1 High allows you to step into greatness.",
    imageUrl: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-White-University-Blue-Black-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=700&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1611777269",
    price: 2899000,
    shipping: 30000,
    isPopular: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 12,
    variants: [
      { size: "41", stock: 2 },
      { size: "42", stock: 1 },
      { size: "43", stock: 3 },
    ],
  },
  {
    name: "Vans Old Skool",
    brand: "Vans",
    category: "Skate",
    color: "Black/White",
    description: "The Old Skool, the Vans classic skate shoe and first to bare the iconic sidestripe.",
    imageUrl: "https://images.vans.com/is/image/Vans/VN000D3HY28-HERO?$583x583$",
    price: 999000,
    shipping: 15000,
    isPopular: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 340,
    variants: [
      { size: "36", stock: 10 },
      { size: "37", stock: 10 },
      { size: "38", stock: 10 },
      { size: "39", stock: 10 },
    ],
  },
  {
    name: "Puma Suede Classic XXI",
    brand: "Puma",
    category: "Sneakers",
    color: "Red/White",
    description: "The Suede has been changing the game ever since it hit the scene in 1968.",
    imageUrl: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/02/sv01/fnd/IDN/fmt/png/Suede-Classic-XXI-Sneakers",
    price: 1199000,
    shipping: 18000,
    isPopular: false,
    isNew: true,
    rating: 4.3,
    reviewCount: 25,
    variants: [
      { size: "40", stock: 5 },
      { size: "41", stock: 5 },
      { size: "42", stock: 5 },
    ],
  },
  {
    name: "Asics Gel-Kayano 14",
    brand: "Asics",
    category: "Running",
    color: "Cream/Black",
    description: "Resurfacing the famous shape with late 2000s aesthetics.",
    imageUrl: "https://images.asics.com/is/image/asics/1201A019_108_SR_RT_GLB?$sfcc-product$",
    price: 2399000,
    shipping: 20000,
    isPopular: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 45,
    variants: [
      { size: "40", stock: 3 },
      { size: "41", stock: 4 },
      { size: "42", stock: 6 },
      { size: "43", stock: 2 },
      { size: "44", stock: 1 },
    ],
  },
];

const ratings = [
  {
    productId: "37KZEhI7jzka6nNDo8dP",
    userName: "Budi Santoso",
    rating: 5,
    comment: "Barang sangat bagus, original!",
    createdAt: Timestamp.now(),
  },
  {
    productId: "37KZEhI7jzka6nNDo8dP",
    userName: "Siti Aminah",
    rating: 4,
    comment: "Pengiriman agak lama tapi barang oke.",
    createdAt: Timestamp.now(),
  },
  {
    productId: "9FVcuNHW0G70TRi1COjF",
    userName: "Joko",
    rating: 5,
    comment: "Mantap jiwa.",
    createdAt: Timestamp.now(),
  },
];

const seedBrands = async () => {
  try {
    const batch = writeBatch(db);
    brands.forEach((brand) => {
      const docRef = doc(collection(db, "brands"));
      batch.set(docRef, brand);
    });
    await batch.commit();
    alert("Brands Seeded!");
  } catch (e) {
    console.error(e);
    alert("Error seeding brands");
  }
};

const seedProducts = async () => {
  try {
    const batch = writeBatch(db);
    products.forEach((prod) => {
      const docRef = doc(collection(db, "products"));
      batch.set(docRef, prod);
    });
    await batch.commit();
    alert("Products Seeded!");
  } catch (e) {
    console.error(e);
    alert("Error seeding products");
  }
};

const seedRatings = async () => {
  try {
    const batch = writeBatch(db);
    ratings.forEach((r) => {
      const docRef = doc(collection(db, "ratings"));
      batch.set(docRef, r);
    });
    await batch.commit();
    alert("Ratings Seeded!");
  } catch (e) {
    console.error(e);
    alert("Error seeding ratings");
  }
};
</script>

<template>
  <div class="p-4 border rounded bg-slate-100 my-8">
    <h3 class="font-bold mb-4">ADMIN: Database Seeder</h3>
    <div class="flex gap-4">
      <button @click="seedBrands" class="bg-green-600 text-white px-4 py-2 rounded">Seed Brands</button>
      <button @click="seedProducts" class="bg-green-600 text-white px-4 py-2 rounded">Seed Products</button>
      <button @click="seedRatings" class="bg-green-600 text-white px-4 py-2 rounded">Seed Ratings</button>
    </div>
  </div>
</template>
