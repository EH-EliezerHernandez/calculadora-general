function calcularCantidadSegunPorcentaje(cantidadTotal,porcentaje){
    const cantidadResultante = porcentaje * cantidadTotal / 100;
    return cantidadResultante;
}

function calcularMedianaSalarialTopPorciento(arrayListSalarios){
    const cantidadSalariados = arrayListSalarios.length;
    const porcentajeTopSalariados = 10;
    const cantidadTopSalariados = calcularCantidadSegunPorcentaje(cantidadSalariados,porcentajeTopSalariados);
    const posicionPrimerSalariadoTop = cantidadSalariados - cantidadTopSalariados;
    
    const arrayListSalariosNewOrder = ordenarElementosMenorMayor(arrayListSalarios);
    
    const arrayListTopSalariados = arrayListSalariosNewOrder.filter((elementActual,indice)  => indice >= posicionPrimerSalariadoTop);
    
    const medianaSalarios = calcularMediana(arrayListTopSalariados);

    return medianaSalarios;
}

function determinarErrorSalariados(obj){
    const {nombre,salario} = obj;
    
    if(!validarNumero(salario)){
        const idCampoSalario = "#campo-salario";
        const mensajeSueldoError = "El sueldo no es valido";
        mostrarError(mensajeSueldoError,idCampoSalario);
    }
    
    if(!validarValorVacio(nombre)){
        const idCampoNombre = "#campo-name";
        const mensajeNombreError = "El nombre no es valido";
        mostrarError(mensajeNombreError,idCampoNombre);
    }
}

function determinarOptionList(){
        
}
function evento(){
    const $formAnalisisSalarial = document.querySelector("#form-analisis-salarial");
    const btnIdCalcular = "#btn-calcular";
    const contenidoDefaultBtnCalcular = "Calcular Analisis Salarial";
    let arrayListObjSalariados = [];
    
    mostrarElement($formAnalisisSalarial);
    agregarContenidoElemento(contenidoDefaultBtnCalcular,btnIdCalcular);
    
    $formAnalisisSalarial.addEventListener("click",(evt)=>{
        const targetID = evt.target.id; 
        const arrayIDOptions = [
            "btn-add",
            "btn-delete",
            "btn-calcular",
        ];

        if(validarValor(targetID,arrayIDOptions)){
            const objOptionForm = {
                "btn-add": () =>{
                    const idCampoNombre = "#campo-name";
                    const idCampoSalario = "#campo-salario";
                    const nombre = capturarDato("#campo-name");
                    const salario = parseFloat(capturarDato("#campo-salario"));
                    const objAsalariado = {
                        nombre,
                        salario,
                    };
                    
                    eliminarError();
                
                    determinarErrorSalariados(objAsalariado);
                
                    if(validarNumero(salario) && validarValorVacio(nombre)){
                        const $elementoContenedorList = document.querySelector("#list-valors");
                        
                        añadirList(objAsalariado,arrayListObjSalariados);
                        
                        const arrayListSalariado = concatenarLista(arrayListObjSalariados);
                        
                        limpiarHTML($elementoContenedorList);
                        mostrarLista($elementoContenedorList, arrayListSalariado); 
                        limpiarCampo(idCampoNombre);
                        limpiarCampo(idCampoSalario);
                    }  
                },
                "btn-delete": () => {
                    const valorIDCampoPosition = "#campo-position-element";
                    const valorCampoPosition = parseInt(capturarDato(valorIDCampoPosition) - 1);

                    limpiarCampo(valorIDCampoPosition);
                    eliminarError();
                    const mensajeError = determinarErrorCampoPosition(arrayListObjSalariados,valorCampoPosition);
                    mostrarError(mensajeError,valorIDCampoPosition);
                    arrayListObjSalariados = eliminarElementoList(arrayListObjSalariados,valorCampoPosition);
                },
                "btn-calcular": ()=>{
                    const rutaImagen = "../assets/img/dollar.png";
                    const arrayListSalariosActiva = seleccionarlista(colombia,arrayListObjSalariados);
                    const optionMediana = capturarDato("#selec-mediana");
                    
                    const $elementContenedorResultados = document.querySelector("#section-resultados");
                    const arrayObjOptionsMediana = [
                        {
                            optionId: "mediana-salarial",
                            title: "Mediana Salarial",
                            calcularResultado:(arraySalarios)=>{
                                return calcularMediana(arraySalarios);
                            }
                        },
                        {
                            optionId: "mediana-salarial-top", 
                            title: "Mediana Salarial Top 10%",
                            calcularResultado: (arraySalarios)   => {
                                return calcularMedianaSalarialTopPorciento(arraySalarios)
                            },
                        }
                    ];

                    const arrayListSalarios = arrayListSalariosActiva.map((elementActual)=>{
                        return elementActual.salario;                        
                    });

                    const objectMedianaResult = determinarSelecOption(optionMediana,arrayListSalarios,arrayObjOptionsMediana)

                    const objResultado = prepararObjResultado(rutaImagen,objectMedianaResult);

                    mostrarElement($elementContenedorResultados);
                    mostrarResultado(objResultado);
                },
                
            }

            const functionOption = objOptionForm[targetID];
            functionOption();
        }
    });

    cerrarElemento();
}

evento();