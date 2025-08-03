# Mihika Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean and professional portfolio layout
- **Responsive**: Optimized for all devices and screen sizes
- **Fast Performance**: Built with Next.js for optimal loading speeds
- **Contact Form**: Integrated contact functionality
- **Dark/Light Mode**: Theme switching capability
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Deployment**: GitHub Pages

## 📋 Sections

- **Hero**: Introduction and call-to-action
- **About**: Personal information and background
- **Education**: Academic achievements and qualifications
- **Experience**: Professional work history
- **Projects**: Showcase of technical projects
- **Skills**: Technical skills and competencies
- **Leadership**: Leadership roles and achievements
- **Contact**: Contact form and information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MihikaS12/Mihika-Portfolio.git
cd Mihika-Portfolio
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Building for Production

```bash
npm run build
# or
pnpm build
```

The built files will be in the `out` directory, ready for deployment.

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions. Simply push to the `main` branch and the site will be automatically built and deployed.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The static files will be generated in the `out` directory
3. Deploy the contents of the `out` directory to your hosting provider

## 📁 Project Structure

```
mihika-portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── *.tsx             # Section components
├── public/               # Static assets
├── styles/               # Additional styles
└── scripts/              # Backend scripts
```

## 🎨 Customization

### Colors and Themes

The project uses Tailwind CSS with a custom color palette. You can modify the colors in `tailwind.config.ts`.

### Content

Update the content in each section component:
- `HeroSection.tsx` - Introduction and hero content
- `AboutSection.tsx` - Personal information
- `EducationSection.tsx` - Educational background
- `ExperienceSection.tsx` - Work experience
- `ProjectsSection.tsx` - Project showcase
- `SkillsSection.tsx` - Skills and technologies
- `LeadershipSection.tsx` - Leadership experience
- `ContactSection.tsx` - Contact information

### Images

Replace images in the `public/images/` directory with your own photos and assets.

## 🔧 Configuration

### Next.js Config

The project is configured for static export in `next.config.mjs`:

- Static export enabled for GitHub Pages
- Image optimization disabled for static deployment
- Base path configured for repository deployment

### GitHub Pages

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the site to GitHub Pages.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For any questions or suggestions, please open an issue on GitHub or contact through the portfolio website.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS 