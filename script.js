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

	function render(itens) {

		if(itens != null) {

			//Se for igual a 7 vai desabilitar o input
			if(itens.length == 7) { 
				//Desabilita o botao e input
				input.disabled = true;
			}	

			list.innerHTML = ``;

			//Percorre os to-do cadastrado para exibir
			itens.forEach(function(item) {
				const li = document.createElement('li');//Cria a tag <li>

				//Cria um atributo data-key dentro da tag <li> com o valor do id
				li.setAttribute('data-key', item.id);
				//Exibe o input checkbox dentro de <li>
				li.innerHTML = `<input type='checkbox' class='checkbox'> ${item.todo} <button class='button_delete'>X</button>`;
				//Adiciona o <li> dentro de <ul>
				list.append(li);
			});
		}
	}

	//Pega os to-do já cadastrados e chama função para exibir
	function getLocalstorageRender() {
		//Pega todos os to-do cadastrados
		let todos = localStorage.getItem('todo');

		//Converte em um objeto javascript
		itens = JSON.parse(todos);		
		render(itens);
	}
	//Inicia buscando os to-do cadastrado no localstorage para exibir
	getLocalstorageRender();

	function deleteTodo(id) {
		
		itens = itens.filter(function(item) {
		   
		    return item.id != id;
		});
		//Atualiza a lista de to-do
		addLocalStorage(itens);
	}

	//Todo evento de clique que acontecer dentro da lista de to-do dentro da tag <ul>
	list.addEventListener('click', function(event) {

		/*Conforme o user for deletando, se a quantidade de to-do for menor que 8 vai habilitar o input*/
		if(itens.length < 8) { 
			//Habilita o botao de input
			input.disabled = false;	
		}

		//Se o evento aconteceu no button de delete
		if(event.target.classList.contains('button_delete')) {
			//Chama a função de deletar e passa o id
    		deleteTodo(event.target.parentElement.getAttribute('data-key'));
    	}
	});