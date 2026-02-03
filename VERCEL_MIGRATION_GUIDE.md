# VinylVault Migration Guide: Netlify → Vercel

## Migration Summary

Your VinylVault e-commerce website has been successfully configured for Vercel deployment. All necessary files have been created and updated.

## Changes Made

### 1. New Files Created

#### `vercel.json` (Root Directory)
- Configures Vercel deployment with proper routing
- Sets up API routes to point to `/api/index.js`
- Configures SPA routing for React frontend
- Adds CORS headers for API endpoints
- Maps static assets correctly

#### `api/index.js` (New Backend Location)
- Migrated from `/netlify/functions/api.js`
- Updated to work with Vercel serverless functions
- Routes changed from `/.netlify/functions/api/*` to `/api/*`
- Removed `serverless-http` wrapper (not needed for Vercel)
- All authentication logic preserved

### 2. Updated Files

#### `client/src/utils/api.js`
- Updated API_URL configuration to use `/api` instead of `/.netlify/functions/api`
- Added support for `REACT_APP_API_URL` environment variable
- Development server now points to `http://localhost:3000/api`
- Production uses `/api` (relative path)

#### `client/package.json`
- Added `vercel-build` script for Vercel deployment
- Ensures `CI=false` to prevent build failures on warnings

#### `.gitignore`
- Added `.vercel` and `.vercel/` to ignore Vercel deployment files

## Deployment Instructions

### Prerequisites

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Ensure Dependencies Are Installed**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Migrate from Netlify to Vercel"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"**

4. **Import your GitHub repository**

5. **Configure Project Settings**:
   - Framework Preset: **Other** (or leave as detected)
   - Root Directory: **.**
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/build`
   - Install Command: `npm install`

6. **Environment Variables** (Optional):
   - Add `NODE_ENV` = `production` (usually set automatically)
   - Add `REACT_APP_API_URL` = `/api` (optional, defaults correctly)

7. **Click "Deploy"**

### Option 2: Deploy via CLI

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **vinyl-vault** (or your preferred name)
   - In which directory is your code located? **.**
   - Want to override the settings? **N**

4. **For Production Deployment**:
   ```bash
   vercel --prod
   ```

## Environment Variables Setup

### Local Development (.env.local in /client)

Create `client/.env.local` for local development:

```env
# API URL for local development
REACT_APP_API_URL=http://localhost:3000/api

# Or leave empty to use defaults
```

### Vercel Dashboard Environment Variables

Go to your project settings in Vercel Dashboard → Environment Variables:

**Optional Variables** (the app works without these):
- `NODE_ENV` = `production` (usually auto-set)
- `REACT_APP_API_URL` = `/api` (optional, uses default)

## API Route Changes

All API routes have been updated:

| Old (Netlify) | New (Vercel) |
|--------------|--------------|
| `/.netlify/functions/api/auth/signup` | `/api/auth/signup` |
| `/.netlify/functions/api/auth/login` | `/api/auth/login` |
| `/.netlify/functions/api/auth/logout` | `/api/auth/logout` |
| `/.netlify/functions/api/auth/status` | `/api/auth/status` |

The frontend automatically uses the correct URLs based on environment.

## Testing Your Deployment

### 1. Local Testing

Test the API locally using Vercel CLI:

```bash
vercel dev
```

This will:
- Start the development server
- Run the API at `http://localhost:3000/api`
- Run the frontend at `http://localhost:3000`

### 2. Test Authentication

After deployment, test these features:
- ✅ User signup at `/signup`
- ✅ User login at `/login`
- ✅ Session persistence
- ✅ Logout functionality
- ✅ Protected routes

### 3. Default Test Credentials

```
Email: test@test.com
Password: test123
```

## Important Notes

### ⚠️ Session Storage Limitation

The current implementation uses **in-memory session storage**, which means:
- Sessions will be lost when the serverless function restarts
- Users may need to log in again after function cold starts
- **Recommendation**: Migrate to a persistent database (MongoDB, PostgreSQL, Redis) for production

### 🔒 Security Considerations

For production deployment, consider:
1. **Use a real database** for user and session storage
2. **Hash passwords** with bcrypt or similar
3. **Use environment variables** for sensitive data
4. **Implement JWT tokens** instead of session IDs
5. **Add rate limiting** to prevent abuse
6. **Use HTTPS** (Vercel provides this automatically)
7. **Restrict CORS** to specific domains instead of `*`

### 📦 Dependencies

The following dependencies are required (already in package.json):
- `express`: ^4.21.2
- `body-parser`: ^1.20.3
- `cors`: ^2.8.5

**Note**: `serverless-http` is no longer needed for Vercel (it was only for Netlify).

## Vercel Configuration Details

### vercel.json Explained

```json
{
  "builds": [
    // Build the React frontend
    { "src": "client/package.json", "use": "@vercel/static-build" },
    // Build the Express backend
    { "src": "api/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    // API routes go to the serverless function
    { "src": "/api/(.*)", "dest": "/api/index.js" },
    // Static assets
    { "src": "/static/(.*)", "dest": "/client/build/static/$1" },
    // SPA fallback - all other routes go to index.html
    { "src": "/(.*)", "dest": "/client/build/index.html" }
  ]
}
```

## Rollback Plan

If you need to rollback to Netlify:

1. Keep the `netlify.toml` file (don't delete it)
2. The original `/netlify/functions/api.js` is preserved
3. Revert `client/src/utils/api.js` to use `/.netlify/functions/api`
4. Remove `vercel.json` and `api/` folder
5. Redeploy to Netlify

## Common Issues & Solutions

### Issue: API calls fail with 404

**Solution**: Ensure your `vercel.json` is in the root directory and routes are configured correctly.

### Issue: CORS errors

**Solution**: Check that CORS headers are set in `vercel.json` and the API allows the frontend domain.

### Issue: Build fails

**Solution**: 
- Check that `client/package.json` has the `vercel-build` script
- Ensure all dependencies are installed
- Check Vercel build logs for specific errors

### Issue: Environment variables not working

**Solution**: 
- Prefix React env vars with `REACT_APP_`
- Redeploy after adding environment variables in Vercel dashboard

## Next Steps

1. ✅ **Deploy to Vercel** using one of the methods above
2. ✅ **Test all authentication flows**
3. 🔄 **Set up custom domain** (optional) in Vercel dashboard
4. 🔄 **Migrate to persistent database** for production readiness
5. 🔄 **Implement proper authentication** with JWT and password hashing
6. 🔄 **Add environment-specific configurations**
7. 🔄 **Set up CI/CD** with GitHub Actions (optional)

## Support

For Vercel-specific documentation:
- [Vercel Documentation](https://vercel.com/docs)
- [Deploying React Apps](https://vercel.com/guides/deploying-react-with-vercel)
- [Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

## Summary of Files to Commit

```bash
# New files
vercel.json
api/index.js

# Modified files
client/src/utils/api.js
client/package.json
.gitignore
```

Run these commands to commit and push:

```bash
git add vercel.json api/ client/src/utils/api.js client/package.json .gitignore
git commit -m "Migrate VinylVault from Netlify to Vercel"
git push origin main
```

---

**Migration completed successfully! 🚀**

Your VinylVault app is now ready to be deployed on Vercel with all authentication features preserved and properly configured.
