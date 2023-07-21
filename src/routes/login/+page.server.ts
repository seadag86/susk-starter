import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';

const loginUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 6 characters')
});

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.getSession();

    // if the user is already logged in return them to the account page
    if (session) {
        throw redirect(303, '/account');
    }

    return {
        form: await superValidate(event, loginUserSchema)
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, loginUserSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        const { error: authError } =
            await event.locals.supabase.auth.signInWithPassword(form.data);

        if (authError) {
            if (authError instanceof AuthApiError && authError.status === 400) {
                setError(form, 'email', 'Invalid credentials');
                setError(form, 'password', 'Invalid credentials');
                return fail(400, {
                    form
                });
            }
        }

        throw redirect(303, '/');
    }
};
