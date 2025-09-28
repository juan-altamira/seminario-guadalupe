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
        <div class="font-medium text-slate-700">Legales</div>
        <ul class="mt-3 space-y-2">
          <li><a href="/legales/privacidad">Privacidad</a></li>
          <li><a href="/legales/cookies">Cookies</a></li>
          <li><a href="/legales/aviso">Aviso legal</a></li>
        </ul>
      </div>
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
  <div class="bg-slate-100 py-4 text-center text-xs text-slate-500">
    © {new Date().getFullYear()} {site.nombre}. Todos los derechos reservados.
  </div>
</footer>
