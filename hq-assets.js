document.addEventListener('DOMContentLoaded',()=>{
  const loadChunks=async(files)=>(await Promise.all(files.map(async f=>{const r=await fetch(f,{cache:'force-cache'});if(!r.ok)throw new Error(`Falha ao carregar ${f}`);return r.text()}))).join('');
  (async()=>{
    try{
      const b64=await loadChunks(['/assets/hq30-01.txt','/assets/hq30-02.txt','/assets/hq30-03.txt']);
      const src='data:image/webp;base64,'+b64;
      const hero=document.querySelector('.hero-product-card img');
      if(hero){hero.src=src;hero.alt='ALT TABS Smart Gum · conceito pouch 30 gums';hero.decoding='async';}
      const pouch=document.querySelector('.pack-grid .pack-card:first-child img');
      if(pouch){pouch.src=src;pouch.alt='ALT TABS Smart Gum · pouch 30 gums';pouch.decoding='async';}
    }catch(err){console.warn('ALT TABS HQ asset:',err)}
  })();
});
