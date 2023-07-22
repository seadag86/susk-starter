<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
    import { enhance } from '$app/forms';
</script>

<div class="max-w-2xl text-center mt-12">
    <h1 class="text-4xl font-semibold">Login with Social Provider</h1>
</div>
<Card class="mt-6 w-full" padding="xl" size="md">
    <div class="flex items-center justify-center gap-4">
        <form method="POST" action="?/loginGoogle" use:enhance>
            <Button type="submit" color="light">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="25"
                    viewBox="0 0 186.69 190.5"
                    xmlns:v="https://vecta.io/nano"
                >
                    <g transform="translate(1184.583 765.171)">
                        <path
                            clip-path="none"
                            mask="none"
                            d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                            fill="#4285f4"
                        />
                        <path
                            clip-path="none"
                            mask="none"
                            d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                            fill="#34a853"
                        />
                        <path
                            clip-path="none"
                            mask="none"
                            d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                            fill="#fbbc05"
                        />
                        <path
                            d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                            fill="#ea4335"
                            clip-path="none"
                            mask="none"
                        />
                    </g>
                </svg>
                <div class="ml-4">Google</div>
            </Button>
        </form>
        <form method="POST" action="?/loginTwitter" use:enhance>
            <Button type="submit" color="light">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xml:space="preserve"
                    width="23"
                    height="25"
                    viewBox="0 0 248 204"
                >
                    <path
                        fill="#1d9bf0"
                        d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
                    />
                </svg>
                <div class="ml-3">Twitter</div>
            </Button>
        </form>
        <form method="POST" action="?/loginFacebook" use:enhance>
            <Button type="submit" color="light">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 14222 14222"
                >
                    <circle cx="7111" cy="7112" r="7111" fill="#1977f3" />
                    <path
                        d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z"
                        fill="#fff"
                    />
                </svg>
                <div class="ml-4">Facebook</div>
            </Button>
        </form>
    </div>
</Card>
