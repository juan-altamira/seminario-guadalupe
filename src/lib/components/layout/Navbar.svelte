<script lang="ts">
  import type { SiteSettings } from '$content/models';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  export let site: SiteSettings;

  const currentPath = derived(page, ($page) => $page.url.pathname);
  let mobileOpen = false;

  const mainLinks = [
    { href: '/institucion', label: 'Institución' },
    { href: '/equipo', label: 'Equipo' },
    { href: '/programas', label: 'Programas' },
    { href: '/eventos', label: 'Eventos' },
    { href: '/recursos', label: 'Recursos' }
  ];
  function toggleMobile() {
    mobileOpen = !mobileOpen;
  }

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<header class="border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 z-40">
  <div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
    <a href="/" class="text-lg font-semibold tracking-tight" on:click={closeMobile}>
      {site.nombre}
    </a>
    <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
      {#each mainLinks as link}
        <a
          class={`nav-link ${$currentPath === link.href ? 'is-active' : ''}`}
          href={link.href}
          aria-current={$currentPath === link.href ? 'page' : undefined}
        >
          {link.label}
        </a>
      {/each}
      <a class="rounded-full bg-brand-700 px-4 py-2 text-white transition-colors hover:bg-brand-800" href="/donar">
        Donar
      </a>
      <a class="rounded-full border border-brand-700 px-4 py-2 text-brand-700 transition-colors hover:bg-brand-50" href="/contacto">
        Contacto
      </a>
    </nav>
    <button
      class="md:hidden"
      type="button"
      aria-controls="mobile-menu"
      aria-expanded={mobileOpen}
      on:click={toggleMobile}
    >
      <span class="sr-only">Abrir menú</span>
      <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  {#if mobileOpen}
    <div id="mobile-menu" class="md:hidden">
      <div class="space-y-2 border-t bg-white px-4 py-4 text-sm">
        {#each mainLinks as link}
          <a class="block rounded-md px-3 py-2 hover:bg-slate-100" href={link.href} on:click={closeMobile}>
            {link.label}
          </a>
        {/each}
        <a class="block rounded-md bg-brand-700 px-3 py-2 text-center text-white" href="/donar" on:click={closeMobile}>
          Donar
        </a>
        <a class="block rounded-md border border-brand-700 px-3 py-2 text-center" href="/contacto" on:click={closeMobile}>
          Contacto
        </a>
      </div>
    </div>
  {/if}
</header>
