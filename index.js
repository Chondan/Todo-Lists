(() => {
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function addTask() {
        const todoTasks = document.querySelector("div#todo>div.body");
        // creat a new task 
        const newTask = document.createElement("div");
        newTask.className = "task";
        newTask.style.borderLeft = `10px solid rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
        newTask.contentEditable = true;
        newTask.draggable = true;
        todoTasks.appendChild(newTask);
        newTask.focus();
        setupDraggableElems();
    }
    function onDragStart() {
        draggingElem = this;
        if (this.className.search("hold") == -1) {
            this.className += " hold";
            setTimeout(() => {
                this.className = "invisible";
            }, 0);
        }
    }
    function onDragEnd() {
        this.className = "task";
        draggingElem = null;
        // delete task
        if (gotoTrash) {
            this.remove();
        }
    }
    function onDragEnter(e) {
        gotoTrash = false;
        e.preventDefault();
        this.className += " hovered";
    }
    function onDragOver(e) {
        e.preventDefault();
        gotoTrash = false;
        if (this.className.search("hovered") == -1) {
            this.className += " hovered";
        }
    }
    function onDragleave() {
        gotoTrash = true;
        this.classList.remove("hovered");
    }
    function onDrop() {
        this.classList.remove("hovered");
        const body = document.querySelector(`div#${this.id}>div.body`);
        body.appendChild(draggingElem);
    }
    function setUpCategoriesElems() {
        const categoriesElems = Array.prototype.slice.call(document.getElementsByClassName("category"));
        categoriesElems.forEach(categoriesElem => {
            categoriesElem.addEventListener('dragover', onDragOver);
            categoriesElem.addEventListener('dragenter', onDragEnter);
            categoriesElem.addEventListener('dragleave', onDragleave);
            categoriesElem.addEventListener('drop', onDrop);
        });
        return categoriesElems;
    }
    function setupDraggableElems() {
        // setup element to draggable element
        draggableElems = Array.prototype.slice.call(document.getElementsByClassName("task"));
        draggableElems.forEach(draggableElem => {
            draggableElem.addEventListener('dragstart', onDragStart);
            draggableElem.addEventListener('dragend', onDragEnd);
        });
        return draggableElems;
    }
    let draggableElems;
    let draggingElem;
    let gotoTrash;
    function App() {
        // add task
        const addBtn = document.querySelector(".add");
        addBtn.addEventListener('click', addTask);
        const categoriesElems = setUpCategoriesElems();
    }
    App();
})();