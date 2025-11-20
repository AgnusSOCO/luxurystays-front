# Luxury Stays - Guesty Booking Engine Frontend

Modern, sleek booking website built with React, TypeScript, Vite, and shadcn/ui components. Displays property listings from Guesty API with search, filtering, and booking functionality.

## Features

- Modern gradient hero section with search functionality
- Property listings with images, prices, and details from Guesty API
- Search and filter by city, bedrooms, and number of guests
- Property detail pages with image galleries and amenities
- Booking form with date selection and price quote functionality
- Fully responsive design for mobile, tablet, and desktop
- Beautiful UI with shadcn/ui components and Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router for navigation
- Lucide React icons

## Design Inspiration

This project uses modern design patterns and components from:
- [blocks.so](https://blocks.so/)
- [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui)
- [21st.dev](https://21st.dev/community/components)

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see [luxurystays-back](https://github.com/AgnusSOCO/luxurystays-back))

## Local Development

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your backend API URL:
```
VITE_BACKEND_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5174`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Environment Variables

- `VITE_BACKEND_API_URL` - Backend API URL (default: `http://localhost:8000`)

For production deployment, set this to your deployed backend URL (e.g., Railway deployment URL).

## Project Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components
├── pages/
│   └── PropertyDetail.tsx  # Property detail page
├── services/
│   └── guestyApi.ts     # API service layer
├── types/
│   └── guesty.ts        # TypeScript interfaces
├── App.tsx              # Main app with listings page
├── App.css              # Global styles
└── main.tsx             # App entry point with routing
```

## Available Routes

- `/` - Home page with property listings and search
- `/property/:id` - Property detail page with booking form

## API Integration

The frontend communicates with the backend API for all Guesty data:

- `GET /api/listings` - Property listings with filters
- `GET /api/listings/:id` - Property details
- `GET /api/listings/cities` - Available cities
- `POST /api/reservations/quotes` - Get price quotes

## Deployment

### Vercel / Netlify / Static Hosting

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` directory to your hosting provider

3. Set environment variable:
   - `VITE_BACKEND_API_URL` - Your deployed backend URL

### Environment Configuration

Make sure to set `VITE_BACKEND_API_URL` to your production backend URL before building for production.

Example for Railway backend:
```
VITE_BACKEND_API_URL=https://your-backend.railway.app
```

## Features Overview

### Home Page
- Gradient hero section with "Find Your Perfect Stay" title
- Search bar with city filter
- Filter by bedrooms and number of guests
- Responsive grid of property cards (1 col mobile, 2 col tablet, 3 col desktop)
- Property cards show: image, title, location, price, bedrooms, bathrooms, guests

### Property Detail Page
- Image gallery with thumbnail selection
- Property information: bedrooms, bathrooms, max guests
- Full property description
- Amenities list
- Booking form with:
  - Check-in date picker
  - Check-out date picker
  - Number of guests selector
  - "Get Price Quote" button
  - Price breakdown display (accommodation, cleaning fee, total)

## License

MIT
