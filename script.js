let 	input = document.querySelector('.input_todo');
const   form = document.querySelector('.form');
const   list = document.querySelector('.list');
let     itens = [];

	//Executa essa funçao assim que o formulário for enviado
	form.addEventListener('submit', function(event) {

	  event.preventDefault();
	  addTodo(input.value);
	});

	function addTodo(value) {

		//Se o campo de input nao estiver vazio
		if (value !== '') {
			let dados = { todo: value, id: Date.now() };

			//Adiciona um novo to-do
			itens.push(dados);
			//Adiciona no localstorage
			addLocalStorage(itens);
		}
	}

	function addLocalStorage(itens) {
		//Adiciona o novo item ao localstorage
		localStorage.setItem('todo', JSON.stringify(itens));					
		//Limpa o campo
		input.value = '';
		render(itens);
	}