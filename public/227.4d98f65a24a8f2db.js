"use strict";(self.webpackChunkclinica=self.webpackChunkclinica||[]).push([[227],{4227:(I,g,c)=>{c.r(g),c.d(g,{MiPerfilModule:()=>C});var p=c(6814),m=c(1826),i=c(5879),f=c(4108),_=c(6751),h=c(6700),u=c(95);function v(o,r){if(1&o&&i._UZ(0,"img",20),2&o){const e=i.oxw(2);i.Q6J("src",e.imagenUrl,i.LSH)}}function Z(o,r){if(1&o&&(i.TgZ(0,"p",11),i._uU(1),i.qZA()),2&o){const e=i.oxw(2);i.xp6(1),i.Oqu(e.usuarioBD.especialidad)}}function b(o,r){if(1&o&&(i.TgZ(0,"section")(1,"div",3)(2,"h2",4),i._uU(3,"Mi Perfil"),i.qZA(),i._UZ(4,"br")(5,"br"),i.TgZ(6,"div",5)(7,"div",6)(8,"div",7)(9,"div",8),i.YNc(10,v,1,1,"img",9),i.TgZ(11,"h5",10),i._uU(12),i.qZA(),i.TgZ(13,"p",11),i._uU(14),i.qZA(),i.YNc(15,Z,2,1,"p",12),i.qZA()()(),i.TgZ(16,"div",13)(17,"div",7)(18,"div",14)(19,"div",15)(20,"div",16)(21,"p",17),i._uU(22,"Nombre Completo"),i.qZA()(),i.TgZ(23,"div",18)(24,"p",19),i._uU(25),i.qZA()()(),i._UZ(26,"hr"),i.TgZ(27,"div",15)(28,"div",16)(29,"p",17),i._uU(30,"Email"),i.qZA()(),i.TgZ(31,"div",18)(32,"p",19),i._uU(33),i.qZA()()(),i._UZ(34,"hr"),i.TgZ(35,"div",15)(36,"div",16)(37,"p",17),i._uU(38,"Edad"),i.qZA()(),i.TgZ(39,"div",18)(40,"p",19),i._uU(41),i.qZA()()(),i._UZ(42,"hr"),i.TgZ(43,"div",15)(44,"div",16)(45,"p",17),i._uU(46,"Dni"),i.qZA()(),i.TgZ(47,"div",18)(48,"p",19),i._uU(49),i.qZA()()()()(),i._UZ(50,"div",15),i.qZA()()()()),2&o){const e=i.oxw();i.xp6(10),i.Q6J("ngIf",null!=e.imagenUrl),i.xp6(2),i.Oqu(e.usuarioBD.nombre),i.xp6(2),i.Oqu(e.usuarioBD.perfil),i.xp6(1),i.Q6J("ngIf","Especialista"==e.usuarioBD.perfil),i.xp6(10),i.AsE("",e.usuarioBD.nombre," ",e.usuarioBD.apellido,""),i.xp6(8),i.Oqu(e.usuarioBD.email),i.xp6(8),i.Oqu(e.usuarioBD.edad),i.xp6(8),i.Oqu(e.usuarioBD.dni)}}function x(o,r){if(1&o&&(i.TgZ(0,"p",4),i._uU(1),i.qZA()),2&o){const e=i.oxw(2);i.xp6(1),i.hij("Su especialidad: ",e.usuarioBD.especialidad,"")}}function T(o,r){if(1&o&&(i.TgZ(0,"option",33),i._uU(1),i.qZA()),2&o){const e=r.$implicit;i.Q6J("value",e),i.xp6(1),i.Oqu(e)}}function U(o,r){if(1&o&&(i.TgZ(0,"div")(1,"label",42),i._uU(2,"Horario Ingreso \xa0\xa0"),i.qZA(),i._UZ(3,"input",43)(4,"br")(5,"br"),i.TgZ(6,"label",42),i._uU(7,"Horario Egreso \xa0\xa0"),i.qZA(),i._UZ(8,"input",44),i.qZA()),2&o){const e=i.oxw().$implicit;i.xp6(1),i.MGl("for","inputIngreso_",e,""),i.xp6(2),i.MGl("id","inputIngreso_",e,""),i.xp6(3),i.MGl("for","inputEgreso_",e,""),i.xp6(2),i.MGl("id","inputEgreso_",e,"")}}function D(o,r){if(1&o){const e=i.EpF();i.TgZ(0,"div")(1,"div",39)(2,"input",40),i.NdJ("ngModelChange",function(t){const a=i.CHM(e).$implicit,d=i.oxw(3);return i.KtG(d.diasSeleccionados[a]=t)}),i.qZA(),i.TgZ(3,"label",41),i._uU(4,"\xa0\t\xa0"),i.TgZ(5,"b"),i._uU(6),i.qZA()()(),i._UZ(7,"br"),i.YNc(8,U,9,4,"div",1),i._UZ(9,"hr"),i.qZA()}if(2&o){const e=r.$implicit,s=r.index,t=i.oxw(3);i.xp6(2),i.Q6J("value",e)("id","checkDia"+s)("ngModel",t.diasSeleccionados[e]),i.xp6(4),i.Oqu(e),i.xp6(2),i.Q6J("ngIf",t.diasSeleccionados[e])}}function A(o,r){if(1&o){const e=i.EpF();i.TgZ(0,"div",34),i.YNc(1,D,10,5,"div",35),i.TgZ(2,"p",36)(3,"b"),i._uU(4),i.qZA()(),i.TgZ(5,"div",37)(6,"button",38),i.NdJ("click",function(){i.CHM(e);const t=i.oxw(2);return i.KtG(t.definirDisponibilidad())}),i._uU(7,"Aceptar"),i.qZA()()()}if(2&o){const e=i.oxw(2);i.xp6(1),i.Q6J("ngForOf",e.diasHabiles),i.xp6(3),i.Oqu(e.mensajeError)}}function B(o,r){if(1&o){const e=i.EpF();i.TgZ(0,"div",21)(1,"div",22)(2,"div",23)(3,"h5",24),i._uU(4,"Defina su Disponibilidad Horaria"),i.qZA(),i.TgZ(5,"div",25),i._UZ(6,"div",26),i.TgZ(7,"div",27)(8,"div",15)(9,"div"),i.YNc(10,x,2,1,"p",28),i.TgZ(11,"select",29),i.NdJ("change",function(t){i.CHM(e);const n=i.oxw();return i.KtG(n.seleccionarEspecialidad(t))}),i.TgZ(12,"option",30),i._uU(13,"Seleccione una Especialidad - sin disponibilidad definida"),i.qZA(),i.YNc(14,T,2,2,"option",31),i.qZA()()(),i._UZ(15,"hr"),i.YNc(16,A,8,2,"div",32),i.qZA(),i._UZ(17,"div",26),i.qZA(),i._UZ(18,"br")(19,"br"),i.qZA()()()}if(2&o){const e=i.oxw();i.xp6(10),i.Q6J("ngIf",null!=e.usuarioBD),i.xp6(4),i.Q6J("ngForOf",e.especialidadesSelect),i.xp6(2),i.Q6J("ngIf",e.mostrarForm)}}const M=[{path:"",component:(()=>{class o{constructor(e,s,t,n){this.authService=e,this.database=s,this.storageService=t,this.formBuilder=n,this.diasHabiles=["Lunes","Martes","Mi\xe9rcoles","Jueves","Viernes","S\xe1bado"],this.diasSeleccionados={},this.especialidadSeleccionada="",this.mostrarForm=!1,this.mensajeError="",this.usuarios=[]}ngOnInit(){this.authService.getUserLogged().subscribe(e=>{if(e){this.usuarioLoggeado=e;const s=e.email;console.log("Email del usuario loggeado:",s),this.database.obtenerTodos("usuarios").subscribe(t=>{if(this.usuarios=t.map(n=>{let a=n.payload.doc.data();return a.id=n.payload.doc.id,a}),console.log(this.usuarios),this.usuarioBD=this.usuarios.find(n=>n.email==s),this.usuarioBD)if(console.log("Usuario encontrado en el array de usuarios:",this.usuarioBD),"paciente"==this.usuarioBD.perfil.toLowerCase())this.storageService.obtenerImagen(this.usuarioBD.imgPerfil[0]).then(a=>{this.imagenUrl=a,console.log(this.imagenUrl)});else if("administrador"==this.usuarioBD.perfil.toLowerCase())this.storageService.obtenerImagen(this.usuarioBD.imgPerfil).then(a=>{this.imagenUrl=a,console.log(this.imagenUrl)});else if("especialista"==this.usuarioBD.perfil.toLowerCase()&&"especialista"==this.usuarioBD.perfil.toLowerCase()){const n=this.usuarioBD.especialidad,a=this.usuarioBD.disponibilidad.map(l=>l.especialidad),d=n.filter(l=>!a.includes(l));this.especialidadesSelect=d.length>0?d:[]}})}})}seleccionarEspecialidad(e){this.especialidadSeleccionada=e.target.value,this.mostrarForm=!0}definirDisponibilidad(){let e=!0;const s={especialidad:this.especialidadSeleccionada,horarios:{}};for(const t in this.diasSeleccionados)if(e=!1,this.diasSeleccionados[t]){const n=document.getElementById(`inputIngreso_${t}`),a=document.getElementById(`inputEgreso_${t}`),d=+n.value,l=+a.value;if(console.log(l),console.log(d),""==n.value||""==a.value)return void(this.mensajeError=`Debe ingresar horarios para ${t}`);if(!(d>=8&&d<=19&&l>=8&&l<=19))return void(this.mensajeError="Los horarios ingresados no son v\xe1lidos");s.horarios[t]={inicio:d,egreso:l}}e?this.mensajeError="Debe definir su disponibilidad":(this.usuarioBD.disponibilidad||(this.usuarioBD.disponibilidad=[]),this.usuarioBD.disponibilidad.push(s),this.database.actualizar("usuarios",this.usuarioBD,this.usuarioBD.id),console.log(this.usuarioBD))}static#i=this.\u0275fac=function(s){return new(s||o)(i.Y36(f.e),i.Y36(_.T),i.Y36(h.V),i.Y36(u.qu))};static#e=this.\u0275cmp=i.Xpm({type:o,selectors:[["app-mi-perfil"]],decls:4,vars:2,consts:[[1,"container"],[4,"ngIf"],["class","mt-4",4,"ngIf"],[1,"container","py-5"],[1,"text-center"],[1,"row",2,"background-color","#d0e0eb"],[1,"col-lg-4"],[1,"card","mb-4","mt-4",2,"background-color","#d0e0eb"],[1,"card-body","text-center"],["alt","avatar","class","rounded-circle img-fluid","style","width: 150px;",3,"src",4,"ngIf"],[1,"my-3"],[1,"text-muted","mb-1"],["class","text-muted mb-1",4,"ngIf"],[1,"col-lg-8"],[1,"card-body"],[1,"row"],[1,"col-sm-3"],[1,"mb-0"],[1,"col-sm-9"],[1,"text-muted","mb-0"],["alt","avatar",1,"rounded-circle","img-fluid",2,"width","150px",3,"src"],[1,"mt-4"],[1,"card"],[1,"card-body",2,"background-color","#d0e0eb"],[1,"card-title","text-center"],[1,"input-group","mb-3"],[1,"col"],[1,"col-6"],["class","text-center",4,"ngIf"],["name","especialidad","id","",1,"form-select",3,"change"],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],["class","form-check","style","align-items: center; justify-content: center;",4,"ngIf"],[3,"value"],[1,"form-check",2,"align-items","center","justify-content","center"],[4,"ngFor","ngForOf"],[1,"text-danger"],[2,"text-align","center"],[1,"btn","mt-4","text-center","btn-lg",2,"background-color","#caff42",3,"click"],[1,"d-flex","align-items-center"],["type","checkbox","name","diasSeleccionados",1,"form-check-input",3,"value","id","ngModel","ngModelChange"],["for","'checkDia' + i",1,"form-check-label"],[3,"for"],["type","number","min","8","max","19","width","50",1,"form-control",2,"background-color","#bbc8d0",3,"id"],["type","number","min","8","max","19",1,"form-control",2,"background-color","#bbc8d0",3,"id"]],template:function(s,t){1&s&&(i.TgZ(0,"body")(1,"div",0),i.YNc(2,b,51,9,"section",1),i.YNc(3,B,20,3,"div",2),i.qZA()()),2&s&&(i.xp6(2),i.Q6J("ngIf",null!=t.usuarioBD),i.xp6(1),i.Q6J("ngIf",null!=t.usuarioBD&&"Especialista"==t.usuarioBD.perfil))},dependencies:[p.sg,p.O5,u.YN,u.Kr,u.Wl,u.JJ,u.On],styles:["body[_ngcontent-%COMP%]{height:100%;min-height:100vh;width:100vw;background-color:#49708a}"]})}return o})()}];let q=(()=>{class o{static#i=this.\u0275fac=function(s){return new(s||o)};static#e=this.\u0275mod=i.oAB({type:o});static#o=this.\u0275inj=i.cJS({imports:[m.Bz.forChild(M),m.Bz]})}return o})(),C=(()=>{class o{static#i=this.\u0275fac=function(s){return new(s||o)};static#e=this.\u0275mod=i.oAB({type:o});static#o=this.\u0275inj=i.cJS({providers:[h.V,f.e],imports:[p.ez,q,u.u5]})}return o})()}}]);