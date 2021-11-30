//Funcion para habilitar el formulario
function mostrarElement($element){
    $element.style.display="flex";
}

//Funcion para deshabilitar el formulario
function ocultarElement($element){
    $element.style.display="none";
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
                        newElement.innerHTML = `<span class="resultados__label">${property}: </span> ${resultado[property].toFixed(2)}`;
                    }
                }
            }
            $elementoResultados.appendChild(newElement);
        }
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