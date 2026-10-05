export interface NavItem {
  id: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phoneDisplay: string;
  whatsappUrl: string;
  linkedinUrl: string;
  linkedinHandle: string;
  githubUrl: string;
  githubHandle: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  description: string;
  url: string;
  locale: string;
  repositoryUrl: string;
  contact: ContactInfo;
}
