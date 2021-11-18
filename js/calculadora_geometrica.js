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

function mostrarMensaje(resultado)
{   
    const {perimetro, area} = resultado;
    const $elementoResultados = document.querySelector('#resultados');
    const elementoPerimetro = document.createElement('P');
    const elementoArea = document.createElement('P');
    elementoPerimetro.innerHTML = `<span class="label">Perimetro: </span> ${perimetro}`;
    elementoArea.innerHTML = `<span class="label">Area: </span> ${area}`;
    $elementoResultados.appendChild(elementoPerimetro);
    $elementoResultados.appendChild(elementoArea);
}

function habilitarFormulario($formulario){
    $formulario.style.display="flex";
}

function deshabilitarFormulario($formulario){
    $formulario.style.display="none";
}

function ocultarFormularios(forms){
    for( let i = 0; i < 3 ; i++){
        deshabilitarFormulario(forms[i]);
    }
}
function determinarFormulario(id){
    const forms = document.querySelectorAll(".form");
    let figuraForm = " "; 
    let $formulario = null;

    ocultarFormularios(forms);

    for( let i = 0 ; i < 3 ; i++){
        figuraForm = forms[i].id.substring(5);
        if(figuraForm == id){
            $formulario = forms[i];
            habilitarFormulario($formulario);   
            return; 
        }
    }
}

function capturarDatosCuadrado(){
    const $inputLados= document.querySelector("#ladosCuadrado");
    const cuadrado = {
        lados: $inputLados.value,
    };
    return cuadrado;
}
function realizarCalculosFiguras(elementId){
    let resultado = null;
    
    if(elementId === "btn-calcular-circulo"){
        
    }
    if(elementId === "btn-calcular-triangulo"){

    }
    if(elementId === "btn-calcular-cuadrado"){
        const cuadrado = capturarDatosCuadrado();
        const {lados} = cuadrado;
        const perimetroCuadrado = calcularPerimetroCuadrado(lados);
        const areaCuadrado = calcularAreaCuadrado(lados);
        resultado = {
            perimetro: perimetroCuadrado,
            area: areaCuadrado
        };
        return resultado;
    }
}
function limpiarHTML(){
    const $resultadosContainer = document.querySelector("#resultados");
    console.log($resultadosContainer.firstChild);
    /* while($resultadosContainer.firstChild){
        $resultadosContainer.remove($resultadosContainer.firstChild);
    } */
}
function eventos(){
    const $parentBtnCalcular = document.querySelector("#forms-container");
    const $figurasContainer = document.querySelector("#figuras");
    
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
             const resultado =realizarCalculosFiguras(elementId);
             limpiarHTML();
            mostrarMensaje(resultado);
        }
    });
}

eventos();
