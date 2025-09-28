<script lang="ts">
  export let title: string;
  export let subtitle: string | undefined = undefined;
  export let align: 'left' | 'center' = 'left';
</script>

<header class={`mx-auto max-w-3xl ${align === 'center' ? 'text-center' : 'text-left'}`}>
  <h2 class="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{title}</h2>
  {#if subtitle}
    <p class={`mt-2 text-base text-slate-600 ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>{subtitle}</p>
  {/if}
</header>
