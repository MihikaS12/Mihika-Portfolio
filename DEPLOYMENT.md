# GitHub Pages Deployment Guide

## 🚀 Automatic Deployment

This project is configured for automatic deployment to GitHub Pages. The deployment happens automatically when you push to the `main` branch.

### Setup Steps:

1. **Repository Settings**: 
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "GitHub Actions"

2. **Enable GitHub Pages**:
   - The GitHub Actions workflow will automatically handle the deployment
   - No additional configuration needed

3. **Access Your Site**:
   - Your site will be available at: `https://mihikas12.github.io/Mihika-Portfolio/`
   - The first deployment may take 5-10 minutes

## 🔧 Manual Deployment (if needed)

If you need to deploy manually:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **The static files are generated in the `out` directory**

3. **Upload the contents of the `out` directory to your hosting provider**

## 📋 Pre-deployment Checklist

- ✅ Next.js configured for static export
- ✅ GitHub Actions workflow created
- ✅ All dependencies installed
- ✅ Build process tested locally
- ✅ Contact form API routes compatible with static export
- ✅ Images optimized for web
- ✅ SEO meta tags configured

## 🌐 Post-deployment

After deployment:

1. **Test the live site**: Visit your GitHub Pages URL
2. **Check all sections**: Ensure all portfolio sections load correctly
3. **Test contact form**: Verify the contact form works (may require backend setup)
4. **Mobile responsiveness**: Test on different devices
5. **Performance**: Check loading speeds and optimize if needed

## 🔍 Troubleshooting

### Common Issues:

1. **Build fails**: Check the GitHub Actions logs for errors
2. **Images not loading**: Ensure all images are in the `public` directory
3. **Contact form not working**: The form will work but may need backend configuration
4. **Styling issues**: Check if Tailwind CSS is building correctly

### Solutions:

- **Rebuild**: Push a new commit to trigger a fresh build
- **Check logs**: Review GitHub Actions workflow logs
- **Local testing**: Test the build locally first with `npm run build`

## 📞 Support

If you encounter issues:

1. Check the GitHub Actions logs in your repository
2. Verify all files are committed and pushed
3. Ensure the repository is public (required for GitHub Pages)
4. Check that GitHub Pages is enabled in repository settings

---

Your portfolio is now ready for deployment! 🎉 