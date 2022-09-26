const user = {
    name: '',
    tinggiBadan: null,
    beratBadan: null,
    bmiSkor: null,
    status: null
}

let resetButton = document.querySelector('.reset');
let form = document.getElementById('form');
let displayBox = document.querySelectorAll('.displayBox');
let gender = document.querySelector('.jenis-kelamin');
let navButton = document.querySelector('.nav-toggle');
let nav = document.querySelector('.mobileNav');
let hiddenNav = document.querySelectorAll('.mobileNav a');

function getInput(obj, property, targetId) {
    obj[property] = document.querySelector('#' + targetId).value;
}

function resetUser() {
    user.name = '';
    user.tinggiBadan = null;
    user.beratBadan = null;
    user.bmi = null;
    user.status = null;
    form.reset();
}

function perfromCalculation(tinggi, berat) {
    let count = tinggi / 100;
    let skor = berat / (count * count);
    user.bmiSkor = skor.toFixed(1);
    
    if (skor <= 18.5) {
        user.status = 'Kekurangan Berat';
    } else if (skor > 18.5 && skor <= 25) {
        user.status = 'Normal';
        document.querySelector('.displayStatus').style.color = 'green';
        document.querySelector('.displayBmi').style.color = 'green';
    } else if (skor > 25) {
        user.status = 'Kelebihan Berat';
    }
}

function updateDisplay() {
    document.querySelector('.tinggi-badan').innerText = user.tinggiBadan;
    document.querySelector('.berat-badan').innerText = user.beratBadan;
    document.querySelector('.displayStatus').innerText = user.status;
    document.querySelector('.displayBmi').innerText = user.bmiSkor + ' ' + user.status;
}

function displayContainer(obj) {
    obj.forEach(function(target) {
        let hasClass = !target.classList.contains('hidden');

        if (hasClass) {
            target.classList.add('hidden');
        } else {
            target.classList.remove('hidden');
        }
    })
}

navButton.addEventListener('click', function() {
    let hasClass = !nav.classList.contains('hidden');
    
    if (hasClass) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }
})

hiddenNav.forEach(function (target) {
    target.addEventListener('click', function() {
        let hasClass = !nav.classList.contains('hidden');
    
        if (hasClass) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
    })
})

resetButton.addEventListener('click', function() {
    resetUser();

    displayContainer(displayBox);
})

form.addEventListener('submit', function(event) {
    event.preventDefault();

    getInput(user, 'name', 'nama');
    getInput(user, 'tinggiBadan', 'tinggiBadan');
    getInput(user, 'beratBadan', 'beratBadan');

    perfromCalculation(user.tinggiBadan, user.beratBadan);
    updateDisplay();

    displayContainer(displayBox);
})
