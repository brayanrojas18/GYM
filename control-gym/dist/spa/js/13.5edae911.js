(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"5e15":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"flex flex-center"},[a("q-card",{staticClass:"card q-ma-md q-mt-xl"},[a("q-card-section",[a("div",{staticClass:"text-center text-weight-bolder text-h3"},[e._v("\n        Reportes\n      ")])]),a("q-card-section",[a("q-list",{staticClass:"rounded-borders",attrs:{bordered:""}},[a("q-expansion-item",{staticClass:"text-weight-bolder text-h6",staticStyle:{width:"1000px"},attrs:{"expand-separator":"",label:"Pagos",dark:""}},[a("q-card",{staticClass:"transparent",attrs:{align:"center"}},[a("div",{staticClass:" text-subtitle1 text-weight-bolder text-grey q-ml-md"},[e._v("\n              Pagos Generados\n            ")]),a("q-card-section",[a("q-select",{ref:"year",staticStyle:{width:"200px"},attrs:{label:"Año",type:"number",options:e.years,rules:[function(e){return!!e||"campo requerido"}],color:"white",dark:"","map-options":"","emit-value":""},model:{value:e.year,callback:function(t){e.year=t},expression:"year"}}),a("q-select",{ref:"month",staticStyle:{width:"200px"},attrs:{label:"Mes",options:[{label:"Enero",value:1},{label:"Febrero",value:2},{label:"Marzo",value:3},{label:"Abril",value:4},{label:"Mayo",value:5},{label:"Junio",value:6},{label:"Julio",value:7},{label:"Agosto",value:8},{label:"Septiembre",value:9},{label:"Octubre",value:10},{label:"Noviembre",value:11},{label:"Diciembre",value:12}],rules:[function(e){return!!e||"campo requerido"}],color:"white",dark:"","map-options":"","emit-value":""},model:{value:e.month,callback:function(t){e.month=t},expression:"month"}}),a("div",{staticClass:"q-mt-md"},[a("q-btn",{staticStyle:{width:"200px"},attrs:{outline:"",label:"Descargar",color:"white"},on:{click:e.pagos}})],1)],1)],1)],1)],1)],1)],1)],1)},l=[],o=(a("e6cf"),a("ded3")),r=a.n(o),i=a("2f62"),n=a("b06b"),c={data(){return{year:this.$moment().year(),month:Number(this.$moment().format("M"))}},watch:{},computed:r()(r()({},Object(i["d"])("example",["user","condominium"])),{},{years(){for(var e=[],t=this.$moment().year();t>=2010;t--)e.push({label:t,value:t});return e}}),methods:{pagos(){this.$q.loading.show(),this.$axios.post("reportes/generar",{type:"pagos",year:Number(this.year),month:Number(this.month)}).then((e=>{this.$q.loading.hide(),"vacio"==e.result?this.$q.notify({message:"No hay datos segun el mes y año",color:"negative"}):(Object(n["a"])(this.$env.fileUrl+e.result),this.$q.notify({message:"Reporte descargado con exito",color:"positive"}))})).catch((()=>{this.$q.loading.hide(),this.$q.notify({message:"Ups hubo un error",color:"negative"})}))}},async mounted(){}},d=c,u=a("2877"),m=a("f09f"),b=a("a370"),h=a("1c1c"),p=a("3b73"),v=a("ddd8"),y=a("9c40"),x=a("eebe"),g=a.n(x),f=Object(u["a"])(d,s,l,!1,null,null,null);t["default"]=f.exports;g()(f,"components",{QCard:m["a"],QCardSection:b["a"],QList:h["a"],QExpansionItem:p["a"],QSelect:v["a"],QBtn:y["a"]})}}]);