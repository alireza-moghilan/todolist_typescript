// Tag definition
const form = document.querySelector<HTMLFormElement>('#form');
const btnSubmit = document.querySelector<HTMLButtonElement>('#submit');
const titleInp = document.querySelector<HTMLInputElement>('#title');
const descriptionInp = document.querySelector<HTMLInputElement>('#description');
const list = document.querySelector<HTMLDivElement>('#list');

// Type definition
type TypeData = {
    id: number,
    date: string;
    title: string,
    description: string,
    completed: boolean
}

// TodoList Arrey definition
let todoList: TypeData[];

// Onload (get data)
window.onload = () => {
    todoList = getData();
    todoList.forEach(addTodo);
}

// Form
btnSubmit?.addEventListener('click', (e) => {
    // prevent
    e.preventDefault();
    // if
    if (titleInp?.value === undefined || descriptionInp?.value === undefined) return
    // create-object-data
    const data: TypeData = {
        id: todoList.length + 1,
        date: `${new Date()}`,
        title: titleInp?.value,
        description: descriptionInp?.value,
        completed: false
    }
    // add data in the todoList Arrey
    todoList.push(data);
    // Save todo in the LocalStorage
    saveTodoInTheLocalStorage()
    // add todo
    addTodo(data)
    // Empty the amount of entries
    titleInp.value = '';
    descriptionInp.value = '';
})

// Add Todo
function addTodo(items: TypeData): void {
    // create card
    const container = document.createElement('div')
        , div = document.createElement('div')
        , header = document.createElement('div')
        , body = document.createElement('div')
        , footer = document.createElement('div')
        , title = document.createElement('h6')
        , description = document.createElement('p')
        , date = document.createElement('p')
        , btnDetele = document.createElement('button');

    // add data
    title.append(items.title);
    description.append(items.description);
    date.append(items.date);
    btnDetele.append('Delete');

    // add class
    title.classList.add('card-title', 'p-3', 'pb-0');
    description.classList.add('p-3');
    container.classList.add('col-3');
    div.classList.add('card', 'shadow-lg');
    btnDetele.classList.add('btn', 'btn-danger', 'btn-delete', 'px-5');
    date.classList.add('mb-3');
    footer.classList.add('card-footer', 'p-3');

    // add in the DOM
    header.append(title);
    body.append(description);
    footer.append(date, btnDetele);
    div.append(header, body, footer);
    container.append(div);
    list?.append(container);
    console.log(items)


    // delete btn
    btnDetele.onclick = () => todoDelete(items.id);

    // Complete btn
    div.id = `card-${items.id}`;
    let btnComplete: any;
    if (items.completed === false) {
        btnComplete = document.createElement('button')
        btnComplete.classList.add('btn', 'btn-success', 'btn-delete', 'px-5', 'ms-2');
        btnComplete.append('Complete');
        btnComplete.onclick = () => todoComplete(items);
        footer.append(btnComplete)
    }else {
    document.querySelector(`#card-${items.id}`)?.classList.add('complete');
    }
}

// Getting data when loading
function getData(): TypeData[] {
    const data = localStorage.getItem('data');
    if (data === null) {
        return []
    } else {
        return JSON.parse(data)
    }
}

// Save todo in the LocalStorage
function saveTodoInTheLocalStorage(): void {
    localStorage.setItem('data', JSON.stringify(todoList));
}

// Remove item
function todoDelete(id: number): void {
    // todo delete
    let found: Boolean = false;
    todoList.forEach(index => {
        if (index.id === id) {
            return found = true
        }
    })
    // 
    if (found == false) return
    // Remove an item from an array
    todoList = todoList.filter(index => index.id != id);
    // localStorage
    localStorage.setItem('data', JSON.stringify(todoList));
    // Clear the list
    list!.innerHTML = '';
    // Re-add todo
    todoList.forEach(index => addTodo(index));

}

// Comleted
function todoComplete(items: TypeData):void {
    let item: TypeData = items;
    todoList.forEach(index => {
        if (index.id == item.id) {
            // Remove an item from an array
            todoList = todoList.filter(index => index.id != item.id);
            // completed
            index.completed = true;
            // Clear the list
            list!.innerHTML = '';
            // Re-add todo
            todoList.forEach(index => addTodo(index));
            return
        }
    })

    // Add to the end of the list
    todoList.push(item);
    addTodo(item);
    document.querySelector(`#card-${item.id}`)?.classList.add('complete');

    
    // Add to the localStorage
    localStorage.setItem('data', JSON.stringify(todoList));
}