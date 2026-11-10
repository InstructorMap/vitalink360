const main=document.querySelector('#main'),modal=document.querySelector('#modal');
const initial=main.innerHTML;
const content={
domicilio:['🏠','Médico a domicilio','La solicitud de atención domiciliaria estará disponible cuando conectemos la central operativa.'],
central:['📞','Contactar a la central','El teléfono de la central aún no está configurado. Ante una emergencia real, usá el número habitual de tu prestador.'],
urgencias:['🚑','Urgencias y emergencias','Asistencia prehospitalaria y ambulancias las 24 horas, según la cobertura contratada.'],
areas:['🏢','Áreas protegidas','Cobertura sanitaria para empresas, comercios e instituciones.'],
eventos:['🎪','Cobertura de eventos','Dispositivos sanitarios y ambulancias para eventos.'],
capacitacion:['🎓','Capacitaciones','Cursos de primeros auxilios, RCP y respuesta a emergencias.']
};
function show(icon,title,message,extra=''){document.querySelector('#modal-icon').textContent=icon;document.querySelector('#modal-title').textContent=title;document.querySelector('#modal-text').textContent=message;document.querySelector('#modal-extra').innerHTML=extra;modal.showModal()}
function close(){modal.close()}
document.querySelector('#close').onclick=close;
document.querySelector('#modal-ok').onclick=close;
function selectTab(tab){document.querySelectorAll('[data-tab]').forEach(b=>{const active=b.dataset.tab===tab;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
if(tab==='inicio')main.innerHTML=initial;
if(tab==='credencial')main.innerHTML='<section class="page"><p class="eyebrow">IDENTIFICACIÓN DIGITAL</p><h1>Mi credencial</h1><p>Próximamente vas a poder consultar tu credencial de socio.</p><div class="digital-card"><span>✚ VITALINK 360</span><strong>SOCIO DE DEMOSTRACIÓN</strong><span>Sin registrar</span><small>NO ACREDITA COBERTURA</small></div><p>Para proteger tus datos, el registro y la validación de cobertura se habilitarán al conectar el sistema seguro.</p></section>';
if(tab==='servicios')main.innerHTML='<section class="page"><p class="eyebrow">COBERTURAS Y PRESTACIONES</p><h1>Nuestros servicios</h1><p>Seleccioná un servicio para conocerlo.</p>'+Object.entries(content).filter(([key])=>key!=='central').map(([key,[icon,title]])=>'<button class="service" data-action="'+key+'"><span class="emoji" aria-hidden="true">'+icon+'</span><span><strong>'+title+'</strong><small>Más información</small></span><span class="arrow" aria-hidden="true">›</span></button>').join('')+'</section>';
if(tab==='perfil')main.innerHTML='<section class="page"><p class="eyebrow">MI ESPACIO</p><h1>Mi perfil</h1><p>Estamos preparando una experiencia sencilla y segura para socios y familiares.</p><div class="info-card"><strong>Estado de cuenta</strong>Sin sesión iniciada<strong>Familiares vinculados</strong>No configurados<strong>Historial de solicitudes</strong>Sin conexión con la central</div><button class="service" data-action="ubicacion"><span class="emoji">📍</span><span><strong>Consultar ubicación</strong><small>Solo con tu autorización</small></span></button><button class="service" data-action="accesibilidad"><span class="emoji">Aa</span><span><strong>Accesibilidad</strong><small>Texto grande y contraste alto</small></span></button></section>';
main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})}
function accessibility(){show('Aa','Lectura fácil','Elegí cómo querés ver la aplicación. Las preferencias se aplican solo a esta sesión.','<div class="settings"><button id="large-text" class="setting-btn" type="button">Aumentar tamaño de letra</button><button id="high-contrast" class="setting-btn" type="button">Activar o desactivar alto contraste</button><button id="reset-access" class="setting-btn" type="button">Restablecer apariencia</button></div>')}
function locationCheck(){show('📍','Consultar mi ubicación','Solo se solicitará tu ubicación si tocás el botón de abajo. No se envía ni guarda en ningún servidor.','<button class="setting-btn" id="ask-location" type="button">Permitir ubicación en este momento</button><p id="location-result" aria-live="polite"></p>')}
document.querySelector('#accessibility').onclick=accessibility;
document.addEventListener('click',e=>{
if(e.target.closest('#sos')){show('🆘','Simulación de emergencia','Esta versión NO envía alertas a una central ni solicita ambulancias. Para una emergencia real, llamá al teléfono habitual de tu prestador.','<p class="warning">No se generó ninguna solicitud de asistencia.</p>');return}
if(e.target.closest('#large-text')){document.body.classList.toggle('large-text');return}
if(e.target.closest('#high-contrast')){document.body.classList.toggle('high-contrast');return}
if(e.target.closest('#reset-access')){document.body.classList.remove('large-text','high-contrast');return}
if(e.target.closest('#ask-location')){const result=document.querySelector('#location-result');if(!navigator.geolocation){result.textContent='Tu navegador no permite consultar la ubicación.';return}result.textContent='Consultando ubicación…';navigator.geolocation.getCurrentPosition(p=>{result.textContent='Ubicación obtenida (solo en tu dispositivo). Precisión aproximada: '+Math.round(p.coords.accuracy)+' metros. No fue enviada a la central.'},()=>{result.textContent='No se pudo obtener la ubicación. Revisá los permisos del navegador.'},{enableHighAccuracy:true,timeout:12000,maximumAge:0});return}
const action=e.target.closest('[data-action]');if(action){const key=action.dataset.action;if(key==='ubicacion')locationCheck();else if(key==='accesibilidad')accessibility();else{const [icon,title,message]=content[key];show(icon,title,message)}return}
const tab=e.target.closest('[data-tab]');if(tab)selectTab(tab.dataset.tab)
});
