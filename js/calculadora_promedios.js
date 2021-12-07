function calcularMediaAritmetica(arrayElement){
    const sumaElementos = arrayElement.reduce((acum,elementoActual) =>{
        return elementoActual + acum;
    });
    const mediaAritmetica = sumaElementos / arrayElement.lenght;
    return mediaAritmetica;
}

function capturarValor(valorID){
    $campoNewElement = document.querySelector(valorID);
    valorCampo = $campoNewElement.value;
    return valorCampo;
}

function insertarElemento(newElement,referenceNode){
    referenceNode.parentNode.insertBefore(newElement,referenceNode.nextSibling);
}

function crearMensaje(mensaje,styleClass){
    const $elementMensaje = document.createElement("P");
    
    $elementMensaje.textContent = mensaje;

    $elementMensaje.classList.add(styleClass);

    return $elementMensaje;
}

function validarNumero(valor){
    let isNumber = false;

    if(!isNaN(valor)){
        isNumber = true;
        return isNumber;
    }
    return isNumber;

}

/* function buscarElementoSegunIndice(list,position){
    
    const elementoBuscado = list.find((elementoActual,indice) => indice === position);

    return elementoBuscado;
} */

function validarPosition(position,cantidadElementos){
    let isPositionValid = false;

    if(validarNumero(position) && position >= 0 && position < cantidadElementos){
        isPositionValid = true;
        return isPositionValid;
    }

    return isPositionValid;
}

function eliminarError(){
    const $errorElements = document.querySelectorAll(".error");
    if($errorElements.length != 0){
        for(let i = 0 ; i <  $errorElements.length ; i++){
            $errorElements[i].remove();
        }
    }


}

function limpiarContenedorLista($contenedorLista){
    while($contenedorLista.firstChild){
        $contenedorLista.removeChild($contenedorLista.firstChild);
    }
}

function  añadirList(valor,campoID,elementosList){
    
    if(!validarNumero(valor)){
        const styleClassMensaje = "error";
        const textMensaje = "El dato ingresado no es valido";
        eliminarError();
        const $mensajeError = crearMensaje(textMensaje,styleClassMensaje);
        const $elementoCampoValor = document.querySelector(campoID);
        insertarElemento($mensajeError,$elementoCampoValor);
        return elementosList;
    }

    elementosList.push(valor);

    const $elementoContenedorList = document.querySelector("#list-valors");

    limpiarContenedorLista($elementoContenedorList);
    
    mostrarLista($elementoContenedorList,elementosList);
    
    return elementosList;
}

function mostrarLista($elementoContenedorList,list){
    
    list.forEach((valorActual,indice) =>{
        const newElement = document.createElement("LI");
        newElement.innerHTML = `<p>${indice + 1}) ${valorActual}</p>`;
        $elementoContenedorList.appendChild(newElement);
    
    });

}

function limpiarCampo(valorIdElemento){
    document.querySelector(valorIdElemento).value = "";
    
}

function eliminarElementoList(elementosList,position,valorIDCampo){
    const cantidadElementos = elementosList.length;

    if(!validarPosition(position,cantidadElementos)){
        let $mensajeError;
        const  styleClassMensaje = "error";
        
        eliminarError();
        
        if(!cantidadElementos){
            const textMensaje = "La lista se encuentra vacia. Debe ingresar elementos a la lista antes de poder eliminarlos";
            $mensajeError = crearMensaje(textMensaje,styleClassMensaje);
        }else{
            const textMensaje = "Ingrese una posición válida de la lista de números";
            $mensajeError = crearMensaje(textMensaje,styleClassMensaje);
        }
        
        const campoPosition = document.querySelector(valorIDCampo);
        insertarElemento($mensajeError,campoPosition);
        
        return elementosList;
    }
    
    const nuevaLista = elementosList.filter((elementoActual,indice)=> position != indice);
    const $elementoContenedorList = document.querySelector("#list-valors");

    limpiarContenedorLista($elementoContenedorList);

    mostrarLista($elementoContenedorList,nuevaLista);
    
    return nuevaLista;
}

function eventos(){
    const $formPromedios = document.querySelector("#form-promedios");
    let elementosList = [];

    $formPromedios.addEventListener("click",(evt)=>{
        const targetId = evt.target.id;
        if(targetId === "btn-add"){
            const valorIDCampo = "#campo-new-valor";
            const valorCampo = parseFloat(capturarValor(valorIDCampo));   
            elementosList = añadirList(valorCampo,valorIDCampo,elementosList);
            limpiarCampo(valorIDCampo);
        }else{
            if(targetId === "btn-delete"){
                const valorIDCampo = "#campo-position-element";
                const valorCampoPosition = parseFloat(capturarValor(valorIDCampo)) - 1;
                elementosList = eliminarElementoList(elementosList,valorCampoPosition,valorIDCampo);
                limpiarCampo(valorIDCampo);
            }

        }
    });
}

eventos();