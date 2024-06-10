let logoutbtn = document.getElementById('logout') as HTMLDivElement;

logoutbtn.addEventListener('click', ()=> {
    localStorage.clear()

    window.location.href ="log.html"
})