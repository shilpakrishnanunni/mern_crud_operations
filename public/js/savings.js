const savings = document.getElementById('savings-p')

window.onload = async () => {
    try {
    const result = await fetch('/income/display');
    console.log('zzzzzzzzz')
    if (result.ok) {
        const text = await result.text()
        console.log('ggggg',text)
        savings.innerHTML = text;
    }
} catch (error) {
    console.log(error)}
}