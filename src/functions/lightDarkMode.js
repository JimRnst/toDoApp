const changeMode = (function(){
    const btnMode = document.querySelector('.btnMode');
    const body = document.body;
    const inptCreateTodo = document.querySelector('#inpt-create-todo');
    const todoContent = document.querySelector('#todo-content');
    const boxNewTodo = document.querySelectorAll('.box-new-todo');
    const btnFilter = document.querySelector('#btn-filter');
    const footer = document.querySelector('#box-new-todo-footer');

    btnMode.addEventListener('click', () => {
        if(btnMode.id === 'lightMode'){
            btnMode.src = '/assets/images/icon-sun.svg';
            body.classList.add('dark')
            body.style.background = 'var(--darkModeVeryDarkBlue)';
            inptCreateTodo.style.background = 'var(--DarkModeVeryDarkDesaturatedBlue)';
            inptCreateTodo.classList.add('dark');
            todoContent.style.background = 'var(--DarkModeVeryDarkDesaturatedBlue)';
            todoContent.style.color = 'var(--DarkModeLightGrayishBlue)';
            boxNewTodo.forEach(el => {
                el.style.borderBottom = '1px solid var(--DarkGrayishBlue)'
            });
            todoContent.classList.add('dark');
            footer.classList.add('dark');
            btnFilter.classList.add('dark');
            btnMode.id = 'darkMode';

        } else if(btnMode.id === 'darkMode'){
            btnMode.src = '/assets/images/icon-moon.svg';
            body.style = '';
            
            inptCreateTodo.style = '';
            inptCreateTodo.classList.remove('dark');
            todoContent.style = '';
            todoContent.style = '';
            boxNewTodo.forEach(el => {
                el.style = ''
            });
            body.classList.remove('dark');
            todoContent.classList.remove('dark');
            footer.classList.remove('dark');
            btnFilter.classList.remove('dark');

            btnMode.id = 'lightMode';
        }
    })
});

export {changeMode}