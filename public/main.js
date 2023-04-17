let del = document.getElementById('delete');
let update = document.getElementById('update');

update.addEventListener('click', () => {
    console.log('llllllll')
    let updateErrandName = document.getElementById('update_name_input').value
    let updateDetails = document.getElementById('update_details').value
    fetch('errands', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'old_errand_name':updateErrandName,
            // 'new_errand_name': "Gandalf2",
            "details":updateDetails 
        })
    })
        .then((response) => {
            if (response.ok) {
                console.log(`kkkkkkkkkkk`)
                window.location.reload()
                return response.json()
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('DATA', data)
        })
        .catch(error => {
            console.log('error in main.js: ',error)
        })
})

del.addEventListener('click', () => {
    fetch('errands', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'errand_name':'Gandalf2'
        })
    })
    .then((res) => {
        window.location.reload()
        // console.log(res)
    })
})