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
        workerLists.forEach(list => {
            list.style.display = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const workerImages = document.querySelectorAll('.worker-image');
    const workerName = document.getElementById('workerName');

    workerImages.forEach(image => {
        image.addEventListener('click', function() {
            // Remove active class from all images
            workerImages.forEach(img => img.classList.remove('active'));

            // Add active class to the clicked image
            this.classList.add('active');

            // Update worker name
            workerName.textContent = this.getAttribute('data-name');
        });
    });
});