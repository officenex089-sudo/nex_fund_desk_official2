import {db} from './db';
import type {ChatGPTUser} from '@/app/chatgpt-auth';
// The Sites private audience gate authorizes visitors before these routes run.
// Only the verified Site owner can bind the shared data or manage connections.
export function isWorkspaceOwner(u:ChatGPTUser){return u.userId==='5e030b26-cefa-4c6a-bc78-e64386ca1aba'||u.email.toLowerCase()==='officenex089@gmail.com';}
export const viewerActions=new Set(['list','refresh','spend']);
export async function workspace(u:ChatGPTUser){
 const isOwner=isWorkspaceOwner(u),d=db();
 if(isOwner){await d.prepare("INSERT INTO team_workspace(id,owner) VALUES('main',?) ON CONFLICT(id) DO UPDATE SET owner=excluded.owner").bind(u.userId).run();return {owner:u.userId,isOwner};}
 const row=await d.prepare("SELECT owner FROM team_workspace WHERE id='main'").first<{owner:string}>();
 if(!row)throw Error('The dashboard owner needs to open the dashboard once to enable team viewing.');
 return {owner:row.owner,isOwner};
}
