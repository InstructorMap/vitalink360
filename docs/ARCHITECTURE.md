# VITALINK 360 — Arquitectura de evolución

## Separación de superficies
- `index.html`: experiencia del socio, prototipo público sin identidad real.
- `central.html`: maqueta de central; **no es una central operativa** y no debe mostrar datos sensibles.
- Backend futuro: API autenticada, base de datos PostgreSQL y canal de eventos autenticado.

## Requisitos para un SOS real
1. Identificación de socio y cobertura, con acceso seguro y autorización.
2. Consentimiento de geolocalización; dirección alternativa y manejo de GPS impreciso.
3. Solicitud con ID único, idempotencia, reintentos y confirmación explícita del servidor.
4. Recepción por operadores autenticados con acuse de lectura, escalamiento y contingencia telefónica.
5. Despacho registrado con estados auditables y control humano.
6. Alertas y seguimiento sujetos a conectividad; nunca mostrar 'ambulancia en camino' sin despacho confirmado.
7. Ensayos operativos de punta a punta, fallos de red, carga, accesibilidad y disponibilidad antes de uso real.

## Protección de datos
Los datos médicos, ubicación y contactos son sensibles. No se almacenarán en GitHub Pages ni localStorage; requieren backend protegido, permisos por rol, cifrado, retención definida, trazabilidad y revisión legal aplicable en Argentina.

## Próximo sprint
Backend de autenticación, esquema de socios y familiares, API de solicitudes y consola protegida; pruebas automatizadas antes de habilitar operaciones.
