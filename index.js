// Creating database structure
const db = new Dexie('PerfectBill');
db.version(2).stores({ products: '++id, quantity, product, price' });
db.version(2).stores({ friends: '++id, name' });

const productForm = document.querySelector("#product-form");
const quantityInput = document.querySelector("#quantity");
const productInput = document.querySelector("#product");
const priceInput = document.querySelector("#price");
const productList = document.querySelector("#product-list");

const friendForm = document.querySelector("#friend-form");
const nameInput = document.querySelector("#name");
const friendList = document.querySelector("#friend-list");

// Add Product
productForm.onsubmit = async (event) => {
    event.preventDefault();
    const quantity = quantityInput.value;
    const product = productInput.value;
    const price = priceInput.value;
    await db.products.add({ quantity, product, price });
    await getProducts();
    productForm.reset();
};

// Add Friend
friendForm.onsubmit = async (event) => {
    event.preventDefault();
    const name = nameInput.value;
    await db.friends.add({ name });
    await getFriends();
    friendForm.reset();
};

// Display products
const getProducts = async () => {
    const allProducts = await db.products.orderBy('id').reverse().toArray();
    productList.innerHTML = allProducts.map(product => `
        
    <tr>
        <td><input type="submit" id="product-submit" value="+" /></td>
        <td>${product.product}</td>
        <td>
            <ul>
            <li>Pizza</li>
            <li>Chicken</li>
            </ul>

        </td>
        <td>${product.price}</td>
        <td><button class="delete" onclick="deleteProduct(event, ${product.id})">Delete</button></td>
    </tr>
    `).join("");
};

// Display friends
const getFriends = async () => {
    const allFriends = await db.friends.orderBy('id').reverse().toArray();
    friendList.innerHTML = allFriends.map(friend => `
        
    <tr>
        <td><input type="submit" id="product-submit" value="+" /></td>
        <td>${friend.name}</td>
        <td><button class="delete" onclick="deleteFriend(event, ${friend.id})">Delete</button></td>
        </div>
    </div>
    `).join("");
};

// On load, load products and friends
window.onload = function(){
    // All code comes here 
    getProducts();
    getFriends();
}

// Delete product
const deleteProduct = async (event, id) => {
    await db.products.delete(id);
    await getProducts();
};

// Delete friend
const deleteFriend = async (event, id) => {
    await db.friends.delete(id);
    await getFriends();
};
