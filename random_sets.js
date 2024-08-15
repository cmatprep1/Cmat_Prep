document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('practice-now');
    const pages = [
        'set_2012.html',
        'set_2014.html',
        'set_2016.html',
        'set_2017.html',
        'set_2018.html',
        'set_2019.html',
        'set_2020.html'
    ];

    button.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * pages.length);
        const selectedPage = pages[randomIndex];
        window.location.href = selectedPage;
    });
});
