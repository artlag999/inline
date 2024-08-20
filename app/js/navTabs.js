let pages = Array.from(document.querySelectorAll('[data-page]'))
let navTabs = Array.from(document.querySelectorAll('[data-nav]'))

navTabs.forEach(navEl => {
    navEl.addEventListener('click', (e)=>{
        e.preventDefault()
        let param = e.currentTarget.dataset.nav
        navTabs.forEach(navEl => {
            navEl.classList.remove('nav__link--active')
        })
        navEl.classList.toggle('nav__link--active')
        pages.forEach(page => {
            page.classList.remove('section--active')
        })
        document.querySelectorAll(`[data-page="${param}`).forEach(i => {i.classList.add("section--active")})
    })
})