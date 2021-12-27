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
                    
                    if(validarNumero(valorCampo)){
                        const $elementContenedorList = document.querySelector("#list-valors");
                        añadirList(valorCampo,elementosList);
                        limpiarHTML($elementContenedorList);
                        mostrarLista($elementContenedorList,elementosList);
                    }else{
                        const mensajeError = "El valor Ingresado no es valido";
                        eliminarError();
                        mostrarError(mensajeError,valorIDCampo);
                    }

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

    cerrarElemento();
}

eventos();