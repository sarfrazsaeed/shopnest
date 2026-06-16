# 👟 ShopNest — Premium Sneakers & Fashion

> Commercial-grade sneakers e-commerce frontend built with React 18 + TypeScript + Vite + GSAP + Framer Motion

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-ShopNest-F5B800?style=for-the-badge)](https://sarfrazsaeed.github.io/shopnest/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## ✨ Features

- 🛍 **Product Grid** — 16 sneakers with filters (category, brand, price, rating), search with 300ms debounce, sort, grid/list view toggle
- 👟 **Product Detail** — image gallery, color/size selector, quantity picker, description/reviews/shipping tabs
- 🛒 **Cart Drawer** — Zustand-powered slide-in cart with quantity management and free shipping hint
- ❤️ **Wishlist** — save products and move to cart with one click
- 💳 **3-Step Checkout** — shipping form → animated card UI → order confirmation
- ⚡ **GSAP Animations** — ScrollTrigger scroll reveals, hero text animation, counter animation
- 🎬 **Framer Motion** — page transitions, product card hover effects, AnimatePresence
- 🌑 **Dark Luxury Design** — Playfair Display + Inter fonts, gold (#F5B800) accent on near-black
- 📱 **Fully Responsive** — mobile-first with hamburger menu
- 🚀 **GitHub Actions CI/CD** — auto build + deploy to GitHub Pages on every push

---

## 🛠 Stack

| Technology | Purpose |
|-----------|---------|
| React 18 + TypeScript | Component UI with full type safety |
| Vite 6 | Lightning-fast build tool |
| Tailwind CSS | Dark luxury design system |
| Framer Motion | Page transitions + spring animations |
| GSAP + ScrollTrigger | Scroll-driven animations |
| Zustand | Cart + wishlist state with localStorage |
| React Router v6 | 6-route SPA |
| GitHub Actions | CI/CD auto-deploy |

---

## 🚀 Getting Started

```bash
git clone https://github.com/sarfrazsaeed/shopnest.git
cd shopnest
npm install
npm run dev
```

Open [http://localhost:5173/shopnest/](http://localhost:5173/shopnest/)

---

## 📁 Pages

| Route | Page |
|-------|------|
| `/` | Homepage — hero, categories, featured products |
| `/products` | All sneakers — filters, search, sort |
| `/product/:id` | Product detail — gallery, size/color, cart |
| `/wishlist` | Saved products |
| `/checkout` | 3-step checkout |
| `*` | 404 page |

---

**Developer:** [Sarfraz Saeed](https://github.com/sarfrazsaeed) · CS @ Air University Islamabad · Pakistan 🇵🇰
