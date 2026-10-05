import { SITE_CONFIG } from '@/core/config/site.config';
import type { ContactChannel } from '../types/contact.types';

const { contact } = SITE_CONFIG;

export const CONTACT_CHANNELS = [
  { id: 'whatsapp', label: 'WhatsApp', value: contact.phoneDisplay, href: contact.whatsappUrl },
  { id: 'linkedin', label: 'LinkedIn', value: contact.linkedinHandle, href: contact.linkedinUrl },
  { id: 'github', label: 'GitHub', value: contact.githubHandle, href: contact.githubUrl },
] as const satisfies readonly ContactChannel[];

export const COPY_FEEDBACK_DURATION_MS = 2000;
