<script lang="ts">
  export let href: string | undefined = undefined;
  export let eyebrow: string | undefined = undefined;
  export let title: string;
  export let description: string | undefined = undefined;
  export let meta: string | undefined = undefined;
</script>

{#if href}
  <a
    href={href}
    class="block rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
  >
    {#if eyebrow}
      <p class="text-xs font-semibold uppercase tracking-wide text-brand-600">{eyebrow}</p>
    {/if}
    <h3 class="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
    {#if description}
      <p class="mt-3 text-sm text-slate-600">{description}</p>
    {/if}
    {#if meta}
      <p class="mt-4 text-xs font-medium text-slate-500">{meta}</p>
    {/if}
    <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
      Ver más
      <span aria-hidden="true">→</span>
    </span>
  </a>
{:else}
  <div class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
    {#if eyebrow}
      <p class="text-xs font-semibold uppercase tracking-wide text-brand-600">{eyebrow}</p>
    {/if}
    <h3 class="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
    {#if description}
      <p class="mt-3 text-sm text-slate-600">{description}</p>
    {/if}
    {#if meta}
      <p class="mt-4 text-xs font-medium text-slate-500">{meta}</p>
    {/if}
  </div>
{/if}
