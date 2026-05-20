# 🍔 Food Delivery App

A modern, feature-rich food delivery mobile application built with **Expo SDK 55**, **React Native 0.83**, and **TypeScript**. The app features restaurant browsing, food ordering, a cart system, favorites management, and a clean drawer + bottom tab navigation.

---

## 📱 Features

### 🏠 Home Screen
- Image carousel showcasing promotions and deals
- Food category grid (Burgers, Pizza, Seafood, Desserts, Healthy Food)
- Popular restaurants list with ratings, delivery time, distance, and badge highlights

### 🔍 Search & Browse
- Full-text search across all restaurants
- Category-filtered tabs (All, Burgers, Pizza, Seafood, Desserts, Healthy)
- Restaurant cards with heart icon for quick favoriting

### 🍕 Restaurant & Product Details
- Restaurant detail screen with menu listing and tabs
- Product detail modal (form sheet presentation) with add-to-cart functionality
- Heart icon on every product and restaurant for favorites

### 🛒 Cart / Orders
- Add to cart from any screen (search, product detail, all products, favorites)
- Quantity adjustment (increment/decrement) per item
- Remove items from cart
- Live total price calculation
- Checkout button (UI ready)

### ❤️ Favorites
- Global favorites system powered by React Context
- Toggle favorites from any heart icon across the app
- Alert confirmation on add/remove
- Dedicated Favorites screen showing saved items with ability to add to cart
- Accessible from the Drawer menu and Profile page

### 👤 Profile & Settings
- User profile display
- Privacy Policy, Terms & Conditions, FAQ, Support links
- Favorite shortcut
- Account deletion option
- Logout with confirmation alert

### 🔐 Authentication
- Session-based auth flow using `expo-secure-store`
- Protected routes — unauthenticated users are redirected to login
- Onboarding screens (3-step walkthrough)

### 🎨 Design System
- Custom Inter font family used throughout (`font-inter-bold`, `font-inter-semibold`, `font-inter-medium`, `font-inter-regular`)
- Custom color palette defined in Tailwind config (primary, secondary, text_gray, stroke, etc.)
- All prices displayed in **USD ($)**
- Consistent styling via `twrnc` with custom Tailwind config at `src/lib/tailwind`

---

## 🏗️ Project Structure

```
src/
├── app/                          # Expo Router file-based routing
│   ├── _layout.tsx               # Root layout (providers + Stack navigator)
│   ├── index.tsx                 # Splash / entry redirect
│   │
│   ├── (auth)/                   # Authentication screens
│   │   ├── _layout.tsx
│   │   └── index.tsx             # Login screen
│   │
│   ├── (onboarding)/             # Onboarding walkthrough
│   │   ├── _layout.tsx
│   │   ├── onboarding-one.tsx
│   │   ├── onboarding-two.tsx
│   │   └── onboarding-three.tsx
│   │
│   ├── (drawer)/                 # Drawer navigator
│   │   ├── _layout.tsx           # Drawer config (right-side)
│   │   ├── index.tsx             # Drawer favorites screen
│   │   └── (tabs)/               # Bottom tab navigator
│   │       ├── _layout.tsx       # Tab bar config (NativeTabs)
│   │       ├── index.tsx         # Home tab
│   │       ├── search.tsx        # Search tab
│   │       ├── orders.tsx        # Cart/Orders tab
│   │       └── profile.tsx       # Profile tab
│   │
│   ├── all-product/              # All restaurants listing
│   │   └── index.tsx
│   │
│   ├── food-details/             # Restaurant detail + menu
│   │   └── index.tsx
│   │
│   ├── favorate/                 # Standalone favorites screen
│   │   ├── layout.tsx
│   │   └── index.tsx
│   │
│   ├── modal/                    # Modal screens
│   │   └── product-view-modal.tsx
│   │
│   └── top-category/             # Category browsing
│       ├── index.tsx
│       └── category.tsx
│
├── components/                   # Reusable UI components
│   ├── auth/                     # Auth context provider (ctx.tsx)
│   ├── home/                     # Home-specific components
│   │   ├── home-carousel.tsx
│   │   ├── home-top-bar.tsx
│   │   └── home-top-categories.tsx
│   ├── drawer-content.tsx        # Custom drawer menu
│   ├── GlobalTopBar.tsx          # Back/title navigation bar
│   ├── PageWrapper.tsx           # Safe area wrapper
│   ├── MainButton.tsx            # Primary/secondary buttons
│   ├── AuthHeading.tsx           # Auth screen headings
│   ├── GlobalMainInput.tsx       # Form inputs
│   └── KeyboardAvoidingComponent.tsx
│
├── context/                      # React Context providers
│   ├── CartContext.tsx            # Cart state management
│   └── FavoriteContext.tsx        # Favorites state management
│
├── lib/                          # Utilities & config
│   └── tailwind.ts               # twrnc instance with custom config
│
├── utils/                        # Data & helpers
│   ├── all-dammy-data.ts         # Restaurant/menu dummy data
│   └── generate-dummy-token.ts
│
├── hook/                         # Custom React hooks
├── interface/                    # TypeScript interfaces
└── schema/                       # Yup validation schemas
```

---

## 🛠️ Tech Stack

| Category         | Technology                                |
|------------------|-------------------------------------------|
| Framework        | Expo SDK 55                               |
| Language         | TypeScript 5.9                            |
| UI Framework     | React Native 0.83                         |
| Navigation       | Expo Router (file-based) + Drawer + Tabs  |
| Styling          | twrnc (TailwindCSS for React Native)      |
| State Management | React Context (Cart, Favorites, Session)  |
| Forms            | Formik + Yup                              |
| Fonts            | Inter (6 weights) + Edu AU (4 weights)    |
| Carousel         | react-native-reanimated-carousel          |
| Secure Storage   | expo-secure-store                         |
| Toast            | sonner-native                             |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode (for emulators)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd expo-project

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Device/Emulator

```bash
# Android
npx expo run:android

# iOS
npx expo run:ios

# Expo Go (limited sandbox)
npx expo start --go
```

---

## 🎨 Design Tokens

### Colors
| Token          | Hex       | Usage                  |
|----------------|-----------|------------------------|
| `primary`      | `#1C79BE` | Primary brand color    |
| `secondary`    | `#58C1F0` | Buttons, accents       |
| `title`        | `#303030` | Heading text           |
| `text_gray`    | `#757575` | Secondary/body text    |
| `gray`         | `#ACACAC` | Disabled states        |
| `stroke`       | `#EDF1F3` | Light backgrounds, borders |
| `red`          | `#CA3535` | Error/destructive      |

### Fonts
| Class                  | Font Weight |
|------------------------|-------------|
| `font-inter-light`     | Light       |
| `font-inter-regular`   | Regular     |
| `font-inter-medium`    | Medium      |
| `font-inter-semibold`  | SemiBold    |
| `font-inter-bold`      | Bold        |
| `font-inter-black`     | Black       |

---

## 📋 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Build & run on Android
npm run ios        # Build & run on iOS
npm run web        # Start web version
npm run lint       # Run ESLint
npm run reset-project  # Reset to blank project
```

---

## 📄 License

This project is private and not licensed for public distribution.
