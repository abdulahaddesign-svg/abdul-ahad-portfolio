-- ==============================================================================
-- FIX STORAGE UPLOADS & SITE SETTINGS PERMISSIONS
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/kptxbhhiucgdfqutxwjj/sql)
-- ==============================================================================

-- 1. Ensure 'portfolio-media' bucket exists and is public
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = true;

-- 2. Allow upload to portfolio-media storage bucket
drop policy if exists "Public Access to portfolio-media" on storage.objects;
drop policy if exists "Admin upload access to portfolio-media" on storage.objects;
drop policy if exists "Admin update access to portfolio-media" on storage.objects;
drop policy if exists "Admin delete access to portfolio-media" on storage.objects;
drop policy if exists "Allow upload to portfolio-media" on storage.objects;
drop policy if exists "Allow update to portfolio-media" on storage.objects;

create policy "Public Access to portfolio-media"
on storage.objects for select
using ( bucket_id = 'portfolio-media' );

create policy "Allow upload to portfolio-media"
on storage.objects for insert
with check ( bucket_id = 'portfolio-media' );

create policy "Allow update to portfolio-media"
on storage.objects for update
using ( bucket_id = 'portfolio-media' );

-- 3. Allow site_settings updates
drop policy if exists "Admins manage site settings" on public.site_settings;
drop policy if exists "Allow update to site settings" on public.site_settings;

create policy "Allow update to site settings"
on public.site_settings for all
using (true)
with check (true);
