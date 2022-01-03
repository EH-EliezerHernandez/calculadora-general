//Funcion para habilitar el formulario
function mostrarElement($element){
    $element.style.display="flex";
}

//Funcion para deshabilitar el formulario
function ocultarElement($element){
    $element.style.display="none";
}

//Function para capturar datos de un elemento de formulario HTML
function capturarDato(valorId){
    const dato = document.querySelector(valorId).value;
    
    return dato;
}

//Funcion para limpiar un campo
function limpiarCampo(valorIdElemento){
    document.querySelector(valorIdElemento).value = "";
    
}
function validarValorVacio(valor){
    let isValid = false;

    if(valor){
        isValid = true;
        return isValid;
    }

    return isValid;
}
//Function para crear mensaje
function crearMensaje(mensaje,styleClass){
    const $elementMensaje = document.createElement("P");
    
    $elementMensaje.textContent = mensaje;

    $elementMensaje.classList.add(styleClass);

    return $elementMensaje;
}

//Function para insertar elemento en el codigo html despues de un elemento
function insertarElemento(newElement,referenceNode){
    referenceNode.parentNode.insertBefore(newElement,referenceNode.nextSibling);
}

//Funcion para mostrar mensajes o resultados
function mostrarResultado(resultado)
{   
    if(resultado !== null){
        const $elementoResultados = document.querySelector('#list-resultados');
        
        for(const property in resultado){
            console.log(typeof resultado[property]);
            if("imagen" === property){
                const newElement = document.createElement('img');
                newElement.src = resultado[property];
                newElement.alt = `Imagen figura`;
                $elementoResultados.appendChild(newElement);
                continue;
            }
            
            if("title" === property){
                const newElement = document.createElement('h4');
                newElement.textContent = `${resultado[property]}`;
                newElement.classList.add("resultados__subtitle");
                $elementoResultados.appendChild(newElement);
                continue;
            }
            
            if("error" == property){
                const newElement = document.createElement('P');
                newElement.textContent = `${resultado[property]}`;
                newElement.style.textAlign = "center";
                $elementoResultados.appendChild(newElement);
                continue
            }

            let valorResultado;
            const newElement = document.createElement('P');
            
            if(typeof resultado[property] === "string"){
                valorResultado = resultado[property];
                newElement.innerHTML = `<span class="resultados__label">${property}: </span> ${valorResultado}`;
                $elementoResultados.appendChild(newElement);
                continue;
            }
            
            valorResultado = resultado[property].toFixed(2);
            newElement.innerHTML = `<span class="resultados__label">${property}: </span> ${valorResultado}`;
            $elementoResultados.appendChild(newElement);
        
        }
    }
}

//function para limpiar el codigo html
function limpiarHTML($elementoContenedor){
    while($elementoContenedor.firstChild){
        $elementoContenedor.removeChild($elementoContenedor.firstChild);
    }
}

//Funcion para validar un numero
function validarNumero(valor){
    let isNumber = false;

    if(!isNaN(valor)){
        isNumber = true;
        return isNumber;
    }
    return isNumber;
}

//Function para añadir contenido a un elemento
function agregarContenidoElemento(contenido,valorID){
    const $elemento = document.querySelector(valorID);
    $elemento.textContent = contenido;
}

//Function para eliminar mensajes de error
function eliminarError(){
    const $errorElements = document.querySelectorAll(".error");
    if($errorElements.length != 0){
        for(let i = 0 ; i <  $errorElements.length ; i++){
            $errorElements[i].remove();
        }
    }
}

//Function para mostrar el mensaje error
function mostrarError(mensajeError,idElement){
    const styleClassError = "error";

    const $elementError = crearMensaje(mensajeError,styleClassError);
    const $elementoCampo = document.querySelector(idElement);
    insertarElemento($elementError,$elementoCampo);
}

//Function para validar si un valor se encuentra en la lista
function validarValor(valor,arrayValors){
    
    const isValid = arrayValors.some(elementActual => valor === elementActual);

    return isValid;
}

//Function para mostrar lista
function mostrarLista($elementoContenedorList,list){
    
    list.forEach((valorActual,indice) =>{
        const newElement = document.createElement("LI");
        newElement.innerHTML = `<p>${indice + 1}) ${valorActual}</p>`;
        $elementoContenedorList.appendChild(newElement);
    
    });
}

//Funcion para añadir elementos a la lista
function  añadirList(valor,elementosList){
    elementosList.push(valor);
}

function cerrarElemento(){
    const $btnCerrar = document.querySelector("#btn-cerrar");

    $btnCerrar.addEventListener("click",evt => {
        const $resultados = document.querySelector("#section-resultados");
        const $listResultado = document.querySelector("#list-resultados");
        limpiarHTML($listResultado);
        ocultarElement($resultados);
    });
}

//Function para ordenar elementos de la lista de mayor a menor
function ordenarElementosMenorMayor(arrayList){ 

    const cantidadElementos = arrayList.length;
    const newArrayList =[...arrayList];

    for( let i=0 ; i < cantidadElementos ; i++){

        for( let x=0 ; x < cantidadElementos ; x++){
            
            if( i != x){
                const a = newArrayList[i];
                const b = newArrayList[x];
                const resta = a - b;

                if(resta < 0){
                    const aux = newArrayList[x];
                    newArrayList[x] = newArrayList[i];
                    newArrayList[i] = aux;
                }
            }
        }

    }

    return newArrayList;
}
//Function para determinar si se trata de un numero par
function determinarNumeroPar(num){
    let isPar = false;

    if(num % 2 === 0){
        isPar = true;
        return isPar;
    }

    return isPar;
}

//Calcular media aritmetica
function calcularMediaAritmetica(arrayElement){
    const cantidadElementos = arrayElement.length;
    const sumaElementos = arrayElement.reduce((acum,elementoActual) =>{
        return elementoActual + acum;
    });
    const mediaAritmetica = sumaElementos / cantidadElementos;

    return mediaAritmetica;
}

//Function para calcular la mediana 
function calcularMediana(arrayList){
    let resultadoMediana;
    const cantidadElementos = arrayList.length;
    const arrayListNewOrder = ordenarElementosMenorMayor(arrayList);
    
    const  mitadCantidadElementos = cantidadElementos / 2;
    
    if(determinarNumeroPar(cantidadElementos)){
        const elementMediana1 = arrayListNewOrder[mitadCantidadElementos];
        const elementMediana2 = arrayListNewOrder[mitadCantidadElementos - 1];
        const arrayResultados = [elementMediana1,elementMediana2];
        resultadoMediana = calcularMediaAritmetica(arrayResultados);
        return resultadoMediana;
    }
    
    const mitadCantidadElementosParteEntera = mitadCantidadElementos -  mitadCantidadElementos % 1;
    resultadoMediana = arrayListNewOrder[mitadCantidadElementosParteEntera];
    return resultadoMediana;
}

//Function para validar si se trata de un numero entero
function validarNumeroEntero(numero){
    let isEntero = false;

    if( numero % 1 === 0){
        isEntero = true;
        return isEntero;
    }
    
    return isEntero;
}

//Function para validar position ingresada por el usuario
function validarPosition(position,arrayElements){
    let isPositionValid = false;
    const cantidadElementos = arrayElements.length;

    if(validarNumero(position) && position >= 0 && position < cantidadElementos && validarNumeroEntero(position)){
        isPositionValid = true;
        return isPositionValid;
    }

    return isPositionValid;
}

//Function para determinar la opcion seleccionada pasada en un array
function determinarSelecOption(valorOption,arrayListNum,arrayObjOptions){

    const objOption = arrayObjOptions.find((elementActual)=>
        elementActual.optionId === valorOption    
    );

    const resultadoCalculo = objOption.calcularResultado(arrayListNum);
    const titleOption = objOption.title;

    const objectResultado = {
        title: titleOption,
        resultado: resultadoCalculo,
    };

    return objectResultado;
}

function validarArrayVacio(arrayList){
    const cantidadElementos = arrayList.length;
    let isArrayVacio = false;
    
    if(cantidadElementos){
        isArrayVacio = true;
        return isArrayVacio;
    }

    return isArrayVacio;
}

//Funtion para determinar el error al no llenar el campo position correctamente
function determinarErrorCampoPosition(elementosList,position){
    
    if(!validarArrayVacio(elementosList)){
        eliminarError();
        const mensajeError = "La lista se encuentra vacia. Debe ingresar elementos a la lista antes de poder eliminarlos";
        return mensajeError;
    }
    
    if(!validarPosition(position,elementosList)){
        eliminarError();
        const mensajeError = "Ingrese una posición válida de la lista de números";
        return mensajeError;
    }
}

//Concatenar valores de la lista de salarios
function concatenarLista(arrayList){

    const styleSalario = "bold";
    const newArrayList =  arrayList.map((elementActual)=>{
        const {nombre,salario} = elementActual;
        return `${nombre} <spam class="${styleSalario}">USB ${salario}</spam>`
    }); 

    return newArrayList;
}

//Function para eliminar un elemento de la lista o array segun el elemento suministrado al campo correpondiente
function eliminarElementoList(elementosList,position){
    
    if(validarPosition(position,elementosList) && validarArrayVacio(elementosList)){
        const nuevaLista = elementosList.filter((elementoActual,indice)=> position != indice);
        const $elementoContenedorList = document.querySelector("#list-valors");
    
        limpiarHTML($elementoContenedorList);
    
        mostrarLista($elementoContenedorList,nuevaLista);
        
        return nuevaLista;
    }

    return elementosList;
}

//Function declara los valores pasados como parametros como los atributos de un objeto
function prepararObjResultado(rutaImagen,obj){
    const objResultado = {};

    objResultado["imagen"] = rutaImagen;

    for( property in obj){
        objResultado[property] = obj[property];
    }

    return objResultado;
}

function seleccionarlista(arrayListOption1,arrayListOption2){
    const $checkboxElement = document.querySelector("#selec-precargarda");
    let arrayListSeleccionada = []; 

    if($checkboxElement.checked){
        arrayListaSeleccionada = arrayListOption1;
        return arrayListaSeleccionada;
    }

    arrayListSeleccionada = arrayListOption2;
    return arrayListSeleccionada;

}