(function () {
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var copy = {
    en: ['We use cookies for analytics and to measure our advertising. You can accept or decline; the page works the same either way.', 'Decline', 'Accept'],
    pt: ['Utilizamos cookies para análise e para medir a nossa publicidade. Pode aceitar ou recusar; a página funciona da mesma forma.', 'Recusar', 'Aceitar'],
    es: ['Utilizamos cookies para analítica y para medir nuestra publicidad. Puede aceptar o rechazar; la página funciona igual.', 'Rechazar', 'Aceptar']
  }[lang] || null;
  if (!copy) copy = ['We use cookies for analytics and to measure our advertising. You can accept or decline; the page works the same either way.', 'Decline', 'Accept'];
  var css = '#plc-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:720px;margin:0 auto;background:#F7F7F5;color:#0F0F12;border:1px solid #DDDAD2;border-top:2px solid #B7A26A;border-radius:2px;box-shadow:0 10px 30px rgba(0,0,0,.18);padding:18px 20px;display:none;gap:16px;align-items:center;font:13px/1.55 Inter,system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '#plc-cc.show{display:flex}#plc-cc p{margin:0;flex:1;color:#2A2A2E}#plc-cc .plc-cc-a{display:flex;gap:10px;flex:none}' +
    '#plc-cc button{font:600 12px Inter,system-ui,sans-serif;letter-spacing:.03em;padding:10px 18px;border-radius:2px;cursor:pointer;border:1px solid #0F0F12;background:transparent;color:#0F0F12}' +
    '#plc-cc button.plc-cc-y{background:#B7A26A;border-color:#B7A26A;color:#17171A}#plc-cc button:focus-visible{outline:2px solid #B7A26A;outline-offset:2px}' +
    '@media(max-width:560px){#plc-cc{flex-direction:column;align-items:stretch}#plc-cc .plc-cc-a button{flex:1}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var d = document.createElement('div');
  d.id = 'plc-cc'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-live', 'polite'); d.setAttribute('aria-label', 'Cookie consent');
  var p = document.createElement('p'); p.textContent = copy[0];
  var a = document.createElement('div'); a.className = 'plc-cc-a';
  var no = document.createElement('button'); no.type = 'button'; no.textContent = copy[1];
  var yes = document.createElement('button'); yes.type = 'button'; yes.className = 'plc-cc-y'; yes.textContent = copy[2];
  a.appendChild(no); a.appendChild(yes); d.appendChild(p); d.appendChild(a); document.body.appendChild(d);
  window.plcSetConsent = function (ok) {
    var v = ok ? 'granted' : 'denied';
    try { localStorage.setItem('plc_consent', v); } catch (e) {}
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { ad_storage: v, analytics_storage: v, ad_user_data: v, ad_personalization: v });
      if (ok) { gtag('event', 'page_view'); }
    }
    if (typeof fbq === 'function') { fbq('consent', ok ? 'grant' : 'revoke'); }
    d.classList.remove('show');
  };
  window.plcOpenConsent = function () { d.classList.add('show'); };
  no.addEventListener('click', function () { window.plcSetConsent(false); });
  yes.addEventListener('click', function () { window.plcSetConsent(true); });
  var c = null; try { c = localStorage.getItem('plc_consent'); } catch (e) {}
  if (c !== 'granted' && c !== 'denied') { window.plcOpenConsent(); }
})();
