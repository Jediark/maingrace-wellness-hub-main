-- 1. Create Tables

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  bestseller BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  date TEXT,
  read_time TEXT,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Consultation Requests Table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Row Level Security (RLS)

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for Products (Public Read)
DROP POLICY IF EXISTS "Public Read Products" ON products;
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);

-- Policies for Blog Posts (Public Read)
DROP POLICY IF EXISTS "Public Read Blog Posts" ON blog_posts;
CREATE POLICY "Public Read Blog Posts" ON blog_posts FOR SELECT USING (true);

-- Policies for Consultations (Public Insert)
DROP POLICY IF EXISTS "Public Insert Consultations" ON consultation_requests;
CREATE POLICY "Public Insert Consultations" ON consultation_requests FOR INSERT WITH CHECK (true);

-- Policies for Contact Inquiries (Public Insert)
DROP POLICY IF EXISTS "Public Insert Inquiries" ON contact_inquiries;
CREATE POLICY "Public Insert Inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);

-- 3. Seed Data (Initial Products)
TRUNCATE TABLE products RESTART IDENTITY CASCADE;
INSERT INTO products (name, category, rating, reviews, description, features, image_url, bestseller, in_stock)
VALUES 
('Herbal Tonic Immune Booster', 'Immunity', 4.8, 124, 'A powerful blend of ancient roots and leaves designed to strengthen your immune system naturally. This curative and preventive herbal tonic contains essential nutrients from natural fruits and herbs.', '{"100% natural ingredients", "Boosts immune system", "Curative & preventive", "Rich in antioxidants"}', '/images/products/product-herbal-tonic.png', true, true),
('Men''s Health Treatment Pack', 'Men''s Health', 4.9, 89, 'Complete herbal treatment for men''s reproductive health including STD treatment, infertility support, prostate health, and sexual performance enhancement.', '{"STD treatment", "Infertility support", "Prostate health", "Sexual performance"}', '/images/products/product-mens-health.png', true, true),
('STD Complete Treatment Pack', 'STD Treatment', 4.7, 156, 'Comprehensive herbal treatment package for STDs including gonorrhea, staphylococcus, syphilis, and more. A combination of roots and leaves for broad-spectrum treatment.', '{"Treats gonorrhea", "Staphylococcus treatment", "Broad spectrum action", "No side effects"}', '/images/products/product-std-treatment.png', false, true),
('Women''s Health Complete Pack', 'Women''s Health', 4.8, 112, 'Comprehensive herbal treatment for women''s health including fibroid treatment, endometriosis, fertility support, vaginal infections, and menstrual regulation.', '{"Fibroid treatment", "Fertility support", "Hormonal balance", "Menstrual regulation"}', '/images/products/product-womens-health.png', true, true);

-- 4. Seed Data (Blog Posts)
TRUNCATE TABLE blog_posts RESTART IDENTITY CASCADE;
INSERT INTO blog_posts (slug, title, excerpt, content, category, author, author_role, date, read_time, featured, tags, image_url)
VALUES 
('ancient-wisdom-nigerian-herbal-medicine', 'The Ancient Wisdom of Nigerian Herbal Medicine', 'Explore the rich history of traditional healing practices in Nigeria and how they continue to benefit modern health seekers.', '<p>Nigeria has a rich heritage of traditional medicine that dates back thousands of years. Long before the introduction of Western medicine, our ancestors relied on the healing power of plants, roots, and herbs to treat various ailments and maintain optimal health.</p><p>Our practice at MAINGRACE GLOBAL LIMITED is built on this foundation, utilizing the purest gifts of nature to restore balance to the body.</p>', 'Traditional Medicine', 'Dr. (Mrs) Folashade Adetifa Dawodu', 'Founder & Chief Herbalist', 'January 5, 2026', '8 min read', true, '{"Traditional Medicine", "Nigerian Herbs", "Natural Healing", "Heritage"}', '/images/blog/blog-herbal-wisdom.png'),

('natural-detoxification-liver-health', 'Natural Detoxification: Secrets to a Healthy Liver', 'Learn how specific bitter herbs and roots can help cleanse your liver and improve your overall metabolic health.', '<p>The liver is the body''s primary filtration system, and in modern times, it is often overloaded with toxins from processed foods and environment pollutants.</p><p>Our detoxification protocols use potent bitter herbs like Vernonia amygdalina (Bitter leaf) and Phyllanthus niruri (Stonebreaker) to stimulate bile production and enhance the liver''s natural cleansing capacity.</p>', 'Wellness Tips', 'Emmanuel Okon', 'Sales Representative', 'January 12, 2026', '6 min read', false, '{"Detox", "Liver Health", "Cleansing", "Bitter Herbs"}', '/images/blog/blog-gut-health.png'),

('managing-diabetes-with-botanicals', 'Managing Blood Sugar Levels with African Botanicals', 'A comprehensive guide on natural plant-based approaches to managing Type 2 diabetes and improving insulin sensitivity.', '<p>Type 2 diabetes has become an epidemic, but nature offers powerful tools for restoration. At MAINGRACE GLOBAL LIMITED, we have seen remarkable results through the disciplined use of specific roots and leaves that improve the body''s ability to process glucose.</p>', 'Chronic Care', 'Dr. (Mrs) Folashade Adetifa Dawodu', 'Founder & Chief Herbalist', 'January 18, 2026', '10 min read', false, '{"Diabetes", "Blood Sugar", "Botanicals", "Chronic Care"}', '/images/blog/blog-diabetes.png'),

('boosting-immunity-through-the-seasons', 'Season Strengthening: Boosting Immunity Naturally', 'How to prepare your body''s defenses against common seasonal ailments using tradomedical tonics.', '<p>Immunity is not just about fighting off a cold; it is about the body''s overall resilience. Our seasonal immune tonics are formulated to strengthen the "internal guardian" using zinc-rich plants and natural antioxidants found in the Nigerian forest.</p>', 'Wellness Tips', 'Victoria Adeyemi', 'Sales Representative', 'January 25, 2026', '5 min read', false, '{"Immunity", "Prevention", "Tonics", "Health"}', '/images/blog/blog-immune-boost.png'),

('herbal-remedies-for-restful-sleep', 'Nature''s Lullaby: Herbal Remedies for Insomnia', 'Discover the calming power of natural sedatives that help you achieve deep, restorative sleep without dependency.', '<p>Quality sleep is the cornerstone of healing. When the nervous system is overwrought, we turn to calming leaves that soothe the mind and prepare the body for repair.</p>', 'Sleep Health', 'Dr. (Mrs) Folashade Adetifa Dawodu', 'Founder & Chief Herbalist', 'February 2, 2026', '7 min read', false, '{"Sleep", "Insomnia", "Natural Sedatives", "Relaxation"}', '/images/blog/blog-sleep-remedy.png');
