import { createClient } from '@supabase/supabase-js';
import RoutingClient from './RoutingClient';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export default async function RoutingSettingsPage() {
  let routes = [];
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from('portfolio_settings').select('value').eq('key', 'seo_routes').single();
    if (data?.value) routes = data.value;
  }
  
  return (
    <div className='p-8'>
      <h1 className='text-3xl font-semibold mb-6'>SEO Routing Configuration</h1>
      <RoutingClient initialRoutes={routes} />
    </div>
  );
}
