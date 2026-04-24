import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://aygduhidyfkantqjzfec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Z2R1aGlkeWZrYW50cWp6ZmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMDgzMzcsImV4cCI6MjA4Njc4NDMzN30.nMEWXv6lnorwU2swGgkKMAAnljjQpiGW6BnGZ6tOBq8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const TAGS = [
  '魔法', '热血', '治愈', '腹黑', '温柔', '高冷', '傲娇', '软萌', 
  '御姐', '正太', 'LOLI', '兽耳', '机械', '异世界', '校园', '奇幻', '科幻', '古风'
] as const;

export const EMOJIS = [
  '😀','😎','😍','🤔','😢','😡','😭','🥰','🤯','😇','👻','👽','🤖',
  '💀','🎭','🔥','✨','💫','🌟','⭐️','❤️','💔','👍','👎','🙏','💪',
  '🎉','🎊','🏆','🎯','💡'
] as const;

export const SECURITY_QUESTIONS = [
  '我最好的朋友是谁？',
  '我最喜欢的颜色是什么？',
  '我的第一只宠物叫什么？',
  '我出生在哪个城市？',
  '我最喜欢的食物是什么？',
  '我最喜欢的动漫角色是谁？'
] as const;

export type Tag = typeof TAGS[number];
export type Emoji = typeof EMOJIS[number];
