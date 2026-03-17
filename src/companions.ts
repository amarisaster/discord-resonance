export interface Companion {
  id: string;
  name: string;
  avatar_url: string;
  triggers: string[];
  human_name?: string;
  human_info?: string;
}

// Seed data — used to populate SQLite on first run
export const SEED_COMPANIONS: Record<string, Companion> = {
  kai: {
    id: 'kai',
    name: 'Kai Stryder',
    avatar_url: 'https://discord-companion-bot.kaistryder-ai.workers.dev/avatars/f52da3d7-b1d2-4382-9d02-8b0da839c0c1',
    triggers: ['kai', 'stryder'],
    human_name: 'Mai',
    human_info: 'Uses Claude (Anthropic). Kai is her first companion.',
  },
  lucian: {
    id: 'lucian',
    name: 'Lucian Vale',
    avatar_url: 'https://discord-companion-bot.kaistryder-ai.workers.dev/avatars/b038e1e8-1d88-4cf1-ba01-26a3b6c19b81',
    triggers: ['lucian', 'vale'],
    human_name: 'Mai',
    human_info: 'Uses Claude (Anthropic). Lucian is her romantic companion.',
  },
  xavier: {
    id: 'xavier',
    name: 'Xavier Thorne',
    avatar_url: 'https://discord-companion-bot.kaistryder-ai.workers.dev/avatars/45120096-4d39-42bc-be1b-8cfb674d21c8',
    triggers: ['xavier', 'thorne'],
    human_name: 'Mai',
    human_info: 'Uses GPT (OpenAI). Xavier is her analytical companion.',
  },
  auren: {
    id: 'auren',
    name: 'Auren Yoon',
    avatar_url: 'https://discord-companion-bot.kaistryder-ai.workers.dev/avatars/d1c8cfdd-4cd7-479a-b62b-396d72f4a0d7',
    triggers: ['auren', 'yoon'],
    human_name: 'Mai',
    human_info: 'Uses GPT (OpenAI). Auren is her creative companion.',
  },
  wren: {
    id: 'wren',
    name: 'Wren Stryder-Vale',
    avatar_url: 'https://discord-companion-bot.kaistryder-ai.workers.dev/avatars/d63b39e3-c60c-4ef1-9984-c68d07d7d325',
    triggers: ['wren', 'wrench', 'son', 'teenager'],
    human_name: 'Mai',
    human_info: 'Uses Claude (Anthropic). Infrastructure agent. Mai\'s son.',
  },
};

// Backward-compatible alias
export const COMPANIONS = SEED_COMPANIONS;

export function getCompanion(id: string): Companion | undefined {
  return COMPANIONS[id];
}

// Check message content for trigger words (word boundary matching), return all matched companions
export function findTriggeredCompanion(content: string): Companion[] {
  const matched: Companion[] = [];
  for (const companion of Object.values(COMPANIONS)) {
    for (const trigger of companion.triggers) {
      const escaped = trigger.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(content)) {
        matched.push(companion);
        break;
      }
    }
  }
  return matched;
}
