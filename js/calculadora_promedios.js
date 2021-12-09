function calcularMediaAritmetica(arrayElement){
    const sumaElementos = arrayElement.reduce((acum,elementoActual) =>{
        return elementoActual + acum;
    });
    const mediaAritmetica = sumaElementos / arrayElement.length;
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
function agregarContenidoElemento(contenido,valorID){
    const $elemento = document.querySelector(valorID);
    $elemento.textContent = contenido;
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

function determinarTipoPromedio(valorOption){
    if(valorOption === "media-aritmetica"){
        contenidoBtnCalcular = "Calcular Media aritmetica";
    }
    if(valorOption === "media-armonica"){
        contenidoBtnCalcular = "Calcular Media armonica";
    }
    if(valorOption === "media-geometrica"){
        contenidoBtnCalcular = "Calcular Media Geometrica";
    }
    if(valorOption === "moda"){
        contenidoBtnCalcular ="Calcular Moda";
    }
    if(valorOption === "mediana"){
        contenidoBtnCalcular = "Calcular Mediana";
    }
    return contenidoBtnCalcular;
}

function realizarCalculosPromedio(valorOption,arrayList){
    const objectResultado = {
        imagen: "../assets/img/discount.png",
    };
    console.log(valorOption);
    if(valorOption === "media-aritmetica"){
        resultado = calcularMediaAritmetica(arrayList);
        console.log(resultado);
        objectResultado["name"]= "Media Aritmetica";
        objectResultado["resultado"] = resultado;
        return objectResultado;
    }
    if(valorOption === "media-armonica"){
        
    }
    if(valorOption === "media-geometrica"){
        
    }
    if(valorOption === "moda"){
        
    }
    if(valorOption === "mediana"){
        
    }
}
function eventos(){
    const $formPromedios = document.querySelector("#form-promedios");
    const $selecPromedios = document.querySelector("#select-promedios");
    let elementosList = [];
    const valorIDBtnCalcular = "#btn-calcular";
    const contenidoDefaultBtnCalcular = "Calcular Media Aritmetica"; 
    
    agregarContenidoElemento(contenidoDefaultBtnCalcular,valorIDBtnCalcular);

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
            }else{
                if(targetId === "btn-calcular"){
                    const $contenedorResultado = document.querySelector("#section-resultados");
                    const tipoPromedio = document.querySelector("#select-promedios").value;
                    mostrarElement($contenedorResultado);
                    const objectResultado = realizarCalculosPromedio(tipoPromedio,elementosList);
                    console.log(objectResultado);
                    mostrarResultado(objectResultado);
                }
                else{
                    if(targetId === "select-promedios"){
                        const valorOption = evt.target.value;
                        const contenidoBtnCalcular = determinarContenidoBotton(valorOption);
                        console.log(contenidoBtnCalcular);
                        agregarContenidoElemento(contenidoBtnCalcular,valorIDBtnCalcular);

                    }
                }
            }

        }
    });

}

eventos();