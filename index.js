// Creating database structure
const db = new Dexie('Todo App');
db.version(1).stores({ todos: '++id, quantity, product, price' });

const form = document.querySelector("#form");
const quantityInput = document.querySelector("#quantity");
const productInput = document.querySelector("#product");
const priceInput = document.querySelector("#price");
const list_el = document.querySelector("#tasks");

// Add todo
form.onsubmit = async (event) => {
	event.preventDefault();
	const quantity = quantityInput.value;
	const product = productInput.value;
	const price = priceInput.value;
	await db.todos.add({ quantity, product, price });
	await getTodos();
	form.reset();
};

// Display todos
const getTodos = async () => {
    const allTodos = await db.todos.orderBy('id').reverse().toArray();
    list_el.innerHTML = allTodos.map(todo => `
        
    <div class="task">
        <div class="content">
            <span>Quantity: ${todo.quantity}</span>
            <span>product: ${todo.product}</span>
            <span>Price: ${todo.price}</span>
        </div>
        <div class="actions">
            <button class="delete" onclick="deleteTodo(event, ${todo.id})">Delete</button>
        </div>
    </div>
    `).join("");
};

window.onload = getTodos;

// Delete todo
const deleteTodo = async (event, id) => {
    await db.todos.delete(id);
    await getTodos();
};
