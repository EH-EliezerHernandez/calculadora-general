function calcularMediaAritmetica(arrayElement){
    const cantidadElementos = arrayElement.length;
    const sumaElementos = arrayElement.reduce((acum,elementoActual) =>{
        return elementoActual + acum;
    });
    const mediaAritmetica = sumaElementos / cantidadElementos;

    return mediaAritmetica;
}

function determinarNumeroPar(num){
    let isPar = false;

    if(num % 2 === 0){
        isPar = true;
        return isPar;
    }

    return isPar;
}

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

function determinarNumeroMayor(arrayList){
    
    const arrayListNewOrder = ordenarElementosMenorMayor(arrayList);
    const indiceNumeroMayor = arrayListNewOrder.length - 1;
    const numeroMayor = arrayListNewOrder[indiceNumeroMayor];

    return numeroMayor;

}

function listarElementos(arrayList){
    
    const objListNumber = {};

    arrayList.forEach(elementoActual => {
        objListNumber[elementoActual] = ++objListNumber[elementoActual] || 1;
    });

    return objListNumber;
}

function buscarNumerosMasRepetidosObjList(numeroMayor,objList){
    let valoresMayores = "";
    for( const property in objList){
        if(objList[property] === numeroMayor){
            valoresMayores = `${valoresMayores}${property} `;
        }
    }

    return valoresMayores;
}
function calcularModa(arrayList){
    
    const objListNumbers = listarElementos(arrayList);
    const arrayValorsObj = Object.values(objListNumbers);
    const arrayNewOrderValorsObj = ordenarElementosMenorMayor(arrayValorsObj);
    const valorMayorList = determinarNumeroMayor(arrayNewOrderValorsObj);
    const objElementosMasRepetidos = buscarNumerosMasRepetidosObjList(valorMayorList,objListNumbers);

    return objElementosMasRepetidos;
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

function validarNumeroEntero(numero){
    let isEntero = false;

    if( numero % 1 === 0){
        isEntero = true;
        return isEntero;
    }
    
    return isEntero;
}

function validarPosition(position,cantidadElementos){
    let isPositionValid = false;

    if(validarNumero(position) && position >= 0 && position < cantidadElementos && validarNumeroEntero(position)){
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

function mostrarLista($elementoContenedorList,list){
    
    list.forEach((valorActual,indice) =>{
        const newElement = document.createElement("LI");
        newElement.innerHTML = `<p>${indice + 1}) ${valorActual}</p>`;
        $elementoContenedorList.appendChild(newElement);
    
    });

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

    limpiarHTML($elementoContenedorList);
    
    mostrarLista($elementoContenedorList,elementosList);
    
    return elementosList;
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
        
        const $campoPosition = document.querySelector(valorIDCampo);
        insertarElemento($mensajeError,$campoPosition);
        
        return elementosList;
    }
    
    const nuevaLista = elementosList.filter((elementoActual,indice)=> position != indice);
    const $elementoContenedorList = document.querySelector("#list-valors");

    limpiarHTML($elementoContenedorList);

    mostrarLista($elementoContenedorList,nuevaLista);
    
    return nuevaLista;
}

function determinarContenidoTextElement(valorOption,arrayObjOptions){
    
    const objOption = arrayObjOptions.find(elementActual => {
        const {tipoPromedio} = elementActual;

        if(tipoPromedio === valorOption){
            return elementActual;
        }
    })

    const contenidoElement = objOption.contenidoElement;

    return contenidoElement;
}

function realizarCalculosPromedio(valorOption,arrayListNum,arrayObjProm){
    
    const objectResult = arrayObjProm.find((elementActual)=> 
        elementActual.tipoPromedio === valorOption
    );
    
    const resultadoPromedio = objectResult.functionCalcularPromedio(arrayListNum);
    const namePromedio = objectResult.name;

    const objectResultado = {
        imagen: "../assets/img/discount.png",
        name: namePromedio,
        resultado: resultadoPromedio,
    };

    return objectResultado;
}

function validarValor(valor,arrayValors){
    
    const isValid = arrayValors.some(elementActual => valor === elementActual);

    return isValid;
}

function eventos(){
    const $formPromedios = document.querySelector("#form-promedios");
    let elementosList = [];
    const valorIDBtnCalcular = "#btn-calcular";
    const contenidoDefaultBtnCalcular = "Calcular Media Aritmetica"; 
    
    mostrarElement($formPromedios);

    agregarContenidoElemento(contenidoDefaultBtnCalcular,valorIDBtnCalcular);

    $formPromedios.addEventListener("click",(evt)=>{
        const targetId = evt.target.id;
        const arrayElementIdValor = [
            'btn-add',
            'btn-delete',
            'btn-calcular',
            'select-promedios',
        ];

        if(validarValor(targetId,arrayElementIdValor)){

            const objFunctionBasics = {
                'btn-add': () => {  
                    const valorIDCampo = "#campo-new-valor";
                    const valorCampo = parseFloat(capturarValor(valorIDCampo));   
                    elementosList = añadirList(valorCampo,valorIDCampo,elementosList);
                    limpiarCampo(valorIDCampo);
                },
    
                'btn-delete': () => {
                    const valorIDCampo = "#campo-position-element";
                    const valorCampoPosition = parseFloat(capturarValor(valorIDCampo)) - 1;
                    elementosList = eliminarElementoList(elementosList,valorCampoPosition,valorIDCampo);
                    limpiarCampo(valorIDCampo);
                },
    
                'btn-calcular': () => {
                    const $contenedorResultado = document.querySelector("#section-resultados");
                    const tipoPromedio = document.querySelector("#select-promedios").value;
                    const arrayObjProm = [
                        {
                            tipoPromedio: "media-aritmetica",
                            name: "Media Aritmetica",
                            functionCalcularPromedio: function(arrayElement){
                                const mediaAritmetica = calcularMediaAritmetica(arrayElement);
                                return mediaAritmetica;
                            }
                        },
                        /* {
                            tipoPromedio: "media-armonica",
                            contenidoElement: "Calcular Media Armonica",
                        },
                        {
                            tipoPromedio: "media-geometrica",
                            contenidoElement: "Calcular Media Geometrica",
                        }, */
                        {
                            tipoPromedio: "moda",
                            name: "Moda",
                            functionCalcularPromedio: function(arrayElement){
                                const moda = calcularModa(arrayElement);
                                return moda;
                            }
                        },
                        {
                            tipoPromedio: "mediana",
                            name: "Mediana",
                            functionCalcularPromedio: function(arrayElement){
                                const mediana = calcularMediana(arrayElement);
                                return mediana;
                            }
                        }
                    ];
                    mostrarElement($contenedorResultado);
                    const objectResultado = realizarCalculosPromedio(tipoPromedio,elementosList,arrayObjProm);
                    console.log(objectResultado);
                    mostrarResultado(objectResultado);
                },
    
                'select-promedios': () => {
                    const valorOption = evt.target.value;
                    const arrayObjOptions = [
                        {
                            tipoPromedio: "media-aritmetica",
                            contenidoElement: "Calcular Media Aritmetica",
                        },
                        {
                            tipoPromedio: "media-armonica",
                            contenidoElement: "Calcular Media Armonica",
                        },
                        {
                            tipoPromedio: "media-geometrica",
                            contenidoElement: "Calcular Media Geometrica",
                        },
                        {
                            tipoPromedio: "moda",
                            contenidoElement: "Calcular Moda",
                        },
                        {
                            tipoPromedio: "mediana",
                            contenidoElement: "Calcular Mediana",
                        }
                    ];
            
                    const contenidoBtnCalcular = determinarContenidoTextElement(valorOption,arrayObjOptions);
                    agregarContenidoElemento(contenidoBtnCalcular,valorIDBtnCalcular);
                }
            }
            const functionOption = objFunctionBasics[targetId];
    
            functionOption();
            
        }
    });

    cerrarElementoResultados()
}

eventos();