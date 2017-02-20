var formElement=null;
var respuestasSelect=[];

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
 	//SELECT
 	//Recuperamos el título y las opciones, guardamos la respuesta correcta
 	var tituloSelect=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 	var opcionesSelect = [];
 	var nopt = xmlDoc.getElementById("quest001").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++) { 
			opcionesSelect[i] = xmlDoc.getElementById("quest001").getElementsByTagName('option')[i].innerHTML;
	}
	ponerDatosSelectHtml(tituloSelect,opcionesSelect);
	var nres = xmlDoc.getElementById("quest001").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasSelect[i]=xmlDoc.getElementById("quest001").getElementsByTagName("answer")[i].innerHTML;
	}
}
		
function ponerDatosSelectHtml(title,opt){
	document.getElementById("firstQuestion").innerHTML=title;
	var select = document.getElementsByTagName("select")[0];
	for (i = 0; i < opt.length; i++) { 
		var option = document.createElement("option");
		option.text = opt[i];
		option.value=i+1;
		select.options.add(opt);
	}  
}

