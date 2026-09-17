# KenaKata.com
A modern e-commerce storefront, built using **Next.js, TypeScript, Tailwind CSS**, with the **Next.js App Router** and the Platzi Fake API / Escuelajs API.

## 🔗 Live Links
- **Live Preview:** *[https://kenakata-six.vercel.app/](https://kenakata-six.vercel.app/)*
- **Repository:** *[https://github.com/akms-limon/kenakata](https://github.com/akms-limon/kenakata)*


## What's Inside

* Next.js App Router based storefront
* Responsive home page with hero, featured products, and categories
* Product listing with search, filtering, sorting, and pagination
* Debounced product search
* Product details with image gallery
* Related products
* Add to cart and quantity controls
* Whitelist and Cart persistence using Local Storage
* Login and registration
* Session persistence using HttpOnly cookies
* Protected checkout route using `proxy.ts`
* Checkout form with shipping and payment information
* Zod validation
* Mock order placement and order success screen
* Loading, error, empty, and not-found states
* Next.js Image optimization
* Rendering stratagies, and chashing
* Responsive layouts for desktop, tablet, and mobile

## Built With

* Next.js
* TypeScript
* React
* Tailwind CSS
* Zod
* Lucide React
* Platzi Fake API / Escuelajs API
* Local Storage
* Next.js App Router

## API

The project uses the Escuelajs API for product and authentication data.

Base URL:

```text
https://api.escuelajs.co/api/v1
```
API functions are handled inside:

```text
lib/api/
```

## Folder Layout

```text
kenakata/
│
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       ├── logout/
│   │       ├── register/
│   │       └── session/
│   │
│   ├── cart/
│   ├── checkout/
│   ├── products/
│   │   └── [id]/
│   ├── logIn/
│   ├── register/
│   ├── wishlist/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── cart/
│   ├── layout/
│   ├── product/
│   └── wishlist/
│
├── lib/
│   ├── api/
│   └── validations/
│
├── types/
│
├── public/
│   └── images/
│
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── proxy.ts
└── README.md
```

* `app/` — application pages, routes, API routes, and route-level states
* `components/` — reusable UI components
* `lib/` — API functions and validation logic
* `types/` — TypeScript types
* `public/` — static files and images
* `proxy.ts` — protects the checkout route

## Before You Start

You'll need these installed:

- Node.js
- npm
- Git

Quick check:
```bash
node -v
npm -v
git --version
```

If these commands don't work, please install Node.js and Git first.

## Getting It Running

### 1. Clone it

Open your terminal where you want to clone the repository.
Run:
```bash
git clone https://github.com/akms-limon/kenakata
```
Go inside the project and install appropriate packages.

### 2. Install packages

Run:

```bash
npm install
```

This will install all the dependencies that's needs for the project.

### 3. Set Up Environment Variables

Create a `.env` file and add the environment variable as it is

```env
API_URL=https://api.escuelajs.co/api/v1
```

The project uses this variable to connect to the product and authentieation API.

### 4. Run the Project

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The KenaKata.com website should running locally now.

## Home Page

The home page includes:

* Hero section
* Featured products
* Product categories
* Responsive layout
* Product navigation

## Products

The products page provides:

* Product grid
* Search
* Debounced search
* Category filtering
* Price range filtering
* Sorting
* Pagination
* Loading state
* Empty state
* Error handling

## Product Details

Clicking a product opens the product page. The product details page includes:

* Product information
* Product price
* Product description
* Product image gallery
* Product image thumbnails
* Related products
* Quantity controls
* Add to Cart

## Cart

The cart supports:

* Add products
* Remove products
* Increase quantity
* Decrease quantity
* Cart total
* Persistent cart data

Cart data is saved to localstorage. so that the data is consistant when the page is refreshed.

## Wishlist

Products can saved to wishlist, and user can show the saved product from wishlist page. data is consistance here also like cart.

## Authentication

The application includes:

* Login
* Register
* Logout
* Session handling
* Protected routes

The access token is stored in an HttpOnly cookie instead of Local Storage.

The checkout route is protected using:

```text
proxy.ts
```

When a user tries to access checkout without being logged in, they are redirected to the login page.

After successful login, the user can continue to checkout.

## Checkout

The checkout page includes:

* Full name, Email, Phone and Address
* Payment method, order summary, total prize
* Mock order placement, and order success screen

## Form Validation

Zod is used for form validation.

Validation schemas are stored inside:

```text
lib/validations/
```

## Rendering Strategy

The project uses the Next.js App Router with both Server Components and Client Components.

Server Components are used for product data fetching and page-level data loading.

Client Components are used where browser interaction and state are required.

Examples:

- Product data fetching — Server Component
- Product search — Client Component
- Product filtering — Client Component
- Product sorting — Client Component
- Pagination — Client Component
- Cart — Client Component
- Wishlist — Client Component
- Checkout form — Client Component

### SSR

Product data is fetched on the server through Server Components.

For example, the products page calls the API through the functions inside:

```text
lib/api/products.ts

## Caching and Revalidation

Product API requests use Next.js revalidation.

The current revalidation period is:

```text
3600 seconds
```

This allows product data to be cached and refreshed periodically instead of fetching it on every request.

## Loading and Error Handling

The application includes:

* Products loading state
* Product details loading state
* Product error state
* Product notfound state
* Empty product results
* Invalid price range handling
* Authentieation error handling
* API error handling

## Image Optimization

Product images use the Next.js `Image` component.

External image sources are configured inside:

```text
next.config.ts
```

This allows Next.js to optimize supported remote product images.

## Architecture

The application follows a component-based structure.

Pages are responsible for page-level composition, while reusable functionality is moved into components.

API logic is separated from UI components and kept inside:

```text
lib/api/
```

Validation logic is separated into:

```text
lib/validations/
```

Shared TypeScript types are kept inside:

```text
types/
```

This keeps the project easier to maintain and makes components reusable across different pages.

## Performance

Some of the performance considerations used in the project:

* Server-side data fetching
* API caching and revalidation
* Next.js Image optimization
* Debounced search
* Pagination
* Reusable components
* Responsive layouts
* Client-side filtering and sorting
* TypeScript type safety

## Tradeoffs

The project uses a public fake API instead of a custom backend database.

Because of this, product and authentication data depend on the external API.

Checkout uses a mock payment flow because a real payment gateway is outside the scope of the assignment.

Cart and wishlist data use Local Storage because the project does not have a dedicated database for these features.

Product filtering and sorting are handled on the client after the product data is loaded.

## Challenges

Some of the main challenges during development were:

* Learning Next.js from a React background
* Understanding the App Router
* Understanding Server Components and Client Components
* Working with dynamic routes
* Fetching data from the API
* Managing cart state
* Persisting cart data
* Implementing authentication
* Protecting routes
* Working with HttpOnly cookies
* Handling external images with Next.js Image
* Building responsive layouts
* Implementing search, filtering, sorting, and pagination
* Handling loading, error, and empty states

## Deployment

The project is deployed using Vercel.

Production URL:

```text
https://kenakata-six.vercel.app/products
```

The following environment variable needs to be added to the Vercel project:

```env
API_URL=https://api.escuelajs.co/api/v1
```

After adding or changing environment variables, the project needs to be redeployed.


<div align="center">

## The End
