import { supabaseDataProvider } from 'ra-supabase';
import { supabaseClient } from './supabase';

const instanceUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const apiKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const dataProvider = supabaseDataProvider({
    instanceUrl,
    apiKey,
    supabaseClient
});