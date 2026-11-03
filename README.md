# Abdul Ahad J — Premium Creative Portfolio & Admin CMS

> **"Designed with intent. Made to matter."**

A production-ready personal portfolio website and full-stack Content Management System (CMS) designed and engineered for **Abdul Ahad J**, a multidisciplinary creative designer and visual branding specialist based in Coimbatore, Tamil Nadu, India.

---

## 1. Brand Identity & Design System

### Colors
- **Charcoal** (`#25241F`): Primary dark substrate, architectural text, and high-contrast editorial surfaces.
- **Warm Ivory** (`#F4EFE6`): Primary light substrate, airy backgrounds, and balanced negative space.
- **Earth Brown** (`#7C5C3E`): Secondary brand color for subtle dividers, borders, and tactile accents.
- **Burnt Copper** (`#C4855A`): Primary vibrant accent for CTAs, active highlights, badges, and monogram links.
- **Muted Sage** (`#8A9E88`): Supporting accent for status indicators, achievements, and culinary highlights.

### Typography
- **Headings & Display**: Space Grotesk (geometric, contemporary, architecturally disciplined).
- **Body & Interface**: Manrope (clean, legible, multi-weight humanist sans-serif).

### Logo Suite
- **Primary Wordmark**: `ABDUL` in charcoal/ivory, `AHAD` in burnt copper, with geometric letterform proportions.
- **Secondary Monogram**: Interlocking `AA` monogram with burnt copper crossbar and keyframe SVG entrance animations.
- Static SVG files available in `/public/brand/` for standalone light and dark usage.

---

## 2. Professional Credentials & Information

- **Name**: Abdul Ahad J
- **Title**: Graphic Designer | Visual Branding Specialist | Creative Designer
- **Location**: Coimbatore, Tamil Nadu, India
- **Email**: [abdulahad.ofcl@gmail.com](mailto:abdulahad.ofcl@gmail.com)
- **Phone / WhatsApp**: [+91 9150037005](https://wa.me/919150037005)
- **Behance**: [behance.net/abdulahad438](https://www.behance.net/abdulahad438)
- **LinkedIn**: [linkedin.com/in/abdulahadj](https://www.linkedin.com/in/abdulahadj)
- **Education**: Bachelor of Science in Computer Science, Government Arts College (Autonomous), Coimbatore, 2020–2023, 80% aggregate.
- **Honors**: **Best Employee of the Year 2025 at eClerx** for design excellence and 25% client campaign engagement lift.
- **Commercial Track Record**:
  - **Falcon Square Private Limited** (May 2025 – Present): Enterprise SaaS collateral, posters, digital ads, social calendars, Figma UI, and motion reels.
  - **eClerx** (June 2023 – May 2025): Global enterprise campaign visual assets, editorial brochures, magazines, +25% engagement lift.
  - **Freelance** (August 2020 – Present): 50+ clients, 20+ hero section UI explorations, retail packaging dielines.
- **Flagship Key Project**: **Reztro — Digital Table Ordering System** (May–July 2025). Mobile-first QR dining application delivering a verified 40% reduction in customer order placement delays.

---

## 3. Technology Stack

- **Framework**: Next.js 14 (App Router, Server Components & Client Components)
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom brand color tokens & responsive typography
- **Animation**: Framer Motion with cubic-bezier easings and `prefers-reduced-motion` safety
- **Icons**: Lucide React
- **Backend / Database**: Supabase & PostgreSQL with Row Level Security (RLS)
- **Storage**: Supabase Storage (`portfolio-media` public bucket) with automatic local preview fallback
- **Authentication**: Supabase Auth + local fallback credentials for instant development testing

---

## 4. Architecture & Directory Structure

```
├── public/
│   ├── brand/               # Static SVG logos & monograms (light & dark)
│   ├── projects/            # Visual case study graphics & diagrams
│   └── favicon.svg          # High-resolution monogram favicon
├── supabase/
│   ├── migrations/          # Complete PostgreSQL schema with RLS policies
│   └── seed.sql             # Authentic resume seed data & Reztro case study
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, Google fonts, and JSON-LD schema
│   │   ├── page.tsx         # Editorial Homepage (8 curated sections)
│   │   ├── work/
│   │   │   ├── page.tsx     # Work archive with category filtering
│   │   │   └── [slug]/      # Dynamic project case study routes
│   │   ├── services/        # Detailed capabilities & deliverables
│   │   ├── about/           # Career story, timeline, skills & awards
│   │   ├── contact/         # Client inquiry brief & direct contact
│   │   ├── admin/           # Secure Admin Dashboard & CMS
│   │   │   ├── page.tsx     # Overview metrics
│   │   │   ├── login/       # Admin authentication portal
│   │   │   ├── projects/    # Project CMS list, editor & duplicate
│   │   │   ├── inquiries/   # Client lead & brief manager
│   │   │   ├── media/       # Storage library & asset uploader
│   │   │   └── content/     # Global copy & resume editor
│   │   ├── api/
│   │   │   ├── contact/     # Inquiry submission API
│   │   │   └── upload/      # Image upload API (Supabase Storage + fallback)
│   │   ├── sitemap.ts       # Dynamic XML sitemap generator
│   │   └── robots.ts        # Search crawler rules
│   ├── components/
│   │   ├── brand/           # Logo & animated Monogram components
│   │   ├── home/            # All homepage section components
│   │   ├── layout/          # Navbar, Footer, AdminSidebar
│   │   ├── motion/          # Framer Motion Reveal & Stagger wrappers
│   │   └── ui/              # Button, Badge, Card, Input, Textarea, Select
│   └── lib/
│       ├── types.ts         # TypeScript interfaces
│       ├── constants.ts     # Verified resume constants & projects
│       ├── data.ts          # Unified data layer (Supabase + local fallback)
│       ├── auth.ts          # Admin session management
│       ├── utils.ts         # Formatting & slug helpers
│       └── supabase/        # Supabase client & server instances
```

---

## 5. Getting Started (Local Development)

### Prerequisites
- Node.js 18.17+ or 20.x
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/abdulahad/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Zero-Setup Local Testing**: The portfolio runs out-of-the-box with complete resume data and simulated admin features. You do not need to configure Supabase immediately to test the public website, contact inquiries, or admin dashboard.

---

## 6. Supabase Database & Backend Setup

When you are ready to link the real Supabase cloud backend:

1. Create a free account at [supabase.com](https://supabase.com) and click **New Project**.
2. Go to **SQL Editor** in your Supabase project dashboard.
3. Paste and run the entire contents of:
   - `supabase/migrations/20261103000000_init_portfolio_schema.sql`
4. (Optional) Run `supabase/seed.sql` to populate initial projects.
5. Go to **Project Settings -> API** and copy your:
   - **Project URL**
   - **anon / public key**
   - **service_role key** (keep private!)
6. Add these keys to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Storage Bucket
The SQL script automatically creates a public bucket named `portfolio-media` with appropriate RLS policies. Any images uploaded through the admin CMS will be stored in this bucket.

---

## 7. Admin CMS Account Setup

### Default Demo Credentials (Local Dev)
- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: `admin@abdulahad.design`
- **Password**: `AdminSecure2025!`

### Production Supabase Admin Setup
1. In the Supabase Dashboard, navigate to **Authentication -> Users**.
2. Click **Add User -> Create User**.
3. Enter your administrative email (e.g. `abdulahad.ofcl@gmail.com`) and choose a strong password.
4. In your `.env.local`, set `ADMIN_FALLBACK_PASSWORD` to a secure production secret or rely entirely on Supabase Auth.
5. Log in at `/admin/login`.

---

## 8. Managing Content Through the CMS

### Creating or Editing Projects
1. Go to `/admin/projects` and click **Add New Project**.
2. Fill in:
   - **Title**: e.g., "Reztro — Digital Table Ordering System"
   - **Slug**: auto-generated from title, or enter custom URL slug
   - **Category**: select from Branding, UI/UX, Graphic Design, Social Media, etc.
   - **Narrative**: Short summary, full description, challenge, creative process, solution, and measurable results.
   - **Visuals**: Upload a cover image and add gallery URLs.
   - **Publishing**: Toggle "Published on Website" or "Featured Project".
3. Click **Save Project**. It will instantly reflect on the public portfolio.

### Client Inquiries
1. Prospective clients submit the inquiry brief on `/contact`.
2. Inquiries are logged into the database and visible at `/admin/inquiries`.
3. The admin can mark them as **Contacted**, **Archived**, or click **Reply via Email Client** to launch a pre-addressed email reply.

### Site Settings
1. Go to `/admin/content`.
2. Update homepage headlines, tagline, bio, contact coordinates, education scores, or social links.
3. Click **Save Site Content**.

---

## 9. Search Engine Optimization (SEO)

- **Technical SEO**: Clean semantic HTML5 landmarks, dynamic OpenGraph metadata, Twitter cards, canonical tags, automated XML sitemap (`/sitemap.xml`), and robots configuration (`/robots.txt`).
- **Structured Data (JSON-LD)**: Schema.org `Person`, `WebSite`, and `ProfessionalService` graphs embedded in the root `<head>`.
- **Target Keywords Naturally Integrated**:
  - *Graphic designer in Coimbatore*
  - *Visual branding specialist in Coimbatore*
  - *UI/UX designer in Coimbatore*
  - *Motion graphics designer in Coimbatore*
  - *Freelance graphic designer in Coimbatore*

---

## 10. Production Deployment

### Deploying to Vercel
1. Push the codebase to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Abdul Ahad creative portfolio & admin CMS"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **Import Project**.
3. Select your GitHub repository.
4. In the **Environment Variables** section, configure:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-custom-domain.com`
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your private service role key
5. Click **Deploy**.

---

## 11. Author

**Abdul Ahad J**
- Graphic Designer & Visual Branding Specialist
- Coimbatore, Tamil Nadu, India
- Email: `abdulahad.ofcl@gmail.com`
- Portfolio: `https://abdulahad.design`
