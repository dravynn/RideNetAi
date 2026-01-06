# Ride Network Connection - Web MVP

A production-grade student ride-sharing platform built with TypeScript, Next.js, Express, and Supabase.

## 🏗️ Architecture

This is a **monorepo** containing:

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Backend**: Express.js API with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Realtime**: Socket.IO for live tracking

## 📁 Project Structure

```
.
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
├── supabase/          # Database schema and migrations
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- Git

### 1. Database Setup

**📖 See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed step-by-step instructions.**

Quick steps:
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the schema from `supabase/schema.sql`
4. Get your API keys from Settings → API

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` file (see `ENV_TEMPLATE.md` for template):

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

The API will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local` file (see `ENV_TEMPLATE.md` for template):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the frontend:

```bash
npm run dev
```

The app will run on `http://localhost:3000`

## 🔐 Authentication

### Creating Users

Users are created through Supabase Auth. The application supports three roles:

- **PARENT**: Can manage students, view subscriptions, track trips
- **DRIVER**: Can view assigned trips and update location
- **ADMIN**: Full access to manage drivers, groups, subscriptions

### Setting Up Admin User

1. Sign up a user through the frontend (creates PARENT role by default)
2. In Supabase SQL Editor, update the user role:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

3. Log in at `/admin/login`

## 📡 API Endpoints

### Parents

- `POST /api/parents/students` - Create student
- `GET /api/parents/students` - List students
- `GET /api/parents/subscription` - Get subscriptions

### Drivers (Admin only)

- `GET /api/drivers/pending` - Get pending drivers
- `POST /api/drivers/:id/approve` - Approve driver
- `GET /api/drivers` - List all drivers

### Admin

- `POST /api/admin/groups` - Create group
- `POST /api/admin/groups/:id/assign-driver` - Assign driver to group
- `GET /api/admin/groups` - List groups

### Tracking

- `POST /api/tracking/location` - Record location (driver)
- `GET /api/tracking/trips/:tripId/locations` - Get trip locations

### Webhooks

- `POST /api/webhooks/payments` - Payment webhook (Stripe stub)

## 🔌 WebSocket Events

### Client → Server

- `join-trip` - Join a trip room
- `leave-trip` - Leave a trip room
- `location-update` - Send location update (driver)

### Server → Client

- `joined-trip` - Confirmation of joining trip
- `location-history` - Initial location history
- `location-update` - Real-time location update
- `error` - Error message

## 🗄️ Database Schema

Key tables:

- `users` - User accounts with roles
- `parent_profiles` - Parent information
- `students` - Student information
- `driver_profiles` - Driver information and approval status
- `groups` - Route groups (manually created by admin)
- `group_students` - Student-group assignments
- `trip_sessions` - Active/scheduled trips
- `location_points` - GPS tracking data
- `subscriptions` - Parent subscriptions
- `payment_transactions` - Payment records

See `supabase/schema.sql` for full schema with indexes and RLS policies.

## 🛠️ Development

### Backend

```bash
cd backend
npm run dev      # Development with hot reload
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Lint code
```

### Frontend

```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm start        # Run production build
npm run lint     # Lint code
```

## 🧪 Testing

Testing setup is not included in MVP. Add tests as needed:

- Backend: Jest + Supertest
- Frontend: Jest + React Testing Library

## 📦 Deployment

### Backend

1. Build: `npm run build`
2. Deploy to: Railway, Render, Heroku, or AWS
3. Set environment variables
4. Ensure WebSocket support

### Frontend

1. Build: `npm run build`
2. Deploy to: Vercel (recommended), Netlify, or any static host
3. Set environment variables

### Database

- Supabase handles hosting
- Run migrations via Supabase dashboard or CLI

## 🔒 Security

- JWT authentication via Supabase
- Row Level Security (RLS) enabled on all tables
- Role-based access control (RBAC)
- CORS configured
- Environment variables for secrets

## 🚧 MVP Limitations

This MVP includes:

- ✅ Basic auth and user management
- ✅ Student management
- ✅ Driver approval workflow
- ✅ Manual group creation
- ✅ Live tracking via WebSocket
- ✅ Subscription management (stub)

Not included (future):

- ❌ Mobile apps
- ❌ Automated route optimization
- ❌ Payment processing (stub only)
- ❌ Push notifications
- ❌ Advanced analytics
- ❌ Multi-region support

## 📝 Next Steps

1. **Complete Payment Integration**: Implement Stripe/PayPal webhooks
2. **Add Map Integration**: Google Maps or Mapbox for live tracking UI
3. **Enhance Admin UI**: Complete group creation and student assignment flows
4. **Add Validation**: Form validation with Zod schemas
5. **Error Handling**: Comprehensive error boundaries and user feedback
6. **Testing**: Add unit and integration tests

## 🤝 Contributing

1. Follow TypeScript best practices
2. Keep functions small and focused
3. Use async/await consistently
4. Add comments for non-obvious logic
5. Follow existing code structure

## 📄 License

[Your License Here]

## 🆘 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ for student transportation**

