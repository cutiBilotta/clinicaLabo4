"use strict";(self.webpackChunkclinica=self.webpackChunkclinica||[]).push([[832],{6832:(L,d,r)=>{r.r(d),r.d(d,{MisTurnosModule:()=>z});var l=r(6814),u=r(1826);class p{constructor(c,i,a,o,n){this.especilistaId=c,this.pacienteId=i,this.calificacion=a,this.comentario=o,this.turnoId=n}toJSON(){return{especilistaId:this.especilistaId,pacienteId:this.pacienteId,calificacion:this.calificacion,comentario:this.comentario,turnoId:this.turnoId}}}var t=r(5879),_=r(6751),m=r(4108);function h(e,c){if(1&e&&(t.TgZ(0,"th",12),t._uU(1),t.qZA()),2&e){const i=c.$implicit;t.xp6(1),t.Oqu(i)}}function f(e,c){if(1&e&&(t.ynx(0),t.TgZ(1,"b"),t._uU(2),t.qZA(),t.BQk()),2&e){const i=t.oxw().$implicit,a=t.oxw().$implicit;t.xp6(2),t.Oqu(a[i])}}function g(e,c){if(1&e&&(t.ynx(0),t._uU(1),t.BQk()),2&e){const i=t.oxw().$implicit,a=t.oxw().$implicit;t.xp6(1),t.hij(" ",a[i]," ")}}function T(e,c){if(1&e){const i=t.EpF();t.TgZ(0,"td",16),t.NdJ("click",function(){t.CHM(i);const o=t.oxw().$implicit,n=t.oxw(2);return t.KtG(n.seleccionarTurno(o))}),t.YNc(1,f,3,1,"ng-container",5),t.YNc(2,g,2,1,"ng-container",5),t.qZA()}if(2&e){const i=c.$implicit;t.xp6(1),t.Q6J("ngIf","estado"==i),t.xp6(1),t.Q6J("ngIf","estado"!==i)}}function x(e,c){if(1&e&&(t.TgZ(0,"tr")(1,"th",14),t._uU(2),t.qZA(),t.YNc(3,T,3,2,"td",15),t.qZA()),2&e){const i=c.index,a=t.oxw(2);t.xp6(2),t.Oqu(i+1),t.xp6(1),t.Q6J("ngForOf",a.turnosKeys)}}function b(e,c){if(1&e&&(t.TgZ(0,"tbody"),t.YNc(1,x,4,2,"tr",13),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngForOf",i.tablaFiltrada)}}function C(e,c){if(1&e){const i=t.EpF();t.TgZ(0,"button",24),t.NdJ("click",function(){t.CHM(i),t.oxw();const o=t.MAs(6),n=t.oxw();return t.KtG(n.cancelarTurno(o.value))}),t._uU(1,"Cancelar"),t.qZA()}}function v(e,c){if(1&e&&(t.TgZ(0,"div",17)(1,"div",18)(2,"div",19)(3,"span",20),t._uU(4,"Rese\xf1a "),t.qZA()(),t._UZ(5,"input",21,22),t.qZA(),t.YNc(7,C,2,0,"button",23),t.qZA()),2&e){const i=t.oxw();t.xp6(7),t.Q6J("ngIf","solicitado"==i.turnoSeleccionado.estado)}}function Z(e,c){if(1&e){const i=t.EpF();t.TgZ(0,"button",24),t.NdJ("click",function(){t.CHM(i),t.oxw();const o=t.MAs(6),n=t.oxw();return t.KtG(n.cancelarTurno(o.value))}),t._uU(1,"Cancelar"),t.qZA()}}function A(e,c){if(1&e){const i=t.EpF();t.TgZ(0,"button",24),t.NdJ("click",function(){t.CHM(i),t.oxw();const o=t.MAs(6),n=t.oxw();return t.KtG(n.rechazarTurno(o.value))}),t._uU(1,"Rechazar"),t.qZA()}}function M(e,c){if(1&e){const i=t.EpF();t.TgZ(0,"button",24),t.NdJ("click",function(){t.CHM(i),t.oxw();const o=t.MAs(6),n=t.MAs(12),s=t.oxw();return t.KtG(s.finalizarTurno(o.value,n.value))}),t._uU(1,"Finalizar"),t.qZA()}}function y(e,c){if(1&e){const i=t.EpF();t.TgZ(0,"button",24),t.NdJ("click",function(){t.CHM(i);const o=t.oxw(2);return t.KtG(o.aceptarTurno())}),t._uU(1,"Aceptar"),t.qZA()}}function k(e,c){if(1&e&&(t.TgZ(0,"p",28)(1,"b"),t._uU(2),t.qZA()()),2&e){const i=t.oxw(2);t.xp6(2),t.Oqu(i.mensajeError)}}function w(e,c){if(1&e&&(t.TgZ(0,"div")(1,"div",18)(2,"div",19)(3,"span",20),t._uU(4,"Rese\xf1a "),t.qZA()(),t._UZ(5,"input",21,22),t.qZA(),t.TgZ(7,"div",18)(8,"div",19)(9,"span",25),t._uU(10,"Diagn\xf3stico "),t.qZA()(),t._UZ(11,"input",21,26),t.qZA(),t.YNc(13,Z,2,0,"button",23),t.YNc(14,A,2,0,"button",23),t.YNc(15,M,2,0,"button",23),t.YNc(16,y,2,0,"button",23),t.YNc(17,k,3,1,"p",27),t.qZA()),2&e){const i=t.oxw();t.xp6(13),t.Q6J("ngIf","solicitado"==i.turnoSeleccionado.estado.toLowerCase()),t.xp6(1),t.Q6J("ngIf","solicitado"==i.turnoSeleccionado.estado.toLowerCase()),t.xp6(1),t.Q6J("ngIf","aceptado"==i.turnoSeleccionado.estado.toLowerCase()),t.xp6(1),t.Q6J("ngIf","solicitado"==i.turnoSeleccionado.estado.toLowerCase()),t.xp6(1),t.Q6J("ngIf",""!=i.mensajeError)}}function I(e,c){if(1&e){const i=t.EpF();t.TgZ(0,"div",29)(1,"div",18)(2,"div",19)(3,"span",20),t._uU(4,"Rese\xf1a "),t.qZA()(),t._UZ(5,"input",21,22),t.qZA(),t.TgZ(7,"p")(8,"b"),t._uU(9,"Califica la atenci\xf3n del especialista:"),t.qZA()(),t.TgZ(10,"div",30)(11,"img",31),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.seleccionarPuntuacion(1))}),t.qZA(),t.TgZ(12,"img",31),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.seleccionarPuntuacion(2))}),t.qZA(),t.TgZ(13,"img",31),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.seleccionarPuntuacion(3))}),t.qZA(),t.TgZ(14,"img",31),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.seleccionarPuntuacion(4))}),t.qZA(),t.TgZ(15,"img",31),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.seleccionarPuntuacion(5))}),t.qZA()(),t.TgZ(16,"div",17)(17,"button",32),t.NdJ("click",function(){t.CHM(i);const o=t.MAs(6),n=t.oxw();return t.KtG(n.aceptar(o.value))}),t._uU(18,"Aceptar"),t.qZA()(),t._UZ(19,"br")(20,"br"),t.qZA()}if(2&e){const i=t.oxw();t.xp6(11),t.Q6J("src",i.puntuacion>=1?"assets/img/full-star.png":"assets/img/empty-star.png",t.LSH),t.xp6(1),t.Q6J("src",i.puntuacion>=2?"assets/img/full-star.png":"assets/img/empty-star.png",t.LSH),t.xp6(1),t.Q6J("src",i.puntuacion>=3?"assets/img/full-star.png":"assets/img/empty-star.png",t.LSH),t.xp6(1),t.Q6J("src",i.puntuacion>=4?"assets/img/full-star.png":"assets/img/empty-star.png",t.LSH),t.xp6(1),t.Q6J("src",i.puntuacion>=5?"assets/img/full-star.png":"assets/img/empty-star.png",t.LSH)}}function F(e,c){1&e&&t._UZ(0,"div")}function S(e,c){if(1&e&&(t.TgZ(0,"div")(1,"p"),t._uU(2),t.TgZ(3,"b",28),t._uU(4),t.qZA()()()),2&e){const i=c.$implicit;t.xp6(2),t.lnq("",i.dia," ",i.horario," - ",i.especialidad," - Comentario: "),t.xp6(2),t.Oqu(i.resenia)}}function J(e,c){if(1&e&&(t.TgZ(0,"div"),t._UZ(1,"hr"),t.TgZ(2,"h4",33),t._uU(3,"Turnos Cancelados: "),t.qZA(),t.YNc(4,S,5,4,"div",13),t.qZA()),2&e){const i=t.oxw();t.xp6(4),t.Q6J("ngForOf",i.resenias)}}function N(e,c){if(1&e){const i=t.EpF();t.ynx(0),t.TgZ(1,"input",37),t.NdJ("change",function(){const n=t.CHM(i).$implicit,s=t.oxw(3);return t.KtG(s.filtrarTablaEspecialidad(n))}),t.qZA(),t._uU(2),t._UZ(3,"br"),t.BQk()}if(2&e){const i=c.$implicit;t.xp6(1),t.Q6J("value",i),t.xp6(1),t.hij(" ",i,"")}}function q(e,c){if(1&e&&(t.ynx(0),t.YNc(1,N,4,2,"ng-container",13),t.BQk()),2&e){const i=c.$implicit;t.xp6(1),t.Q6J("ngForOf",i.especialidades)}}function E(e,c){if(1&e&&(t.TgZ(0,"div",34)(1,"h5",35),t._uU(2,"Filtrar por Especialidad"),t.qZA(),t.TgZ(3,"div",36),t.YNc(4,q,2,1,"ng-container",13),t.qZA()()),2&e){const i=t.oxw();t.xp6(4),t.Q6J("ngForOf",i.especialidades)}}function U(e,c){if(1&e){const i=t.EpF();t.ynx(0),t.TgZ(1,"input",40),t.NdJ("change",function(){const n=t.CHM(i).$implicit,s=t.oxw(2);return t.KtG(s.filtrarTablaEspecialista(n.id))}),t.qZA(),t._uU(2),t._UZ(3,"br"),t.BQk()}if(2&e){const i=c.$implicit;t.xp6(1),t.Q6J("value",i.id),t.xp6(1),t.AsE(" ",i.nombre," ",i.apellido,"")}}function Q(e,c){if(1&e&&(t.TgZ(0,"div",34)(1,"h5",38),t._uU(2,"Filtrar por Especialista"),t.qZA(),t.TgZ(3,"div",39),t.YNc(4,U,4,3,"ng-container",13),t.qZA()()),2&e){const i=t.oxw();t.xp6(4),t.Q6J("ngForOf",i.especialistas)}}function P(e,c){if(1&e){const i=t.EpF();t.ynx(0),t.TgZ(1,"input",43),t.NdJ("change",function(){const n=t.CHM(i).$implicit,s=t.oxw(2);return t.KtG(s.filtrarTablaPacientes(n.id))}),t.qZA(),t._uU(2),t._UZ(3,"br"),t.BQk()}if(2&e){const i=c.$implicit;t.xp6(1),t.Q6J("value",i),t.xp6(1),t.AsE(" ",i.nombre," ",i.apellido,"")}}function Y(e,c){if(1&e&&(t.TgZ(0,"div",34)(1,"h5",41),t._uU(2,"Pacientes"),t.qZA(),t.TgZ(3,"div",42),t.YNc(4,P,4,3,"ng-container",13),t.qZA()()),2&e){const i=t.oxw();t.xp6(4),t.Q6J("ngForOf",i.pacientes)}}const B=[{path:"",component:(()=>{class e{constructor(i,a){this.database=i,this.afauth=a,this.turnos=[],this.usuarios=[],this.especialistas=[],this.esPaciente=!1,this.pacientes=[],this.turnosKeys=[],this.tablaFiltrada=[],this.mensajeError="",this.especialidades=[],this.resenias=[],this.mostrarDivEspecialista=!1,this.mostrarDivResenia=!1,this.mostrarDivDiagnostico=!1,this.mostrarEncuesta=!1,this.mostrarCalificacion=!1,this.puntuacion=0,this.mostrarBtnCancelar=!1,this.especialidadSeleccionada="",this.especialistaSeleccionado=""}ngOnInit(){this.afauth.getAuthState().subscribe(i=>{if(i){const a=i.email?.toString();console.log(a),this.database.obtenerTodos("usuarios").subscribe(o=>{this.usuarios=o.map(n=>{let s=n.payload.doc.data();return s.id=n.payload.doc.id,s}),this.especialistas=this.usuarios.filter(n=>"Especialista"==n.perfil),this.pacientes=this.usuarios.filter(n=>"Paciente"==n.perfil),this.usuarioActualBd=this.usuarios.find(n=>n.email==a),this.usuarioActualId=this.usuarioActualBd.id,console.log(this.usuarioActualId),this.esPaciente=!!this.usuarioActualBd&&"paciente"==this.usuarioActualBd.perfil.toLowerCase(),console.log("Es Paciente : "+this.esPaciente),console.log(this.usuarios),console.log(this.pacientes)})}this.database.obtenerTodos("especialidades").subscribe(a=>{this.especialidades=a.map(o=>{let n=o.payload.doc.data();return n.id=o.payload.doc.id,n}),console.log(this.especialidades)}),this.database.obtenerTodos("turnos").subscribe(a=>{this.turnos=a.map(o=>{let n=o.payload.doc.data();return n.id=o.payload.doc.id,n}),this.resenias=[],this.turnos.forEach(o=>{this.turnosKeys=Object.keys(o),(this.esPaciente&&o.pacienteId==this.usuarioActualId&&o.hasOwnProperty("rese\xf1aCancelacion")||!this.esPaciente&&o.especialistaId==this.usuarioActualId&&o.hasOwnProperty("rese\xf1aCancelacion"))&&this.resenias.push({id:o.id,resenia:o.rese\u00f1aCancelacion,dia:o.dia,horario:o.horario,especialidad:o.especialidad})}),this.filtrarTurnos(),console.log(this.resenias)})})}seleccionarPuntuacion(i){this.puntuacion=i,console.log("Puntuaci\xf3n seleccionada:",this.puntuacion)}filtrarTurnos(){this.esPaciente?(console.log(this.usuarioActualId),this.tablaFiltrada=this.turnos.filter(i=>i.pacienteId==this.usuarioActualId)):this.tablaFiltrada=this.turnos.filter(i=>i.especialistaId==this.usuarioActualId)}filtrarTablaPacientes(i){const a=document.getElementsByName("especialistaRadio"),o=document.getElementsByName("especialidadRadio");for(let s=0;s<a.length;s++)a[s].checked=!1;for(let s=0;s<o.length;s++)o[s].checked=!1;const n=i;console.log(n),this.tablaFiltrada=this.turnos.filter(this.esPaciente?s=>s.pacienteId==n:s=>s.pacienteId==n&&s.especialistaId==this.usuarioActualId)}filtrarTablaEspecialidad(i){const a=document.getElementsByName("especialistaRadio"),o=document.getElementsByName("pacientesRadio");for(let s=0;s<a.length;s++)a[s].checked=!1;for(let s=0;s<o.length;s++)o[s].checked=!1;const n=i;console.log(n),this.tablaFiltrada=this.turnos.filter(this.esPaciente?s=>s.especialidad==n&&s.pacienteId==this.usuarioActualId:s=>s.especialidad==n&&s.especialistaId==this.usuarioActualId)}filtrarTablaEspecialista(i){const a=document.getElementsByName("especialidadRadio"),o=document.getElementsByName("pacientesRadio");for(let s=0;s<o.length;s++)o[s].checked=!1;for(let s=0;s<a.length;s++)a[s].checked=!1;const n=i;console.log(n),this.tablaFiltrada=this.turnos.filter(this.esPaciente?s=>s.especialistaId==n&&s.pacienteId==this.usuarioActualId:s=>s.especialistaId==n)}seleccionarTurno(i){this.turnoSeleccionado=i,console.log(i.estado),!this.esPaciente&&"aceptado"==this.turnoSeleccionado.estado.toLowerCase()||!this.esPaciente&&"solicitado"==this.turnoSeleccionado.estado.toLowerCase()?(this.mostrarDivEspecialista=!0,console.log("ACAAAAAAAA")):!this.esPaciente&&"aceptado"!=this.turnoSeleccionado.estado.toLowerCase()&&!this.esPaciente&&"solicitado"!=this.turnoSeleccionado.estado.toLowerCase()||"cancelado"==this.turnoSeleccionado.estado.toLowerCase()?(this.mostrarDivEspecialista=!1,this.mostrarCalificacion=!1):this.esPaciente&&"finalizado"==i.estado.toLowerCase()||this.esPaciente&&"finalizado"==i.estado.toLowerCase()&&i.hasOwnProperty("rese\xf1aFinalizacion")?this.mostrarCalificacion=!0:this.esPaciente&&"finalizado"!=i.estado.toLowerCase()&&(this.mostrarCalificacion=!1)}aceptar(i){if(""!==i.trim()&&"finalizado"==this.turnoSeleccionado.estado.toLowerCase()){console.log("aqui");let o=new p(this.turnoSeleccionado.especialistaId,this.usuarioActualId,this.puntuacion.toString(),i,this.turnoSeleccionado.id).toJSON();console.log(o),this.database.crear("calificaciones",o),this.mostrarCalificacion=!1}else this.mensajeError="El campo de rese\xf1a y diagnostico no puede estar vac\xedo"}cancelarTurno(i){""!==i.trim()&&"solicitado"==this.turnoSeleccionado.estado.toLowerCase()?(this.turnoSeleccionado.estado="Cancelado",this.turnoSeleccionado.rese\u00f1aCancelacion=i,this.database.actualizar("turnos",this.turnoSeleccionado,this.turnoSeleccionado.id)):this.mensajeError="El campo de rese\xf1a por cancelaci\xf3n no puede estar vac\xedo"}aceptarTurno(){"solicitado"==this.turnoSeleccionado.estado.toLowerCase()&&(this.turnoSeleccionado.estado="Aceptado",this.database.actualizar("turnos",this.turnoSeleccionado,this.turnoSeleccionado.id))}rechazarTurno(i){""!==i.trim()?(this.turnoSeleccionado.estado="Rechazado",this.turnoSeleccionado.rese\u00f1aCancelacion=i,this.database.actualizar("turnos",this.turnoSeleccionado,this.turnoSeleccionado.id)):this.mensajeError="El campo de rese\xf1a por cancelaci\xf3n no puede estar vac\xedo"}finalizarTurno(i,a){this.mostrarDivDiagnostico=!0,""!==i.trim()&&""!==a.trim()&&"aceptado"==this.turnoSeleccionado.estado.toLowerCase()?(this.turnoSeleccionado.estado="Finalizado",this.turnoSeleccionado.rese\u00f1aFinalizacion=i,this.turnoSeleccionado.diagnostico=a,this.database.actualizar("turnos",this.turnoSeleccionado,this.turnoSeleccionado.id)):this.mensajeError="El campo de rese\xf1a y diagnostico no puede estar vac\xedo"}eliminarFiltros(){const i=document.getElementsByName("especialidadRadio"),a=document.getElementsByName("especialistaRadio"),o=document.getElementsByName("pacientesRadio");for(let n=0;n<i.length;n++)i[n].checked=!1;for(let n=0;n<a.length;n++)a[n].checked=!1;for(let n=0;n<o.length;n++)o[n].checked=!1;this.filtrarTurnos()}static#t=this.\u0275fac=function(a){return new(a||e)(t.Y36(_.T),t.Y36(m.e))};static#i=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-mis-turnos"]],decls:30,vars:9,consts:[[1,"container"],[1,"text-center","text-dark"],[1,"table","table-bordered","table-light","table-striped"],["scope","col",2,"background-color","#49708a"],["class","text-center","style","background-color: #49708a;","scope","col",4,"ngFor","ngForOf"],[4,"ngIf"],["style","text-align: center;",4,"ngIf"],["class","card","style","text-align: center; background-color: #88abc2;",4,"ngIf"],[1,"row","justify-content-center"],["class","form-group col-4",4,"ngIf"],[1,"row","justify-content-center","mt-4"],[1,"btn","mx-2",2,"background-color","#caff42","width","200px",3,"click"],["scope","col",1,"text-center",2,"background-color","#49708a"],[4,"ngFor","ngForOf"],["scope","row"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[2,"text-align","center"],[1,"input-group","input-group-sm","mb-3"],[1,"input-group-prepend"],["id","rese\xf1a",1,"input-group-text",2,"background-color","#ddd"],["type","text","aria-label","Small","aria-describedby","inputGroup-sizing-sm",1,"form-control"],["reseniaInput",""],["class","btn mx-2","style","background-color: #caff42;",3,"click",4,"ngIf"],[1,"btn","mx-2",2,"background-color","#caff42",3,"click"],["id","diagnostico",1,"input-group-text",2,"background-color","#ddd"],["diagnosticoInput",""],["class","text-danger",4,"ngIf"],[1,"text-danger"],[1,"card",2,"text-align","center","background-color","#88abc2"],[1,"card-body"],["alt","","width","50",3,"src","click"],[1,"btn","mx-2",2,"background-color","#caff42","width","100px",3,"click"],[1,"text-center"],[1,"form-group","col-4"],["for","especialidad"],["multiple","","id","especialidad",1,"form-control",2,"background-color","#88abc2"],["type","radio","name","especialidadRadio",3,"value","change"],["for","especialista"],[1,"form-control",2,"background-color","#88abc2"],["type","radio","name","especialistaRadio",3,"value","change"],["for","pacientes"],["id","pacientes",1,"form-control",2,"background-color","#88abc2"],["type","radio","name","pacientesRadio",3,"value","change"]],template:function(a,o){1&a&&(t.TgZ(0,"body")(1,"div",0),t._UZ(2,"br")(3,"br"),t.TgZ(4,"h3",1),t._uU(5,"Tus Turnos"),t.qZA(),t._UZ(6,"br"),t.TgZ(7,"table",2)(8,"thead")(9,"tr")(10,"th",3),t._uU(11,"#"),t.qZA(),t.YNc(12,h,2,1,"th",4),t.qZA()(),t.YNc(13,b,2,1,"tbody",5),t.qZA(),t.YNc(14,v,8,1,"div",6),t.YNc(15,w,18,5,"div",5),t.YNc(16,I,21,5,"div",7),t.YNc(17,F,1,0,"div",5),t.YNc(18,J,5,1,"div",5),t._UZ(19,"hr")(20,"br"),t.TgZ(21,"div",8),t.YNc(22,E,5,1,"div",9),t.YNc(23,Q,5,1,"div",9),t.YNc(24,Y,5,1,"div",9),t.TgZ(25,"div",10)(26,"button",11),t.NdJ("click",function(){return o.eliminarFiltros()}),t._uU(27,"Eliminar Filtros"),t.qZA()()(),t._UZ(28,"br")(29,"br"),t.qZA()()),2&a&&(t.xp6(12),t.Q6J("ngForOf",o.turnosKeys),t.xp6(1),t.Q6J("ngIf",null!=o.tablaFiltrada&&o.tablaFiltrada.length>0),t.xp6(1),t.Q6J("ngIf",o.esPaciente&&!o.mostrarCalificacion&&"solicitado"==(null==o.turnoSeleccionado?null:o.turnoSeleccionado.estado)),t.xp6(1),t.Q6J("ngIf",o.mostrarDivEspecialista),t.xp6(1),t.Q6J("ngIf",o.mostrarCalificacion&&o.esPaciente),t.xp6(2),t.Q6J("ngIf",null!=o.resenias&&o.resenias.length>0),t.xp6(4),t.Q6J("ngIf",null!=o.especialidades&&o.especialidades.length>0),t.xp6(1),t.Q6J("ngIf",o.esPaciente&&null!=o.especialistas&&o.especialistas.length>0),t.xp6(1),t.Q6J("ngIf",!o.esPaciente&&null!=o.especialistas&&o.especialistas.length>0))},dependencies:[l.sg,l.O5],styles:["body[_ngcontent-%COMP%]{height:100%;min-height:100vh;width:100vw;background-color:#d0e0eb}"]})}return e})()}];let O=(()=>{class e{static#t=this.\u0275fac=function(a){return new(a||e)};static#i=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[u.Bz.forChild(B),u.Bz]})}return e})(),z=(()=>{class e{static#t=this.\u0275fac=function(a){return new(a||e)};static#i=this.\u0275mod=t.oAB({type:e});static#e=this.\u0275inj=t.cJS({imports:[l.ez,O]})}return e})()}}]);