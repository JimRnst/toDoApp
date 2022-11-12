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

    class ToDo {
        constructor(name, status){
            this.name = name;
            this.status = status;
        };
    };

    const lista = document.getElementById('lista');
    Sortable.create(lista, {
        animation: 150,
        chosenClass: 'selected',
        store: {
            set: (sortable) => {
                const order = sortable.toArray();
                console.log(order);
            }
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    if(inputValue.value === ''){
            alert('Please create a new todo')
    } else{
            const newTodo = new ToDo(inputValue.value, checkbox.checked);
            toDoArr.push(newTodo);
            if(checkbox.checked === true) showTodo(inputValue.value, true);
            if(checkbox.checked === false) showTodo(inputValue.value, false);
    };
        console.log(toDoArr);
        inputValue.value = '';
        countItems();
    });

    todoContent.addEventListener('click', (e) => {

        if(e.target.checked === true){
            const setId = e.target.parentElement;
            const nameChecked = e.target.parentElement.children[1].children[0];
            const indexAllToDo = toDoArr.map(name => name.name).indexOf(nameChecked.innerText);
            nameChecked.style.color = 'var(--DarkGrayishBlue)';
            nameChecked.style.textDecoration = 'line-through';
            toDoArr[indexAllToDo].status = true;
            setId.classList.add('complete');
            countItems();

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


        if(e.target.className === 'delete'){
            const idk = e.target.parentElement;
            const indexAllToDo = toDoArr.map(name => name.name).indexOf(e.target.parentElement.children[1].innerText);
            toDoArr.splice(indexAllToDo, 1)
            idk.remove();
            countItems();
        };
    });

    btnFilter.addEventListener('click', (e) => {
        if(e.target.id === 'all'){
            filterToDO = 'all'
        };
        if(e.target.id === 'active'){
            filterToDO = 'active'
        };
        if(e.target.id === 'completed'){
            filterToDO = 'completed'
        };

        showFilterToDO()
    });

    btnClearComplete.addEventListener('click', () => {
        const delteComplete = document.querySelectorAll('.complete');
        for (let i = 0; i < toDoArr.length; i++) {
            toDoArr.map(name => {
                const index = toDoArr.map(name => name.status).indexOf(true);
                if(name.status === true){
                    deleteCompelteToDoArr(index);
                }
            });
        }
        console.log(toDoArr);
        delteComplete.forEach(cont => cont.remove());
        countItems()
    });

    function countItems(){
        let counter = 1;
        if(toDoArr.length === 1){
            items.innerText = 1;
        }
        toDoArr.map(name => {
            if(name.status === false){
                // let idk = counter++
                items.innerText = counter++;
            }
        });
    };


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
            }
        }
        todocontainer.prepend(div);
        showDeleteBtn()
    }

    document.body.addEventListener('mouseon', (e) => {
        mouseOverHandle()
        function mouseOverHandle(){
            let mouseRelativeX = e.clientX - e.offsetLeft;
            console.log(mouseRelativeX);
        }
    })

    function showDeleteBtn(){
        const nameHover = document.querySelector('.box-new-todo');
        nameHover.addEventListener('mouseover', () => {
            nameHover.classList.add('blur');
        });

        nameHover.addEventListener('mouseout', () => {
            nameHover.classList.remove('blur');
        })
    }

    function showFilterToDO(){
        if(filterToDO === 'all'){
            todocontainer.innerHTML = ''
            toDoArr.map(name => {
                if(name.status === true){
                    showTodo(name.name, true);
                } else if(name.status === false){
                    showTodo(name.name, false);
                }
            });

        }
        if(filterToDO === 'active'){
            todocontainer.innerHTML = ''
            toDoArr.map(name => {
                if(name.status === false){
                    showTodo(name.name, false);
                }
            });
        }
        if(filterToDO === 'completed'){
            todocontainer.innerHTML = ''
            toDoArr.map(name => {
                if(name.status === true){
                    showTodo(name.name, true);
                }
            });
        };
    };

    function deleteCompelteToDoArr(id){
        toDoArr.splice(id, 1);
    }
});

export {app}