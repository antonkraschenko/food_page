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


    const deadline = '2022-12-09';

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




    































    // const deadline = '2022-12-31';

    // function getTimeRemaining(endtime) {
    //     const dateNow = new Date();
    //     let t = Date.parse(endtime) - Date.parse(dateNow);

    //     const days = Math.floor(t / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor(t / (1000 * 60 * 60) % 24);
    //     const minutes = Math.floor(t / (1000 * 60) % 60);
    //     const seconds = Math.floor((t / 1000) % 60);

    //     return {
    //         'total': t,
    //         'days': days,
    //         'hours': hours,
    //         'minutes': minutes,
    //         'seconds': seconds
    //     };
    // }

    // function setClock(selector, endtime) {
    //     const timer = document.querySelector(selector);
    //     const days = timer.querySelector('#days');
    //     const hours = timer.querySelector('#hours');
    //     const minutes = timer.querySelector('#minutes');
    //     const seconds = timer.querySelector('#seconds');
        
    //     const timeInterval = setInterval(updateClock, 1000);
        
    //     updateClock();

    //     function updateClock() {
    //         const t = getTimeRemaining(endtime);

    //         function getZero(num) {
                
    //             if( num >= 0 && num < 10) {
    //                 return '0' + num;
    //             } else {
    //                 return num;
    //             }

    //         }

    //         days.innerHTML = t.days;
    //         hours.innerHTML = getZero(t.hours);
    //         minutes.innerHTML = t.minutes;
    //         seconds.innerHTML = t.seconds;

    //         if (t.total <= 0) {
    //             clearInterval(timeInterval);
    //         } 
    //     }

    // }

    // setClock('.timer', deadline);
    

});

