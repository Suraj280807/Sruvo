import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xaamdbrbjxpveveyqwfy.supabase.co';
const supabaseKey = 'sb_publishable_PgKpMANfgZiX1XSjHqAJGw__NvSSx22';

export const supabase = createClient(supabaseUrl, supabaseKey);
