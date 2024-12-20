const cards = document.querySelectorAll('.card');
const workerLists = document.querySelectorAll('.worker-list');
const closeBtns = document.querySelectorAll('.close-btn');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const targetId = card.dataset.target;
        const targetList = document.querySelector(targetId);
        targetList.style.display = 'flex';
    });
});
closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
      const workerList = btn.closest('.worker-list');
      workerList.style.display = 'none';
  });
});
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}

const workers = [
  {src: "pictures/crim1.png", alt: "Worker 1", name: "John Doe", phone: "123-456-7890", email: "john@example.com"},
  {src: "pictures/crim2.png", alt: "Worker 2", name: "Jane Smith", phone: "234-567-8901", email: "jane@example.com"},
  {src: "pictures/security.png", alt: "Worker 3", name: "Mike Johnson", phone: "345-678-9012", email: "mike@example.com"}
];

let currentIndex = 0;

function getNextWorker() {
  currentIndex = (currentIndex + 1) % workers.length;
  return workers[currentIndex];
}

function getPrevWorker() {
  currentIndex = (currentIndex - 1 + workers.length) % workers.length;
  return workers[currentIndex];
}

function next() {
  const newNextElement = $(".new-next");
  if (newNextElement) {
    newNextElement.remove();
  }

  $$("li").forEach(li => {
    if (li.classList.contains("next")) {
      li.classList.remove("next");
      li.classList.add("new-next");
    } else if (li.classList.contains("act")) {
      li.classList.remove("act");
      li.classList.add("next");
    } else if (li.classList.contains("prev")) {
      li.classList.remove("prev");
      li.classList.add("act");
    } else if (li.classList.contains("hide")) {
      li.classList.remove("hide");
      li.classList.add("prev");
    }
  });

  const nextWorker = getNextWorker();
  const addedEl = document.createElement('li');
  const img = document.createElement('img');
  img.src = nextWorker.src;
  img.alt = nextWorker.alt;
  img.dataset.name = nextWorker.name;
  addedEl.appendChild(img);

  $(".list").insertBefore(addedEl, $(".list").firstChild);
  addedEl.classList.add("hide");
}

function prev() {
  $(".hide").remove();

  $$("li").forEach(li => {
    if (li.classList.contains("prev")) {
      li.classList.remove("prev");
      li.classList.add("hide");
    } else if (li.classList.contains("act")) {
      li.classList.remove("act");
      li.classList.add("prev");
    } else if (li.classList.contains("next")) {
      li.classList.remove("next");
      li.classList.add("act");
    } else if (li.classList.contains("new-next")) {
      li.classList.remove("new-next");
      li.classList.add("next");
    }
  });

  const prevWorker = getPrevWorker();
  const addedEl = document.createElement('li');
  const img = document.createElement('img');
  img.src = prevWorker.src;
  img.alt = prevWorker.alt;
  img.dataset.name = prevWorker.name;
  addedEl.appendChild(img);

  $(".list").appendChild(addedEl);
  addedEl.classList.add("next", "new-next");
}

$(".list").addEventListener("click", function (event) {
  const clickedItem = event.target.closest("li");
  if (clickedItem && clickedItem.classList.contains("next")) {
    prev();
  } else if (clickedItem && clickedItem.classList.contains("prev")) {
    next();
  } else if (clickedItem && clickedItem.classList.contains("act")) {
    const workerName = clickedItem.querySelector('img').dataset.name;
    const workerImage = clickedItem.querySelector('img').src;
    showWorkerDetails(workerName, workerImage);
  }
});

const hammer = new Hammer($(".swipe"));
hammer.on("swipeleft", prev);
hammer.on("swiperight", next);

function showWorkerDetails(name, imageSrc) {
  $(".loading").style.display = 'block';
  setTimeout(() => {
    const worker = workers.find(w => w.name === name);
    $("#workerName").textContent = worker.name;
    $("#selectedWorkerImage").src = imageSrc;
    $("#workerPhone").textContent = worker.phone;
    $("#workerEmail").textContent = worker.email;
    $(".loading").style.display = 'none';
  }, 500);
}

$(".close-btn").addEventListener("click", () => {
  $("#bhw-list").style.display = 'none';
});

$("#bhw-card").addEventListener("click", () => {
  $("#bhw-list").style.display = 'flex';
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if ($("#bhw-list").style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      next();
    } else if (e.key === 'ArrowRight') {
      prev();
    } else if (e.key === 'Escape') {
      $("#bhw-list").style.display = 'none';
    }
  }
});

// Initialize worker details
showWorkerDetails(workers[currentIndex].name, workers[currentIndex].src);

