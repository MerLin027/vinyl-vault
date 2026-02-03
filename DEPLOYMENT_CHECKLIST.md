# Vercel Deployment Checklist

## Pre-Deployment

- [x] `vercel.json` created in root directory
- [x] Backend migrated to `api/index.js`
- [x] API routes updated (/.netlify/functions/api → /api)
- [x] Frontend API calls updated in `client/src/utils/api.js`
- [x] `vercel-build` script added to `client/package.json`
- [x] `.gitignore` updated for Vercel files
- [ ] All files committed to Git
- [ ] Code pushed to GitHub

## Deployment Steps

### Option A: Vercel Dashboard (Recommended for first deployment)

- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign in with GitHub
- [ ] Click "Add New Project"
- [ ] Import your repository
- [ ] Configure project (use defaults)
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Click "Visit" to view your site

### Option B: Vercel CLI (For quick deployments)

- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel`
- [ ] Production deploy: `vercel --prod`

## Post-Deployment Testing

- [ ] Visit your Vercel deployment URL
- [ ] Test signup with a new account
- [ ] Test login with credentials
- [ ] Test session persistence (refresh page while logged in)
- [ ] Test logout functionality
- [ ] Test navigation between pages
- [ ] Check browser console for errors
- [ ] Test on mobile device

## Test Credentials

Default test account:
```
Email: test@test.com
Password: test123
```

## API Endpoints to Test

- [ ] GET `/api` - Should return "API is running"
- [ ] POST `/api/auth/signup` - Create new account
- [ ] POST `/api/auth/login` - Login
- [ ] GET `/api/auth/status` - Check auth status
- [ ] POST `/api/auth/logout` - Logout

## Optional Enhancements

- [ ] Set up custom domain in Vercel
- [ ] Configure environment variables (if needed)
- [ ] Set up deployment notifications
- [ ] Enable Vercel Analytics
- [ ] Set up GitHub integration for auto-deploy

## Troubleshooting

If something doesn't work:

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the deployment
   - Click "View Function Logs" for API errors

2. **Check Browser Console**:
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed API calls

3. **Verify Routes**:
   - API calls should go to `/api/*`
   - Frontend routes should return `index.html`

4. **Common Fixes**:
   - Clear browser cache
   - Redeploy: `vercel --prod`
   - Check `vercel.json` is in root directory

## Success Criteria

Your deployment is successful when:

- ✅ Website loads at Vercel URL
- ✅ You can signup/login/logout
- ✅ No console errors
- ✅ All pages are accessible
- ✅ API calls work correctly

## Next Steps After Successful Deployment

1. [ ] Share deployment URL with team/users
2. [ ] Monitor Vercel Analytics for usage
3. [ ] Plan database migration (MongoDB/PostgreSQL)
4. [ ] Implement JWT authentication
5. [ ] Add password hashing (bcrypt)
6. [ ] Set up custom domain
7. [ ] Configure CORS for specific domain
8. [ ] Add rate limiting

## Useful Commands

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove project
vercel remove <project-name>

# Check Vercel CLI version
vercel --version
```

## Rollback Plan

If you need to rollback:

1. In Vercel Dashboard, go to Deployments
2. Find a previous working deployment
3. Click "..." menu → "Promote to Production"

Or revert your code changes and redeploy.

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Ready to deploy? Start with the Pre-Deployment checklist above!** 🚀
