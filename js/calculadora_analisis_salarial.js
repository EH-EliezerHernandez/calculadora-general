function capturarDato($valorId){
    const dato = document.querySelector($valorId).value;

    return dato;
}


function calcularCantidadSegunPorcentaje(cantidadTotal,porcentaje){
    const cantidadResultante = porcentaje * cantidadTotal / 100;
    return cantidadResultante;
}

function calcularMedianaSalarialTopPorciento(arrayListSalarios){
    const cantidadSalariados = arrayListSalarios.length;
    const cantidadTopSalariados = calcularCantidadSegunPorcentaje(cantidadSalariados,porcentajeTopSalariados);
    const posicionPrimerSalariadoTop = cantidadSalariados - cantidadTopSalariados;
    
    const arrayListSalariosNewOrder = ordenarElementosMenorMayor(arrayListSalarios);
    
    const arrayListTopSalariados = arrayListSalariosNewOrder.filter((elementActual,indice)  => indice >= posicionPrimerSalariadoTop);
    
    const medianaSalarios = calcularMediana(arrayListTopSalariados);

    return medianaSalarios;
}

function prepararObjResultado(rutaImagen,title,resultado){
    const objResultado ={
        imagen: rutaImagen,
        title,
        resultado
    };

    return objResultado;
}

function evento(){
    const $formAnalisisSalarial = document.querySelector("#form-analisis-salarial");
    const btnIdCalcular = "#btn-calcular";
    const contenidoDefaultBtnCalcular = "Calcular Analisis Salarial";
    const arrayListObjSalariados = [];
    
    mostrarElement($formAnalisisSalarial);
    agregarContenidoElemento(contenidoDefaultBtnCalcular,btnIdCalcular);
    
    $formAnalisisSalarial.addEventListener("click",(evt)=>{
        const targetID = evt.target.id; 
        const arrayIDOptions = [
            "btn-add",
            "btn-delete",
            "btn-calcular"
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
                    
                    const isSueldoValid = validarNumero(salario);
                    const isNombreValid = validarValorVacio(nombre);
                    
                    eliminarError();

                    if(!isSueldoValid){
                        const mensajeSueldoError = "El sueldo no es valido";
                        mostrarError(mensajeSueldoError,idCampoSalario);
                    }
                    
                    if(!isNombreValid){
                        const mensajeNombreError = "El nombre no es valido";
                        mostrarError(mensajeNombreError,idCampoNombre);
                    }
                    
                    if(isNombreValid && isSueldoValid){
                        const $elementoContenedorList = document.querySelector("#list-valors");
                        const styleSalario = "bold";
                        
                        añadirList(objAsalariado,arrayListObjSalariados);
                        
                        const arrayListSalariado = arrayListObjSalariados.map((elementActual)=>{
                            const {nombre,salario} = elementActual;
                            return `${nombre} <spam class="${styleSalario}">USB ${salario}</spam>`
                        });
                        
                        limpiarHTML($elementoContenedorList);
                        mostrarLista($elementoContenedorList, arrayListSalariado); 
                        limpiarCampo(idCampoNombre);
                        limpiarCampo(idCampoSalario);
                    }
                    
                },
                "btn-calcular": ()=>{
                    const rutaImagen = "../assets/img/dollar.png";
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
                            title: "Mediana Salarial Top %",
                            calcularResultado: (arraySalarios)   => {
                                return calcularMedianaSalarialTopPorciento(arraySalarios)
                            },
                        }
                    ];

                    const arrayListSalarios = arrayListObjSalariados.map((elementActual)=>{
                        return elementActual.salario;                        
                    });

                    const objectMedianaResult = determinarSelecOption(optionMediana,arrayListSalarios,arrayObjOptionsMediana)
                    
                    const {name,resultado}= objectMedianaResult;

                    const objResultado = prepararObjResultado(rutaImagen,name,resultado);

                    mostrarElement($elementContenedorResultados);
                    mostrarResultado(objResultado);
                },
                
            }

            const functionOption = objOptionForm[targetID];
            functionOption();
        }
    });

}

evento();