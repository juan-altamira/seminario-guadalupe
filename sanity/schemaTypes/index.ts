import article from './article';
import donationConfig from './donationConfig';
import event from './event';
import page from './page';
import person from './person';
import photo from './photo';
import program from './program';
import resource from './resource';
import siteSettings from './siteSettings';
import blockContent from './objects/blockContent';
import cta from './objects/cta';
import galleryImage from './objects/galleryImage';
import hero from './objects/hero';
import location from './objects/location';
import socialLink from './objects/socialLink';

export const schemaTypes = [
  // Document types
  siteSettings,
  donationConfig,
  event,
  article,
  resource,
  page,
  person,
  program,
  photo,
  // Object types
  blockContent,
  cta,
  galleryImage,
  hero,
  location,
  socialLink
];
