<script lang="ts">
    import { User } from 'lucide-svelte';
    import { Button } from 'flowbite-svelte';
    import type { SuperValidated } from 'sveltekit-superforms';
    import type { ProfileSchema } from '$lib/schemas';

    import { superForm } from 'sveltekit-superforms/client';

    export let data: SuperValidated<ProfileSchema>;

    const { form, errors, enhance } = superForm(data);
</script>

<section class="px-6 pt-16">
    <div class="flex items-center font-semibold">
        <User />
        <span class="ml-4">Personal Details</span>
    </div>
    <p class="mt-3 text-sm">
        Change the personal details associated with your account
    </p>
    <!-- Personal Details Form -->
    <form method="POST" action="?/updateProfile" use:enhance class="mt-8">
        <label for="full_name" class="space-y-2">
            <span>Name</span>
            <input type="text" name="full_name" bind:value={$form.full_name} />
            {#if $errors.full_name}
                <div class="block text-red-600 dark:text-red-500">
                    {$errors.full_name}
                </div>
            {/if}
        </label>
        <Button type="submit" class="mt-4">Update Details</Button>
    </form>
</section>
