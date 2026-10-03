import {env} from 'cloudflare:workers';
export function db(){const d=(env as unknown as {DB:D1Database}).DB;if(!d)throw Error('Storage is unavailable. Please retry.');return d;}
