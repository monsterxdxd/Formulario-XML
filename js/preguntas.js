var formElement=null;
var respuestasSelect=null;

window.onload = function(){ 

	//LEER XML de xml/preguntas.xml
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gestionarXml(this);
		}
	};
	xhttp.open("GET", "xml/preguntas.xml", true);
	xhttp.send();
}

// Recuperamos los datos del fichero XML xml/preguntas.xml
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML; 
	 //CHECKBOX
	//Recuperamos el título y las opciones, guardamos las respuestas correctas
	var tituloCheckbox = xmlDoc.getElementsByTagName("title")[0].innerHTML;
	var opcionesCheckbox = [];
	var nopt = xmlDoc.getElementById("quest001").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++) { 
		opcionesCheckbox[i]=xmlDoc.getElementById("quest001").getElementsByTagName('option')[i].innerHTML;
	}  
	ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
	var nres = xmlDoc.getElementById("quest001").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasCheckbox[i]=xmlDoc.getElementById("quest001").getElementsByTagName("answer")[i].innerHTML;
	}
}
		
function ponerDatosCheckboxHtml(t,opt){
	var checkboxContainer=document.getElementById('checkboxDiv');
	document.getElementById('tituloCheckbox').innerHTML = t;
	for (i = 0; i < opt.length; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opt[i];
		label.setAttribute("for", "color_"+i);
		input.type="checkbox";
		input.name="color";
		input.id="color_"+i;;    
		checkboxContainer.appendChild(input);
		checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
	}  
}

