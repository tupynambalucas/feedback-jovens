// FORM

var Botao = document.getElementById('Botao')
var Comentario = document.getElementById("Comentario")
Comentario.addEventListener('focus', function(){
    autosize(Necessidade);
});
Botao.addEventListener("click",(e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/add-comentario', {
        Comentario: Comentario.value,
        Data: new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });
})
var feedback = document.getElementById('feedback')
var Form = document.getElementById('form')
var Fechar = document.getElementById('fechar')
var Abrir = document.getElementById('abrir')
window.addEventListener("click",(e) => {
    let target = e.target.id
    if (target==Abrir.id) {
        Form.style.display ='block'
        feedback.style.display ='none'
        animateCSS('#form', 'fadeInUp');
    }
    if (target==Fechar.id) {
        animateCSS('#form', 'fadeOutRight').then((message) => {
            Form.style.display = 'none' 
            feedback.style.display ='block'
        });
    }

})