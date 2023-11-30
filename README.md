# Sistema de Gestión de Turnos de La Clinica

## Esta aplicación forma parte de un Trabajo Práctico de la Materia Laboratorio IV - 2023. El objetivo de esta pagina es gestionar turnos medicos para la atencion de pacientes.

## Demo con Perfil Paciente

### Bienvenida 
#### En esta pantalla se mostrarán las opciones para que el usuario se rediriga en caso de querer registrarse, o si ya se encuentra registrado, podrá ingresar mediante la pantalla de Login.
![Bienvenida](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/3490e659-4d86-48f6-9215-c1d5d0df7a4e)


### Registro
#### En esta pantalla el usuario podrá elegir que opcion de registro desea, dependiendo si tandrá un rol de paciente o un rol de medico en el sistema.
![Registro](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/7f4255dd-7556-4f13-9ba5-f067035e6d22)


### Registro Paciente
#### En caso de que se elija dar de alta un nuevo paciente, esta será la pagina a donde se redirigirá. Debe completar el formulario con datos válidos.
![RegistroPaciente](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/55ac4e87-8e2f-410e-b506-0efbbdbdad35)


### Login
#### Una vez que el usuario se encuentre registrado y haya verificado su email podrá ingresar al sistema mediante la pantalla de login.
![Login](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/2c5f5ac8-66e1-47eb-aef9-18f5a7f7a69d)


### Home
#### Esta pantalla es el menú principal del sistema.
![Home](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/f94fa39a-a763-467b-a629-2342b3209d12)

### Solicitar Turno
#### En esta sección se podrá solicitar un turno. Primero se debe elegir el especialista:
![SolicitarTurnoEsp](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/88b240e6-8578-48df-8826-abfbc2749b86)
#### Una vez que se seleccione el especialista deseado, se despleglará las opciones de especialidades, es decir, las especialidades que atiende el especialista seleccionado:
![SolicitarTurnoEspecialidad](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/8fe3c6b8-5b1c-45f1-a59e-d37b93a4d4bd)
#### Cuando ya se haya seleccionado especialista y especialidad deseada se desplegará una opciones de turnos. Cada opcion con un dia y un horario distinto.
![SolicitarTurnoDiaHorario](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/43df8a38-1225-492b-8602-202ea4d8ef75)
#### Cuando ya se seleccione el turno deseado, en la parte inferior de la página se mostrará un breve texto indicando las opciones seleccionadas


### Mis Turnos
#### En esta pantalla el usuario podrá ver todos los turnos solicitados, y los estados de los mismos. Podrá cancelar el turno si lo desea.
![MisTurnosPaciente](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/b6459476-6e32-4bdb-b0cb-80328de800e9)

### Mi Perfil
#### En esta pantalla se podrá ver en una pequeña seccion los datos personales del usuario loggeado con su imagen de perfil
![MiPerfilPaciente1](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/f4de44fe-9b2c-46a2-907b-c0bed455f900)
#### Más abajo en la misma pantalla se podrá ver la historia clinica del paciente y luego se dará la opcion de seleccionar un especialista por el que fue atendido el paciente y se descargarán los turnos que tenga o haya tenido con el especialista seleccionado. La informacion de descargara en formato .txt 
![image](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/4d410851-c588-41ec-b7fa-8a61297f5132)
![MiPerfilEspecialista](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/559e5282-9e91-4464-a769-8528c19f150d)


## Demo con Perfil Especialista

### Registro Especialista
#### En caso de que se elija dar de alta un nuevo especialista, esta será la pagina a donde se redirigirá. Debe completar el formulario con datos válidos.
![RegistroEspecialista](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/15993ef7-5063-4c01-a8c1-4475eb565050)


### Carga de Historias Clinicas
#### En esta pantalla se debera elegir un paciente(solo estaran disponibles aquellos que tengan un turno FINALIZADO con el especialista), al seleccionarlo se podrá acceder al detalle de los turnos finalizados, el diagnostico en cada turno y a las reseñas que dejo el usuario sobre el especialista
![HistoriaClinicaCarga](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/2f4a559b-adc8-4a58-b448-c7469c98fb58)
#### Una vez seleccionado el paciente se podrán cargar los campos de los datos personales(temp, peso, altura, presion) y hasta 3 campos de la atencion medica
![image](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/214f7a98-8e36-4eb0-b89c-3bff84d54b82)

### Mis Turnos
#### El especialista tambien tendra acceso a todos sus turnos, de aqui podra cancelarlos, rechazarlos, aceptarlos y finalizarlos. Contará con un filtro de tabla en base a lo que requiera.
![image](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/2ba9b7ca-20f5-40be-a0cf-a2afc96dffd1)


## Demo como Administrador 

### El administrador contara con una seccion propia donde solo el/ella tedra acceso. 

### Informacion de Usuarios
#### Aqui podra visualizar la informacion de todos los usuarios dados de alta en la web. Primero se veran todos los pacientes, al hacer click sobre uno de ellos se descargara la informacion de cada uno junto con los turnos que haya tomado
![SeccionUsuariosPacientes](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/718c0ac9-7896-4691-8534-348f78796acd)
#### Tambien se veran los especialistas y los Administradores. Por otro lado, con el boton que se ve en el inferior de la pagina, se podra descargar un excell con la informacion de TODOS los usuarios registrados.
![SeccionUsuariosInformacion](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/b1dd46c3-a2b5-4b61-9218-5dc424d5e01b)


### Turnos
#### El administrador tendra acceso a ver todos los turnos tomados
![SeccionUsuariosTurnos](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/b9441de2-fec3-4184-83bc-c6da1825cdc0)


### Historia Clinica
#### El administrador tambien tendra acceso a todas las historias clinicas de los pacientes
![SeccionUsuariosHistClinica](https://github.com/cutiBilotta/clinicaLabo4/assets/86843165/5ef17763-5ef2-49f6-9b33-43fed79174f3)



