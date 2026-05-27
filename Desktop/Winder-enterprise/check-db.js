const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const url = 'https://nmzkohrohnxuwsjfmgjt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temtvaHJvaG54dXdzamZtZ2p0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg1NzU0MSwiZXhwIjoyMDk1NDMzNTQxfQ.Vt1ARNERfVlcIdQ3THqd3TrC25lxO-ifiBeroW2nlA0';

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from('categories').select('*').limit(1);
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Categories exists!', data);
  }
}
check();
