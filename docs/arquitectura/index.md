---
lang: "es-ES"
title: "Patrones de arquitectura"
description: "Patrones de arquitectura"
---

# Patrones de arquitectura

No es un framework ni una libreria, y tampoco aplica a un lenguaje. 

Un patron nunca te dira que framework o libreria usar, no se centra en escribir codigo sino en organizarlo. Esta es la idea central.

Cuando tenemos que aplicar patrones, no estamos hablando de una sola cosa, estamos hablando de decisiones de niveles diferentes
Un nivel, las deciciones de como se ejecuta y como se despliega (Arquitectura sistema), docker, kubernates...

Otro nivel, decisiones a nivel interno de diseño (Arquitectura interna), MVC... Donde la logica del negocio, donde va la interfaz... Que depende de que...

Cuando un equipo quiere crear una aplicación debe de pensar en los dos niveles.
_______________

** Patron de arquitectura de sistema ** cómo se ejecuta la aplicación. Como vive la aplicación cuando esta en ejecución

** Arquitectura interna ** cómo se escribe el código, de que depende de que.

Un patron de arquitectura interna, como se van a organizar los componentes vs patron de diseño. Patron de diseño resuelve problemas concretos dentro del codigo, a nivel de clases y objetos, cuantas clases voy a tener como van a estar contruidas como se comunican, cuantas voy a tener... El patron de arquitectura interna, es un nivel superior

______________________

Arquitectura de sistema
- monolito
- microservicios
- cliente-servidor
- basado en eventos

Arquitectura interna
- Capas
- MVC, modelo visto controlador. Modelo, gestion de datos, vista interfaz de usuario. Controlador, que comunica la vista con el modelo. Separamos responsabilidades.
- Clean architecture
- Hexagonal
- MVVM, model view, view model.

Patrones de diseño
- Singletone
- Factory
- Observer
- ....

___________

## Monolito

### Caracteristicas

- Deplegada como una única unidad, como un unico artefacto. Como un .exe. Lo empacaremos en un unico archivo. 
- Se ejecutan en un único proceso en el sistema operativo o alla donde se este ejecutando
- Una unica bbdd

### Ventajas

- Más simple
- El desarollo es más rápido al inicio.

### Inconvenientes

- Cuando la aplicación crece, tenemos los grandes problemas, fue pensada para 20 usuarios simultaneos y al pasar a 2000....
Eso no significa que este patron, este obsoleto, es el más usado en el mundo. 
No todas las aplicaciones van a ser complejas, no es un patron obsoleto. 

_____________

Encontrariamos 3 modulos que se comunican con una bbdd
Interfaz usuario, datos, lógica... que se comunican como bbdd.
Podemos tener una aplicación

## Microservicios

### Caracteristicas

- Formadas por varios servicios, microaplicaciones independientes que se pueden desplegar de forma separada en el servidor. 
- Ejecución independiente. Yo puedo tener de un servicio que se encargue del usuario, y otro de los pagos, y otro de la gestión de los datos... són como miniaplicaciones. Se van a comunicar a través de APIs

### Ventajas

- Escalado selectivo. Quieres modificar un servicio solo modificas ese, no tienes que desplegar todo. Si quieres hacer un cambio en el servicio de pagos, se puede hacer el cambio solo ahi.
- Trabajo en paralelo. Si tenemos una aplicación con servicios independientes, tu puedes tener a varios programadores trabajando en paralelo
- Resistencia a fallos. Si falla un servicio no significa la caida total. Ejemplo si falla el servicio de pagos, los usuarios se pueden seguir dando de alta

### Inconvenientes

- Complejidad.
