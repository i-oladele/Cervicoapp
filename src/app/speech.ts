// Never silently read Yoruba text using an English-only voice.
export async function narrate(text: string, language: 'en' | 'yo'): Promise<void> {
 if(typeof window==='undefined'||!('speechSynthesis' in window))throw new Error('unavailable');
 const engine=window.speechSynthesis;
 let voices=engine.getVoices();
 if(!voices.length)voices=await new Promise<SpeechSynthesisVoice[]>(resolve=>{
  let timer:ReturnType<typeof setTimeout>;
  const finish=()=>{clearTimeout(timer);engine.removeEventListener('voiceschanged',finish);resolve(engine.getVoices());};
  engine.addEventListener('voiceschanged',finish);timer=setTimeout(finish,1000);
 });
 const voice=voices.find(v=>v.lang.toLowerCase()===`${language}-ng`)||voices.find(v=>v.lang.toLowerCase().split('-')[0]===language);
 if(!voice)throw new Error('voice-unavailable');
 const speech=new SpeechSynthesisUtterance(text);speech.voice=voice;speech.lang=voice.lang;
 engine.cancel();engine.speak(speech);
}
