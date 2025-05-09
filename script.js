const cards = document.querySelectorAll('.card');
const categories = document.querySelectorAll('.category');

cards.forEach(card => {
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', card.outerHTML);
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
});

categories.forEach(cat => {
  cat.addEventListener('dragover', e => {
    e.preventDefault();
  });

  cat.addEventListener('drop', e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;
    const newCard = tempDiv.firstChild;
    newCard.classList.remove('dragging');
    cat.appendChild(newCard);
    addDragListeners(newCard);
  });
});

function addDragListeners(card) {
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', card.outerHTML);
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
}

document.getElementById('submit-btn').addEventListener('click', () => {
  let correct = 0;
  document.querySelectorAll('.card').forEach(card => {
    const category = card.parentElement.id;
    const expected = card.getAttribute('data-category');
    if (category === expected) correct++;
  });

  const total = document.querySelectorAll('.card').length;
  const feedback = document.getElementById('feedback');
  if (correct === total) {
    feedback.innerText = "✅ Alles staat op de juiste plek!";
    feedback.style.color = "green";
  } else {
    feedback.innerText = "❌ Niet alles staat goed. Probeer opnieuw.";
    feedback.style.color = "red";
  }
});
