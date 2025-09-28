import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $content: 'src/content',
      $components: 'src/lib/components',
      $data: 'src/content/data'
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
