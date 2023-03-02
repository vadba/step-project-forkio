const mobileMenu = document.querySelector('.mobile-menu-icon');
const mobileMenuContent = document.querySelector('.mobile-menu-content');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active-mobile');
    if (!mobileMenuContent.classList.contains('show')) {
        mobileMenuContent.classList.remove('hide');
        mobileMenuContent.classList.add('show');
    } else {
        mobileMenuContent.classList.remove('show');
        mobileMenuContent.classList.add('hide');
    }
});






function featuresSetImg() {
    const featuresImgwrapper = document.querySelector('.features__image-wrapper');
    const featuresTitle = document.querySelector('.features__tittle');

    window.addEventListener('resize', featuresImgwrapperSet);

    function featuresImgwrapperSet() {
        if (document.body.clientWidth >= 992) {
            featuresImgwrapper.style.top = `${featuresTitle.offsetTop + featuresTitle.offsetHeight + 19}px`;
            featuresImgwrapper.style.left = `${featuresTitle.offsetLeft}px`;
        } else {
            featuresImgwrapper.style.top = ``;
            featuresImgwrapper.style.left = ``;
        }
    }
    featuresImgwrapperSet();
}
featuresSetImg();