const loadHome = (function() {
    const body = document.body;
    const div = document.createElement('div');
    div.setAttribute('id', 'container');
    div.innerHTML = `
    <div id="box-todo">
      <div id="header-box">
        <div id="title">T O D O</div>
        <img src="/assets/images/icon-moon.svg" alt="lightMode" id="lightMode" class="btnMode">
      </div>
      <form action="" method="post" id="inpt-create-todo">
        <input id="checkboxCreateTodo" class="check" type="checkbox">
        <input id="cretate-todo" type="text" name="cretate-todo" maxlength="50" placeholder="Create a new todo...">
      </form>
      <div id="todo-content">
        <div class="todo-container" id="lista"></div>
        <div id="box-new-todo-footer">
          <div id="items-count"><span id="counted-items">0</span> items</div>
          <div id="btn-filter">
            <div id="all">All</div>
            <div id="active">Active</div>
            <div id="completed">Completed</div>
          </div>
          <div id="clear-complete">Clear complete</div>
        </div>
      </div>
      <div id="tag">Drag and Drop to reorder list</div>
    </div>
    `;
    body.prepend(div);
});

export {loadHome}