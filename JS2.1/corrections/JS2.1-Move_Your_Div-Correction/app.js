/* Exercice - Move Your Div

Déplacer une div sur quatre points cardinaux quand on clique un bouton.  
Quand la div revient à son point d'origine, un modal s'affiche.  
Le modal disparait lorsqu'on recommence le cycle.  
Un deuxième bouton doit servir à masquer le modal.

*/
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#moveDiv');
    const div = document.querySelector('.red');
    const modal = document.querySelector('.modal');
    let clickCount = 0;

    btn.addEventListener('click', function () {
        if (clickCount > 3) {
            clickCount = 0;
        }
        clickCount++;
        moveDiv(div, modal, clickCount);
    });

    document.getElementById('hideModal').addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-active');
    });
});

function moveDiv(div, modal, clickCount) {
    switch (clickCount) {
        case 1:
            modal.classList.remove('active');
            document.body.classList.remove('modal-active');
            div.style.marginLeft = '90%';
            break;
        case 2:
            div.style.marginTop = '200px';
            break;
        case 3:
            div.style.marginLeft = '0';
            break;
        default:
            div.style.marginTop = '0';
            modal.classList.add('active');
            document.body.classList.add('modal-active');
            break;
    }
}
