export interface Message {
  message: string;
  body?: string;
  type: string;
}

export interface Site {
  domain?: string;
  title: string;
  default_language: string;
  other_languages: string[];
  admin_id: string;
  alternate_domain: string;
  tenant?: Tenant;
}

export interface Domain {
  domain: string;
  tenant_id: string;
}

export interface Tenant {
  id: string;
  domains: Domain[];
}
