# SP Starter Kit

A modern full-stack application starter kit for building web applications.

## 🚀 Quick Start

1. **Clone and install**

   ```bash
   git clone https://github.com/your-username/sp-starter-kit.git
   cd sp-starter-kit
   pnpm install
   ```

2. **Set up your environment**

   - Copy `.env.local.example` to `.env.local`
   - Update the following variables:
     ```env
     # Database
     DATABASE_URL=postgresql://user:password@localhost:5432/dbname
     ```

3. **Set up the database**

   ```bash
   # Generate Prisma client
   pnpm db:generate

   # Run database migrations
   pnpm db:migrate
   ```

4. **Start development**
   ```bash
   pnpm dev
   ```

## 📋 Requirements

- Node.js 20.13.1 or later
- pnpm 9.9.0 or later
- PostgreSQL database

## 🛠️ Detailed Setup

### 1. Environment Setup

Create a `.env.local` file in the root directory with these variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

To get these values:

1. **Database URL**:
   - Install PostgreSQL if you haven't already
   - Create a new database: `createdb dbname`
   - Format: `postgresql://username:password@localhost:5432/dbname`
   - Default PostgreSQL port is 5432

### 2. Database Setup

1. **Generate Prisma Client**

   ```bash
   pnpm db:generate
   ```

2. **Run Migrations**

   ```bash
   pnpm db:migrate
   ```

3. **Push Schema Changes** (if needed)
   ```bash
   pnpm db:push
   ```

### 3. Development

1. **Start Development Server**

   ```bash
   pnpm dev
   ```

   This will start the Vite development server at `http://localhost:5173`

2. **Build for Production**

   ```bash
   pnpm build
   ```

3. **Preview Production Build**
   ```bash
   pnpm preview
   ```

## 📦 Common Commands

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Database
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run database migrations
pnpm db:push      # Push schema changes
pnpm db:seed      # Seed the database

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm type-check   # Run TypeScript type checking

# Maintenance
pnpm clean        # Clean build artifacts and dependencies
```

## 📁 Project Structure

```
sp-starter-kit/
├── apps/
│   └── web/           # Frontend application
├── packages/
│   ├── db/            # Database package
│   ├── api/           # API package
│   ├── ui/            # UI components
│   └── utils/         # Shared utilities
├── .env.local         # Environment variables
└── package.json       # Project configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT
