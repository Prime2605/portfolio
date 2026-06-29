const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    console.error('Error: SUPABASE_URL or SUPABASE_SERVICE_KEY not found in environment.');
    process.exit(1);
  }

  console.log('Connecting to Supabase...');
  const supabase = createClient(url, key);

  // Path to local profile photo
  const photoPath = path.join(__dirname, '../public/assets/profile.jpg');
  if (!fs.existsSync(photoPath)) {
    console.error(`Error: Photo not found at ${photoPath}`);
    process.exit(1);
  }

  const fileBuffer = fs.readFileSync(photoPath);

  // 1. Ensure storage bucket exists
  const bucketName = 'portfolio-images';
  console.log(`Checking if bucket "${bucketName}" exists...`);
  
  const { data: buckets, error: listBucketsError } = await supabase.storage.listBuckets();
  if (listBucketsError) {
    console.error('Error listing buckets:', listBucketsError);
    process.exit(1);
  }

  const bucketExists = buckets.some(b => b.name === bucketName);
  if (!bucketExists) {
    console.log(`Bucket "${bucketName}" not found. Creating it...`);
    const { error: createBucketError } = await supabase.storage.createBucket(bucketName, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png'],
    });
    if (createBucketError) {
      console.error('Error creating bucket:', createBucketError);
      process.exit(1);
    }
    console.log(`Bucket "${bucketName}" created successfully!`);
  } else {
    console.log(`Bucket "${bucketName}" already exists.`);
  }

  // 2. Upload file to bucket
  const destinationPath = 'profile.jpg';
  console.log(`Uploading profile picture to bucket ${bucketName}/${destinationPath}...`);
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(destinationPath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    process.exit(1);
  }
  console.log('File uploaded successfully!');

  // 3. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(destinationPath);

  console.log(`Public URL: ${publicUrl}`);

  // 4. Update the profile table
  console.log('Updating profile table in database...');
  const { data: profileData, error: getProfileError } = await supabase
    .from('profile')
    .select('*')
    .single();

  if (getProfileError || !profileData) {
    console.log('No profile entry found. Inserting new profile...');
    const { error: insertError } = await supabase
      .from('profile')
      .insert([
        {
          name: 'Prime R S',
          avatar_url: publicUrl,
          title: 'Aspiring Researcher | ECE Student | Full Stack Developer',
        }
      ]);
    if (insertError) {
      console.error('Error inserting profile:', insertError);
      process.exit(1);
    }
    console.log('Profile entry created successfully with avatar URL!');
  } else {
    console.log(`Found profile for "${profileData.name}". Updating avatar_url...`);
    const { error: updateError } = await supabase
      .from('profile')
      .update({ avatar_url: publicUrl })
      .eq('id', profileData.id);

    if (updateError) {
      console.error('Error updating profile:', updateError);
      process.exit(1);
    }
    console.log('Database updated successfully!');
  }
  console.log('\n🎉 Supabase profile photo update complete!');
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
