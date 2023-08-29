window.onload = cuadricula;

function cuadricula (){
    let pintar = false;


    function fHover(e){
        if(pintar){
            e.target.style.backgroundColor = 'black';
        }
    }



    // crear los nuevos divs
    // Y a;adir su contenido
    const contenDiv = [];
    for (let i = 0; i < 256; i++) {

        let oneDiv = document.createElement("div");
        contenDiv[i]= oneDiv;

    }
    let cl16 = document.querySelector('.container');
    contenDiv.forEach((e) => cl16.appendChild(e));


    cl16.addEventListener('mousedown',() => pintar = true);
    cl16.addEventListener('mouseup',() => pintar = false);
    cl16.addEventListener('mousemove',fHover);
};


