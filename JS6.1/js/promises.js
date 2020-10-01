let btn = document.querySelector('button');

// btn.addEventListener('click', function () {
//     let users = getUsers();
//     if (users !== undefined) {
//         // on peut faire qqchose
//     } else {
//         users = getUsers();
//         if (users !== undefined) {
//             // on peut faire quelque chose
//         } else {
//             let noUsers = anotherFunction();
//             if (noUsers !== undefined) {
//                 //
//             } else {
//                 //
//             }
//         }
//     }
// });

// btn.addEventListener('click', function () {
//     let users = getUsers();
//     if (users !== undefined) {
//         // on peut faire qqchose
//     } else {
//         users = getUsers();
//         if (users !== undefined) {
//             // on peut faire quelque chose
//         } else {
//             let noUsers = anotherFunction();
//             if (noUsers !== undefined) {
//                 //
//             } else {
//                 //
//             }
//         }
//     }
// });
// btn.addEventListener('click', function () {
//     getUsers()
//         .then(res => console.log(res))
//         .catch(err => console.error(err));
//
//     console.log('promesse finie');
// });

btn.addEventListener('click', async function () {
    await getUsers()
        .then(res => console.log(res))
        .catch(err => console.error(err.message));

    console.log('promesse finie'); // Ne s'exécute pas tant que le code avant n'est pas fini.
});

async function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (localStorage.getItem('users') === null) {
                reject(new Error('users is null'));
            }
            resolve(localStorage.getItem('users'));
        }, 1000);
    });
}
