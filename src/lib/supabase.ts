// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ ВНИМАНИЕ: Не заданы переменные окружения VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY!');
}

// Передаем заглушки, чтобы React не падал с белым экраном, если ключей пока нет
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);