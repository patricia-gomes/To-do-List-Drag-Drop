let 	input = document.querySelector('.input_todo');
const   form = document.querySelector('.form');
const   list = document.querySelector('.list');
let     itens = [];

//Drag Drop
const   todoList = document.querySelector('.todo_list');
var 	item =  document.getElementsByClassName('item');
var 	selectItem = '';
var 	selectedItemPosition = 0;

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

				li.id = `id-${item.id}`;//Cria um id com o id do to-do
				li.classList.add('item');//Cria uma classe item
				//Cria um objeto arrastável
				li.setAttribute('draggable', true);
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

//---------------------------------- DRAG AND DROP ---------------------------------------------------
	//Executa a função quando o usuário começa a arrastar um elemento
	list.addEventListener("dragstart", function(event) {
		
		//Guarda os dados do item que esta sendo arrastado
		event.dataTransfer.setData('text', event.target.id);

		//Seleciona o item 
		selectItem =  document.getElementById(event.target.id);

		//Apos 1 milissegundo executa o código abaixo
		setTimeout(() => {
			//O to-do selecionado é removido da posiçao inicial
			list.removeChild(selectItem);

		}, 1)
	});
	
	//Executa a função quando um elemento esta sendo arrastado sobre um ponto de soltura
	todoList.addEventListener("dragover", function(event) {
		event.preventDefault();
		//Envia a coordenada vertical do item
		itemPosition(event.clientY);
	});

	//Executa a função quando um elemento arrastado é solto em uma área válida
	todoList.addEventListener("drop", function(event) {
		event.preventDefault();

		//O item é inserido antes na posiçao selecionada
		list.insertBefore(selectItem, list.children[selectedItemPosition]);
	});

	function positionOfEachItem() {

		//Entra no loop para capturar a posiçao de cada item da lista
		for (var i = 0; i < item.length; i++) {
			
			//Seleciona os itens
			var element = document.getElementById(item[i]['id']);
			//Retorna posiçao de cada item no viewport
			var position = element.getBoundingClientRect();

			//A distancia do topo e de baixo de cada item
			var yTop = position.top;
			var yBottom = position.bottom;
			//Calcula posiçao vertical de cada item da lista
			item[i]['yPosition'] = yTop + ( (yBottom-yTop)/2 );
		}
	}

	function itemPosition(currentYPosition) {
		positionOfEachItem();

		for (var i = 0; i < item.length; i++) {

			//Identifica se tem algum item acima (menor em altura) do item selecionado
			if(item[i]['yPosition'] < currentYPosition) {
				//Este item deve estar acima do item selecionado
				var itemAbove = document.getElementById(item[i]['id']);
				selectedItemPosition = i+1;
			}
		}
	
		if(typeof itemAbove == 'undefined') {
			selectedItemPosition = 0;
		}
	}