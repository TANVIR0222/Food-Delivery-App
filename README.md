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
- **Restaurant name and price passed via route params** from Home screen
- Product detail modal (form sheet presentation) with add-to-cart functionality
- Heart icon on every product and restaurant for favorites
- **Custom stack header** with title, back label, and primary color background

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
- User profile display with avatar and email
- Privacy Policy, Terms & Conditions, FAQ, Support links
- Favorite shortcut
- Account deletion option
- Logout with confirmation alert
- **Drawer toggle button** to open drawer from Profile

### 🔐 Authentication
- Session-based auth flow using `expo-secure-store`
- Protected routes — unauthenticated users are redirected to login
- Onboarding screens (3-step walkthrough)
- Auth state persists after app reload via SecureStore
- Proper redirect logic on app launch

### 🔗 Deep Linking
- Scheme: `foodapp://`
- **`foodapp://restaurant/123`** opens Restaurant Detail directly
- Dynamic route `restaurant/[id]` handles deep link navigation
- Handles missing restaurant IDs gracefully with fallback UI

### 🧭 Programmatic Navigation
All four navigation methods are used:
- **`router.push()`** — Standard forward navigation (Home → Restaurant Detail)
- **`router.back()`** — Go back (GlobalTopBar, food-details, product modal)
- **`router.replace()`** — Used after login to prevent back-to-login, and after logout
- **`router.navigate()`** — Used in drawer content for tab switching without duplicates

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
│   ├── food-details/             # Restaurant detail + menu
│   │   ├── layout.tsx            # Custom stack header
│   │   └── index.tsx
│   │
│   ├── restaurant/               # Deep link handler
│   │   ├── _layout.tsx
│   │   └── [id].tsx              # Dynamic route for foodapp://restaurant/123
│   │
│   ├── all-product/              # All restaurants listing
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
│   ├── drawer-content.tsx        # Custom drawer menu (avatar + items)
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
│   ├── generate-dummy-token.ts
│   ├── token-store.ts
│   └── utils.ts
│
├── hook/                         # Custom React hooks
│   └── useStorageState.ts        # SecureStore persistence hook
│
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
# or
bun install

# Start the development server
npx expo start
```

### Running on Device/Emulator

```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

---

## 🔗 Deep Linking Setup

### URL Scheme

The app uses `foodapp://` as its URL scheme, configured in `app.json`:

```json
{
  "expo": {
    "scheme": "foodapp"
  }
}
```

### Supported Deep Links

| Deep Link | Screen | Description |
|---|---|---|
| `foodapp://restaurant/123` | Restaurant Detail | Opens restaurant with ID `123` |
| `foodapp://restaurant/res_01` | Restaurant Detail | Opens first restaurant |

### Testing Deep Links

```bash
# Android (via adb)
adb shell am start -W -a android.intent.action.VIEW -d "foodapp://restaurant/res_01" com.tanvir_islam002.food_delivery

# Using Expo CLI
npx uri-scheme open "foodapp://restaurant/res_01" --android
```

### How It Works

1. `app.json` defines the scheme `foodapp`
2. Expo Router's file-based routing maps `restaurant/[id]` to `src/app/restaurant/[id].tsx`
3. The dynamic `[id]` parameter is extracted via `useLocalSearchParams()`
4. If the restaurant ID exists in data, the detail screen renders
5. If not found, a fallback screen with a "Go to Home" button is shown

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
```

---

## 📝 Assumptions Made

1. **Mock Data**: All restaurant and menu data is hardcoded in `all-dammy-data.ts` — no backend API is used.
2. **Mock Auth**: Login accepts any email/password combo and generates a dummy token. No real authentication server.
3. **Cart State**: Cart is stored in React Context (in-memory) and resets on app restart. Only auth state persists.
4. **Deep Link IDs**: Deep link restaurant IDs must match the `id` field in the dummy data (e.g., `res_01`, `res_02`, etc.).
5. **Drawer Position**: Drawer opens from the right side, accessible via a menu button on the Profile screen.

