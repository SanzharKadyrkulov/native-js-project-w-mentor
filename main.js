//? АПИ для запросов
const API = 'http://localhost:8000/products';

//? блок куда мы добавляем карточки
const list = document.querySelector('#products-list');

const addForm = document.querySelector('#add-form');
const titleInp = document.querySelector('#title');
const priceInp = document.querySelector('#price');
const descriptionInp = document.querySelector('#description');
const imageInp = document.querySelector('#image');

getProducts();

//? Стягиваем данные с сервера
async function getProducts() {
	const res = await fetch(API);
	const data = await res.json(); // ? расшивровка данных
	//? отображаем актуальные данные
	render(data);
}

async function addProducts(product) {
	await fetch(API, {
		method: 'POST',
		body: JSON.stringify(product),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	getProducts();
}

//? отображаем на странице
function render(arr) {
	//? очищаем чтобы карточки не дублировались
	list.innerHTML = '';
	arr.forEach((item) => {
		list.innerHTML += `
		<div class="card m-5" style="width: 18rem">
			<img
				src="${item.image}"
				class="card-img-top"
				alt="..."
			/>
			<div class="card-body">
				<h5 class="card-title">${item.title}</h5>
				<p class="card-text">${item.description.slice(0, 70)}...</p>
				<p class="card-text">$ ${item.price}</p>
				<button id="${item.id}" class="btn btn-danger btn-delete">DELETE</button>
				<button id="${item.id}" class="btn btn-dark btn-edit">EDIT</button>
			</div>
		</div>`;
	});
}

addForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (
		!titleInp.value.trim() ||
		!priceInp.value.trim() ||
		!descriptionInp.value.trim() ||
		!imageInp.value.trim()
	) {
		alert('Заполните все поля');
		return;
	}

	const product = {
		title: titleInp.value,
		price: priceInp.value,
		description: descriptionInp.value,
		image: imageInp.value,
	};
	addProducts(product);

	titleInp.value = '';
	priceInp.value = '';
	descriptionInp.value = '';
	imageInp.value = '';
});
