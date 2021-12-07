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

function crearMensaje(mensaje){
    const $elementMensaje = document.createElement("P");
    
    $elementMensaje.textContent = mensaje;

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
        eliminarError();
        const $mensajeError = crearMensaje("El dato ingresado no es valido");
        $mensajeError.classList.add("error");
        const $elementoContenedor = document.querySelector(campoID);
        insertarElemento($mensajeError,$elementoContenedor);
        return null;
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

function eliminarElementoList(elementosList,position,valorIDCampo){
    const cantidadElementos = elementosList.length;
    
    if(validarPosition(position,cantidadElementos) === false){
        console.log(validarPosition(position,cantidadElementos));
        eliminarError();
        const mensajeError = crearMensaje("Ingrese una posición válida de la lista de números");
        mensajeError.classList.add("error");
        const campoPosition = document.querySelector(valorIDCampo);
        insertarElemento(mensajeError,campoPosition);
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
        }else{
            if(targetId === "btn-delete"){
                const valorIDCampo = "#campo-position-element";
                const valorCampoPosition = parseFloat(capturarValor(valorIDCampo)) - 1;
                elementosList = eliminarElementoList(elementosList,valorCampoPosition,valorIDCampo);
            }

        }
    });
}

eventos();