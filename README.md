# DataControl BI – sitio web

Estado: **código escrito, SIN compilar ni probar** (se generó sin acceso a npm).

## Probar en local
    npm install
    npm run dev          # http://localhost:5173
    npm run typecheck
    npm run build

El formulario por correo necesita la función de Netlify: usá `npx netlify dev` (con las variables de abajo).

## Variables de entorno
- `VITE_CONTACT_MODE`: `email` | `whatsapp` | `both` (público).
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: solo en Netlify.

## Pendiente
- Cuenta de Resend y dominio/remitente verificado.
- Texto de "Sobre mí", política de privacidad, imagen y URL Open Graph.
- Aprobación del cliente de las capturas difuminadas.
