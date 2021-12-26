//Funcion para habilitar el formulario
function mostrarElement($element){
    $element.style.display="flex";
}

//Funcion para deshabilitar el formulario
function ocultarElement($element){
    $element.style.display="none";
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
            let newElement;
            if(property === "imagen"){
                newElement = document.createElement('img');
                newElement.src = resultado[property];
                newElement.alt = `Imagen figura`;
                
            }else{
                if(property === "name"){
                        newElement = document.createElement('h4');
                        newElement.textContent = `${resultado[property]}`;
                        newElement.classList.add("resultados__subtitle");
                }else{
                    newElement = document.createElement('P');
                    if(property === "error"){
                        newElement.textContent = `${resultado[property]}`;
                        newElement.style.textAlign = "center";
                    }else{
                        let valorResultado;

                        if(typeof resultado[property] === String){
                            valorResultado = resultado[property];
                        }else{
                            valorResultado = resultado[property].toFixed(2);
                        }
                        
                        newElement.innerHTML = `<span class="resultados__label">${property}: </span> ${valorResultado}`;

                    }
                }
            }
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
        limpiarHTML();
    const $resultados = document.querySelector("#section-resultados");
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
    console.log(arrayListNewOrder);
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