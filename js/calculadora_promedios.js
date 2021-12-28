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
                    
                    eliminarError();

                    if(validarNumero(valorCampo)){
                        const $elementContenedorList = document.querySelector("#list-valors");
                        añadirList(valorCampo,elementosList);
                        limpiarHTML($elementContenedorList);
                        mostrarLista($elementContenedorList,elementosList);
                    }else{
                        const mensajeError = "El valor Ingresado no es valido";
                        mostrarError(mensajeError,valorIDCampo);
                    }

                    limpiarCampo(valorIDCampo);
                },
    
                'btn-delete': () => {
                    const valorIDCampoPosition = "#campo-position-element";
                    const valorCampoPosition = parseInt(capturarValor(valorIDCampoPosition)) - 1;

                    limpiarCampo(valorIDCampoPosition);
                    eliminarError();
                    determinarErrorCampoPosition(elementosList,valorCampoPosition);
                    elementosList = eliminarElementoList(elementosList,valorCampoPosition);
                },
    
                'btn-calcular': () => {
                    const rutaImagen = "../assets/img/discount.png";
                    const $contenedorResultado = document.querySelector("#section-resultados");
                    const tipoPromedio = document.querySelector("#select-promedios").value;
                    const arrayObjProm = [
                        {
                            optionId: "media-aritmetica",
                            title: "Media Aritmetica",
                            calcularResultado: function(arrayElement){
                                const mediaAritmetica = calcularMediaAritmetica(arrayElement);
                                return mediaAritmetica;
                            }
                        },
                        /* {
                            optionId: "media-armonica",
                            contenidoElement: "Calcular Media Armonica",
                        },
                        {
                            optionId: "media-geometrica",
                            contenidoElement: "Calcular Media Geometrica",
                        }, */
                        {
                            optionId: "moda",
                            title: "Moda",
                            calcularResultado: function(arrayElement){
                                const moda = calcularModa(arrayElement);
                                return moda;
                            }
                        },
                        {
                            optionId: "mediana",
                            title: "Mediana",
                            calcularResultado: function(arrayElement){
                                const mediana = calcularMediana(arrayElement);
                                return mediana;
                            }
                        }
                    ];

                    mostrarElement($contenedorResultado);
                    const objectResultadoPromedio = determinarSelecOption(tipoPromedio,elementosList,arrayObjProm);
                    
                    const objResultado = prepararObjResultado(rutaImagen,objectResultadoPromedio);
                    mostrarResultado(objResultado);
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