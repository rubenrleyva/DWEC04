// NOTA: PARTO DEL EJEMPLO DEL TEMARIO.
// // Ésta es la primera instrucción que se ejecutará cuando el documento esté cargado.
// Se hará una llamada a la función iniciar()
// De esta manera nos aseguramos que las asignaciones de eventos no fallarán ya que
// todos los objetos están disponibles.

window.onload=iniciar;

// Comprobaremos si existe el contador en el localStorage
if(!localStorage.contadorProductos || isNaN(localStorage.contadorProductos))
{	
    localStorage.contadorProductos = 0; // En caso de no existir lo creamos con valor cero.
}

//----------------------------------------------------------//

/**
 * Función utilizada para iniciar los diferentes eventos que se puedan generar.
 * 
 * @returns {undefined} No retornamos nada.
 */
function iniciar()
{
   
    // Capturamos el botón enviar para validar todos los campos
    document.getElementById("enviar").addEventListener('click',validar);
    
    // Capturamos el botón borrar, que borrará todo el contenido.
    document.getElementById("borrar").addEventListener('click',borrar);
    	
}

//----------------------------------------------------------//

/**
 * Función encargada de validar los datos del formulario.
 * 
 * @param {type} eventopordefecto el evento por defecto.
 * @returns {Boolean}
 */
function validar(eventopordefecto)
{   
    // Recogemos en una variable el formulario.
    var formulario = document.getElementById("formulario");
    
    // Quitamos mediante ambas instrucciones el bordeado de color rojo
    document.getElementById("nombre").className = "";
    document.getElementById("descripcion").className = "";
    
    // Ponemos el contador de errores a cero.
    var contadorError = 0;
    
    // Recorremos los elementos del formulario mediante un bucle for
    for(var i = 0; i < formulario.elements.length; i++)
    {
        
        // Si el nombre del elemento es igual a nombre
        if(formulario.elements[i].valueOf().name === "nombre")
        {
            // Comprobamos mediante la validación que el nombre tiene el patrón adecuado.
            if(!validacionNombre(document.getElementById("nombre").value))
            {
                // En caso de no tenerlo cambiamos el valor de className
                // a error para cambiar su borde a rojo
                document.getElementById("nombre").className = "error";
                
                // Sumamos uno al contador de errores.
                contadorError++;
            }
        }
        
        // Comprobamos que el nombre del elemento corresponde con el de descripción
        if(formulario.elements[i].valueOf().name === "descripcion")
        {
            // Comprobamos mediante validación con un patrón el valor del elemento.
            if(!validacionDescripcion(document.getElementById("descripcion").value))
            {
                // En caso de que no corresponder cambiamos el color del borde que lo
                // contiene a rojo.
                document.getElementById("descripcion").className= "error";
                
                // Incrrementamos en uno el valor del contador de errores.
                contadorError++;
            }
        }
    }
    
    // Si no se han producido errores.
    if(contadorError < 1)
    {
        // Cambiamos los colores de ambos campos a verde.
        document.getElementById("nombre").style.backgroundColor = '#40FF00';
        document.getElementById("descripcion").style.backgroundColor = '#40FF00';
        
        // Sumamos uno al localStorage.
        localStorage.contadorProductos = parseInt(localStorage.contadorProductos) + 1;
        
        // Le pasamos la cantidad de productos que hay ingresados al DIV.
        document.getElementById("resultado").innerHTML = "Tenemos: "+localStorage.contadorProductos+" producto/s ingresados.";     
    }
    
    // Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
    eventopordefecto.preventDefault();
        
    // Salimos de la función devolviendo true.
    return true;
}


//----------------------------------------------------------//

/**
 * Función encargada de comprobar tanto si está vacío como que el patrón se encuentra bien.
 * 
 * @param {type} valorNombre El valor a comprobar con el patrón
 * @returns {Boolean} Devuelve si es correcto o no
 */
function validacionNombre(valorNombre){
    
    // Patrón con el que se debe comparar el nombre
    var patron = /^[a-zA-Z0-9áéíóóñÁÉÍÓÚÑçÇ\s\.,;:]{6,120}$/;
    
    // Comprobamos que el valor es mayor de cero
    if(valorNombre.length > 0)
    {
        // Comprobamos que el valor corresponde con el patrón.
        if (valorNombre.match(patron))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {   
        return false;
    }
}

//----------------------------------------------------------//

/**
 * Función encargada de comprobar tanto si está vacío como que el patrón se encuentra bien.
 * 
 * @param {type} valorDescripcion El valor a comprobar con el patrón
 * @returns {Boolean} Devuelve si es correcto o no
 */
function validacionDescripcion(valorDescripcion){
    
    // Patrón con el que se debe comparar la descipción.
    // NOTA: como en el enunciado del ejercicio no queda claro
    // el tipo de patrón a utilizar y si se debe de utilizar
    // el mismo, he utilizado el mismo que en el caso del nombre
    // por si acaso.
    var patron = /^[a-zA-Z0-9áéíóóñÁÉÍÓÚÑçÇ\s\.,;:]+$/;
    
    // Comprobamos que el valor es mayor de cero
    if((valorDescripcion.length >= 1) && valorDescripcion.length <= 1024)
    {
        // Comprobamos que el valor se ciñe al patrón.
        if (valorDescripcion.match(patron))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {   
        return false;
    } 
}

//----------------------------------------------------------//

/**
 * Función utilizada para borrar el contenido.
 * 
 * @param {type} eventopordefecto El evento por defecto.
 * @returns {Boolean}
 */
function borrar(eventopordefecto)
{
    // Quitamos mediante ambas instrucciones el bordeado de color rojo
    document.getElementById("nombre").className = "";
    document.getElementById("descripcion").className = "";
    
    // Quitamos mediante ambas instrucciones el contenido de los campos
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    
    // Quitamos mediante ambas instrucciones el fondo verde si lo hubiera
    document.getElementById("nombre").style.backgroundColor = '#ffffff';
    document.getElementById("descripcion").style.backgroundColor = '#ffffff';
    
    // Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
    eventopordefecto.preventDefault();
    return false;
    
}
