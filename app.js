const main=document.querySelector('#main'),modal=document.querySelector('#modal');
const initial=main.innerHTML;
const content={
domicilio:['🏠','Médico a domicilio','La solicitud de atención domiciliaria estará disponible cuando conectemos la central operativa.'],
central:['📞','Llamar a la central','El número telefónico todavía no está configurado. En una emergencia real, utilizá el número habitual de tu prestador.'],
urgencias:['🚑','Urgencias y emergencias','Asistencia prehospitalaria y ambulancias las 24 horas, sujeta a la cobertura contratada.'],
areas:['🏢','Áreas protegidas','Cobertura para comercios, empresas e instituciones.'],
eventos:['🎪','Cobertura de eventos','Dispositivos sanitarios y ambulancias para eventos.'],
capacitacion:['🎓','Capacitaciones','Formación en RCP, primeros auxilios y respuesta a emergencias.']
};
function show(icon,title,message,extra=''){document.querySelector('#modal-icon').textContent=icon;document.querySelector('#modal-title').textContent=title;document.querySelector('#modal-text').textContent=message;document.querySelector('#modal-extra').innerHTML=extra;modal.showModal()}
document.querySelector('#close').onclick=()=>modal.close();
document.querySelector('#modal-ok').onclick=()=>modal.close();
document.addEventListener('click',e=>{
const sos=e.target.closest('#sos');if(sos){show('🆘','Modo demostración','Esta versión NO envía alertas a ninguna central. Ante una emergencia real, llamá al número habitual del servicio.','<p class="warning">No se ha solicitado ninguna ambulancia.</p>');return}
const action=e.target.closest('[data-action]');if(action){const [icon,title,message]=content[action.dataset.action];show(icon,title,message)}
const tab=e.target.closest('[data-tab]');if(!tab)return;
document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b===tab));
const page=tab.dataset.tab;
if(page==='inicio'){main.innerHTML=initial;return}
if(page==='credencial'){main.innerHTML='<section class="page"><h1>Mi credencial</h1><p>Tu identificación de socio estará disponible cuando se habilite el registro seguro.</p><div class="info-card"><strong>VITALINK 360</strong>Credencial de demostración<br>Socio: sin registrar<br>Estado: no verificado</div><p>No presenta cobertura válida ni autoriza prestaciones.</p></section>';return}
if(page==='servicios'){main.innerHTML='<section class="page"><h1>Nuestros servicios</h1><p>Conocé las opciones de asistencia y cobertura.</p>'+Object.entries(content).map(([key,[icon,title]])=>'<button class="service" data-action="'+key+'"><span class="emoji">'+icon+'</span><span><strong>'+title+'</strong><small>Ver información</small></span><span class="arrow">›</span></button>').join('')+'</section>';return}
if(page==='central'){main.innerHTML='<section class="page"><p class="eyebrow">PANEL OPERATIVO · DEMOSTRACIÓN</p><h1>Central de emergencias</h1><p>Vista preliminar del futuro panel de despacho. No recibe solicitudes reales.</p><div class="demo-map">🗺️<br>Mapa de operaciones<br>Próximamente</div><div class="info-card"><strong>Solicitudes conectadas</strong>0 · Sin backend configurado<strong>Ambulancias conectadas</strong>0 · Sin unidades vinculadas</div><p class="warning">La central no está operativa.</p></section>'}
});
