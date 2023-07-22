<script lang="ts">
    import type { PageData } from './$types';
    import OtpLogin from './OtpLogin.svelte';
    import PasswordLogin from './PasswordLogin.svelte';
    import SocialLogin from './SocialLogin.svelte';

    export let data: PageData;
</script>

<div class="py-20">
    <div class="flex w-full flex-col items-center">
        <PasswordLogin data={data.passwordLoginForm} />

        <OtpLogin data={data.otpLoginForm} />

        <SocialLogin />

        <div class="text-sm font-medium text-gray-500 dark:text-gray-300 mt-12">
            Don't have an account? <a
                href="/register"
                class="text-blue-700 hover:underline dark:text-blue-500"
            >
                Sign up
            </a>
        </div>
    </div>
</div>
