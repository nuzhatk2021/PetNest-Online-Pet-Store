import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

//to pull data from dotenv file
dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY
);

export default supabase;
