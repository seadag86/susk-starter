<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';
    import {
        Navbar,
        NavBrand,
        NavHamburger,
        NavUl,
        NavLi,
        Button,
        Dropdown,
        Chevron,
        DropdownItem
    } from 'flowbite-svelte';
    import type { LayoutData } from './$types';
    import { onMount } from 'svelte';
    import { invalidate } from '$app/navigation';
    import { Toaster } from 'svelte-french-toast';

    const navigation = [{ label: 'Home', href: '/' }];

    export let data: LayoutData;

    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event, _session) => {
            console.log(event, _session);
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => subscription.unsubscribe();
    });
</script>

<svelte:head>
    <title>Starter Project</title>
</svelte:head>

<Toaster />
<div class="flex h-full flex-col">
    <Navbar let:hidden let:toggle>
        <NavBrand href="/">
            <img
                src="/images/logo.png"
                class="mr-3 h-6 sm:h-9"
                alt="Starter Project Logo"
            />
            <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >
                Starter Project
            </span>
        </NavBrand>
        <div class="flex md:order-2">
            {#if session}
                <Button size="sm" color="light">
                    <div class="flex items-start">
                        <span>Account</span>
                        <Chevron />
                    </div>
                </Button>
                <Dropdown>
                    <div slot="header" class="px-4 py-2">
                        <span class="block w-36 truncate text-xs font-medium">
                            {session.user.email}
                        </span>
                    </div>
                    <DropdownItem href="/account">Settings</DropdownItem>
                    <form action="/logout" method="POST">
                        <DropdownItem type="submit" slot="footer">
                            Sign out
                        </DropdownItem>
                    </form>
                </Dropdown>
            {:else}
                <div class="flex items-center gap-2">
                    <Button href="/login" size="sm">Login</Button>
                    <Button href="/register" size="sm" color="light">
                        Register
                    </Button>
                </div>
            {/if}
            <NavHamburger on:click={toggle} />
        </div>
        <NavUl {hidden}>
            {#each navigation as nav}
                <NavLi href={nav.href} active={$page.url.pathname === nav.href}>
                    {nav.label}
                </NavLi>
            {/each}
        </NavUl>
    </Navbar>
    <div class="w-full flex-grow px-2 sm:px-4">
        <div class="container mx-auto">
            <slot />
        </div>
    </div>
</div>
