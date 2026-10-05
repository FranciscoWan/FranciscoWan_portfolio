import { MARQUEE_EXCLUDED_ITEMS, MARQUEE_GROUP_IDS, SKILL_GROUPS } from '../data/skills.data';
import type { SkillGroup } from '../types/skills.types';

export function getSkillGroups(): readonly SkillGroup[] {
  return SKILL_GROUPS;
}

export function getMarqueeItems(): readonly string[] {
  const groupIds = new Set<string>(MARQUEE_GROUP_IDS);
  const excluded = new Set<string>(MARQUEE_EXCLUDED_ITEMS);

  const items = SKILL_GROUPS.filter((group) => groupIds.has(group.id))
    .flatMap((group) => group.items)
    .filter((item) => !excluded.has(item));

  return [...new Set(items)];
}
