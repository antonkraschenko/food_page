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
    const btnClose = document.querySelector('[data-close]');
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


    // close click btn
    btnClose.addEventListener('click', closeModal);


    // close click modal
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // close click Escape
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();

        }
    });
});

