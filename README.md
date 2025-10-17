# JM Investments Website

A modern, responsive website for JM Investments - a financial services company offering mutual funds, insurance, fixed deposits, and unlisted shares. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Interactive**: Smooth scroll animations and hover effects
- **Financial Products**: Showcase of investment and insurance products
- **Client Testimonials**: Social proof with customer reviews
- **Contact Form**: Lead generation form for consultations
- **Partner Integration**: Angel One partnership highlights

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main homepage component
├── components/
│   └── ui/                  # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Key Sections

1. **Hero Section**: Company introduction with key statistics
2. **Partner Brands**: Animated scrolling partner logos
3. **Products**: Financial products showcase with features
4. **Angel One Partnership**: Partnership benefits and features
5. **Testimonials**: Client reviews and ratings
6. **Contact**: Contact form and company information
7. **Footer**: Links and legal information

## Customization

- **Colors**: Update CSS variables in `app/globals.css`
- **Content**: Modify data arrays in `app/page.tsx`
- **Styling**: Adjust Tailwind classes throughout components
- **Animations**: Customize Framer Motion animations

## Build for Production

```bash
npm run build
npm start
```

## License

© 2024 JM Investments. All rights reserved.
