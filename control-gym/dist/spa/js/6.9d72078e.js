(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"36a9":function(t,a,s){"use strict";s("4de7")},"4de7":function(t,a,s){},fad3:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"text-weight-bolder text-h2 text-white text-center q-mt-xl"},[t._v("\n    DASHBOARD\n  ")]),s("div",{staticClass:"q-pa-md q-mx-md row justify-center items-start q-gutter-md",attrs:{id:"div"}},[s("q-card",{staticClass:"col",attrs:{id:"tarjeta"}},[s("q-card-section",{staticClass:"row q-gutter-md"},[s("q-avatar",{attrs:{size:"80px","font-size":"52px",color:"teal","text-color":"white",icon:"house"}}),s("div",[s("div",{staticClass:"text-weight-bolder text-h6"},[t._v("\n            Total Usuarios\n          ")]),s("div",{staticClass:"text-subtitle1 text-weight-bolder"},[t._v("\n            "+t._s(this.data.total)+"\n          ")])])],1)],1),s("q-card",{staticClass:"col",attrs:{id:"tarjeta"}},[s("q-card-section",{staticClass:"row q-gutter-md"},[s("q-avatar",{attrs:{size:"80px","font-size":"52px",color:"positive","text-color":"white",icon:"attach_money"}}),s("div",[s("div",{staticClass:"text-weight-bolder text-h6"},[t._v("\n            Total Solventes\n          ")]),s("div",{staticClass:"text-weight-bolder"},[t._v("\n            Mes Actual\n          ")]),s("div",{staticClass:"text-subtitle1"},[t._v("\n            "+t._s(this.data.total)+"\n          ")])])],1)],1),s("q-card",{staticClass:"col",attrs:{id:"tarjeta"}},[s("q-card-section",{staticClass:"row q-gutter-md"},[s("q-avatar",{attrs:{size:"80px","font-size":"52px",color:"negative","text-color":"white",icon:"money_off"}}),s("div",[s("div",{staticClass:"text-weight-bolder text-h6"},[t._v("\n            Total Deudores\n          ")]),s("div",{staticClass:"text-weight-bolder"},[t._v("\n            Mes Actual\n          ")]),s("div",{staticClass:"text-subtitle1"},[t._v("\n            "+t._s(this.data.total)+"\n          ")])])],1)],1)],1),s("div",{staticClass:"absolute-bottom-right q-mb-md q-mr-md"},[s("q-btn",{staticStyle:{"background-color":"#ea0133"},attrs:{flat:"",round:"",icon:"search",color:"white",size:"xl"},on:{click:function(a){t.dialog=!0}}})],1),s("q-dialog",{on:{hide:function(a){t.search=null}},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[s("q-card",{staticClass:"dialog",staticStyle:{width:"300px"}},[s("q-card-section",[s("div",{staticClass:"text-h6 text-weight-bold text-center"},[t._v("Buscar Usuario")])]),s("q-card-section",{staticClass:"q-pt-none",attrs:{align:"center"}},[s("q-input",{staticStyle:{width:"200px"},attrs:{label:"Buscar",dark:"",color:"white"},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1),s("q-card-actions",{attrs:{align:"center"}},[s("q-btn",{attrs:{flat:"",label:"Buscar",color:"white",disable:!t.search},on:{click:t.buscar}})],1)],1)],1)],1)},i=[],o=(s("e6cf"),s("ded3")),r=s.n(o),c=s("2f62"),l={name:"PageIndex",data(){return{rows:[],data:{total:null},dialog:!1,search:null}},computed:r()({},Object(c["d"])("example",["user"])),methods:{async get(){this.$q.loading.show(),await this.$axios2.get("usuarios").then((t=>{t.length&&(this.rows=t.filter((t=>"user"==t.role))),this.$q.loading.hide()})).catch((t=>{this.$q.loading.hide()}))},Dashboard(){this.data.total=this.rows.length?this.rows.length:0},async buscar(){let t=await this.$axios2.post("usuarios/get_user",{identity_card:this.search});"active"==t.result&&this.$q.notify({message:"Usuario Activo",color:"positive"}),"inactive"==t.result&&this.$q.notify({message:"Usuario Inactivo",color:"negative"}),"exonerated"==t.result&&this.$q.notify({message:"Usuario Exonerado",color:"primary"}),"not-exist"==t.result&&this.$q.notify({message:"Usuario no resgitrado",color:"negative"})}},async mounted(){await this.get(),await this.Dashboard()}},n=l,d=(s("36a9"),s("2877")),h=s("f09f"),u=s("a370"),v=s("cb32"),g=s("9c40"),x=s("24e8"),w=s("27f9"),q=s("4b7e"),b=s("eebe"),m=s.n(b),f=Object(d["a"])(n,e,i,!1,null,null,null);a["default"]=f.exports;m()(f,"components",{QCard:h["a"],QCardSection:u["a"],QAvatar:v["a"],QBtn:g["a"],QDialog:x["a"],QInput:w["a"],QCardActions:q["a"]})}}]);