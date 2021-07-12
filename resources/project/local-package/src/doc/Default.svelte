<script>
    import Stylesheet from '@src/component/Stylesheet.svelte';
    export let data = null;
</script>

<!doctype html />
<html lang={data._wyvr.language || 'en'}>
    <head>
        <title>{data.title}</title>

        <meta charset="utf-8" />
        <meta content="width=device-width,initial-scale=1,minimum-scale=1" name="viewport" />
        <meta content="telephone=no" name="format-detection" />

        <meta name="description" content={data.meta_description} />

        <style data-critical-css></style>
        <link rel="icon" href="/assets/favicon.png" />
        <Stylesheet src="/assets/global.css" />
        {#if data._wyvr.identifier}
            <Stylesheet src="/css/{data._wyvr.identifier}.css" />
        {/if}
    </head>
    <body class="loading">
        <slot />
        {#if data._wyvr.identifier}
            <script defer src="/js/{data._wyvr.identifier}.js"></script>
        {/if}
    </body>
</html>
