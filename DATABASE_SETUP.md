# Database Setup Guide

## Neon PostgreSQL Configuration

### 1. Create Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string

### 2. Configure Netlify Environment Variables

In your Netlify dashboard, go to **Site Settings** → **Environment Variables** and add:

```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
ADMIN_PASSWORD=your-secure-password
ADMIN_SECRET=your-secret-token-for-api
```

**Note:** `@netlify/neon` automatically uses the `DATABASE_URL` or Neon integration.

### 3. Run Database Schema

Connect to your Neon database and run the SQL in `database/schema.sql`:

```sql
-- You can run this in Neon SQL Editor
-- Or use psql: psql DATABASE_URL -f database/schema.sql
```

### 4. Enable Neon Integration (Recommended)

1. In Netlify dashboard, go to **Integrations**
2. Search for "Neon"
3. Connect your Neon account
4. This auto-configures the database connection

## API Endpoints

### Public Endpoints

| Endpoint                            | Method | Description              |
| ----------------------------------- | ------ | ------------------------ |
| `/.netlify/functions/get-portfolio` | GET    | Fetch all portfolio data |

### Admin Endpoints (Requires Auth)

| Endpoint                              | Method          | Description         |
| ------------------------------------- | --------------- | ------------------- |
| `/.netlify/functions/admin-login`     | POST            | Login with password |
| `/.netlify/functions/admin-user`      | PUT             | Update user profile |
| `/.netlify/functions/admin-education` | POST/PUT/DELETE | Manage education    |
| `/.netlify/functions/admin-projects`  | POST/PUT/DELETE | Manage projects     |
| `/.netlify/functions/admin-skills`    | POST/PUT/DELETE | Manage skills       |

### Authentication

1. Login sends password to `/admin-login`
2. Server returns a token if password matches `ADMIN_PASSWORD`
3. Token is sent in `Authorization: Bearer <token>` header
4. Server validates token against `ADMIN_SECRET`

## Local Development

For local development without database:

- The app falls back to localStorage
- Login works with default password `admin123`
- All CRUD operations work locally

To test with Netlify Functions locally:

```bash
npm install -g netlify-cli
netlify dev
```

## Database Schema

### Tables

- **portfolio_user** - User profile information
- **portfolio_education** - Education history
- **portfolio_projects** - Portfolio projects (tags stored as array)
- **portfolio_skills** - Skills by category
- **messages** - Contact form messages

## Security Recommendations

1. **Change default password** - Update `ADMIN_PASSWORD` in Netlify env vars
2. **Use strong secret** - Generate a random `ADMIN_SECRET` (32+ chars)
3. **Enable SSL** - Already configured with Neon
4. **Rate limiting** - Consider adding rate limiting for login attempts

## Troubleshooting

### "Failed to fetch portfolio data"

- Check if Netlify Functions are deployed
- Verify DATABASE_URL is set correctly
- Check Neon database is accessible

### "Unauthorized" on admin actions

- Verify ADMIN_SECRET matches in frontend and backend
- Check token in sessionStorage
- Try logging out and back in

### Empty skills/projects

- Run the schema.sql to seed default data
- Check database connection in Neon console
