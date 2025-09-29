<script lang="ts">
  import type { SiteSettings } from '$content/models';

  export let site: SiteSettings;
</script>

<footer class="border-t bg-white">
  <div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:justify-between">
    <div class="space-y-2 text-sm">
      <div class="text-base font-semibold">{site.nombre}</div>
      {#if site.direccion}
        <div>{site.direccion}</div>
      {/if}
      {#if site.telefono}
        <div>Tel: <a href={`tel:${site.telefono}`}>{site.telefono}</a></div>
      {/if}
      {#if site.email}
        <div>Email: <a href={`mailto:${site.email}`}>{site.email}</a></div>
      {/if}
    </div>
    <div class="flex gap-10 text-sm">
      <div>
        <div class="font-medium text-slate-700">Redes</div>
        <ul class="mt-3 space-y-2">
          {#if site.redes?.length}
            {#each site.redes as red}
              <li><a href={red.url} target="_blank" rel="noopener">{red.nombre}</a></li>
            {/each}
          {:else}
            <li>Próximamente</li>
          {/if}
        </ul>
      </div>
    </div>
  </div>
  <div style="background:#000000;padding:20px 0;text-align:center;">
    <div style="font-family: Arial, Helvetica, sans-serif; font-size:20px;">
      <span style="background:linear-gradient(90deg,#33ff99,#00ffcc);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-style:normal;">Seminario</span>
      <span style="background:linear-gradient(90deg,#33ff99,#00ffcc);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-style:italic;margin-left:8px;">"Nuestra Señora de Guadalupe"</span>
    </div>
  </div>
</footer>
