import { Site } from '../../interfaces/site';

export default function useSiteData(site: Site): { domain: string } {
  const domain = site.tenant ? site.tenant.domains[0].domain : '';

  return { domain };
}
