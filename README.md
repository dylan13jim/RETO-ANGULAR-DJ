---
PROYECTO ANGULAR
---
-
BACK -JSON-SERVER
-
Instalacion json-server
``` bash
npm i -g json-server
```
Ingreso a directorio o carpeta api en back
``` bash
cd api
```
Comando para ejecutar back
Puerto en el que est trabajando = 3000
``` bash
json-server --watch db.json --port 3000
```
---
FRONT ANGULAR
---
Instalación de dependencias del proyecto
``` bash
npm install
```
Comando para ejecutar front
``` bash
npm start
```
---
PRUEBAS DE ENDPOINTS
---

*GET*
![image](https://github.com/user-attachments/assets/c6d7ee45-2a36-471c-8fab-a5ee628dd890)

*POST*
![image](https://github.com/user-attachments/assets/47289529-9ce0-4584-9937-803e7d0fc34c)

*PUT*
![image](https://github.com/user-attachments/assets/635e5259-c213-492d-b5a0-1f467ea33194)

*DELETE*
![image](https://github.com/user-attachments/assets/3c7acbc6-41c1-4c90-bb3e-476c39c5cb7d)


PRUEBAS DE INTERFAZ UI
---

Pantalla inicial
--
![image](https://github.com/user-attachments/assets/55160a3a-0a84-4dab-a2bd-d8a238b3f0d2)


Pantalla de agregar
--
![image](https://github.com/user-attachments/assets/b48a61f4-99e2-400f-9eb4-8f02496f201e)


Validaciones realizadas
--
</br>Validacion de los campos vacios:</br></br>
![image](https://github.com/user-attachments/assets/f8b68dad-b562-4fc8-8337-6de3c0b54c83)

</br>Validacion para el campo de ID:</br></br>
2. Se valido que unicamente inrese datos numericos y letras, no puede ingresar simbolos ni dejar espacios.
![image](https://github.com/user-attachments/assets/a66f832b-f351-4e98-a37d-e33643ada7a8)

</br>3. Validacion de ID unico.</br></br>
![image](https://github.com/user-attachments/assets/5e0e95e0-47ab-44d7-a7f8-28cdea886a4c)


</br>En apartado de nombre se realizo las siguientes validaciones:</br></br>

1. Que unicamente pueda caracteres, letras, en caso de ingresar numeros o caracteres especiales no dejara enviar formulario.</br></br>
![image](https://github.com/user-attachments/assets/896f1769-6486-4557-a094-0335b4b02803)

</br>En apartado de descripcion se realizo las siguientes validaciones:</br></br>

1. Que unicamente pueda caracteres y numeros, si puede tener espacios pero no ingresar simbolos.</br></br>
![image](https://github.com/user-attachments/assets/af68593a-6303-4b3a-807d-a30744f15229)

</br>En apartado de URL se realizo las siguientes validaciones:</br></br>

1. En cao de ingresar una URL que no existe el sistem me mostrara que la url no existe.</br></br>
![image](https://github.com/user-attachments/assets/510d03d5-0925-431d-aaca-6d739ab6c3d4)

</br>En apartado de FECHA se realizo las siguientes validaciones:</br></br>

1. Si ingresa una fecha posterior a la actual, me mostarar el sistema que solo puede ingresar una fecha igual a hoy o despues a la indicada.</br></br>
![image](https://github.com/user-attachments/assets/b2a45b3f-1a56-4ce2-9d65-af7b326e29a9)

</br>2. La fecha de revision se generara de manera automatica despues de un año de la fecha de liberación.</br></br>
![image](https://github.com/user-attachments/assets/db834384-9b8c-4e18-a9fc-6f83d64538ad)



Pantalla de edicion
--
![image](https://github.com/user-attachments/assets/6bfb224e-a032-4d67-bc75-5950fe2e3695)


</br></br>Validaciones realizadas</br>
-
En este formulario de edición se realizo las mismas validaciones aplicadas en registro de formulario, con la diferencia de que el ID va a ser un campo estatico el cual no se podra modificar.</br>
![image](https://github.com/user-attachments/assets/86c31932-c8d1-4902-b2b0-b5202fff52b4)


</br></br>FUNCIONALIDADES IMPLEMENTADAS A LA VERSION ANTERIOR</br>
--

Actualizacion del diseño, implementacion de menu deplegable para las opciones de editar y elimiar, elaboración de paginación, ademas de incluir y mejorar validaciones anteriormente realizadas</br>
![image](https://github.com/user-attachments/assets/7ccedff7-cc45-462f-8e0e-c0830d242c7d)


