document.addEventListener('DOMContentLoaded',()=>{
  const VERSION='20260904-1245';
  const pack30=`/site-assets/pack30.webp?v=${VERSION}`;
  const pack8=`/site-assets/pack8.webp?v=${VERSION}`;

  const style=document.createElement('style');
  style.textContent=`
    .brand{gap:10px;min-width:300px}
    .tabs-logo{display:inline-flex;align-items:center;gap:6px;position:relative;padding-bottom:15px;filter:drop-shadow(0 0 9px rgba(205,255,35,.18))}
    .tabs-logo-alt{font-weight:950;font-style:italic;font-size:1.04rem;line-height:1;border:2px solid #dfff38;border-radius:5px;padding:6px 9px;color:#fff;transform:skew(-7deg)}
    .tabs-logo-speed{font-weight:950;color:#dfff38;font-size:.98rem;letter-spacing:-.16em}
    .tabs-logo-tabs{font-weight:950;font-style:italic;font-size:1.28rem;line-height:1;color:#dfff38;letter-spacing:-.04em}
    .tabs-logo small{position:absolute;left:137px;top:7px;white-space:nowrap;color:#92928c;font-size:.56rem;font-style:normal;font-weight:750;letter-spacing:.09em;text-transform:uppercase}
    .hero-visual{min-height:590px;display:grid;place-items:center}
    .hero-product-card{width:min(100%,520px);position:relative;display:grid;place-items:center}
    .hero-product-card img{display:block;width:100%;height:auto;max-height:620px;object-fit:contain;filter:drop-shadow(0 28px 50px rgba(0,0,0,.55))}
    .hero-product-tag{position:absolute;left:18px;bottom:16px;background:rgba(7,7,7,.9);border:1px solid #93f000;color:#dfff38;padding:7px 10px;font-size:.64rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
    .pack-showcase{background:radial-gradient(circle at 82% 50%,rgba(223,255,56,.09),transparent 26rem),#0b0b0b}
    .pack-showcase-head{max-width:760px;margin-bottom:42px}
    .pack-showcase-head p{color:#aaa9a2;font-size:1.02rem;margin-top:20px}
    .pack-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
    .pack-card{position:relative;min-height:520px;display:grid;place-items:center;padding:28px;border:1px solid #2d2d2d;background:linear-gradient(145deg,#111,#090909)}
    .pack-card img{display:block;max-width:100%;max-height:560px;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 28px 45px rgba(0,0,0,.58))}
    .pack-card span{position:absolute;left:20px;bottom:18px;color:#dfff38;font-size:.68rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;background:rgba(9,9,9,.84);padding:7px 9px}
    .brand-tagline-accent{color:#dfff38}.closing p{color:#f5f5ef}
    @media(max-width:900px){.tabs-logo small{display:none}.brand{min-width:auto}.hero-product-card{max-width:480px;margin:auto}.hero-visual{min-height:480px}.pack-grid{grid-template-columns:1fr}.pack-card{min-height:460px}}
    @media(max-width:560px){.hero-visual{min-height:410px}.hero-product-card img{max-height:430px}.hero-product-tag{font-size:.57rem;left:10px;bottom:10px}.pack-card{min-height:400px;padding:18px}.pack-card img{max-height:430px}}
  `;
  document.head.appendChild(style);

  const brand=document.querySelector('.brand');
  if(brand){brand.innerHTML='<span class="tabs-logo" aria-label="ALT TABS, sua mente no modo certo"><span class="tabs-logo-alt">ALT</span><span class="tabs-logo-speed">≡</span><span class="tabs-logo-tabs">TABS</span><small>Sua mente no modo certo.</small></span>';}

  const hero=document.querySelector('.hero-visual');
  if(hero){hero.innerHTML=`<div class="hero-product-card"><img src="${pack30}" alt="ALT TABS Smart Gum, conceito de embalagem pouch 30 gums" width="520" height="650" decoding="async" fetchpriority="high"><div class="hero-product-tag">Conceito de embalagem</div></div>`;}

  const moments=document.querySelector('#momentos');
  if(moments && !document.querySelector('.pack-showcase')){
    const section=document.createElement('section');
    section.className='pack-showcase';
    section.innerHTML=`<div class="container"><div class="pack-showcase-head"><div class="kicker">Identidade em desenvolvimento</div><h2>Smart Gum com cara de ALT TABS.</h2><p>Do pouch para a caixa, a linguagem visual segue o mesmo território: performance, foco, tecnologia e presença. <strong style="color:#fff">Sua mente no modo certo.</strong></p></div><div class="pack-grid"><div class="pack-card"><img src="${pack30}" alt="ALT TABS pouch, conceito 30 gums" width="520" height="650" loading="lazy"><span>Pouch · conceito 30 gums</span></div><div class="pack-card"><img src="${pack8}" alt="ALT TABS box, conceito 8 gums" width="520" height="650" loading="lazy"><span>Box · conceito 8 gums</span></div></div></div>`;
    moments.parentNode.insertBefore(section,moments);
  }

  const closing=document.querySelector('.closing p');
  if(closing)closing.innerHTML='<span class="brand-tagline-accent">Sua mente</span> no modo certo.';
});
