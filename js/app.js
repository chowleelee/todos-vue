(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var filters = {
		all: function(todoList){
			return todoList;
		},
		active: function(todoList){
			return todoList.filter(function(todo){
				return !todo.completed;
			})
		},
		completed: function(todoList){
			return todoList.filter(function(todo){
				return todo.completed;
			})
		}
	};
	window.app = new Vue({
		el: '.todoapp',
		data: {
			text: '',
			todoList: store.get("todoList") || [],
			editedItem: null,
			visibility: 'all'
		},
		watch: {
			todoList: {
				deep: true,
				handler: function(){
					store.set("todoList", this.todoList);
				}
			}
		},
		computed: {
			filteredTodoList: function(){
				return filters[this.visibility](this.todoList);
			},
			unDone: function(){
				return filters.active(this.todoList).length;
			},
			allDone: {
				get: function(){
					return this.unDone === 0;
				},
				set: function(value){
					//console.log(value);
					//这里添加此句后，value值会连续两次都为true?
					this.todoList.forEach(function(todo){
						todo.completed = value;
					})
				}
			}
		},
		methods: {
			submit: function(){
				if(!this.text){
					return;
				}
				this.todoList.push({
					content: this.text,
					completed: false
				});
				this.text = '';
			},
			remove: function(todo){
				var index = this.todoList.indexOf(todo); //todo is an object, why indexOf can be used here?
				this.todoList.splice(index, 1);
			},
			edit: function(todo){
				this.editedItem = todo;
			},
			doneEdit: function(todo){
				if(!todo.content){
					this.remove(todo);
				}
				this.editedItem = null;
			},
			tab: function(visibility){
				this.visibility = visibility;
			},
			removeDone: function(){
				this.todoList = filters.active(this.todoList);
			}
		},
		directives: {
			"to-focus": function(el, binding){
				if(binding.value){
					el.focus();
				}
			}
		}
	})
})(window);
