window.onload = function () {
let phoneInput = $('#phone');
phoneInput.inputmask({"mask": "375999999999"});

document.getElementById('burger').onclick = function () {
    document.getElementById('burger-menu').classList.remove('d-none');
}

document.getElementById('close').onclick = function () {
    document.getElementById('burger-menu').classList.add('d-none');
}

document.getElementById('legacy-cookie-close').onclick = function () {
    document.getElementById('legacy-cookie-wrap').style.display = 'none';
}

//Gallery script
const galleryBtn = document.getElementById('gallery-button');
const gallery = Array.from(document.querySelectorAll('.gallery-item'));
const galleryAction = document.getElementById('gallery-action');

function openGallery() {
    galleryBtn.addEventListener('click', () => {
        gallery.forEach(item => item.classList.remove('d-none'));
        galleryAction.innerHTML = `<a href="https://www.instagram.com/minskartmakers" class="button button-gallery" id="gallery-button" target="_blank">Смотреть больше</a>`

    })
}

function response() {
    if (window.innerWidth > 1500) {
        gallery.forEach((item, index) => {
            item.classList.add('d-none')
            if (index <= 17) {
                item.classList.remove('d-none')
            }
            openGallery();
        })
    }
}
response();

function response2() {
    if (window.innerWidth < 1500) {
        gallery.forEach((item, index) => {
            item.classList.add('d-none')
            if (index <= 17) {
                item.classList.remove('d-none')
            }
            openGallery();
        })
    }
}
response2();


//Validation of order form
const name = document.getElementById('name');
const phone = document.getElementById('phone')
const call = document.getElementById('call-me');

const orderFormBlock = document.getElementById('order-form-block');
const success = document.getElementById('order-form-title');
const orderForm = document.getElementById('order-form-action');
const orderText = document.getElementById('order-form-text');

const errorName = document.getElementById('error-name')
const errorPhone = document.getElementById('error-phone')

name.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zа-яё\s]/gi, '');
});

phone.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function validationForm() {
    let error = false;
    name.style.border = 'none';
    phone.style.border = 'none';
    errorName.style.display = 'none';
    errorPhone.style.display = 'none';


    if (!name.value) {
        error = true;
        name.style.border = '2px solid red';
        errorName.style.display = 'block';
    }

    if (!phone.value || phone.value.length < 11) {
        phone.style.border = '2px solid red';
        error = true;
        errorPhone.style.display = 'block';
    }

    if (error) {

    } else {
        orderForm.style.display = 'none';
        orderText.style.display = 'none';
        orderFormBlock.style.justifyContent = 'center'
        success.style.textAlign = 'center'
        success.innerText = 'Спасибо за заявку, наш менеджер скоро свяжется с вами';
        orderForm.addEventListener('click', formSend);

        console.log('Спасибо за заявку, наш менеджер скоро свяжется с вами!')

    }
}

call.addEventListener('click', validationForm);

async function formSend(event) {
    event.preventDefault();

    const TOKEN = '7149605143:AAHhC6BaK8NhUw8EUDbko9o9n2rCatyUw-E';
    const CHAT_ID = '-1002109104150';
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    let message = `
       <b>Заявку на сайте заполнил:</b>
       <b>Имя: ${this.userName.value}</b>
       <b>Телефон: ${this.userPhone.value}</b>`;

    const response = await fetch(URI_API, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'html'
        }),
    })

    const result = await response.json();

    if (result.ok) {
        console.log('Форма заполнена успешно')
    } else {
        console.log('В форме есть ошибки')
    }
}

const year = document.getElementById('year');
let now = new Date();
year.innerText = now.getFullYear();

}