import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { useUser } from './UserContext';
import { generateRecoveryCode } from './api';
import { toast } from 'sonner';

export function SaveRecoveryCode({code,onDone}:{code:string;onDone:()=>void}) {
 const {language}=useLanguage();const yo=language==='yo';const [saved,setSaved]=useState(false);
 return <section className="p-6 bg-white rounded-lg flex flex-col gap-4" aria-labelledby="recovery-heading">
 <h2 id="recovery-heading" className="text-xl font-semibold">{yo?'Fi kóòdù ìmúpadàbọ̀ rẹ pamọ́':'Save your private recovery code'}</h2>
 <p>{yo?'Kọ kóòdù yìí sí ibi ààbò. Má ṣe pín in. O lè lò ó láti tún PIN rẹ ṣe bí o bá gbàgbé rẹ.':'Write this code down and keep it somewhere safe. Do not share it. Use it to reset a forgotten PIN.'}</p>
 <code className="block break-all select-all p-4 bg-gray-100 text-lg">{code}</code>
 <p>{yo?'A fi kóòdù yìí hàn níbí lẹ́ẹ̀kan ṣoṣo. Kóòdù tuntun yìí rọ́pò ti tẹ́lẹ̀.':'This code is shown here only once. It replaces any previous recovery code.'}</p>
 <label className="flex gap-3"><input type="checkbox" checked={saved} onChange={e=>setSaved(e.target.checked)}/>{yo?'Mo ti fi kóòdù mi pamọ́':'I have saved my code'}</label>
 <button type="button" disabled={!saved} onClick={onDone} className="p-3 bg-[#008080] text-white rounded disabled:opacity-40">{yo?'Tẹ̀síwájú':'Continue'}</button>
 </section>;
}

export function RecoverySettings() {
 const {user}=useUser();const {language}=useLanguage();const yo=language==='yo';
 const [open,setOpen]=useState(false),[pin,setPin]=useState(''),[code,setCode]=useState(''),[busy,setBusy]=useState(false);
 return <section className="mx-6 mt-6 p-4 bg-white rounded-lg">
 <button type="button" aria-expanded={open} onClick={()=>setOpen(!open)}>{yo?'Kóòdù ìmúpadàbọ̀ PIN':'PIN recovery code'}</button>
 {open&&(code?<SaveRecoveryCode code={code} onDone={()=>{setCode('');setOpen(false);}}/>:<div className="flex flex-col gap-3 mt-3">
 <p>{yo?'Tẹ PIN rẹ láti gba kóòdù tuntun. Kóòdù àtijọ́ kò ní ṣiṣẹ́ mọ́.':'Confirm your current PIN to generate a new code. Your previous recovery code will stop working.'}</p>
 <label>{yo?'PIN rẹ lọ́wọ́lọ́wọ́':'Current PIN'}<input type="password" inputMode="numeric" autoComplete="current-password" maxLength={4} value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,''))} className="w-full border p-3 rounded"/></label>
 <button type="button" disabled={busy||pin.length!==4} onClick={async()=>{if(!user)return;setBusy(true);try{const result=await generateRecoveryCode(user.phone,pin);setCode(result.recoveryCode);setPin('');}catch(e:any){toast.error(e.message);}finally{setBusy(false);}}} className="p-3 bg-[#008080] text-white rounded disabled:opacity-40">{busy?'…':yo?'Ṣẹ̀dá kóòdù tuntun':'Generate recovery code'}</button>
 </div>)}
 </section>;
}
