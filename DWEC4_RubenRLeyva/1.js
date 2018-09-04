// NOTA: PARTO DEL EJEMPLO DEL TEMARIO.
// Ésta es la primera instrucción que se ejecutará cuando el documento esté cargado.
// Se hará una llamada a la función iniciar()
// De esta manera nos aseguramos que las asignaciones de eventos no fallarán ya que
// todos los objetos están disponibles.

window.onload=iniciar;

// Comprobaremos si existe el contador en el localStorage
if(!localStorage.contador || isNaN(localStorage.contador))
{	
   localStorage.contador = 0; // En caso de no existir lo creamos con valor cero.
}

// Vemos cual es la id de la última ventana focuseada
var ultimaOpcionFocuseada = ""; 

// El evento por defecto
var eventopordefecto;


//----------------------------------------------------------//

/**
 * Función utilizada para iniciar los diferentes eventos que se puedan generar.
 * @returns {undefined} No retornamos nada
 */
function iniciar()
{
    // Capturamos el botón reiniciar que limpiará todos los campos.
    document.getElementById("reiniciar").addEventListener('click',reiniciar, false);
    
    // Capturamos el botón limpiar, el cual limpiará unicamente el campo focuseado en ese momento.
    document.getElementById("limpiar").addEventListener('click', limpiar, false);
    
    // Capturamos el botón enviar, el cual llevará a cabo la validación de los diferentes campos.
    document.getElementById("enviar").addEventListener('click', validar, true);
    
    // Colocamos en la ventana contador el valor del que disponga en ese momento localStorage
    document.getElementById("contador").value = localStorage.contador;
	
    //Evento para añadir color al hacer foco en el campo nombre
    document.getElementById("nombre").addEventListener('focus', function(){
        
        // Le damos color al fondo
        document.getElementById("nombre").style.backgroundColor = '#CCCC33';
        
        // Aprobechamos para pasarle el nombre focuseado
        ultimaOpcionFocuseada = "nombre";
    });
    
    //Evento para añadir color al hacer foco en el campo apellidos
    document.getElementById("apellidos").addEventListener('focus', function(){
                  
        // Le damos color al fondo
        document.getElementById("apellidos").style.backgroundColor = '#CCCC33';
        
        // Aprobechamos para pasarle el nombre focuseado
        ultimaOpcionFocuseada = "apellidos";
    });
    
    //Evento para añadir color al hacer foco en el campo contraseña
    document.getElementById("contrasena").addEventListener('focus', function(){
        
        // Le damos color al fondo
        document.getElementById("contrasena").style.backgroundColor = '#CCCC33';
        
        // Aprobechamos para pasarle el nombre focuseado
        ultimaOpcionFocuseada = "contrasena";
    });
    
    //Evento para añadir color al hacer foco en el campo repetir contraseña
    document.getElementById("contrasenaV").addEventListener('focus', function(){
        
        // Le damos color al fondo
        document.getElementById("contrasenaV").style.backgroundColor = '#CCCC33';
        
        // Aprobechamos para pasarle el nombre focuseado
        ultimaOpcionFocuseada = "contrasenaV"; 
    });
    
    //Evento para quitar color al hacer foco en el campo nombre
    document.getElementById("nombre").addEventListener('blur', function(){
        
        // Le damos color al fondo
        document.getElementById("nombre").style.backgroundColor = '#ffffff';
    });
    
    //Evento para quitar color al hacer foco en el campo apellidos
    document.getElementById("apellidos").addEventListener('blur', function(){
        
        // Le damos color al fondo
        document.getElementById("apellidos").style.backgroundColor = '#ffffff';    
    });
    
    //Evento para quitar color al hacer foco en el campo contraseña
    document.getElementById("contrasena").addEventListener('blur', function(){
        
        // Le damos color al fondo
        document.getElementById("contrasena").style.backgroundColor = '#ffffff';
    });
    
    //Evento para quitar color al hacer foco en el campo repetir contraseña
    document.getElementById("contrasenaV").addEventListener('blur', function(){
        
        // Le damos color al fondo
        document.getElementById("contrasenaV").style.backgroundColor = '#ffffff';   
    });	
}

//----------------------------------------------------------//

/**
 * Función encargada de validar los diferentes datos introducidos.
 * 
 * @param {type} eventopordefecto La variable que gestiona el evento por defecto
 *               asociado al botón enviar.
 * @returns {Boolean} 
 */
function validar(eventopordefecto)
{                         
    // Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
    if (validarcampostexto(this) && confirm("¿Deseas enviar el formulario?"))
    {
        // En caso de que todos los campos esten bien introducidos cambiamos el div con los siguientes datos.
        document.getElementById("resultado").innerHTML="El nombre introducido es: "+document.getElementById("nombre").value
                                                +"<br>Los apellidos son: "+document.getElementById("apellidos").value
                                                +"<br>La clave introducida es: "+document.getElementById("contrasena").value;
                                        
        // Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
        eventopordefecto.preventDefault();
        
        // Salimos de la función devolviendo false.
        return false;
    }
    else
    {
        
	// Cancelamos el evento de envío por defecto asignado al boton de submit enviar.
	eventopordefecto.preventDefault();
        
        // Salimos de la función devolviendo false.
	return false;	
    }
}

//----------------------------------------------------------//

/**
 * Función que valida los campos de texto.
 * 
 * @param {type} objeto El botón enviar
 * @returns {Boolean}
 */
function validarcampostexto(objeto)
{
    // La propiedad form del botón enviar contiene la referencia del formulario dónde está ese botón submit.
    var formulario = objeto.form;

    // Variable creada para utilizar con la contraseña.
    var contrasena = "";
    
    // Variable encargada de contar los errores que se puedan producir.
    var contadorErrores = 0;

    // Recorremos los diferentes elementos del formulario a través de un bucle for
    for (var i = 0; i < formulario.elements.length; i++)
    {
        // Eliminamos la clase Error que estuviera asignada a algún campo.
        formulario.elements[i].className = "";
    }
	
    // Recorremos los diferentes elementos del formulario a través de un bucle for,
    // buscando los que son de tipo texto, para validar que contengan valores.
    for(var i = 0; i < formulario.elements.length; i++)
    {
        // Si es de tipo text y además está vacío
        if (formulario.elements[i].type === "text" && formulario.elements[i].value === "")
        {
            // Le pasamos error para después colorear el borde
            formulario.elements[i].className = "error";
            
            // Aumentamos en uno el contador de errores.
            contadorErrores++;       
        }
        else if (formulario.elements[i].id === "nombre") // Aprovechamos y dentro de la función validamos el nombre también.
	{
            // Comprobamos si el nombre se encuentra bien introducido
            if (!validarNombre(formulario.elements[i].value))
            {
		// Le pasamos error para después colorear el borde
                formulario.elements[i].className = "error";
            
                // Aumentamos en uno el contador de errores.
                contadorErrores++;
            }   
	}
        else if (formulario.elements[i].id === "apellidos") // Aprovechamos y dentro de la función validamos los apellidos también.
	{
            // Comprobamos si los apellidos se encuentran bien introducidos
            if (!validarApellidos(formulario.elements[i].value))
            {
		// Le pasamos error para después colorear el borde
                formulario.elements[i].className = "error";
            
                // Aumentamos en uno el contador de errores.
                contadorErrores++;
            }
	}
        else if (formulario.elements[i].id === "contrasena") // Aprovechamos y dentro de la función validamos la contraseña también.
	{
            // Le pasamos el valor de la contraseña a la variable para utilizarla más tarde
            contrasena = formulario.elements[i].value; 
            
            // Comprobamos si la contraseña se encuentra bien introducida
            if (!validarContrasena(contrasena))
            {
                // Le pasamos error para después colorear el borde
                formulario.elements[i].className = "error";
            
                // Aumentamos en uno el contador de errores.
                contadorErrores++;
            }
	}
        else if (formulario.elements[i].id === "contrasenaV") // Aprovechamos y dentro de la función validamos la verificación de la contraseña también.
	{
            // Comprobamos que ambas contraseñas son iguales.
            if (formulario.elements[i].value !== contrasena)
            {
		// Le pasamos error para después colorear el borde
                formulario.elements[i].className = "error";
            
                // Aumentamos en uno el contador de errores.
                contadorErrores++;
            }
	}
    }
    
    // Actualizamos el contador de intentos ya que sea correcto o no hay que sumar un intento.
    localStorage.contador = parseInt(localStorage.contador) + 1;
    document.getElementById("contador").value = localStorage.contador;
    
    // Si el número de errores es mayor de cero se retorna falso
    if(contadorErrores > 0){
        
        return false;
        
    }
    else // en caso contrario coloreamos todos los campos de tipo texto a color verde
    {
        // Recorremos los elementos del formulario mediante un bucle for
        for(var i = 0; i < formulario.elements.length; i++)
        {
            // Si el elemento del formulario es de tipo text
            if(formulario.elements[i].type === "text")
            {
                // Lo coloreamos de verde
                document.getElementById(formulario.elements[i].id.valueOf()).style.backgroundColor = '#40FF00';
            }
        }
        
        // Si se sale de la función con esta instrucción es que todos los campos de texto son válidos.
        return true;
    }	 
}

//----------------------------------------------------------//

/**
 * Le pasamos el string con la contraseña.
 * 
 * @param {type} valor La contraseña.
 * @returns {Boolean} 
 */
function validarContrasena(valor)
{
    // Al menos 8 caracteres. 16 máximo.
    // Caracteres alfabéticos (al menos dos).
    // Al menos una mayúsculas.
    // Debe contener un carácter alfabético que sea con acento.
    // Sólo puede contener un máximo de 4 dígitos decimales y un mínimo de 2.
    // Debe terminar en dígito decimal.
    // Obligatoriamente al menos uno de estos caracteres . (punto) / (la barra encima del 7) o $ (dólar).

    
    var patron = /^(?=(?:\D*\d*.*[a-zñçü]){2})(?=.*[áéíóúÁÉIÓÚ])(?!(?:\D*\d*.*[áéíóúÁÉÍÓÚ]){2})(?=(?:){1})(?=.*[A-ZÑÇÜ])(?=(?:\D*\d){2})(?!(?:\D*\d){5})(?=.*[\.\/\$])[a-zA-ZáéíóúÁÉÍÓÚñÑçÇüÜ\.\/\$\d]{8,15}(\d$)/;
    
    // NOTA: Me ha constado muchísimas horas espero que esté bien realizado.
    
    // Comprobamos si el valor de la contraseña se corresponde con el patrón.
    if (valor.match(patron))
    {	  
	return true;
    }
    else
    {	   
	return false;
    }
}

/**
 * Función encargada de verificar el nombre.
 * 
 * @param {type} valor El nombre
 * @returns {Boolean}
 */
function validarNombre(valor)
{
    // Debe verificarse que el nombre solo dispone de caracteres alfabéticos y 
    // espacios para cuando el nombre es compuesto.  Al menos tres caracteres 
    // de mínimo y 40 de máximo.
	
    var patron = /^([a-záéíóúñçüA-ZÁÉÍÓÚÑÇÜ\s]{3,40})$/;
	
    // Comprobamos si el valor del nombre se corresponde con el patrón.
    if (valor.match(patron))
    {	
	return true;
    }
    else
    {			
	return false;
    }
}

/**
 * Función encargada de validar los apellidos.
 * 
 * @param {type} valor Los apellidos
 * @returns {Boolean}
 */
function validarApellidos(valor)
{
    // Debe verificarse que el nombre solo dispone de caracteres alfabéticos y espacios. 
    // No puede tener más de 60 caracteres alfabéticos y no menos de 4.
	
    var patron = /^([a-záéíóúñçüA-ZÁÉÍÓÚÑÇÜ\s]{4,60})$/;
	   
    // Comprobamos si el valor del nombre se corresponde con el patrón.
    if (valor.match(patron))
    {
	return true;
    }
    else
    {			
	return false;
    }
}

//----------------------------------------------------------//

/**
 * Función que limpia la última opción focuseada.
 * 
 * @param {type} eventopordefecto El evento por defecto.
 * @returns {Boolean}
 */
function limpiar(eventopordefecto)
{	
    // Comprobamos que existe una opción focuseada
    if (ultimaOpcionFocuseada !== "") 
    {
        // Limpiamos el valor que tenga
	document.getElementById(ultimaOpcionFocuseada).value = "";
        
        // Limpiamos la variable con la última opción focuseada
        ultimaOpcionFocuseada = "";
        
        // Cancelamos el evento de envío.
        eventopordefecto.preventDefault();		
        return true;
    }
    else // en caso contrario
    {
        // avisamos de que no hay ningún campo focuseado
        alert("No has escogido ningún campo para limpiar.");
        
        // Cancelamos el evento de envío.
        eventopordefecto.preventDefault();
        return false;
    }
}

//----------------------------------------------------------//

/**
 * Función encargada de reiniciar todos los datos (excepto el contador)
 * @param {type} eventopordefecto El evento por defecto
 * @returns {Boolean}
 */
function reiniciar(eventopordefecto){
	
    // Le a la variable formulario los datos del formulario.
    var formulario = this.form;
     
    // Recoremos mediante un bucle for los elementos del formulario
    for (var i = 0; i < formulario.elements.length; i++) {
        
        // En caso de ser de tipo text
        if (formulario.elements[i].type === "text"){
            
            // Vaciamos los textos
            formulario.elements[i].value = ""; 
            
            // Ponemos todos los fondos en blanco
            document.getElementById(formulario.elements[i].id.valueOf()).style.backgroundColor = '#FFFFFF'; 
            
            // Eliminamos la clase Error que estuviera asignada a algún campo.
            formulario.elements[i].className = "";
        }
    }
    
    // Evitamos salir de la página
    eventopordefecto.preventDefault();		
    return false;
}
	