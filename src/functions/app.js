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
        const checkboxCreateTodo = document.querySelector('#checkboxCreateTodo')

        let filterToDO = 'all';
        let toDoArr = [];

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
            toDoArr.push({name: inputValue.value, status:checkbox.checked});
            countItems();
            if(filterToDO === 'all') {
                checkbox.checked ? showTodo(inputValue.value, true): showTodo(inputValue.value, false);
                btnFilter.classList.add('statusAll');
            };
            if(filterToDO === 'active' && checkbox.checked === false) showTodo(inputValue.value, checkbox.checked);
            if(filterToDO === 'completed' && checkbox.checked === true) showTodo(inputValue.value, checkbox.checked);
        };
            checkboxCreateTodo.checked = false;
            inputValue.value = '';
        });

        //completar o activar todos
        todoContent.addEventListener('click', (e) => {

            if(toDoArr.length > 0){
                //complete todo
                if(e.target.checked){
                    const setId = e.target.parentElement;
                    const nameChecked = e.target.parentElement.children[1].children[0];
                    const result = toDoArr.find(({ name }) => name === nameChecked.innerText);
                    result.status = true;
                    nameChecked.style.color = 'var(--DarkGrayishBlue)';
                    nameChecked.style.textDecoration = 'line-through';
                    setId.classList.add('complete');
                    countItems();

                    //active todo
                } else if(e.target.checked === false){
                    const setClass = e.target.parentElement;
                    const nameChecked = e.target.parentElement.children[1].children[0];
                    const result = toDoArr.find(({ name }) => name === nameChecked.innerText);
                    result.status = false;
                    nameChecked.style = '';
                    nameChecked.style = '';
                    setClass.classList.remove('complete');
                    countItems();
                };

                //delete todo
                if(e.target.className === 'delete'){
                    const todoDOM = e.target.parentElement;
                    const nameTodo = e.target.parentElement.children[1].innerText;
                    toDoArr.splice(toDoArr.findIndex(todo => todo.name === nameTodo), 1);
                    todoDOM.remove();
                    countItems();
                };
            };
        });

        //button filter todos
        btnFilter.addEventListener('click', (e) => {
            //se cambia el estado y se llama la function 
            if(e.target.id === 'all'){
                filterToDO = 'all';
                btnFilter.classList.add('statusAll');
                btnFilter.classList.remove('statusActive', 'statusCompleted');
            };
            if(e.target.id === 'active'){
                filterToDO = 'active';
                btnFilter.classList.add('statusActive');
                btnFilter.classList.remove('statusAll', 'statusCompleted');
            };
            if(e.target.id === 'completed'){
                filterToDO = 'completed';
                btnFilter.classList.add('statusCompleted');
                btnFilter.classList.remove('statusAll', 'statusActive');
            };

            //call the function
            showFilterToDO()
        });

        //button clear todos competed
        btnClearComplete.addEventListener('click', () => {
            const deleteCompleteArr = toDoArr.filter(({status}) => status === true);
            const deleteCompleteDOM = document.querySelectorAll('.complete');
            deleteCompleteArr.forEach(todo => toDoArr.splice(toDoArr.findIndex(e => e.status === true), 1));
            deleteCompleteDOM.forEach(todo => todo.remove());
            countItems();
        });

        //contar items en el array
        function countItems(){
            const todoFilterActive = toDoArr.filter(({status}) => status === false);
            items.innerText = todoFilterActive.length;
        };

        //mostar todo creado en el DOM
        function showTodo(info, status){
            const div = document.createElement('div');
            div.classList.add('box-new-todo');
            for (let i = 0; i < toDoArr.length; i++) {
                div.setAttribute('data-id', i)
                if(status === true){
                    div.classList.add('complete')
                    div.innerHTML = `
                    <input type="checkbox" class="check" checked>
                    <div class="todo-name"><span class="todo-name-hover" style="color: var(--DarkGrayishBlue); text-decoration: line-through;">${info}</span></div>
                    <img class="delete" src="/assets/images/icon-cross.svg" alt="delete">
                    `;
                } else if(status === false){
                    div.innerHTML = `
                    <input type="checkbox" class="check"  data-id="${i}">
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
                const todoAll = toDoArr.filter(todo => todo);
                todocontainer.innerHTML = '';
                todoAll.forEach(todo => todo.status ? showTodo(todo.name, todo.status) : showTodo(todo.name, todo.status));

            }
            if(filterToDO === 'active'){
                todocontainer.innerHTML = '';
                const todoActive = toDoArr.filter(({status}) => status === false);
                todoActive.forEach(todo => showTodo(todo.name, todo.status));
            }
            if(filterToDO === 'completed'){
                todocontainer.innerHTML = '';
                const todoCompleted = toDoArr.filter(({status}) => status === true);
                todoCompleted.forEach(todo => showTodo(todo.name, todo.status))
            };
        };
    });

    export {app}