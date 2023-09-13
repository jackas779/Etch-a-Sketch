document.addEventListener('DOMContentLoaded', () => {
    cuadricula(''); pintar('negro');
});

function cuadricula (valor){
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
    // agrega divs al contendedor
    contenDiv.forEach((e) => cl16.appendChild(e));
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
    }else {
        if(valor > 4 && valor < 100){
            cuadricula(valor)
            let divs = document.querySelectorAll('.container div');
            let porcen = (valor*100)/(valor*valor);
            divs.forEach((e)=> e.style.width=`${porcen}%`);
        }
        else {
            Swal.fire({
            icon: 'error',
            title: 'Error...',
            html: 'Solo se admiten numeros mayores a <b>4</b> y <br> menores a <b>100</b>',
            })
        }
    }
}


// funcion para pintar la cuadricula para el color negro y el alcoiris y el borrador

function pintar(val){
    /// incializamos en falso para que no marque por que si
    let pintar = false;

    // verifica cual es el div que hay que pintar
    function fHover(e){
        if(pintar && val == 'negro'){
            e.target.style.backgroundColor = 'black';
        }
        else if(pintar && val == 'ramdon'){
            e.target.style.backgroundColor = generarNuevoColor();
        }
        else if(pintar && val == 'borrador'){
            e.target.style.backgroundColor = 'bisque';
        }
    }

    // llama al div que contendra la cuadricula
    const cl16 = document.querySelector('.container');

    // enventos del div
    cl16.addEventListener('mousedown',() => pintar = true);
    cl16.addEventListener('mouseup',() => pintar = false);
    cl16.addEventListener('mousemove',fHover);
}

/// funcion para crear colores. 
function generarNuevoColor(){
	var simbolos, color;
	simbolos = "0123456789ABCDEF";
	color = "#";

	for(var i = 0; i < 6; i++){
		color = color + simbolos[Math.floor(Math.random() * 16)];
	}
    return color;
}

/// funcion para limpiar la cuadricula sin volver a cargarla

function erasedAll(){
    const container = document.querySelector('.container');
    container.childNodes.forEach((e)=>e.style.backgroundColor='bisque');
}
