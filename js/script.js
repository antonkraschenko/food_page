'use strick';


window.addEventListener('DOMContentLoaded', () => {

    const tabsWrapper = document.querySelector('.tabheader__items');
    const tabs = tabsWrapper.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');


    function hiddenActive() {

        tabsContent.forEach( item => {
            // item.style.display = 'none';
            item.classList.add('hidden', 'fade');
            item.classList.remove('active');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showActive(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hidden');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if (item == target) {
                    hiddenActive();
                    showActive(i);
                }
            });
        }
    });

    hiddenActive();
    showActive();



    // Set Timer 

    const deadline = '2022-12-31';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if ( t <=0 ){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {

        days = Math.floor(t / (1000 * 60 * 60 * 24));
        hours = Math.floor(t / (1000 * 60 *60) % 24);
        minutes = Math.floor(t / (1000 * 60) % 60);
        seconds = Math.floor((t / 1000) % 60);
        }

        return {
            't': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function setClock(selector, endtime) {

        const timerWrapper = document.querySelector(selector);
        const days = timerWrapper.querySelector('#days');
        const hours = timerWrapper.querySelector('#hours');
        const minutes = timerWrapper.querySelector('#minutes');
        const seconds = timerWrapper.querySelector('#seconds');
        const timer = setInterval(updateClock, 1000);
        

        updateClock();

        function updateClock() {

            const t = getTimeRemaining(endtime);

            function getZero(num) {
                if ( num >= 0 && num < 10) {
                    return '0' + num;
                } else { 
                    return num;
                }
            }
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.t <= 0) {
                clearInterval(timer);
            } 
        }
    }


    setClock('.timer', deadline);


    // Make modal window 

    const btnModal = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');


    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // clear show modal if it showed once
        clearTimeout(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }


    // Show modal window
    btnModal.forEach(btn => {
        btn.addEventListener('click', showModal);
    });


    //show modal in time 
    const modalTimerId = setTimeout(showModal, 20000000);


    // showmodal by scrol
    function showModalByScrol() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalByScrol);
        }
    }
    window.addEventListener('scroll', showModalByScrol);


    // close click modal
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // close click Escape
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();

        }
    });

    // Class for card 

    class Card {
        constructor(srcImg, alt, title, descr, price, parent, ...classes) {
            this.srcImg = srcImg;
            this.imgName = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.parent = document.querySelector(parent);
            this.price = price;
            this.transfer = 27;
            this.changeToUah();
        }

        changeToUah() {
            this.price = this.price * this.transfer;
        }

        render() {
            const div = document.createElement('div');
            
            // проверка на классы если нет то добавляем дефолтный, так же есть возможность передать через рест оператор

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                div.classList.add(this.classes);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            
            // вариант без передачи класса в аргумент
            // div.classList.add('menu__item');

            div.innerHTML = `
                <img src="${this.srcImg}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}”</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(div);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            // отлавливаем ошибку, так как fetch может ее пропустить
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);   
        }

        return await res.json();
    };
    getResource('http://localhost:3000/menu')
    .then(data => {
        // перебераем каждый елемент масива и делаем деструктуризацию данных
        data.forEach(({img, altimg, title, descr, price}) => {
            new Card(img, altimg, title, descr, price, '.menu__field .container').render();
        });
    });



/* jshint ignore:start */

    // старый вариант ревлизации карточек на сайте, выше новы с получением данных с сервера 

    // new Card(
    //     "img/tabs/vegy.jpg",
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu__field .container',
    //     'menu__item'
    // ).render();

/* jshint ignore:end */

    // First variant
    // Sending the forms 

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    const postData = async (url, data) => {
        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await req.json();
    };
   

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('message');
            statusMessage.innerText = message.loading;
            form.append(statusMessage);
           
            const formData = new FormData(form);

            // const object = {};                // old method transform from FormData in obj
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();

            });
        });
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hidden');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(()=>{
            thanksModal.remove();
            prevModal.classList.remove('hidden');
            prevModal.classList.add('show');
            closeModal();
        }, 4000);

    }

    // SLIDER

    const slides = document.querySelectorAll('.offer__slide');
    const next = document.querySelector('.offer__slider-next');
    const prev = document.querySelector('.offer__slider-prev');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');

    let slideIndex = 1;

    function showSlide(n) {

        if ( n > slides.length ) {
            slideIndex = 1;
        }

        if( n < 1 ) {
            slideIndex = slides.length;
        }

        slides.forEach( item => item.classList.add('hidden'));
        slides[slideIndex - 1].classList.remove('hidden');

        currentSlide(slideIndex);
    }
    
    function currentSlide(n) {
        if (n > 10) {
            current.textContent = slideIndex;
        } else  {
            current.textContent = `0${slideIndex}`;
        }
    }

    function totalSlide(n) {
        if (n.length > 9) {
            total.textContent = n.length;
        } else {
            total.textContent = `0${n.length}`;
        }
    }

    next.addEventListener('click', () => {
        showSlide(++slideIndex);
    });

    prev.addEventListener('click', () => {
        showSlide(--slideIndex);
    });

    // call
    
    showSlide(slideIndex);
    totalSlide(slides);
    
});

