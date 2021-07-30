
function sortable() {
    $("#to-do, #in-progress, #completed").sortable({
        connectWith: ".list",
        placeholder: "ui-sortable-placeholder",
        items: '> div',
        helper: 'clone',

    }).disableSelection();

}

function deleteCard(evt) {
    evt.stopPropagation();

    let card = evt.target.parentNode.parentNode;
    console.log(card)
    card.style.transform = 'scaleX(0)';
    setTimeout(() => {
        card.remove();
    }, 300);
}


function addNewCard() {
    let input = document.getElementById('to-do-input');
    let val = input.value;
    input.value = '';
    if (val !== '') {
        addCardToDom(val, 'to-do');
    }
}


function addCardToDom(title, id) {
    let card = document.createElement('div');

    card.classList.add('list-card');
    card.onclick = (evt) => editCard(evt);
    let icon = document.createElement('i');
    icon.onclick = (evt) => deleteCard(evt);
    icon.className = 'fas fa-trash';
    let cardTitleRow = document.createElement('div');
    cardTitleRow.innerHTML = `<span>${title}</span>`;
    cardTitleRow.appendChild(icon);
    card.appendChild(cardTitleRow)
    card.style.transform = 'scaleX(0)';
    document.getElementById(id).appendChild(card);
    setTimeout(() => {
        card.style.transform = 'scaleX(1)';

    }, 1)
}


function editCard(event) {
    
    let card = event.target;
    let desc = card.children[1] ? card.children[1].innerHTML:'';
    let div = document.createElement('div');
    div.classList.add('edit-card');
    div.innerHTML = (`
            <div class="edit-card-form">
				<h3 class="list-heading">Edit Card</h3>
				<div class="form-group">
					<input spellcheck='false' type="text" id="card-title" value='${card.children[0].children[0].innerText}'>
				</div>
				<div spellcheck='false' class="form-group"><textarea id="card-description" value='${desc}' cols=40" rows="10" placeholder="Description">${desc}</textarea></div>
			</div>`);

    let button = document.createElement('button');
    button.innerHTML = 'Save';
    button.onclick = ()=>onSaveCard(card);
    div.children[0].appendChild(button);
    bg.appendChild(div);
    bg.style.display = 'flex';
}

function onSaveCard(cardInfo){
    console.log(cardInfo);
    let p;
    let title = document.getElementById('card-title').value.trim();
    let description = document.getElementById('card-description').value.trim();

    cardInfo.children[0].children[0].innerText = title;

    if(cardInfo.children[1]){
        cardInfo.children[1].innerHTML = description;
    } 
    else if(description!==''){
        p = document.createElement('p');
        p.innerHTML = description;
        p.className = 'card-description';
        p.style.transform = 'scaleX(0)';
        p.style.transformOrigin = '0%';
        cardInfo.appendChild(p);
        setTimeout(()=>{
        p.style.transform = 'scaleX(1)';
        },0)
    }
    bg.innerHTML = '';
    bg.style.display = 'none';

}

var bg = document.getElementById('bg');
window.onload = function () {
    
    this.bg.style.display = 'none';
    $("input").on("keydown", function search(e) {
        if (e.keyCode == 13) {
            addNewCard();
        }
    });

    sortable();
    addCardToDom('Add new task to list', 'to-do');
    addCardToDom('Learn Backend', 'to-do');
    addCardToDom('Practice DSA', 'to-do');
    addCardToDom('Learn React', 'in-progress');
    addCardToDom('Make mini-project', 'completed');
    addCardToDom('Get Started', 'completed');
}