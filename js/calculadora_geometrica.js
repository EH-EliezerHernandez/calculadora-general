//Calculos matematicos para determinar AREA y PERIMETRO de todas las figuras

//Cuadrado
function calcularPerimetroCuadrado(longitudLados){
    const perimetro = longitudLados * 4;
    return perimetro;
}

function calcularAreaCuadrado(longitudLados){
    const area = Math.pow(longitudLados,2);
    return area;
}

//Triangulo
function calcularPerimetroTriangulo(lado1,lado2,base){
    const perimetro = lado1 + lado2 + base;
    return perimetro;
}

function calcularAlturaTriangulo(lado, base)
{  const altura = Math.sqrt(lado - Math.pow(base,2)/4);
    return altura;
}

function calcularAreaTriangulo(base,altura){
    const area =  base * altura / 2;
    return area;
}

//Circulo
function calcularDiametroCirculo(radio){
    const diametro = radio * 2;
    return diametro;
}

function calcularPerimetroCirculo(diametro){
    const PI = Math.PI;
    const perimetro = diametro * PI;
    return perimetro; 
}

function calcularAreaCirculo(radio){
    const PI = Math.PI;
    const area = PI * Math.pow(radio,2);
    return area;
}

//Funcion para mostrar mensajes o resultados
function mostrarResultado(resultado)
{   
    if(resultado !== null){
        const $elementoResultados = document.querySelector('#list-resultados');
        for(const property in resultado){
            let newElement;
            if(property === "imagen"){
                newElement = document.createElement('img');
                newElement.src = resultado[property];
                newElement.alt = `Imagen figura`;
                
            }else{
                if(property === "name"){
                        newElement = document.createElement('h4');
                        newElement.innerHTML = `<span class="resultados__subtitle">${resultado[property]}`;
                }else{
                    if(property === "error"){
                        newElement = document.createElement('P');
                        newElement.textContent = `${resultado[property]}`;
                        newElement.style.textAlign = "center";
                    }else{
                        newElement = document.createElement('P');
                        newElement.innerHTML = `<span class="resultados__label">${property}: </span> ${resultado[property].toFixed(2)}`;
                    }
                }
            }
            $elementoResultados.appendChild(newElement);
        }
    }
}

//Funcion para habilitar el formulario
function habilitarElement($element){
    $element.style.display="flex";
}

//Funcion para deshabilitar el formulario
function deshabilitarElement($element){
    $element.style.display="none";
}

//funcion para ocultar todos los formularios
function ocultarFormularios(forms){
    for( let i = 0; i < 3 ; i++){
        deshabilitarElement(forms[i]);
    }
}

//function para determinar cual es el formulario correspondiente segun la figura
function determinarFormulario(id){
    const forms = document.querySelectorAll(".form");
    let figuraForm = " "; 
    let $formulario = null;
    
    ocultarFormularios(forms);

    for( let i = 0 ; i < 3 ; i++){
        figuraForm = forms[i].id.substring(5);
        if(figuraForm == id){
            $formulario = forms[i];
            habilitarElement($formulario);   
            return; 
        }
    }
}

//Functiones para la captura de informacion de las figuras
//cuadrado
function capturarDatosCuadrado(){
    const $inputLados= document.querySelector("#ladosCuadrado");
    const cuadrado = {
        name: "Cuadrado",
        lados: parseFloat($inputLados.value),
        imagen: "../assets/img/cube.png",
    };
    return cuadrado;
}

//triangulo
function capturarDatosTriangulo(){
    const $inputLadoA = document.querySelector("#ladoATriangulo");
    const $inputLadoB = document.querySelector("#ladoBTriangulo");
    const $inputBase = document.querySelector("#baseTriangulo");
    const triangulo = {
        name: "Triangulo",
        ladoA: parseFloat($inputLadoA.value),
        ladoB: parseFloat($inputLadoB.value),
        base: parseFloat($inputBase.value),
        imagen: "../assets/img/triangle.png",
    };

    return triangulo;
}

//circulo
function capturarDatosCirculo(){
    const $inputRadio = document.querySelector("#radioCirculo");
    const circulo = {
        name: "Circulo",
        radio: $inputRadio.value,
        imagen: "../assets/img/circle.png",
    }
    return circulo;
}

//function para verificar si se trata de un triangulo isosceles
function verificarIsosceles(lado1,lado2,base){

    if(lado1 === lado2 && lado1 !== base){
        return true;
    }

    return false;
}

//Function para realizar todos los calculos de las figuras
function realizarCalculosFiguras(elementId){
    let resultado = null;
    
    if(elementId === "btn-calcular-circulo"){
        const circulo = capturarDatosCirculo();
        const {radio,name,imagen} = circulo;
        const diametroCirculo = calcularDiametroCirculo(radio);
        const perimetroCirculo = calcularPerimetroCirculo(diametroCirculo);
        const areaCirculo = calcularAreaCirculo(radio);
        resultado = {
            imagen,
            name,
            perimetro: perimetroCirculo,
            area: areaCirculo,
        };
        return resultado;
    }
    if(elementId === "btn-calcular-triangulo"){
        let isIsoscelesTriangulo;
        let triangulo;
            triangulo = capturarDatosTriangulo();
            isIsoscelesTriangulo = verificarIsosceles(triangulo.ladoA,triangulo.ladoB,triangulo.base);
            if(!isIsoscelesTriangulo){
                resultado = {
                    imagen: "../assets/icons/error.svg" ,
                    name: "Error",
                    error: "La informacion introducida no corresponde a un triangulo isosceles",
                };
                return resultado;                
            }
            else{
                const {ladoA,ladoB,base,name,imagen} = triangulo;
                const perimetroTriangulo = calcularPerimetroTriangulo(ladoA,ladoB,base);
                const alturaTriangulo = calcularAlturaTriangulo(ladoA,base);
                const areaTriangulo = calcularAreaTriangulo(base,alturaTriangulo);
                resultado = {
                    imagen,
                    name,
                    perimetro: perimetroTriangulo,
                    area: areaTriangulo,
                };
                return resultado;
            }
    }
    if(elementId === "btn-calcular-cuadrado"){
        const cuadrado = capturarDatosCuadrado();
        const {lados,name,imagen} = cuadrado;
        const perimetroCuadrado = calcularPerimetroCuadrado(lados);
        const areaCuadrado = calcularAreaCuadrado(lados);
        resultado = {
            imagen,
            name,
            perimetro: perimetroCuadrado,
            area: areaCuadrado,
        };
        return resultado;
    }
}

//function para limpiar el codigo html
function limpiarHTML(){
    const $resultadosContainer = document.querySelector("#list-resultados");
    while($resultadosContainer.firstChild){
        $resultadosContainer.removeChild($resultadosContainer.firstChild);
        console.log("borrado");
    }
}

function eventos(){
    const $parentBtnCalcular = document.querySelector("#forms-container");
    const $figurasContainer = document.querySelector("#figuras");
    const $btnCerrar = document.querySelector("#btn-cerrar");

    //Eventos para habilitar el formulario segun la figura
    $figurasContainer.addEventListener('click',evt => {
        const id = evt.target.id;
        const elemento = evt.target;
        limpiarHTML();
        if(id === "circulo" || id === "cuadrado" || id === "triangulo"){
            determinarFormulario(id);
        }
    });

    //Eventos para realizar los calculos
    $parentBtnCalcular.addEventListener("click",evt => {
         const elementId = evt.target.id;
         if(elementId === "btn-calcular-circulo" || elementId === "btn-calcular-triangulo" || elementId === "btn-calcular-cuadrado"){
            const $sectionResultado = document.querySelector("#section-resultados");
            habilitarElement($sectionResultado);
            const resultado =realizarCalculosFiguras(elementId);
            limpiarHTML();
            mostrarResultado(resultado);
        }
    });

    $btnCerrar.addEventListener("click",() => {
        const $sectionResultado = document.querySelector("#section-resultados");
        deshabilitarElement($sectionResultado);
    });
}

eventos();
