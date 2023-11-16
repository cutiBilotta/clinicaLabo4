"use strict";(self.webpackChunkclinica=self.webpackChunkclinica||[]).push([[94],{94:(w,_,l)=>{l.r(_),l.d(_,{SolicitarTurnoModule:()=>q});var f=l(6814),g=l(1826);class S{constructor(n,a,i,t,o){this.pacienteId=n,this.especialistaId=a,this.especialidad=i,this.dia=t,this.horario=o}toJSON(){return{pacienteId:this.pacienteId,especialistaId:this.especialistaId,especialidad:this.especialidad,dia:this.dia,horario:this.horario,estado:"solicitado"}}}var e=l(5879),b=l(6751),T=l(4108),d=l(95),Z=l(3519),m=l.n(Z);let C=(()=>{class s{constructor(a){this.router=a,this.captchaStatusChange=new e.vpe,this.captcha="",this.captchaIngresado=""}ngOnInit(){this.mostrarSweetAlert()}generarCaptcha(){let i="";for(let t=0;t<6;t++)i+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62*Math.random()));return i}mostrarSweetAlert(){this.captcha=this.generarCaptcha();const a=document.createElement("div");a.innerHTML=`\n      <p style="text-decoration: line-through; color:#84b705; font-size: 30px">${this.captcha}</p>\n      <input class="form-control" id="captchaInput" placeholder="Ingrese el captcha">`,m().fire({title:"Verifique Captcha",html:a,confirmButtonText:"Verificar",confirmButtonColor:"#caff42",preConfirm:()=>this.verificarCaptcha()}).then(i=>{i.isConfirmed&&(m().fire({title:"Turno otorgado exitosamente",confirmButtonText:"Entendido",confirmButtonColor:"#caff42"}),this.router.navigateByUrl("/home"))})}verificarCaptcha(){return document.getElementById("captchaInput").value==this.captcha?(this.captchaStatusChange.emit("valido"),!0):(m().showValidationMessage("Captcha inv\xe1lido"),this.captchaStatusChange.emit("invalido"),!1)}static#e=this.\u0275fac=function(i){return new(i||s)(e.Y36(g.F0))};static#a=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-captcha"]],outputs:{captchaStatusChange:"captchaStatusChange"},decls:0,vars:0,template:function(i,t){}})}return s})();function v(s,n){if(1&s&&(e.ynx(0),e.TgZ(1,"option",22),e._uU(2),e.qZA(),e.BQk()),2&s){const a=n.$implicit,i=n.index;e.xp6(1),e.Q6J("value",i),e.xp6(1),e.Oqu(a)}}function A(s,n){if(1&s){const a=e.EpF();e.TgZ(0,"select",21),e.NdJ("change",function(t){e.CHM(a);const o=e.oxw();return e.KtG(o.seleccionarEspecialidad(t))}),e.TgZ(1,"option",14),e._uU(2,"Selecciona una especialidad"),e.qZA(),e.YNc(3,v,3,2,"ng-container",15),e.qZA()}if(2&s){const a=e.oxw();e.xp6(3),e.Q6J("ngForOf",a.especialidades[0].especialidades)}}function I(s,n){if(1&s&&(e.ynx(0),e.TgZ(1,"option",22),e._uU(2),e.qZA(),e.BQk()),2&s){const a=n.$implicit;e.xp6(1),e.s9C("value",a.id),e.xp6(1),e.AsE("",a.nombre," ",a.apellido,"")}}function x(s,n){if(1&s){const a=e.EpF();e.TgZ(0,"select",23),e.NdJ("change",function(t){e.CHM(a);const o=e.oxw();return e.KtG(o.seleccionarEspecialista(t))}),e.TgZ(1,"option",24),e._uU(2,"Selecciona un Especialista"),e.qZA(),e.YNc(3,I,3,3,"ng-container",15),e.qZA()}if(2&s){const a=e.oxw();e.xp6(3),e.Q6J("ngForOf",a.especialistasFiltrados)}}function F(s,n){if(1&s&&(e.ynx(0),e.TgZ(1,"option",22),e._uU(2),e.qZA(),e.BQk()),2&s){const a=n.$implicit;e.xp6(1),e.Q6J("value",a.dia+"/"+a.mes),e.xp6(1),e.AsE("",a.dia,"/",a.mes,"")}}function E(s,n){if(1&s&&(e.ynx(0),e.TgZ(1,"option",22),e._uU(2),e.qZA(),e.BQk()),2&s){const a=n.$implicit;e.xp6(1),e.Q6J("value",a),e.xp6(1),e.Oqu(a)}}function U(s,n){if(1&s&&(e.ynx(0),e.TgZ(1,"option",22),e._uU(2),e.qZA(),e.BQk()),2&s){const a=n.$implicit;e.xp6(1),e.Q6J("value",a.id),e.xp6(1),e.lnq("",a.nombre," ",a.apellido," - ",a.dni,"")}}function y(s,n){if(1&s){const a=e.EpF();e.TgZ(0,"div"),e._UZ(1,"br")(2,"hr")(3,"br"),e.TgZ(4,"label",25)(5,"b"),e._uU(6,"Paciente"),e.qZA()(),e._UZ(7,"br")(8,"br"),e.TgZ(9,"select",26),e.NdJ("change",function(t){e.CHM(a);const o=e.oxw();return e.KtG(o.seleccionarPaciente(t))}),e.TgZ(10,"option",14),e._uU(11,"Selecciona un Paciente"),e.qZA(),e.YNc(12,U,3,4,"ng-container",15),e.qZA()()}if(2&s){const a=e.oxw();e.xp6(12),e.Q6J("ngForOf",a.listadoPacientes)}}function J(s,n){if(1&s){const a=e.EpF();e.TgZ(0,"div")(1,"app-captcha",27),e.NdJ("captchaStatusChange",function(t){e.CHM(a);const o=e.oxw();return e.KtG(o.onCaptchaStatusChange(t))}),e.qZA()()}}const N=[{path:"",component:(()=>{class s{constructor(a,i){this.database=a,this.afauth=i,this.captchaStatus="",this.usuarios=[],this.especialistas=[],this.especialidades=[],this.especialistasFiltrados=[],this.fechasGeneradas=[],this.horariosGenerados=[],this.turnos=[],this.fechaSeleccionada=new Date,this.esAdmin=!1,this.listadoPacientes=[],this.mostrarCaptcha=!1}ngOnInit(){this.afauth.getAuthState().subscribe(a=>{if(a){this.usuarioActualId=a.uid.toString();const i=a.email?.toString();console.log(i),this.database.obtenerTodos("usuarios").subscribe(t=>{this.usuarios=t.map(c=>{let r=c.payload.doc.data();return r.id=c.payload.doc.id,r});const o=this.usuarios.find(c=>c.email==i);this.usuarioActualId=o.id,console.log(this.usuarioActualId),this.especialistas=this.usuarios.filter(c=>"Especialista"==c.perfil&&c.disponibilidad),o?(this.esAdmin="Administrador"==o.perfil||"administrador"==o.perfil,console.log("Es administrador: "+this.esAdmin),this.esAdmin?this.listadoPacientes=this.usuarios.filter(c=>"paciente"===c.perfil.toLowerCase()):console.log("No es admin")):console.log("Usuario no encontrado en la base de datos."),console.log(this.usuarios),console.log(this.listadoPacientes)})}}),this.database.obtenerTodos("turnos").subscribe(a=>{this.turnos=a.map(i=>{let t=i.payload.doc.data();return t.id=i.payload.doc.id,t}),this.database.obtenerTodos("especialidades").subscribe(i=>{this.especialidades=i.map(t=>{let o=t.payload.doc.data();return o.id=t.payload.doc.id,o})}),console.log(this.turnos)})}seleccionarEspecialidad(a){const i=a.target.value;""!==i&&(this.especialidadSeleccionada=this.especialidades[0].especialidades[i],console.log("Especialidad seleccionada:",this.especialidadSeleccionada));const t=document.getElementById("especialistasFiltrados");t&&(t.value=""),this.obtenerEspecialidad()}obtenerEspecialidad(){this.especialistasFiltrados=[],this.especialistas.forEach(a=>{a.especialidad.includes(this.especialidadSeleccionada)&&a.disponibilidad.find(t=>t.especialidad===this.especialidadSeleccionada)&&this.especialistasFiltrados.push(a)}),console.log("Especialistas filtrados:",this.especialistasFiltrados)}calcularFechas(a){if(this.fechasGeneradas=[],!a)return[];const i=Object.keys(a);console.log(i);const t=new Date;for(let o=0;o<15;o++){const c=new Date(t);c.setDate(c.getDate()+o);const r=c.getDay();if(i.includes(this.obtenerNombreDia(r))){const h=c.getDate(),u=c.getMonth()+1;this.fechasGeneradas.push({dia:h,mes:u})}}return console.log(this.fechasGeneradas),this.fechasGeneradas}obtenerNombreDia(a){return["Domingo","Lunes","Martes","Mi\xe9rcoles","Jueves","Viernes","S\xe1bado"][a]}seleccionarEspecialista(a){this.especialistaId=a.target.value,console.log(this.especialistaId),this.especialistaId&&(this.especialistaSeleccionado=this.especialistasFiltrados.find(i=>i.id==this.especialistaId)),this.obtenerEspecialista()}obtenerEspecialista(){this.especialistaSeleccionado&&(this.disponibilidadEspecialidad=this.especialistaSeleccionado.disponibilidad.find(a=>a.especialidad==this.especialidadSeleccionada),this.disponibilidadEspecialidad&&(console.log("Horarios de la especialidad:",this.disponibilidadEspecialidad.horarios),this.calcularFechas(this.disponibilidadEspecialidad.horarios)))}seleccionarFecha(a){this.horariosGenerados=[];const i=a.target.value.split("/"),t=parseInt(i[0],10),o=parseInt(i[1],10),c=(new Date).getFullYear();this.fechaSeleccionada=new Date(c,o-1,t),this.fechaSeleccionada&&console.log(this.fechaSeleccionada.toLocaleDateString("en-GB")),this.calcularHorariosDisponibles(this.disponibilidadEspecialidad.horarios)}seleccionarHorario(a){this.horarioSeleccionado=a.target.value,this.horarioSeleccionado&&console.log(this.horarioSeleccionado)}calcularHorariosDisponibles(a){if(this.horariosGenerados=[],!a||!this.fechaSeleccionada)return[];const i=this.fechaSeleccionada.getDay(),t=this.obtenerNombreDia(i);if(console.log(i),console.log(t),a[t]&&a[t].inicio&&a[t].egreso){const c=a[t].egreso;for(let r=a[t].inicio;r<c;r++)for(let h=0;h<60;h+=30){const u=`${r.toString().padStart(2,"0")}:${h.toString().padStart(2,"0")}`;this.turnos.find(p=>p.especialistaId==this.especialistaSeleccionado.id&&p.dia==this.fechaSeleccionada.toLocaleDateString("en-GB")&&p.horario==u&&("solicitado"==p.estado.toLowerCase()||"aceptado"==p.estado.toLowerCase()))||this.horariosGenerados.push(u)}}return this.horariosGenerados}seleccionarPaciente(a){this.usuarioSeleccionadoId=a.target.value}onCaptchaStatusChange(a){if(this.captchaStatus=a,console.log(this.captchaStatus),this.mostrarCaptcha=!0,"valido"==this.captchaStatus){if(this.usuarioActualId&&!this.esAdmin){let t=new S(this.usuarioActualId,this.especialistaId,this.especialidadSeleccionada,this.fechaSeleccionada.toLocaleDateString("en-GB"),this.horarioSeleccionado).toJSON();this.database.crear("turnos",t)}else if(this.esAdmin&&null!=this.usuarioSeleccionadoId){let t=new S(this.usuarioSeleccionadoId,this.especialistaId,this.especialidadSeleccionada,this.fechaSeleccionada.toLocaleDateString("en-GB"),this.horarioSeleccionado).toJSON();this.database.crear("turnos",t)}}else console.log("captcha invalido")}aceptar(){this.mostrarCaptcha=!0,console.log("mostrarCaptcha:",this.mostrarCaptcha)}static#e=this.\u0275fac=function(i){return new(i||s)(e.Y36(b.T),e.Y36(T.e))};static#a=this.\u0275cmp=e.Xpm({type:s,selectors:[["app-solicitar-turno"]],inputs:{captchaStatus:"captchaStatus"},decls:70,vars:6,consts:[[1,"container"],[1,"text-center"],[1,"card","mt-5"],[1,"card-header","text-center",2,"background-color","#88abc2"],[1,"card-body",2,"background-color","#d0e0eb"],["turnoForm","ngForm"],[1,"row"],[1,"col"],[1,"col-6"],["for","especialidad"],["class","form-select","name","especialidad","id","especialidad",3,"change",4,"ngIf"],["class","form-select","name","especialistasFiltrados","id","especialistasFiltrados",3,"change",4,"ngIf"],["for","fechaElegida"],["name","fechaElegida","id","fechaElegida",1,"form-select",3,"change"],["value",""],[4,"ngFor","ngForOf"],["for","horaElegida"],["name","horaElegida","id","horaElegida",1,"form-select",3,"change"],[4,"ngIf"],[2,"text-align","center"],[1,"btn","btn-lg",2,"background-color","#caff42",3,"click"],["name","especialidad","id","especialidad",1,"form-select",3,"change"],[3,"value"],["name","especialistasFiltrados","id","especialistasFiltrados",1,"form-select",3,"change"],["value","","selected",""],["for","paciente"],["name","paciente","id","paciente",1,"form-select",3,"change"],[3,"captchaStatusChange"]],template:function(i,t){if(1&i){const o=e.EpF();e.TgZ(0,"body")(1,"div",0),e._UZ(2,"br")(3,"br"),e.TgZ(4,"h1",1),e._uU(5,"Solicitar Turnos"),e.qZA(),e.TgZ(6,"div",2)(7,"h5",3),e._uU(8,"Turnos"),e.qZA(),e.TgZ(9,"div",4)(10,"form",null,5)(12,"div",6),e._UZ(13,"div",7),e.TgZ(14,"div",8),e._UZ(15,"br"),e.TgZ(16,"label",9)(17,"b"),e._uU(18,"Especialidad"),e.qZA()(),e._UZ(19,"br")(20,"br"),e.YNc(21,A,4,1,"select",10),e._UZ(22,"br")(23,"hr")(24,"br"),e.TgZ(25,"label",9)(26,"b"),e._uU(27,"Especialistas"),e.qZA()(),e._UZ(28,"br")(29,"br"),e.YNc(30,x,4,1,"select",11),e._UZ(31,"br")(32,"hr")(33,"br"),e.TgZ(34,"label",12)(35,"b"),e._uU(36,"Fecha"),e.qZA()(),e._UZ(37,"br")(38,"br"),e.TgZ(39,"select",13),e.NdJ("change",function(r){return t.seleccionarFecha(r)}),e.TgZ(40,"option",14),e._uU(41,"Selecciona una fecha"),e.qZA(),e.YNc(42,F,3,3,"ng-container",15),e.qZA(),e._UZ(43,"br")(44,"hr")(45,"br"),e.TgZ(46,"label",16)(47,"b"),e._uU(48,"Horario"),e.qZA()(),e._UZ(49,"br")(50,"br"),e.TgZ(51,"select",17),e.NdJ("change",function(r){return t.seleccionarHorario(r)}),e.TgZ(52,"option",14),e._uU(53,"Selecciona un Horario"),e.qZA(),e.YNc(54,E,3,2,"ng-container",15),e.qZA(),e.YNc(55,y,13,1,"div",18),e._UZ(56,"br")(57,"hr")(58,"br"),e.TgZ(59,"div",19)(60,"button",20),e.NdJ("click",function(){e.CHM(o);const r=e.MAs(11);return t.aceptar(),e.KtG(r.resetForm())}),e._uU(61,"Aceptar"),e.qZA()(),e._UZ(62,"br")(63,"br"),e.YNc(64,J,2,0,"div",18),e.qZA(),e._UZ(65,"div",7),e.qZA()()()()(),e._UZ(66,"br")(67,"br")(68,"br")(69,"br"),e.qZA()}2&i&&(e.xp6(21),e.Q6J("ngIf",null!=t.especialidades&&t.especialidades.length>0),e.xp6(9),e.Q6J("ngIf",null!=t.especialistasFiltrados&&t.especialistasFiltrados.length>0),e.xp6(12),e.Q6J("ngForOf",t.fechasGeneradas),e.xp6(12),e.Q6J("ngForOf",t.horariosGenerados),e.xp6(1),e.Q6J("ngIf",t.esAdmin&&null!=t.listadoPacientes&&t.listadoPacientes.length>0),e.xp6(9),e.Q6J("ngIf",t.mostrarCaptcha))},dependencies:[f.sg,f.O5,d._Y,d.YN,d.Kr,d.JL,d.F,C],styles:["body[_ngcontent-%COMP%]{background-color:#ebf7f8;height:100%;width:100%}"]})}return s})()}];let D=(()=>{class s{static#e=this.\u0275fac=function(i){return new(i||s)};static#a=this.\u0275mod=e.oAB({type:s});static#t=this.\u0275inj=e.cJS({imports:[g.Bz.forChild(N),g.Bz]})}return s})(),q=(()=>{class s{static#e=this.\u0275fac=function(i){return new(i||s)};static#a=this.\u0275mod=e.oAB({type:s});static#t=this.\u0275inj=e.cJS({imports:[f.ez,D,d.u5]})}return s})()}}]);