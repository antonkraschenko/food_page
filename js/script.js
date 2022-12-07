'use strick';


window.addEventListener('DOMContentLoaded', () => {

    const tabsWrapper = document.querySelector('.tabheader__items');
    const tabs = tabsWrapper.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');


    function hiddenActiv() {

        tabsContent.forEach( item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    hiddenActiv();
});


