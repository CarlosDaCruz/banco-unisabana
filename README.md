# 🏦 Banco Unisabana - Taller Circuit Breaker

Este proyecto simula un **Banco** que consulta la calificación crediticia en un **buró principal** y, si este falla, usa un **buró secundario**.  
Implementa el **patrón Circuit Breaker** en **TypeScript** para mejorar la resiliencia del sistema.

## 📌 Requisitos

- [Node.js](https://nodejs.org) v18+ (recomendado v20)
- npm (incluido con Node.js)
- Git


**Instalación***

1. Clona el repositorio:

-  https://github.com/CarlosDaCruz/banco-unisabana.git
-  cd banco-unisabana


Instala dependencias:

-  npm install


Compila TypeScript a JavaScript:

-  npm run build

Esto generará los archivos en dist/.

**Ejecución**

El sistema se compone de 4 procesos. Ejecuta cada uno en una terminal diferente:

1. Buró Principal (puerto 4000)
- npm run buro1

2. Buró Secundario (puerto 5000)
- npm run buro2

3. API del Banco (puerto 3000)
- npm run banco

4. Cliente de prueba (envía peticiones cada 2 segundos)
- npm run testclient



Comportamiento esperado

Con el buró principal activo → el cliente (testClient) recibe respuestas del PRINCIPAL.
Si el buró principal empieza a fallar → el Circuit Breaker se abre (OPEN) y las solicitudes se redirigen al SECUNDARIO.

El Circuit Breaker intenta reabrir después de 30s (HALF-OPEN):
  - Si el buró principal responde bien → vuelve a CLOSED y se usa otra vez el PRINCIPAL.
  - Si sigue fallando → regresa a OPEN y se mantiene en el SECUNDARIO.

*FIN*
