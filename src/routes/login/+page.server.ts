import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import { otpLoginSchema, passwordLoginSchema } from '$lib/schemas';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.getSession();

    // if the user is already logged in return them to the account page
    if (session) {
        throw redirect(303, '/account');
    }

    return {
        passwordLoginForm: await superValidate(event, passwordLoginSchema, {
            id: 'passwordLogin'
        }),
        otpLoginForm: await superValidate(event, otpLoginSchema, {
            id: 'otpLogin'
        })
    };
};

export const actions: Actions = {
    loginPassword: async (event) => {
        const passwordLoginForm = await superValidate(
            event,
            passwordLoginSchema
        );

        if (!passwordLoginForm.valid) {
            return fail(400, { passwordLoginForm });
        }

        const { error: authError } =
            await event.locals.supabase.auth.signInWithPassword(
                passwordLoginForm.data
            );

        if (authError) {
            if (authError instanceof AuthApiError && authError.status === 400) {
                setError(passwordLoginForm, 'email', 'Invalid credentials');
                setError(passwordLoginForm, 'password', 'Invalid credentials');
                return fail(400, {
                    passwordLoginForm
                });
            }
        }

        throw redirect(303, '/');
    },
    loginOtp: async (event) => {
        const otpLoginForm = await superValidate(event, otpLoginSchema);

        if (!otpLoginForm.valid) {
            return fail(400, { otpLoginForm });
        }

        const callbackUrl = `${event.url.protocol}${
            event.url.hostname === 'localhost'
                ? 'localhost:5173'
                : event.url.hostname
        }/auth/callback`;
        console.log(callbackUrl);

        const { error } = await event.locals.supabase.auth.signInWithOtp({
            ...otpLoginForm.data,
            options: {
                emailRedirectTo: callbackUrl
            }
        });

        if (error) {
            console.log(error);
            return setError(
                otpLoginForm,
                'An error occurred while logging in.'
            );
        }

        return { otpLoginForm };
    },
    loginGoogle: async (event) => {
        const { error } = await event.locals.supabase.auth.signInWithOAuth({
            provider: 'google'
        });

        if (error) {
            console.log(error);
            return fail(500, { error: 'An error occurred while logging in.' });
        }

        throw redirect(303, '/');
    },
    loginTwitter: async (event) => {
        const { error } = await event.locals.supabase.auth.signInWithOAuth({
            provider: 'twitter'
        });

        if (error) {
            console.log(error);
            return fail(500, { error: 'An error occurred while logging in.' });
        }

        throw redirect(303, '/');
    },
    loginFacebook: async (event) => {
        const { error } = await event.locals.supabase.auth.signInWithOAuth({
            provider: 'facebook'
        });

        if (error) {
            console.log(error);
            return fail(500, { error: 'An error occurred while logging in.' });
        }

        throw redirect(303, '/');
    }
};
