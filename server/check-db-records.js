require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function main() {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  
  const { data: exp, error: expError } = await supabase.from('experience').select('*');
  const { data: cert, error: certError } = await supabase.from('profile').select('*');
  const { data: proj, error: projError } = await supabase.from('projects').select('*');

  console.log('Experience table row count:', exp ? exp.length : 'error', expError || '');
  console.log('Profile table row count:', cert ? cert.length : 'error', certError || '');
  console.log('Projects table row count:', proj ? proj.length : 'error', projError || '');
  
  if (exp && exp.length > 0) {
    console.log('Sample experience row:', exp[0]);
  }
}

main();
