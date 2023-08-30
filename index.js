document.addEventListener('DOMContentLoaded', () => {
    cuadricula('');
});

function cuadricula (valor){
    let pintar = false;
    // llama al div que contendra la cuadricula
    const cl16 = document.querySelector('.container');

    // verifica si se le paso un valor 
    if(valor === '') valor = 256;
    else{ 
        valor *=valor ;
        cl16.innerHTML='';
    } 

        // crear los nuevos divs
    // Y añadir su contenido
    const contenDiv = [];
    for (let i = 0; i < valor; i++) {

        let oneDiv = document.createElement("div");
        contenDiv[i]= oneDiv;

    }

    // verifica cual es el div que hay que pintar
    function fHover(e){
        if(pintar){
            e.target.style.backgroundColor = 'black';
        }
    }
    // agrega divs al contendedor
    contenDiv.forEach((e) => cl16.appendChild(e));

    // enventos del div
    cl16.addEventListener('mousedown',() => pintar = true);
    cl16.addEventListener('mouseup',() => pintar = false);
    cl16.addEventListener('mousemove',fHover);
};

// funcion para cammbiar la escala de la cudricula la cuadricula
function tamano(){
    let valor ;
    valor = window.prompt("Configura un tamaño para la cuadricula");
    valor = Number(valor);
    if(isNaN(valor)){
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            html: 'Solo se admiten  <b>Numeros</b>',
        })
    }else cuadricula(valor);
}


