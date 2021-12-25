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
function mostraError(mensajeError,idElement){
    const styleClassError = "error";

    eliminarError();

    const $elementError = crearMensaje(mensajeError,styleClassError);
    const $elementoCampo = document.querySelector(idElement);
    insertarElemento($elementError,$elementoCampo);

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

    const $elementoContenedorList = document.querySelector("#list-valors");

    limpiarHTML($elementoContenedorList);
    
    mostrarLista($elementoContenedorList,elementosList);
}

function cerrarElemento(){
    const $btnCerrar = document.querySelector("#btn-cerrar");

    $btnCerrar.addEventListener("click",evt => {
        limpiarHTML();
    const $resultados = document.querySelector("#section-resultados");
    ocultarElement($resultados);
});
}