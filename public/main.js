let update = document.getElementById('update')

update.addEventListener('click', () => {
    fetch('errands', {
        method: 'put',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            'errand_name':"Gandalf",
            "details":"wizard man"
        })
    })
    .then(response =>{
        if (response.ok) {
            return response.json()
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('DATA',data)
    })
    .catch(error => {
        console.log(error)
    })
})
