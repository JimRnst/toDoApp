    import Sortable from "sortablejs";

    const app = (function(){
        const form = document.querySelector('#inpt-create-todo');
        const inputValue = document.querySelector('#cretate-todo');
        const checkbox = document.querySelector('#checkboxCreateTodo');
        const todoContent = document.querySelector('#todo-content');
        const todocontainer = document.querySelector('.todo-container');
        const items = document.querySelector('#counted-items');
        const btnFilter = document.querySelector('#btn-filter');
        const btnClearComplete = document.querySelector('#clear-complete');

        let filterToDO = 'all';
        let toDoArr = [];

        //constructor del todo
        class ToDo {
            constructor(name, status){
                this.name = name;
                this.status = status;
            };
        };

        //function drag and drop
        // const lista = document.getElementById('lista');
        // Sortable.create(lista, {
        //     animation: 150,
        //     chosenClass: 'selected',
        //     store: {
        //         set: (sortable) => {
        //             const order = sortable.toArray();
        //             console.log(order);
        //         }
        //     }
        // });

        //crear todo
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        if(inputValue.value === ''){
                alert('Please create a new todo')
        } else{
                const newTodo = new ToDo(inputValue.value, checkbox.checked);
                toDoArr.push(newTodo);
                countItems();
                checkbox.checked ? showTodo(inputValue.value, true):showTodo(inputValue.value, false);
        };
            inputValue.value = '';
        });

        //completar o activar todos
        todoContent.addEventListener('click', (e) => {

            if(toDoArr.length > 0){
                //complete todo
                if(e.target.checked){
                    const setId = e.target.parentElement;
                    const nameChecked = e.target.parentElement.children[1].children[0];
                    const indexAllToDo = toDoArr.map(name => name.name).indexOf(nameChecked.innerText);
                    nameChecked.style.color = 'var(--DarkGrayishBlue)';
                    nameChecked.style.textDecoration = 'line-through';
                    toDoArr[indexAllToDo].status = true;
                    setId.classList.add('complete');
                    countItems();

                    //active todo
                } else if(e.target.checked === false){
                    const setId = e.target.parentElement;
                    const nameChecked = e.target.parentElement.children[1].children[0];
                    const indexAllToDo = toDoArr.map(name => name.name).indexOf(nameChecked.innerText);
                    nameChecked.style = '';
                    nameChecked.style = '';
                    toDoArr[indexAllToDo].status = false;
                    setId.classList.remove('complete');
                    countItems();
                };

                //delete todo
                if(e.target.className === 'delete'){
                    const idk = e.target.parentElement;
                    const indexAllToDo = toDoArr.map(name => name.name).indexOf(e.target.parentElement.children[1].innerText);
                    toDoArr.splice(indexAllToDo, 1)
                    idk.remove();
                    countItems();
                };
            };
        });

        //button filter todos
        btnFilter.addEventListener('click', (e) => {
            //se cambia el estado y se llama la function 
            if(e.target.id === 'all'){
                filterToDO = 'all'
            };
            if(e.target.id === 'active'){
                filterToDO = 'active'
            };
            if(e.target.id === 'completed'){
                filterToDO = 'completed'
            };

            //call the function
            showFilterToDO()
        });

        //button clear todos competed
        btnClearComplete.addEventListener('click', () => {
            //por cada todo completado mapeo el array para buscar el index y eliminarlo
            const delteComplete = document.querySelectorAll('.complete');
            delteComplete.forEach(todo => {
                toDoArr.map(name => {
                    if(name.status === true){
                        const index = toDoArr.map(idk => idk.name).indexOf(todo.children[1].innerText);
                        toDoArr.splice(index, 1);
                        console.log(name.name);
                    }
                });
                //eliminar todo de DOM
                todo.remove();
            });
            countItems();
        });

        //contar items en el array
        function countItems(){
            items.innerText = toDoArr.length;
        };

        //mostar todo creado en el DOM
        function showTodo(info, status){
            const div = document.createElement('div');
            div.classList.add('box-new-todo');
            for (let i = 0; i < toDoArr.length; i++) {
                if(status === true){
                    div.classList.add('complete')
                    div.innerHTML = `
                    <input type="checkbox" class="check" checked>
                    <div class="todo-name"><span class="todo-name-hover" style="color: var(--DarkGrayishBlue); text-decoration: line-through;">${info}</span></div>
                    <img class="delete" src="/assets/images/icon-cross.svg" alt="delete">
                    `;
                } else if(status === false){
                    div.innerHTML = `
                    <input type="checkbox" class="check">
                    <div class="todo-name"><span class="todo-name-hover">${info}</span></div>
                    <img class="delete" src="/assets/images/icon-cross.svg" alt="delete">
                    `;
                };
            };
            todocontainer.prepend(div);
            showDeleteBtn();
        };

        //mostar button xmark
        function showDeleteBtn(){
            const nameHover = document.querySelector('.box-new-todo');
            //mostar
            nameHover.addEventListener('mouseover', () => {
                nameHover.classList.add('hover');
            });

            //eliminar
            nameHover.addEventListener('mouseout', () => {
                nameHover.classList.remove('hover');
            });
        };

        //mostar todos filtrados
        function showFilterToDO(){
            if(filterToDO === 'all'){
                todocontainer.innerHTML = ''
                toDoArr.map(name => {
                    if(name.status === true){
                        showTodo(name.name, true);
                    } else if(name.status === false){
                        showTodo(name.name, false);
                    };
                });

            }
            if(filterToDO === 'active'){
                todocontainer.innerHTML = ''
                toDoArr.map(name => {
                    if(name.status === false){
                        showTodo(name.name, false);
                    };
                });
            }
            if(filterToDO === 'completed'){
                todocontainer.innerHTML = ''
                toDoArr.map(name => {
                    if(name.status === true){
                        showTodo(name.name, true);
                    };
                });
            };
        };
    });

    export {app}