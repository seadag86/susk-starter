<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import { page } from '$app/stores';

    export let data: PageData;

    const callbackUrl = `${$page.url.protocol}${
        $page.url.hostname === 'localhost'
            ? 'localhost:5173'
            : $page.url.hostname
    }/auth/callback`;

    let { supabase } = data;
    $: ({ supabase } = data);
    let email: string;

    const { form, errors, enhance } = superForm(data.form, {
        resetForm: true
    });

    const handleSubmit = async (event: SubmitEvent) => {
        event?.preventDefault();

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: callbackUrl
            }
        });

        if (error) {
            console.log(error);
        }
    };
</script>

<div class="py-20">
    <div class="flex w-full flex-col items-center">
        <!-- Login Page Header -->
        <div class="max-w-2xl text-center">
            <h1 class="text-4xl font-semibold">Login to your account</h1>
        </div>
        <Card class="mt-6 w-full" padding="xl" size="md">
            <!-- Login Form -->
            <form class="flex flex-col space-y-6" method="POST" use:enhance>
                <label class="space-y-2" for="email">
                    <span>Email</span>
                    <input type="email" name="email" bind:value={email} />
                    {#if $errors.email}
                        <div class="block text-red-600 dark:text-red-500">
                            {$errors.email}
                        </div>
                    {/if}
                    {#if $errors._errors}
                        <div class="block text-red-600 dark:text-red-500">
                            {$errors._errors}
                        </div>
                    {/if}
                </label>

                <Button type="submit" class="w-full">Login</Button>
            </form>
        </Card>
    </div>
</div>
