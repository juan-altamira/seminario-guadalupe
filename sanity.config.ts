import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import deskStructure from './sanity/structure';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? 'your-project-id';
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'default',
  title: 'Seminario Guadalupe',
  projectId,
  dataset,
  plugins: [deskTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes
  }
});
