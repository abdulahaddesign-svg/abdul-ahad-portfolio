const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const envMap = {};
env.split('\n').forEach(l => {
  const m = l.match(/^([^=]+)=(.*)$/);
  if (m) envMap[m[1].trim()] = m[2].trim().replace(/^['"]|['"]$/g, '');
});

// Load SERVICES_DATA
// Let's read constants.ts to get the services
const constantsCode = fs.readFileSync('src/lib/constants.ts', 'utf8');
const match = constantsCode.match(/export const SERVICES_DATA: ServiceItem\[\] = (\[[\s\S]*?\n\];)/);

let servicesData;
if (match) {
  // Simple eval in sandbox
  const code = 'const services = ' + match[1].replace(/;$/, '') + '; services;';
  servicesData = eval(code);
}

async function seed() {
  const adminKey = envMap.SUPABASE_SERVICE_ROLE_KEY || envMap.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const baseUrl = envMap.NEXT_PUBLIC_SUPABASE_URL;

  console.log('Seeding services to Supabase at:', baseUrl);

  // 1. Fetch current services in Supabase
  const getRes = await fetch(`${baseUrl}/rest/v1/services?select=id,slug`, {
    headers: {
      'apikey': adminKey,
      'Authorization': `Bearer ${adminKey}`
    }
  });
  const existing = await getRes.json();
  const existingSlugs = new Set((Array.isArray(existing) ? existing : []).map(s => s.slug));
  console.log('Existing slugs in Supabase:', [...existingSlugs]);

  // 2. Insert missing services
  for (const s of servicesData) {
    if (existingSlugs.has(s.slug)) {
      console.log(`Service '${s.slug}' already exists in Supabase. Skipping to preserve user edits.`);
      continue;
    }

    const row = {
      slug: s.slug,
      title: s.title,
      is_primary: s.isPrimary ?? false,
      tagline: s.tagline || '',
      short_summary: s.shortSummary || '',
      description: s.description || '',
      deliverables: s.deliverables || [],
      typical_projects: s.typicalProjects || [],
      creative_process: s.creativeProcess || [],
      primary_image: s.primaryImage || '',
      supporting_images: s.supportingImages || [],
      image_url: s.primaryImage || '',
      cta_text: s.ctaText || 'Initiate Brief',
      cta_href: s.ctaHref || '/contact',
      sort_order: s.sortOrder ?? 0,
      is_published: s.isPublished !== false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const insertRes = await fetch(`${baseUrl}/rest/v1/services`, {
      method: 'POST',
      headers: {
        'apikey': adminKey,
        'Authorization': `Bearer ${adminKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(row)
    });

    if (insertRes.ok) {
      console.log(`Successfully seeded '${s.slug}' (${s.title}) to Supabase!`);
    } else {
      const errText = await insertRes.text();
      console.error(`Failed to insert '${s.slug}':`, errText);
    }
  }

  // Check final count
  const finalRes = await fetch(`${baseUrl}/rest/v1/services?select=id,title,slug,sort_order`, {
    headers: {
      'apikey': adminKey,
      'Authorization': `Bearer ${adminKey}`
    }
  });
  const finalData = await finalRes.json();
  console.log('Final services in Supabase:', finalData);
}

seed();
