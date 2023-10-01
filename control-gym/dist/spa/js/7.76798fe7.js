(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{1242:function(e,t,a){"use strict";a("e6cf");const o=async e=>fetch(e).then((e=>e.blob())).then((e=>new Promise(((t,a)=>{const o=new FileReader;o.onloadend=()=>t(o.result),o.onerror=a,o.readAsDataURL(e)}))));t["a"]=o},"6ddf":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"column"},[a("div",{staticClass:"float-left q-ml-md"},[a("q-btn",{attrs:{icon:"keyboard_backspace",to:"/usuarios",round:"",flat:"",color:"white"}})],1),a("div",{attrs:{align:"center"}},[a("q-card",{staticClass:"card q-ma-md q-mt-xl",staticStyle:{width:"60%"}},[a("q-card-section",[e.form.photo?a("q-avatar",{attrs:{rounded:"",size:"200px"}},[a("img",{attrs:{src:e.form.photo}})]):a("q-avatar",{attrs:{color:"grey-8","text-color":"white",icon:"person",size:"200px"}}),a("div",{staticClass:"row q-gutter-md justify-center"},[a("div",{staticClass:"col-md-3 col-xs-12"},[a("q-input",{ref:"first_name",attrs:{dark:"",rules:[function(e){return!!e||"campo requerido"}],color:"white",readonly:"",label:"Nombres"},model:{value:e.form.first_name,callback:function(t){e.$set(e.form,"first_name",t)},expression:"form.first_name"}})],1),a("div",{staticClass:"col-md-3 col-xs-12"},[a("q-input",{ref:"last_name",attrs:{dark:"",rules:[function(e){return!!e||"campo requerido"}],color:"white",readonly:"",label:"Apellidos"},model:{value:e.form.last_name,callback:function(t){e.$set(e.form,"last_name",t)},expression:"form.last_name"}})],1),a("div",{staticClass:"col-md-3 col-xs-12"},[a("q-input",{ref:"identity_card",attrs:{dark:"",rules:[function(e){return!!e||"campo requerido"}],color:"white",type:"number",readonly:"",label:"Cedula de identidad"},model:{value:e.form.identity_card,callback:function(t){e.$set(e.form,"identity_card",t)},expression:"form.identity_card"}})],1),a("div",{staticClass:"row col-md-3 col-xs-12"},[a("q-input",{ref:"entry_date",attrs:{dark:"",rules:[function(e){return!!e||"campo requerido"}],color:"white",label:"Fecha de entrada",readonly:""},model:{value:e.form.entry_date,callback:function(t){e.$set(e.form,"entry_date",t)},expression:"form.entry_date"}})],1),a("div",{staticClass:"col-md-3 col-xs-12"},[a("q-input",{ref:"email",attrs:{dark:"",rules:[function(e){return!!e||"campo requerido"}],color:"white",readonly:"",label:"Correo",type:"email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),a("div",{staticClass:"col-md-3 col-xs-12"},[a("q-input",{ref:"phone",attrs:{dark:"",rules:[function(e){return!!e||"campo requerido"}],color:"white",readonly:"",label:"Número de telefono",mask:"(####) ### - ####","unmasked-value":""},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),a("div",{staticClass:"col-md-3 col-xs-12"},[a("q-select",{ref:"sex",attrs:{rules:[function(e){return!!e||"campo requerido"}],readonly:"",options:[{label:"Masculino",value:"m"},{label:"Femenino",value:"f"}],dark:"",color:"white",label:"Sexo","map-options":"","emit-value":""},model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}})],1),a("div",{staticClass:"col-md-3 col-xs-12"},[a("q-select",{ref:"payment_type",attrs:{rules:[function(e){return!!e||"campo requerido"}],readonly:"",options:[{label:"Mensual",value:"mes"},{label:"Semanal",value:"semana"}],dark:"",color:"white",label:"Tipo de pago","map-options":"","emit-value":""},model:{value:e.form.payment_type,callback:function(t){e.$set(e.form,"payment_type",t)},expression:"form.payment_type"}})],1),a("div",{staticClass:" col-md-3 col-xs-12"},[a("q-btn",{staticClass:"q-mt-md",attrs:{label:"Archivos",color:"white",outline:""},on:{click:function(t){e.dialog_archivo=!0}}})],1)])],1)],1)],1),a("q-dialog",{model:{value:e.dialog_archivo,callback:function(t){e.dialog_archivo=t},expression:"dialog_archivo"}},[a("q-card",{staticClass:"dialog",staticStyle:{width:"600px"}},[a("q-card-section",{attrs:{align:"start"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",icon:"reply"}})],1),a("q-card-section",{attrs:{align:"center"}},[e.form.file?a("img",{attrs:{src:e.form.file,width:"500px"}}):a("q-avatar",{attrs:{color:"grey-8","text-color":"white",icon:"insert_drive_file",size:"200px"}})],1)],1)],1)],1)},r=[],l=(a("e6cf"),a("1242"),{data(){return{form:{},loading:!1,desde_hasta:null,dialog_archivo:!1}},watch:{"form.exonerated_date"(e){this.desde_hasta=e.from+" hasta "+e.to}},computed:{},methods:{async getUser(e){this.$q.loading.show(),await this.$axios2.get("usuarios/"+e,{filter:{role:"user"}}).then((async e=>{this.form=e,this.form.photo&&(this.form.photo=this.$env.fileUrl+this.form.photo),this.form.file&&(this.form.file=this.$env.fileUrl+this.form.file),this.$q.loading.hide()})).catch((e=>{this.$q.loading.hide()}))}},async mounted(){await this.getUser(this.$route.params.id)}}),s=l,i=a("2877"),n=a("9c40"),c=a("f09f"),d=a("a370"),m=a("cb32"),u=a("27f9"),f=a("ddd8"),p=a("24e8"),h=a("7f67"),v=a("eebe"),y=a.n(v),b=Object(i["a"])(s,o,r,!1,null,null,null);t["default"]=b.exports;y()(b,"components",{QBtn:n["a"],QCard:c["a"],QCardSection:d["a"],QAvatar:m["a"],QInput:u["a"],QSelect:f["a"],QDialog:p["a"]}),y()(b,"directives",{ClosePopup:h["a"]})}}]);