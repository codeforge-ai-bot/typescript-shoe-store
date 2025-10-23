# TypeScript Shoe Store

A TypeScript-based shoe store application built with Express.js.

## Features

- RESTful API for shoe catalog management
- TypeScript for type safety
- Express.js web framework
- CORS enabled for cross-origin requests
- Security with helmet
- Logging with morgan

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Build and Run

Build the project:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

## API Endpoints

- `GET /api/shoes` - Get all shoes
- `GET /api/shoes/:id` - Get a specific shoe
- `POST /api/shoes` - Create a new shoe
- PUT /api/shoes/:id` - Update a shoe
- `DELETE /api/shoes/:id` - Delete a shoe

## Project Structure

```
src/
├── index.ts          # Main application entry point
├── routes/           # API routes
│   └── shoes.ts
├── models/           # Data models
│   └── shoe.ts
├── controllers/      # Business logic
│   └── shoeController.ts
├── services/         # Business services
│   └── shoeService.ts
├── utils/            # Utility functions
│   │   └── validation.ts
└── types/            # TypeScript type definitions
    └── index.ts
```

## License

MIT