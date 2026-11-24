import { useState } from "react";
import { toast } from "sonner";
import { BottomNav } from "./BottomNav";
import { useUser } from "./UserContext";
import { useLanguage } from "./LanguageContext";
import { saveAssessment } from "./api";
import { yorubaQuestions, yorubaOptions } from "./questionnaireYoruba";
import { questions, questionnaireVersion } from "./questionnaire";
export function AssessmentScreen({onNavigate}:{onNavigate:(tab:string)=>void}) {
 const {user,progress,setProgress}=useUser(); const {t,language}=useLanguage();
 const [type,setType]=useState<"baseline"|"endline"|null>(null);
 const [answers,setAnswers]=useState<Record<string,any>>({}); const [index,setIndex]=useState(0); const [saving,setSaving]=useState(false);
 const visible=questions.filter(q=>(type==='endline'||q.section!=='D')&&(!q.when||answers[q.when[0]]===q.when[1]));
 const current=visible[index];
 const put=(value:any)=>setAnswers(a=>({...a,[current.id]:value}));
 const submit=async()=>{if(!user||!type||saving)return;setSaving(true);try{
 const responses={...Object.fromEntries(questions.filter(q=>type==='endline'||q.section!=='D').map(q=>[q.id,visible.includes(q)?answers[q.id]:null])),...Object.fromEntries(visible.filter(q=>q.kind==='other'&&String(answers[q.id]).startsWith('Other')).map(q=>[q.id+'Other',answers[q.id+'Other']]))};
 const result=await saveAssessment(user.phone,type,0,0,responses,questionnaireVersion);
 setProgress({...progress,...result.progress});setType(null);toast.success(t('assessment.complete'));onNavigate(type==='baseline'?'library':'home');
 }catch(e:any){toast.error(e.message||t('assessment.saveError'));}finally{setSaving(false);}};
 const valid=current&&(Array.isArray(answers[current.id])?answers[current.id].length>0:String(answers[current.id]??'').trim()!=='')&&(!(current.kind==='number')||(/^\d+$/.test(String(answers[current.id]))&&Number(answers[current.id])>=(current.id==='1'?18:0)&&Number(answers[current.id])<=120))&&(!(current.kind==='other'&&String(answers[current.id]).startsWith('Other'))||!!String(answers[current.id+'Other']||'').trim());
 return <div className="size-full flex flex-col bg-[#f8fafc]"><div className="flex-1 overflow-y-auto p-6 pt-14">
 <h1 className="text-2xl text-[#008080] mb-6">{t('assessment.title')}</h1>
 {!type?<div className="flex flex-col gap-4"><button disabled={progress.baselineCompleted} onClick={()=>{setType('baseline');setIndex(0);setAnswers({});}}>{t('assessment.takeBaseline')}{progress.baselineCompleted?' ✓':''}</button><button disabled={!progress.baselineCompleted||!progress.modulesCompleted||progress.endlineCompleted} onClick={()=>{setType('endline');setIndex(0);setAnswers({});}}>{t('assessment.takeEndline')}</button>{!progress.modulesCompleted&&<p className="text-[#555]">{t('assessment.endlineLocked')}</p>}</div>:current&&<>
 <p>{t('assessment.section')} {current.section} · {t('assessment.question')} {current.id} · {index+1}/{visible.length}</p><progress className="w-full my-4" value={index+1} max={visible.length}/>
 <fieldset><legend className="text-lg font-semibold mb-4">{language==="yo"?yorubaQuestions[current.id]:current.text}</legend>
 {current.options?current.options.map(option=><label key={option} className="flex gap-3 p-3 mb-2 border rounded-lg bg-white"><input type={current.kind==='multi'?'checkbox':'radio'} name={current.id} checked={current.kind==='multi'?(answers[current.id]||[]).includes(option):answers[current.id]===option} onChange={()=>put(current.kind==='multi'?((answers[current.id]||[]).includes(option)?answers[current.id].filter((v:string)=>v!==option):[...(answers[current.id]||[]),option]):option)}/>{language==="yo"?(yorubaOptions[option]||option):option}</label>):<input aria-label={language==="yo"?yorubaQuestions[current.id]:current.text} type={current.kind==='number'?'number':'text'} min={current.id==='1'?18:0} max={120} value={answers[current.id]??''} onChange={e=>put(e.target.value)} className="w-full p-3 border rounded-lg"/>}
 {current.kind==='other'&&String(answers[current.id]).startsWith('Other')&&<input aria-label={t('assessment.specify')} placeholder={t('assessment.specify')} value={answers[current.id+'Other']||''} onChange={e=>setAnswers({...answers,[current.id+'Other']:e.target.value})} className="w-full p-3 border"/>}
 </fieldset><div className="flex justify-between mt-6"><button disabled={index===0||saving} onClick={()=>setIndex(index-1)}>{t('library.previous')}</button><button className="bg-[#008080] text-white p-3 rounded-lg disabled:opacity-40" disabled={!valid||saving} onClick={()=>index===visible.length-1?submit():setIndex(index+1)}>{saving?t('assessment.saving'):index===visible.length-1?t('assessment.submit'):t('library.next')}</button></div><button className="mt-6" disabled={saving} onClick={()=>setType(null)}>{t('assessment.back')}</button>
 </>}
 </div><BottomNav active="assessment" onNavigate={onNavigate}/></div>;
}
