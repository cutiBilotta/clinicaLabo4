"use strict";(self.webpackChunkclinica=self.webpackChunkclinica||[]).push([[330],{7330:(L,p,a)=>{a.r(p),a.d(p,{LoginModule:()=>w});var d=a(6814),c=a(95),g=a(1826),u=a(5861);class f{constructor(l,e,i){this.email=l,this.contrase\u00f1a=e,this.perfil=i}toJSON(){return{email:this.email,password:this.contrase\u00f1a,perfil:this.perfil}}}var r=a(6825),t=a(5879),h=a(4108),v=a(6751),b=a(6700);function x(n,l){if(1&n){const e=t.EpF();t.TgZ(0,"div")(1,"form")(2,"label",12),t._uU(3,"Email"),t.qZA(),t.TgZ(4,"input",13),t.NdJ("ngModelChange",function(s){t.CHM(e);const o=t.oxw();return t.KtG(o.email=s)}),t.qZA(),t.TgZ(5,"label",14),t._uU(6,"Password"),t.qZA(),t.TgZ(7,"input",15),t.NdJ("ngModelChange",function(s){t.CHM(e);const o=t.oxw();return t.KtG(o.password=s)}),t.qZA()()()}if(2&n){const e=t.oxw();t.xp6(4),t.Q6J("ngModel",e.email),t.xp6(3),t.Q6J("ngModel",e.password)}}function Z(n,l){if(1&n){const e=t.EpF();t.TgZ(0,"div")(1,"button",17),t.NdJ("click",function(){const o=t.CHM(e).$implicit,m=t.oxw(2);return t.KtG(m.autocompletar(o))}),t.TgZ(2,"small"),t._uU(3),t.qZA(),t._UZ(4,"img",18),t.qZA(),t._UZ(5,"br"),t.qZA()}if(2&n){const e=l.$implicit;t.xp6(3),t.Oqu(e.perfil),t.xp6(1),t.Q6J("src",e.imagenURL,t.LSH)}}function _(n,l){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,Z,6,2,"div",16),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.usuariosAcceso)}}function C(n,l){1&n&&(t.TgZ(0,"div",19),t._UZ(1,"img",20),t.qZA())}const T=[{path:"",component:(()=>{class n{constructor(e,i,s,o){this.authService=e,this.database=i,this.router=s,this.storageService=o,this.email="",this.password="",this.perfil="",this.usuarios=[],this.mensajeError="",this.usuariosAcceso=["jmkeixwzrgmlvbkgxm@cazlv.com","dvzbjkhmoexktcouuj@cazlq.com","haazgxzjipavfpigda@cazlv.com","agus.bilotta@gmail.com","july.bilotta@gmail.com","cavvurxgzmyqtgrmbc@cwmxc.com"],this.spinner=!0,this.isOpen=!0}ngOnInit(){var e=this;this.database.obtenerTodos("usuarios").subscribe(function(){var i=(0,u.Z)(function*(s){e.usuarios=s.map(o=>{let m=o.payload.doc.data();return m.id=o.payload.doc.id,m}),console.log(e.usuarios);for(const o of e.usuarios)if(o.imgPerfil&&o.imgPerfil.length>0){const m=o.imgPerfil[0],M=yield e.storageService.obtenerImagen("users",m);o.imagenURL=M}e.usuariosAcceso=e.usuarios.map(o=>e.usuariosAcceso.includes(o.email)?{nombre:o.nombre,email:o.email,perfil:o.perfil,password:o.password,imagenURL:o.imagenURL}:null).filter(o=>null!==o),e.spinner=!1});return function(s){return i.apply(this,arguments)}}())}autocompletar(e){this.email=e.email,this.password=e.password}ingresar(){this.isOpen=!this.isOpen,this.user=new f(this.email,this.password,"indefinido");let e=this.usuarios.find(i=>i.email==this.email);setTimeout(()=>{if(e){if(this.perfil=e.perfil,"especialista"==this.perfil.toLocaleLowerCase()&&0==e.habilitacion)return void(this.mensajeError="Usted no se encuentra habilitado");this.authService.login(this.user.email,this.password).then(i=>{i?.user?i?.user?.emailVerified?i?.user&&i.user.emailVerified&&this.router.navigate(["/home"]):this.mensajeError="El usuario no ha verificado el email":this.mensajeError="Contrase\xf1a incorrecta"}).catch(i=>{console.log("Error al iniciar sesi\xf3n:",i)})}},1e3)}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(h.e),t.Y36(v.T),t.Y36(g.F0),t.Y36(b.V))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:33,vars:5,consts:[[1,"container"],[1,"row","justify-content-center"],[1,"col-4"],[1,"card"],[1,"card-header","text-center"],[1,"card-body","p-4","bg-light"],[4,"ngIf"],[1,"text-danger","text-center"],[2,"text-align","center"],["type","button",1,"btn","m-2","btn-md","btn-success",3,"click"],[1,"card-body","scroll",2,"text-align","center"],["class","spinner-container text-center mb-4",4,"ngIf"],["for","email",2,"float","left"],["type","email","id","email","name","email","placeholder","Email","autocomplete","off",1,"form-control","m-2",3,"ngModel","ngModelChange"],["for","password",2,"float","left"],["type","password","id","password","name","password","placeholder","Password","autocomplete","off",1,"form-control","m-2",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],["type","button",1,"btn","m-2","btn-lg",2,"background-color","#88abc2","width","150px","height","150px","text-align","center",3,"click"],[2,"width","90px","height","90px",3,"src"],[1,"spinner-container","text-center","mb-4"],["src","../../../../assets/img/spinner.png","alt","spinner"]],template:function(i,s){1&i&&(t.TgZ(0,"body")(1,"div",0)(2,"div",1)(3,"div",2),t._UZ(4,"br")(5,"br")(6,"br")(7,"br")(8,"br"),t.TgZ(9,"div",3)(10,"h5",4),t._uU(11,"Ya tienes cuenta?"),t.qZA(),t.TgZ(12,"div",5),t.YNc(13,x,8,2,"div",6),t.TgZ(14,"p",7)(15,"b"),t._uU(16),t.qZA()(),t.TgZ(17,"div",8)(18,"button",9),t.NdJ("click",function(){return s.ingresar()}),t.TgZ(19,"b"),t._uU(20,"Ingresar"),t.qZA()()()()()(),t.TgZ(21,"div",2),t._UZ(22,"br")(23,"br")(24,"br")(25,"br")(26,"br"),t.TgZ(27,"div",3)(28,"h5",4),t._uU(29,"Elige el perfil"),t.qZA(),t.TgZ(30,"div",10),t.YNc(31,_,2,1,"div",6),t.qZA(),t.YNc(32,C,2,0,"div",11),t.qZA()()()()()),2&i&&(t.xp6(13),t.Q6J("ngIf",null!=s.usuarios&&s.usuarios.length>0),t.xp6(3),t.Oqu(s.mensajeError),t.xp6(2),t.Q6J("@openClose",s.isOpen?"open":"closed"),t.xp6(13),t.Q6J("ngIf",!s.spinner),t.xp6(1),t.Q6J("ngIf",s.spinner))},dependencies:[d.sg,d.O5,c._Y,c.Fj,c.JJ,c.JL,c.On,c.F],styles:['@charset "UTF-8";body[_ngcontent-%COMP%]{background-image:url(doctor-patient.16ee9885c92d93cd.jpg);height:100vh;width:100vw;background-size:100%}.spinner-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}.spinner-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px;height:50px;animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.scroll[_ngcontent-%COMP%]{max-height:350px;overflow-y:auto}'],data:{animation:[(0,r.X$)("openClose",[(0,r.SB)("open",(0,r.oB)({opacity:1})),(0,r.SB)("closed",(0,r.oB)({opacity:.8})),(0,r.eR)("open => closed",[(0,r.jt)("1s",(0,r.F4)([(0,r.oB)({transform:"scale(1) rotateX(0)",offset:0}),(0,r.oB)({transform:"scale(2.5) rotateX(-90deg)",offset:1})]))]),(0,r.eR)("closed => open",[(0,r.jt)("0.5s",(0,r.F4)([(0,r.oB)({transform:"scale(1) rotateX(0)",offset:0}),(0,r.oB)({transform:"scale(2.5) rotateX(-90deg)",offset:1})]))])])]}})}return n})()}];let y=(()=>{class n{static#t=this.\u0275fac=function(i){return new(i||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[g.Bz.forChild(T),g.Bz]})}return n})(),w=(()=>{class n{static#t=this.\u0275fac=function(i){return new(i||n)};static#e=this.\u0275mod=t.oAB({type:n});static#n=this.\u0275inj=t.cJS({imports:[d.ez,y,c.u5]})}return n})()}}]);