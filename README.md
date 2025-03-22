# Meto Admin Dashboard

Modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. Features a beautiful UI with smooth animations and a mobile-first design approach.

## Features

- 📱 Fully responsive design with mobile-first approach
- 🎨 Modern and clean UI with Tailwind CSS
- ✨ Smooth animations using Framer Motion
- 📊 Interactive charts and data visualization
- 🔐 Role-based access control (coming soon)
- 🌙 Dark mode support (coming soon)

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons (Remix Icons)
- **Charts:** Recharts
- **Routing:** React Router DOM
- **State Management:** React Hooks

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "framer-motion": "^10.x",
    "react-icons": "^4.x",
    "recharts": "^2.x",
    "tailwindcss": "^3.x",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── layouts/          # Layout components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── assets/           # Static assets
└── App.tsx           # Root component
```

## Available Pages

- **Dashboard:** Overview of key metrics and statistics
- **Orders:** Order management and tracking
- **Products:** Product catalog and inventory
- **Customers:** Customer management and details
- **Analytics:** Data visualization and reports
- **Settings:** Application configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [React Icons](https://react-icons.github.io/react-icons/) for the beautiful icons
- [Recharts](https://recharts.org/) for the charting library
