const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('signup') === 'success') {
    $('.modal').modal();
}