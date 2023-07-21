import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.getSession();

    console.log('session', session);

    if (session) {
        throw redirect(303, '/');
    }

    return {
        form: await superValidate(event, registerUserSchema)
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, registerUserSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        if (form.data.password !== form.data.passwordConfirm) {
            return setError(form, 'passwordConfirm', 'Passwords do not match');
        }

        const { error: authError } = await event.locals.supabase.auth.signUp({
            email: form.data.email,
            password: form.data.password,
            options: {
                data: {
                    full_name: form.data.full_name
                }
            }
        });

        if (authError) {
            console.log(authError);
            return setError(form, 'An error occurred while registering.');
        }

        return { form };
    }
};
