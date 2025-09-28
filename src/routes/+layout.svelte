<script lang="ts">
  import '../app.css';
  import Navbar from '$components/layout/Navbar.svelte';
  import Footer from '$components/layout/Footer.svelte';
  export let data: { site: import('$content/models').SiteSettings };
</script>

<svelte:head>
  <title>{data.site.nombre}</title>
  <meta name="description" content={data.site.eslogan ?? 'Seminario con recursos, programas y eventos'} />
  <meta property="og:title" content={data.site.nombre} />
  <meta property="og:description" content={data.site.eslogan ?? ''} />
  <meta property="og:type" content="website" />
</svelte:head>

<a href="#contenido" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white">Saltar al contenido</a>

<div class="flex min-h-screen flex-col">
  <Navbar site={data.site} />
  <main id="contenido" class="flex-1 bg-slate-50">
    <slot />
  </main>
  <Footer site={data.site} />
</div>
