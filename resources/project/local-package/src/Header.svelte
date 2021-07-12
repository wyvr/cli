<script>
    function get_nav() {
        const nav = getGlobal('nav.header', []);
        if (!nav) {
            return null;
        }
        return nav.filter((entry) => entry.visible);
    }

    let nav = get_nav();
</script>

<header>
    <div class="inner">
        <a href="/"><img src="/assets/logo.svg" width="150" height="53" alt="wyvr" class="logo" /></a>
        {#if $$slots.nav}
            <slot name="nav" />
        {:else if nav}
            <nav>
                <div class="nav">
                    <div class="nav__inner">
                        {#each nav as entry}
                            <a href={entry.url}>{entry.name}</a>
                        {/each}
                    </div>
                </div>
            </nav>
        {/if}
    </div>
</header>

<style>
    .inner {
        margin: 0 auto;
        max-width: 800px;
        padding: 1rem;
        display: flex;
        align-items: center;
        position: relative;
        z-index: 100;
    }
    nav {
        flex-grow: 1;
        text-align: right;
    }
    nav a {
        font-weight: 700;
        text-decoration: none;
        padding: 16px;
        color: #000;
    }
</style>
