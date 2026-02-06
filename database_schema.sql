-- Create the resources table
create table resources (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  subject_name text not null,
  subject_code text,
  semester int not null,
  resource_type text not null,
  file_name text not null,
  file_url text not null
);

-- Enable Row Level Security
alter table resources enable row level security;

-- Policy: Allow Public Read Access
create policy "Public resources are viewable by everyone"
  on resources for select
  using ( true );

-- Policy: Allow Anonymous Uploads (Insert)
create policy "Everyone can upload resources"
  on resources for insert
  with check ( true );

-- Create the storage bucket for PDFs
insert into storage.buckets (id, name, public) 
values ('pdfs', 'pdfs', true);

-- Storage Policy: Allow Public Read/Download
create policy "Public PDFs are viewable by everyone"
  on storage.objects for select
  using ( bucket_id = 'pdfs' );

-- Storage Policy: Allow Anonymous Uploads
create policy "Everyone can upload PDFs"
  on storage.objects for insert
  with check ( bucket_id = 'pdfs' );
