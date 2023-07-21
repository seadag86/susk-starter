import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { otpSchema } from '$lib/schemas';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.getSession();

    if (session) {
        throw redirect(303, '/');
    }

    return {
        form: await superValidate(event, otpSchema)
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, otpSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        const callbackUrl = `${event.url.protocol}${
            event.url.hostname === 'localhost'
                ? 'localhost:5173'
                : event.url.hostname
        }/auth/callback`;
        console.log(callbackUrl);

        const { error } = await event.locals.supabase.auth.signInWithOtp({
            ...form.data,
            options: {
                emailRedirectTo: callbackUrl
            }
        });

        if (error) {
            console.log(error);
            return setError(form, 'An error occurred while registering.');
        }

        return { form };
    }
};
