
<style>
    :root {
        /* Landscape only */
        --base-nav-height: 70px;
        --nav-padding-left: 3rem;
        --nav-padding-right: 3rem;
        --nav-flex-direction: row;

        /* Mobile only */
        --mobile-nav-padding: 3rem;
        --nav-gap: 3rem;

        /* Both (require adjustments for the media query below as well) */
        --nav-bg-color: #333333;
        --nav-color: white;
    }

    @media (max-width: 768px) {
        :root {
            --nav-bg-color: white;
            --nav-color: rgb(68, 68, 68);
        }
    }


    nav a {
        text-decoration: none;
        line-height: calc(var(--base-nav-height));
    }
    @media (orientation: landscape) {
        nav {
            width: 100%;
            height: var(--base-nav-height);

            background-color: var(--nav-bg-color);
            padding-left: var(--nav-padding-left);
            padding-right: var(--nav-padding-right);
            display: flex;
            flex-direction: row-reverse;
        }
        nav .landscape-only {
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: var(--nav-flex-direction);
            gap: var(--nav-gap);
        }
        nav a {
            color: var(--nav-color);
        }
    }

    @media (orientation: portrait) {
        nav {
            width: 100vw;
            height: 0px;
        }

        .portrait-side-menu-content {
            width: 100%;
            padding: var(--mobile-nav-padding);

            display: flex;
            flex-direction: column;
        }

        nav a {
            color: var(--nav-color);
        }
    }

</style>

<script>

    import SideMenu from "./SideMenu.svelte"

    export let options = []
    export let isBurgerOpen
    export let setIsBurgerOpen

</script>

<nav>
    <div class="landscape-only">
        {#each options as {name, href}}
            <a href={href}>{name}</a>
        {/each}
    </div>
    <div class="portrait-only">
        <slot></slot>
        <SideMenu isOpen={isBurgerOpen} setIsOpen={setIsBurgerOpen}>
            <div class="portrait-side-menu-content">
                {#each options as {name, href}}
                    <a href={href}>{name}</a>
                {/each}
            </div>
        </SideMenu>
    </div>
</nav>
