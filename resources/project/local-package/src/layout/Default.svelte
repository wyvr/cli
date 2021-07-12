<script>
    import Header from '@src/Header.svelte';

    export let data = null;
</script>

<div class="layout">
    <div class="fullheight">
        <Header />

        <main>
            {#if data && data.cms_content && data.cms_content.header}
                <p>{data.cms_content.header}</p>
            {/if}
            <slot />
            {#if data && data.cms_content && data.cms_content.footer}
                <p>{data.cms_content.footer}</p>
            {/if}
        </main>
    </div>
</div>

<style>
    main {
        margin: 0 auto;
        max-width: 800px;
        padding: 1rem;
    }
</style>
