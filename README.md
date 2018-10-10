# PLATAFORMA OMMBC

Sistema de entrenamiento en linea/virtual para la OMMBC

## 1. STACK 

- **M** - MongoDb ( Base de Datos NoSQL)
- **E** - ExpressJS ( Framework de NodeJS para el manejo de servidor y rutas del API)
- **A** - Angular {6} ( Framework para el Front End de la aplicacion , Single Page Application)
- **N** - NodeJS (Backend , Javascript)

## 2. ESTRUCTURA

Dentro de la carpeta de ommbc se encuentra el script del servidor de Node (*server.js*), cuya principal función es la de servir el servidor y escuchar en un puerto utilizando el protocolo HTTP. La funcionalidad del framework *expressjs* se encontrará en el archivo *app.js*, el cuál estará dividido en pequeños modulos, donde se crearan subrutas para un mejor control y distribución del código, mismas que se encuentran dentro del folder *backend*. Todo lo reelevante a Angular 6 se encuentra dentro de la carpeta *src/* y su subcarpeta *app*. Dentro de la carpeta *angular* (que todavía no ha sido creada), estarán los archivos minificados, mismos que se usarán al momento de hacer el deploy de la aplicación. 

## 3. Recursos

Si te gustaría ver esta aplicación en vivo, haz click en el enlace que se encuentra debajo de éste parrafo. También se encuentran referencias a la documentación de las tecnologías utilizadas.

  * [OMMBC Web App] (https://www.ommbc.org)
