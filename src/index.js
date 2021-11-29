let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getAllToys()
  
});

//fetch requests
function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderOneToy(toy))) 
}

function addNewToy(toyObject){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(toyObject)
  })
  .then(res => res.json())
}

function updateToy(toyObject){
  fetch(`http://localhost:3000/toys/${toyObject.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(toyObject)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}



//renderers

function renderOneToy(toy){
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} Like(s) </p>
    <button class="like-btn" id="${toy.id}">Like <3</button>
  `
  card.querySelector('.like-btn').addEventListener('click', () => {
    let addedLikes = ++toy.likes
    card.querySelector('p').textContent = `${addedLikes} Like(s) `
    updateToy(toy)
  })

document.getElementById('toy-collection').appendChild(card)
}

//event listeners
document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)


//event handlers
function handleSubmit(e){
  e.preventDefault()
  let toyObject = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  }
  renderOneToy(toyObject)
  addNewToy(toyObject)
}





