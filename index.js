document.addEventListener('DOMContentLoaded', () => {
    cuadricula(''); pintar('negro');
});

//// variable ppara indicar cuando pintar yb cuando dedjar de pintar
let eventac = false;
/// variable para indentificar cual boton esta oprimido|
let tipeButton = null;
// div que contiene la cuadricula
const cl16 = document.querySelector('.container');
//// evento que indica que se puede pintar
cl16.addEventListener('mousedown',(e) => {
  eventac = true;
  fHover(e);
});
// evento para cuando deje de oprimir el mouse el clic deje de pintar
cl16.addEventListener('mouseup',(e) => {
  eventac = false;
});
// eventoque pintara mientras este oprimido el boton del mouse
cl16.addEventListener('mouseover',(e) => {
  fHover(e);
});
////// evitamos con eset evneto que los divs se puedan arrastrar
cl16.addEventListener('dragstart', (e) => {
  e.preventDefault();
});
///funcion para crear las cuadriculas
function cuadricula (valor){
  // verifica si se le paso un valor o si se inicoo en blacno
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
  contenDiv.forEach((e) => {
    cl16.appendChild(e)
  });
};
//// funcion que se encargar de pintar  los div dependiendo del boton presioando
function fHover(e){
  if(eventac && tipeButton == 'negro'){
    e.target.style.backgroundColor = '#000000';
  }
  else if(eventac && tipeButton == 'ramdon'){
    e.target.style.backgroundColor = generarNuevoColor();
  }
  else if(eventac && tipeButton == 'borrador'){
    e.target.style.backgroundColor = '#FFFFFF';
  }
  else if(eventac && tipeButton == 'shadow'){
    newcolor = shadowF(e,'S');
    e.target.style.backgroundColor = newcolor;
  }
  else if(eventac && tipeButton == 'light'){
    newcolor = shadowF(e,'L');
    e.target.style.backgroundColor = newcolor;
  }
}

// funcion para cambiar la escala de la cudricula
function tamano(){
    let valor ;
    valor = window.prompt("Configura un tamaño para la cuadricula");
    valor = Number(valor);
    if(isNaN(valor)){
      // alerta personalizada con la libreria de swager
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        html: 'Solo se admiten  <b>Numeros</b>',
      })
    }else {
      if(valor > 4 && valor < 100){
        // pasamos los parametros que tendra la nueva cuadricula
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
/// indicamos que tipo de button esta oprimido
function pintar(val){
  tipeButton = val;
}
// funcion para pintar la cuadricula para el color negro , el alcoiris
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
    container.childNodes.forEach((e)=>e.style.backgroundColor='#FFFFFF');
}
/// funcion para oscurecer el color y para aclararlo 
function shadowF(e,b){
  // colorAct = rgbToHex(e.target.style.backgroundColor);
  ///traemos el color de fondo
  colorAct = window.getComputedStyle(e.target).backgroundColor;
  ///poder extraer los valores del color rgb
  const rgbaValues = colorAct.match(/\d+(\.\d+)?/g);
  ///// condicional para mirar si es para sombria o aclarecer
  //recorre los valores y suma o resta dependiendo si es para osucrecer o iluminar poco a poco
  if(b == 'L'){
    if(rgbaValues[0] == 255){
      return colorAct;
    }
    else{
      for (let i = 0; i < 3; i++) {
        rgbaValues[i] = parseFloat(rgbaValues[i]) + 25.5;
      }
      colorAct = `rgb(${rgbaValues[0]},${rgbaValues[1]},${rgbaValues[2]})`;
      return colorAct ; 
    }
  }
  else {
    if(rgbaValues[0] == 0){
      return colorAct;
    }
    else{
      for (let i = 0; i < 3; i++) {
        rgbaValues[i] -= 25.5;
      }
      colorAct = `rgb(${rgbaValues[0]},${rgbaValues[1]},${rgbaValues[2]})`;
      return colorAct ; 
    }
  }
}