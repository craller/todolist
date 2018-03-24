// var list = [{
//     title:"吃饭",
//     checked:false
// },{
//     title:"吃鸡",
//     checked:false
// }]

var myLocal = {
    get(key){
          return JSON.parse(window.localStorage.getItem(key));
    },
    save(key,value){
        window.localStorage.setItem(key,JSON.stringify(value))
    }
}
var changeList = {
    all(list){
           return list
    },
    finish(list){
         return list.filter(function(item){
            return item.checked
         }) 
    },
    unfinish(){
        return list.filter(function(item){
            return !item.checked
         }) 
    }
}

var list = myLocal.get("todos") || [];
var vm = new Vue({
    el:".main",
    data:{
        list,
        newTodo : '',
        editingTodo:"",
        beforeTodo:'',
        visibiable:"all"
    },
    computed: {
        count:function(){
            return this.list.filter(function(item){
                return !item.checked
            }).length
        }  ,
        filterList(){
            return changeList[this.visibiable] ? changeList[this.visibiable](this.list):this.list;
        }
     },
     watch:{
         list:{
             deep:true,
             handler(){
                 myLocal.save("todos",this.list)
             }
         }
     },
     directives: {
         focus:{
             updated (el,binding) {
                 if(binding.value){
                     el.focus();
                 }
             }
         }
     },
    methods: {
        addTodo:function(){
            this.list.push({
                title:this.newTodo,
                checked:false
            })
            this.newTodo = ""
        },
        editedTodo:function(){
            this.editingTodo="";
        },
        editTodo:function(todo){
             this.editingTodo = todo;
             this.beforeTodo = todo.title;
        },
        deleteTodo:function(index){
               this.list.splice(index,1)
        },
        retrunBefore(todo){
            todo.title = this.beforeTodo;
            this.beforTodo = "";
            this.editingTodo = "";
        }
    }
})
function hashChange(){
   vm.visibiable = window.location.hash.slice(1);
}
window.addEventListener("hashchange",hashChange)
hashChange();