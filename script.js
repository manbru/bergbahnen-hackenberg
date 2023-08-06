// Events Toggle

function toggle(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    div.classList.toggle('active');
}

// Events Quantity

function increase(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    if(div.value < 30) {
        div.value++;
    }
}

function decrease(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    if (div.value > 0) {
        div.value--;
    }
}