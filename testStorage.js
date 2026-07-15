const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testSupabaseStorage() {
  try {
    // 1. Create the bucket
    await prisma.$executeRawUnsafe(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('gallery', 'gallery', true) 
      ON CONFLICT (id) DO UPDATE SET public = true;
    `);
    console.log("Bucket 'gallery' ensured.");

    // 2. Set permissive RLS for objects in this bucket
    try {
      await prisma.$executeRawUnsafe(`
        CREATE POLICY "gallery_public_all" 
        ON storage.objects FOR ALL 
        USING (bucket_id = 'gallery')
        WITH CHECK (bucket_id = 'gallery');
      `);
      console.log("RLS policy created.");
    } catch (e) {
      console.log("RLS policy might already exist:", e.message);
    }
    
    // 3. Try to upload a file using the REST API
    const fs = require('fs');
    fs.writeFileSync('test.txt', 'hello world');
    const fileBuffer = fs.readFileSync('test.txt');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uwgqjuhwaaucyyjnrrvc.supabase.co';
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_9l3he8yLJkJL8PyPiOKh6w_8CPAXRMa';

    const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/gallery/test.txt`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${anonKey}`,
        'apikey': anonKey,
        'Content-Type': 'text/plain',
      },
      body: fileBuffer
    });

    const result = await uploadRes.json();
    console.log("Upload result:", uploadRes.status, result);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testSupabaseStorage();
