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

function calcularAlturaTriangulo(lado, base){ 
    const altura = Math.sqrt(lado - Math.pow(base,2)/4);
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

//funcion para ocultar todos los formularios
function ocultarFormularios(forms){
    for( let i = 0; i < 3 ; i++){
        ocultarElement(forms[i]);
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
            mostrarElement($formulario);   
            return; 
        }
    }
}

//Functiones para la captura de informacion de las figuras
//cuadrado
function capturarDatosCuadrado(){
    const $inputLados= document.querySelector("#ladosCuadrado");
    const cuadrado = {
        title: "Cuadrado",
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
        title: "Triangulo",
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
        title: "Circulo",
        radio: $inputRadio.value,
        imagen: "../assets/img/circle.png",
    }
    return circulo;
}

//function para verificar si se trata de un triangulo isosceles
function verificarIsosceles(lado1,lado2,base){

    if(lado1 === lado2 && lado1 !== base && lado1 > base){
        return true;
    }

    return false;
}

//Function para realizar todos los calculos de las figuras
function realizarCalculosFiguras(elementId){
    let resultado = null;

    if(elementId === "btn-calcular-circulo"){
        const circulo = capturarDatosCirculo();
        const {radio,title,imagen} = circulo;
        const diametroCirculo = calcularDiametroCirculo(radio);
        const perimetroCirculo = calcularPerimetroCirculo(diametroCirculo);
        const areaCirculo = calcularAreaCirculo(radio);
        resultado = {
            imagen,
            title,
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
                    title: "error",
                    error: "La informacion introducida no corresponde a un triangulo isosceles",
                };
                return resultado;                
            }

            const {ladoA,ladoB,base,title,imagen} = triangulo;
            const perimetroTriangulo = calcularPerimetroTriangulo(ladoA,ladoB,base);
            const alturaTriangulo = calcularAlturaTriangulo(ladoA,base);
            const areaTriangulo = calcularAreaTriangulo(base,alturaTriangulo);
            resultado = {
                imagen,
                title,
                perimetro: perimetroTriangulo,
                area: areaTriangulo,
            };

            return resultado;
            
    }
    if(elementId === "btn-calcular-cuadrado"){
        const cuadrado = capturarDatosCuadrado();
        const {lados,title,imagen} = cuadrado;
        const perimetroCuadrado = calcularPerimetroCuadrado(lados);
        const areaCuadrado = calcularAreaCuadrado(lados);
        resultado = {
            imagen,
            title,
            perimetro: perimetroCuadrado,
            area: areaCuadrado,
        };
        return resultado;
    }
}

function eventos(){
    const $parentBtnCalcular = document.querySelector("#forms-container");
    const $figurasContainer = document.querySelector("#figuras");
    const $btnCerrar = document.querySelector("#btn-cerrar");

    //Eventos para habilitar el formulario segun la figura
    $figurasContainer.addEventListener('click',evt => {
        const id = evt.target.id;
        const $elementoContenedorResultados = document.querySelector("#list-resultados");
        limpiarHTML($elementoContenedorResultados);
        if(id === "circulo" || id === "cuadrado" || id === "triangulo"){
            determinarFormulario(id);
        }
    });

    //Eventos para realizar los calculos
    $parentBtnCalcular.addEventListener("click",evt => {
         const elementId = evt.target.id;
         const arrayIDBtns = [
            "btn-calcular-circulo",
            "btn-calcular-triangulo",
            "btn-calcular-cuadrado"
         ];
         
         if(validarValor(elementId,arrayIDBtns)){
            const $sectionResultado = document.querySelector("#section-resultados");
            const $elementoContenedorResultados = document.querySelector("#list-resultados");
            mostrarElement($sectionResultado);
            const resultado =realizarCalculosFiguras(elementId);
            limpiarHTML($elementoContenedorResultados);
            mostrarResultado(resultado);
        }
    });

    $btnCerrar.addEventListener("click",() => {
        const $sectionResultado = document.querySelector("#section-resultados");
        ocultarElement($sectionResultado);
    });
}

eventos();
