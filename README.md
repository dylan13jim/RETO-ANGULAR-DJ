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
#FRONT ANGULAR
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
<br>
*GET*
![image](https://github.com/user-attachments/assets/c6d7ee45-2a36-471c-8fab-a5ee628dd890)
<br>
*POST*
![image](https://github.com/user-attachments/assets/47289529-9ce0-4584-9937-803e7d0fc34c)
<br>
*PUT*
![image](https://github.com/user-attachments/assets/635e5259-c213-492d-b5a0-1f467ea33194)
<br>
*DELETE*
![image](https://github.com/user-attachments/assets/3c7acbc6-41c1-4c90-bb3e-476c39c5cb7d)
<br>

PRUEBAS DE INTERFAZ UI
---

Pantalla inicial
--
![image](https://github.com/user-attachments/assets/55160a3a-0a84-4dab-a2bd-d8a238b3f0d2)


Pantalla de agregar
--
![image](https://github.com/user-attachments/assets/b48a61f4-99e2-400f-9eb4-8f02496f201e)


Valdaciones realizadas
--

Campos vacios
-
![image](https://github.com/user-attachments/assets/6765149d-9d0b-4357-a883-616802e3d37f)

<br>
<br>
En el ID se ha validado las siguientes opciones:
<br>
1. Que unicamente pueda ingresar datos numericos o letras, se restringio caracteres especiales y espaciado.
<br>
![image](https://github.com/user-attachments/assets/a38f6321-e6f3-44b5-ad5b-19b950489af3)
<br>
2. Si ingreso un id que ya existe.
<br>
![image](https://github.com/user-attachments/assets/914b048f-426d-477d-aaff-15918a1d3abc)
<br>


<br>
<br>
En apartado de nombre se realizo las siguientes validaciones:
<br>
1. Que unicamente pueda caracteres, letras, en caso de ingresar numeros o caracteres especiales no dejara enviar formulario .
<br>
![image](https://github.com/user-attachments/assets/fcf81372-a6c0-4c88-8312-2d4b50723213)

Pantalla de edicion
--
![image](https://github.com/user-attachments/assets/6bfb224e-a032-4d67-bc75-5950fe2e3695)
<br>

Valdaciones realizadas
-
