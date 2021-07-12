<script>
    /* <Stylesheet src="/assets/global.css" /> */
    export let src = null;
    export let critical = false;
</script>


{#if src}
    {#if critical}
        <link rel="stylesheet" href={src} />
    {:else}
        <link rel="preload" href={src} as="style" onload="this.onload=null;this.rel='stylesheet'" />
        <noscript><link rel="stylesheet" href={src} /></noscript>
    {/if}
{/if}
