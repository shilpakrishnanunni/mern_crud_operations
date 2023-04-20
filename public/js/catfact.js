let getCatFact = document.getElementById('get-catfact-btn')

getCatFact.addEventListener('click', async () => {
    try {
        const response = await fetch('/catfacts/find');
        if (response.ok) {
            const text = await response.text()
            document.getElementById('catfact-p').innerHTML = text;
            // return response.text()
        }
    } catch (error) {
        console.log('fetch error', error)
    }
});








