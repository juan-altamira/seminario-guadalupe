import type {
  DonacionConfig,
  Evento,
  PageContent,
  Persona,
  Programa,
  Recurso,
  SiteSettings
} from '$content/models';
import { eventos as staticEvents } from '$content/data/eventos';
import { siteSettings as staticSite } from '$content/data/site';
import { programas as staticPrograms } from '$content/data/programas';
import { personas as staticPeople } from '$content/data/personas';
import { paginas as staticPages } from '$content/data/paginas';
import { recursos as staticResources } from '$content/data/recursos';
import { donacionConfig as staticDonations } from '$content/data/donaciones';
import { getSanityClient, isSanityConfigured } from './client.server';
import {
  articlesQuery,
  donationConfigQuery,
  eventBySlugQuery,
  eventsQuery,
  pagesQuery,
  peopleQuery,
  photosQuery,
  programsQuery,
  resourcesQuery,
  siteSettingsQuery
} from './queries';
import {
  mapDonationConfig,
  mapEvent,
  mapPage,
  mapPerson,
  mapProgram,
  mapResource,
  mapArticle,
  mapSiteSettings,
  type DonationDocument,
  type EventDocument,
  type PageDocument,
  type PersonDocument,
  type ProgramDocument,
  type ResourceDocument,
  type ArticleDocument
} from './transformers';
import type { PortableTextBlock } from '@portabletext/types';

const client = getSanityClient();

function mergeWithFallback<T extends { slug: string }>(primary: T[] | null | undefined, fallback: T[]): T[] {
  if (!primary || primary.length === 0) {
    return fallback;
  }
  const existing = new Set(primary.map((item) => item.slug));
  const supplement = fallback.filter((item) => !existing.has(item.slug));
  return [...primary, ...supplement];
}

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client || !isSanityConfigured()) {
    return null;
  }
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.error('Sanity fetch error', error);
    return null;
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const doc = await safeFetch<SiteSettings | null>(siteSettingsQuery);
  return mapSiteSettings(doc) ?? staticSite;
}

export async function fetchDonationConfig(): Promise<DonacionConfig> {
  const doc = await safeFetch<DonationDocument | null>(donationConfigQuery);
  return mapDonationConfig(doc) ?? staticDonations;
}

export async function fetchEvents(): Promise<Evento[]> {
  const docs = await safeFetch<EventDocument[]>(eventsQuery);
  if (!docs || docs.length === 0) {
    return staticEvents;
  }
  const mapped = docs.map((doc) => mapEvent(doc));
  return mergeWithFallback(mapped, staticEvents);
}

export async function fetchEventBySlug(slug: string): Promise<Evento | null> {
  const doc = await safeFetch<EventDocument | null>(eventBySlugQuery, { slug });
  if (!doc) {
    const fallback = staticEvents.find((item) => item.slug === slug);
    return fallback ?? null;
  }
  return mapEvent(doc);
}

export async function fetchPrograms(): Promise<Programa[]> {
  const docs = await safeFetch<ProgramDocument[]>(programsQuery);
  if (!docs || docs.length === 0) {
    return staticPrograms;
  }
  const mapped = docs.map((doc) => mapProgram(doc));
  return mergeWithFallback(mapped, staticPrograms);
}

export async function fetchProgramBySlug(slug: string): Promise<Programa | undefined> {
  const programs = await fetchPrograms();
  return programs.find((program) => program.slug === slug);
}

export async function fetchPeople(): Promise<Persona[]> {
  const docs = await safeFetch<PersonDocument[]>(peopleQuery);
  if (!docs || docs.length === 0) {
    return staticPeople;
  }
  const mapped = docs.map((doc) => mapPerson(doc));
  return mergeWithFallback(mapped, staticPeople);
}

export async function fetchPages(): Promise<PageContent[]> {
  const docs = await safeFetch<PageDocument[]>(pagesQuery);
  if (!docs || docs.length === 0) {
    return staticPages;
  }
  const mapped = docs.map((doc) => mapPage(doc));
  return mergeWithFallback(mapped, staticPages);
}

export async function fetchPageBySlug(slug: string): Promise<PageContent | undefined> {
  const pages = await fetchPages();
  return pages.find((page) => page.slug === slug);
}

export async function fetchResources(): Promise<Recurso[]> {
  const [resourceDocs, articleDocs] = await Promise.all([
    safeFetch<ResourceDocument[]>(resourcesQuery),
    safeFetch<ArticleDocument[]>(articlesQuery)
  ]);

  const mappedResources = resourceDocs?.map((doc) => mapResource(doc)) ?? [];
  const mappedArticles = articleDocs?.map((doc) => mapArticle(doc)) ?? [];
  const combined = [...mappedResources, ...mappedArticles];

  if (combined.length === 0) {
    return staticResources;
  }

  return mergeWithFallback(combined, staticResources);
}

export async function fetchResourceBySlug(slug: string): Promise<Recurso | undefined> {
  const resources = await fetchResources();
  return resources.find((item) => item.slug === slug);
}

export async function fetchArticles(): Promise<PortableTextBlock[][]> {
  const docs = await safeFetch<PortableTextBlock[][]>(articlesQuery);
  return docs ?? [];
}

export async function fetchPhotos() {
  return await safeFetch<any[]>(photosQuery);
}
