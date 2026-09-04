document.addEventListener('DOMContentLoaded',()=>{
  const style=document.createElement('style');
  style.textContent=`
    .brand{gap:10px;min-width:270px}
    .tabs-logo{display:inline-flex;align-items:center;gap:5px;position:relative;padding-bottom:16px;filter:drop-shadow(0 0 8px rgba(205,255,35,.16))}
    .tabs-logo-alt{font-weight:950;font-style:italic;font-size:1.02rem;line-height:1;border:2px solid #dfff38;border-radius:5px;padding:6px 9px;color:#fff;transform:skew(-7deg)}
    .tabs-logo-speed{font-weight:950;color:#dfff38;font-size:1rem;letter-spacing:-.18em;transform:rotate(0deg)}
    .tabs-logo-tabs{font-weight:950;font-style:italic;font-size:1.25rem;line-height:1;color:#dfff38;letter-spacing:-.04em}
    .tabs-logo small{position:absolute;left:134px;top:7px;white-space:nowrap;color:#91918a;font-size:.57rem;font-style:normal;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
    .hero-visual{min-height:590px}
    .hero-product-card{width:min(100%,500px);position:relative;padding:0;border:0;background:transparent;box-shadow:none;display:grid;place-items:center}
    .hero-product-card img{display:block;width:100%;height:auto;max-height:590px;object-fit:contain;image-rendering:auto;filter:drop-shadow(0 28px 45px rgba(0,0,0,.58))}
    .hero-product-tag{position:absolute;left:16px;bottom:14px;background:rgba(7,7,7,.9);border:1px solid #93f000;color:#dfff38;padding:7px 10px;font-size:.65rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
    .brand-tagline-accent{color:#dfff38}
    .closing p{color:#f5f5ef}
    @media(max-width:900px){.tabs-logo small{display:none}.brand{min-width:auto}.hero-product-card{max-width:520px;margin:auto}.hero-visual{min-height:480px}}
    @media(max-width:560px){.hero-visual{min-height:410px}.hero-product-card img{max-height:430px}.hero-product-tag{font-size:.58rem}}
  `;
  document.head.appendChild(style);

  const brand=document.querySelector('.brand');
  if(brand){brand.innerHTML='<span class="tabs-logo" aria-label="ALT TABS, sua mente no modo certo"><span class="tabs-logo-alt">ALT</span><span class="tabs-logo-speed">≡</span><span class="tabs-logo-tabs">TABS</span><small>Sua mente no modo certo.</small></span>';}

  const hero=document.querySelector('.hero-visual');
  if(hero){hero.innerHTML='<div class="hero-product-card"><div class="hero-product-tag">Conceito de embalagem</div></div>';}

  const closing=document.querySelector('.closing p');
  if(closing)closing.innerHTML='<span class="brand-tagline-accent">Sua mente</span> no modo certo.';

  const loadChunks=async files=>(await Promise.all(files.map(async f=>{const r=await fetch(f,{cache:'force-cache'});if(!r.ok)throw new Error(f);return r.text()}))).join('');
  (async()=>{
    try{
      const b64=await loadChunks(['/assets/hq30-01.txt','/assets/hq30-02.txt','/assets/hq30-03.txt']);
      const img=new Image();
      img.alt='ALT TABS Smart Gum · conceito pouch 30 gums';
      img.decoding='async';
      img.src='data:image/webp;base64,'+b64;
      const card=document.querySelector('.hero-product-card');
      if(card)card.prepend(img);
    }catch(err){
      console.warn('ALT TABS HQ artwork failed to load',err);
      const card=document.querySelector('.hero-product-card');
      if(card)card.insertAdjacentHTML('afterbegin','<div style="min-height:420px;display:grid;place-items:center;color:#dfff38;font-weight:900;text-align:center">ALT TABS<br><small style="color:#888">SMART GUM</small></div>');
    }
  })();
});
