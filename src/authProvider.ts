import { supabaseAuthProvider } from 'ra-supabase';
import { supabaseClient } from './supabase';

export const authProvider = supabaseAuthProvider(supabaseClient, {
    getIdentity: async user => {
        const { data, error } = await supabaseClient
            .from('users')
            .select('id, first_name, last_name')
            .match({ email: user.email })
            .single();

        if (!data || error) {
            throw new Error();
        }

        return {
            id: data.id,
            fullName: `${data.first_name} ${data.last_name}`,
        };
    },
});