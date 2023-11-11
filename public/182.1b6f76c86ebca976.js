"use strict";(self.webpackChunkclinica=self.webpackChunkclinica||[]).push([[182],{3182:(C,p,l)=>{l.r(p),l.d(p,{SolicitarTurnoModule:()=>x});var h=l(6814),g=l(1826);class f{constructor(c,i,a,s,o){this.pacienteId=c,this.especialistaId=i,this.especialidad=a,this.dia=s,this.horario=o}toJSON(){return{pacienteId:this.pacienteId,especialistaId:this.especialistaId,especialidad:this.especialidad,dia:this.dia,horario:this.horario,estado:"solicitado"}}}var e=l(5879),_=l(6751),m=l(4108);function b(t,c){if(1&t&&(e.ynx(0),e.TgZ(1,"option",18),e._uU(2),e.qZA(),e.BQk()),2&t){const i=c.$implicit,a=c.index;e.xp6(1),e.Q6J("value",a),e.xp6(1),e.Oqu(i)}}function S(t,c){if(1&t){const i=e.EpF();e.TgZ(0,"select",17),e.NdJ("change",function(s){e.CHM(i);const o=e.oxw();return e.KtG(o.seleccionarEspecialidad(s))}),e.TgZ(1,"option",11),e._uU(2,"Selecciona una especialidad"),e.qZA(),e.YNc(3,b,3,2,"ng-container",12),e.qZA()}if(2&t){const i=e.oxw();e.xp6(3),e.Q6J("ngForOf",i.especialidades[0].especialidades)}}function T(t,c){if(1&t&&(e.ynx(0),e.TgZ(1,"option",18),e._uU(2),e.qZA(),e.BQk()),2&t){const i=c.$implicit;e.xp6(1),e.s9C("value",i.id),e.xp6(1),e.AsE("",i.nombre," ",i.apellido,"")}}function Z(t,c){if(1&t){const i=e.EpF();e.TgZ(0,"select",19),e.NdJ("change",function(s){e.CHM(i);const o=e.oxw();return e.KtG(o.seleccionarEspecialista(s))}),e.TgZ(1,"option",20),e._uU(2,"Selecciona un Especialista"),e.qZA(),e.YNc(3,T,3,3,"ng-container",12),e.qZA()}if(2&t){const i=e.oxw();e.xp6(3),e.Q6J("ngForOf",i.especialistasFiltrados)}}function A(t,c){if(1&t&&(e.ynx(0),e.TgZ(1,"option",18),e._uU(2),e.qZA(),e.BQk()),2&t){const i=c.$implicit;e.xp6(1),e.Q6J("value",i.dia+"/"+i.mes),e.xp6(1),e.AsE("",i.dia,"/",i.mes,"")}}function U(t,c){if(1&t&&(e.ynx(0),e.TgZ(1,"option",18),e._uU(2),e.qZA(),e.BQk()),2&t){const i=c.$implicit;e.xp6(1),e.Q6J("value",i),e.xp6(1),e.Oqu(i)}}function F(t,c){if(1&t&&(e.ynx(0),e.TgZ(1,"option",18),e._uU(2),e.qZA(),e.BQk()),2&t){const i=c.$implicit;e.xp6(1),e.Q6J("value",i.id),e.xp6(1),e.lnq("",i.nombre," ",i.apellido," - ",i.dni,"")}}function I(t,c){if(1&t){const i=e.EpF();e.TgZ(0,"div"),e._UZ(1,"br")(2,"hr")(3,"br"),e.TgZ(4,"label",21)(5,"b"),e._uU(6,"Paciente"),e.qZA()(),e._UZ(7,"br")(8,"br"),e.TgZ(9,"select",22),e.NdJ("change",function(s){e.CHM(i);const o=e.oxw();return e.KtG(o.seleccionarPaciente(s))}),e.TgZ(10,"option",11),e._uU(11,"Selecciona un Paciente"),e.qZA(),e.YNc(12,F,3,4,"ng-container",12),e.qZA()()}if(2&t){const i=e.oxw();e.xp6(12),e.Q6J("ngForOf",i.listadoPacientes)}}const v=[{path:"",component:(()=>{class t{constructor(i,a){this.database=i,this.afauth=a,this.usuarios=[],this.especialistas=[],this.especialidades=[],this.especialistasFiltrados=[],this.fechasGeneradas=[],this.horariosGenerados=[],this.fechaSeleccionada=new Date,this.esAdmin=!1,this.listadoPacientes=[]}ngOnInit(){this.afauth.getAuthState().subscribe(i=>{if(i){this.usuarioActualId=i.uid.toString();const a=i.email?.toString();console.log(a),this.database.obtenerTodos("usuarios").subscribe(s=>{this.usuarios=s.map(n=>{let r=n.payload.doc.data();return r.id=n.payload.doc.id,r});const o=this.usuarios.find(n=>n.email==a);this.usuarioActualId=o.id,console.log(this.usuarioActualId),this.especialistas=this.usuarios.filter(n=>"Especialista"==n.perfil),o?(this.esAdmin="Administrador"==o.perfil||"administrador"==o.perfil,console.log("Es administrador: "+this.esAdmin),this.esAdmin?this.listadoPacientes=this.usuarios.filter(n=>"paciente"===n.perfil.toLowerCase()):console.log("No es admin")):console.log("Usuario no encontrado en la base de datos."),console.log(this.usuarios),console.log(this.listadoPacientes)})}}),this.database.obtenerTodos("especialidades").subscribe(i=>{this.especialidades=i.map(a=>{let s=a.payload.doc.data();return s.id=a.payload.doc.id,s})})}seleccionarEspecialidad(i){const a=i.target.value;""!==a&&(this.especialidadSeleccionada=this.especialidades[0].especialidades[a],console.log("Especialidad seleccionada:",this.especialidadSeleccionada));const s=document.getElementById("especialistasFiltrados");s&&(s.value=""),this.obtenerEspecialidad()}obtenerEspecialidad(){this.especialistasFiltrados=[],this.especialistas.forEach(i=>{i.especialidad.includes(this.especialidadSeleccionada)&&this.especialistasFiltrados.push(i)}),console.log("Especialistas filtrados:",this.especialistasFiltrados)}calcularFechas(i){if(this.fechasGeneradas=[],!i)return[];const a=Object.keys(i);console.log(a);const s=new Date;for(let o=0;o<15;o++){const n=new Date(s);n.setDate(n.getDate()+o);const r=n.getDay();if(a.includes(this.obtenerNombreDia(r))){const d=n.getDate(),u=n.getMonth()+1;this.fechasGeneradas.push({dia:d,mes:u})}}return console.log(this.fechasGeneradas),this.fechasGeneradas}obtenerNombreDia(i){return["Domingo","Lunes","Martes","Mi\xe9rcoles","Jueves","Viernes","S\xe1bado"][i]}seleccionarEspecialista(i){this.especialistaId=i.target.value,console.log(this.especialistaId),this.especialistaId&&(this.especialistaSeleccionado=this.especialistasFiltrados.find(a=>a.id==this.especialistaId)),this.obtenerEspecialista()}obtenerEspecialista(){this.especialistaSeleccionado&&(this.disponibilidadEspecialidad=this.especialistaSeleccionado.disponibilidad.find(i=>i.especialidad==this.especialidadSeleccionada),this.disponibilidadEspecialidad&&(console.log("Horarios de la especialidad:",this.disponibilidadEspecialidad.horarios),this.calcularFechas(this.disponibilidadEspecialidad.horarios)))}seleccionarFecha(i){this.horariosGenerados=[];const a=i.target.value.split("/"),s=parseInt(a[0],10),o=parseInt(a[1],10),n=(new Date).getFullYear();this.fechaSeleccionada=new Date(n,o-1,s),this.fechaSeleccionada&&console.log(this.fechaSeleccionada.toLocaleDateString("en-US")),this.calcularHorariosDisponibles(this.disponibilidadEspecialidad.horarios)}seleccionarHorario(i){this.horarioSeleccionado=i.target.value,this.horarioSeleccionado&&console.log(this.horarioSeleccionado)}calcularHorariosDisponibles(i){if(this.horariosGenerados=[],!i||!this.fechaSeleccionada)return[];const a=this.fechaSeleccionada.getDay(),s=this.obtenerNombreDia(a);if(i[s]&&i[s].inicio&&i[s].egreso){const n=i[s].egreso;for(let r=i[s].inicio;r<n;r++)for(let d=0;d<60;d+=30){const u=`${r.toString().padStart(2,"0")}:${d.toString().padStart(2,"0")}`;this.horariosGenerados.push(u)}}return console.log(this.horariosGenerados),this.horariosGenerados}seleccionarPaciente(i){this.usuarioSeleccionadoId=i.target.value}aceptar(){if(console.log(this.usuarioActualId),this.usuarioActualId&&!this.esAdmin){let a=new f(this.usuarioActualId,this.especialistaId,this.especialidadSeleccionada,this.fechaSeleccionada.toLocaleDateString("en-US"),this.horarioSeleccionado).toJSON();this.database.crear("turnos",a)}else if(this.esAdmin&&null!=this.usuarioSeleccionadoId){let a=new f(this.usuarioSeleccionadoId,this.especialistaId,this.especialidadSeleccionada,this.fechaSeleccionada.toLocaleDateString("en-US"),this.horarioSeleccionado).toJSON();this.database.crear("turnos",a)}else console.log("ACA")}static#e=this.\u0275fac=function(a){return new(a||t)(e.Y36(_.T),e.Y36(m.e))};static#i=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-solicitar-turno"]],decls:61,vars:5,consts:[[1,"container"],[1,"text-center"],[1,"card","mt-5"],[1,"card-header",2,"background-color","#49708a"],[1,"card-body",2,"background-color","#d0e0eb"],[1,"card-title","text-center"],["for","especialidad"],["name","especialidad","id","especialidad",3,"change",4,"ngIf"],["name","especialistasFiltrados","id","especialistasFiltrados",3,"change",4,"ngIf"],["for","fechaElegida"],["name","fechaElegida","id","fechaElegida",3,"change"],["value",""],[4,"ngFor","ngForOf"],["for","horaElegida"],["name","horaElegida","id","horaElegida",3,"change"],[4,"ngIf"],[1,"btn",2,"background-color","#caff42",3,"click"],["name","especialidad","id","especialidad",3,"change"],[3,"value"],["name","especialistasFiltrados","id","especialistasFiltrados",3,"change"],["value","","selected",""],["for","paciente"],["name","paciente","id","paciente",3,"change"]],template:function(a,s){1&a&&(e.TgZ(0,"body")(1,"div",0),e._UZ(2,"br")(3,"br"),e.TgZ(4,"h1",1),e._uU(5,"Solicitar Turnos"),e.qZA(),e.TgZ(6,"div",2)(7,"h5",3),e._uU(8,"Turnos"),e.qZA(),e.TgZ(9,"div",4)(10,"h5",5),e._uU(11,"Solicitar Turno"),e.qZA(),e.TgZ(12,"label",6)(13,"b"),e._uU(14,"Especialidad"),e.qZA()(),e._UZ(15,"br")(16,"br"),e.YNc(17,S,4,1,"select",7),e._UZ(18,"br")(19,"hr")(20,"br"),e.TgZ(21,"label",6)(22,"b"),e._uU(23,"Especialistas"),e.qZA()(),e._UZ(24,"br")(25,"br"),e.YNc(26,Z,4,1,"select",8),e._UZ(27,"br")(28,"hr")(29,"br"),e.TgZ(30,"label",9)(31,"b"),e._uU(32,"Fecha"),e.qZA()(),e._UZ(33,"br")(34,"br"),e.TgZ(35,"select",10),e.NdJ("change",function(n){return s.seleccionarFecha(n)}),e.TgZ(36,"option",11),e._uU(37,"Selecciona una fecha"),e.qZA(),e.YNc(38,A,3,3,"ng-container",12),e.qZA(),e._UZ(39,"br")(40,"hr")(41,"br"),e.TgZ(42,"label",13)(43,"b"),e._uU(44,"Horario"),e.qZA()(),e._UZ(45,"br")(46,"br"),e.TgZ(47,"select",14),e.NdJ("change",function(n){return s.seleccionarHorario(n)}),e.TgZ(48,"option",11),e._uU(49,"Selecciona un Horario"),e.qZA(),e.YNc(50,U,3,2,"ng-container",12),e.qZA(),e.YNc(51,I,13,1,"div",15),e._UZ(52,"br")(53,"hr")(54,"br"),e.TgZ(55,"button",16),e.NdJ("click",function(){return s.aceptar()}),e._uU(56,"Aceptar"),e.qZA()()()(),e._UZ(57,"br")(58,"br")(59,"br")(60,"br"),e.qZA()),2&a&&(e.xp6(17),e.Q6J("ngIf",null!=s.especialidades&&s.especialidades.length>0),e.xp6(9),e.Q6J("ngIf",null!=s.especialistasFiltrados&&s.especialistasFiltrados.length>0),e.xp6(12),e.Q6J("ngForOf",s.fechasGeneradas),e.xp6(12),e.Q6J("ngForOf",s.horariosGenerados),e.xp6(1),e.Q6J("ngIf",s.esAdmin&&null!=s.listadoPacientes&&s.listadoPacientes.length>0))},dependencies:[h.sg,h.O5],styles:["body[_ngcontent-%COMP%]{background-color:#88abc2;height:100%;width:100%}"]})}return t})()}];let E=(()=>{class t{static#e=this.\u0275fac=function(a){return new(a||t)};static#i=this.\u0275mod=e.oAB({type:t});static#a=this.\u0275inj=e.cJS({imports:[g.Bz.forChild(v),g.Bz]})}return t})(),x=(()=>{class t{static#e=this.\u0275fac=function(a){return new(a||t)};static#i=this.\u0275mod=e.oAB({type:t});static#a=this.\u0275inj=e.cJS({imports:[h.ez,E]})}return t})()}}]);