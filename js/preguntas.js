var formElement=null;
var respuestaInput=null;
var respuestaInput2=null;	
var respuestaSelect=null;
var respuestaSelect2=null;
var respuestasCheckbox = [];
var respuestasCheckbox2 = [];
var respuestaRadio = null;
var respuestaRadio2 = null;
var respuestasMultiple=[];
var respuestasMultiple2=[];

var nota = 0;

//*******************************************************************************************************************************
window.onload = function(){ 
	

	// 	CORREGIR al pulsar boton submit
	formElement=document.getElementById('myform');
	formElement.onsubmit=function(){
		inicializar();
		if (comprobar()){
			tituloCorreccion();
			corregirText();
			corregirSelect();
			corregirCheckbox();
			corregirRadio();
			corregirMultiple();
			corregirText2();
			corregirSelect2();
			corregirCheckbox2();
			corregirRadio2();
			corregirMultiple2();
			presentarNota();
			}
		return false;
	}
	

	//	LEER XML de xml/preguntas.xml
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gestionarXml(this);
		}
	};
	xhttp.open("GET", "xml/preguntas.xml", true);
	xhttp.send();
	

	//Funcion para no tener que usar el control en las preguntas de multiple select
	window.onmousedown = function (e) {
	    var el = e.target;
	    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
		e.preventDefault();

		// toggle selection
		if (el.hasAttribute('selected')) el.removeAttribute('selected');
		else el.setAttribute('selected', '');

		// hack to correct buggy behavior
		var select = el.parentNode.cloneNode(true);
		el.parentNode.parentNode.replaceChild(select, el.parentNode);
	    }
	}

	document.getElementById("respuestas").onclick = function(){
		document.getElementById("resultadoTotal").style.display = "none";
		document.getElementById("resultadosDiv").style.display = "block";
	}
}
//*******************************************************************************************************************************

// Recuperamos los datos del fichero XML xml/preguntas.xml
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML;



	//**********	TEXT	**********

	//Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
	var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
	ponerDatosInputHtml(tituloInput);
	respuestaInput=xmlDoc.getElementById("quest001").getElementsByTagName("answer")[0].innerHTML;
	
	//**********	TEXT 2	**********
	//Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
	var tituloInput2=xmlDoc.getElementsByTagName("title")[5].innerHTML;
	ponerDatosInput2Html(tituloInput2);
	respuestaInput2=xmlDoc.getElementById("quest006").getElementsByTagName("answer")[0].innerHTML;


	//**********	SELECT	**********

	//Recuperamos el título y las opciones, guardamos la respuesta correcta
	var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
	var xpath="/questions/question[@id='quest002']/option";
	var nodeSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelectHtml(tituloSelect,nodeSelect);
	respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[2].innerHTML);

	//**********	SELECT 2	**********
	//Recuperamos el título y las opciones, guardamos la respuesta correcta
	tituloSelect=xmlDoc.getElementsByTagName("title")[6].innerHTML;
	xpath="/questions/question[@id='quest007']/option";
	nodeSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelectHtml2(tituloSelect,nodeSelect);
	respuestaSelect2= parseInt(xmlDoc.getElementById("quest007").getElementsByTagName("answer")[0].innerHTML);
	

	//**********	CHECKBOX	**********

	//Recuperamos el título y las opciones, guardamos las respuestas correctas
	var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
	var opcionesCheckbox = [];
	var nopt = xmlDoc.getElementById("quest003").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++) { 
		opcionesCheckbox[i]=xmlDoc.getElementById("quest003").getElementsByTagName('option')[i].innerHTML;
	}  
	ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
	var nres = xmlDoc.getElementById("quest003").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasCheckbox[i]=xmlDoc.getElementById("quest003").getElementsByTagName("answer")[i].innerHTML;
	}
	
	//**********	CHECKBOX 2	**********
	//Recuperamos el título y las opciones, guardamos las respuestas correctas
	var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
	var opcionesCheckbox2 = [];
	var nopt = xmlDoc.getElementById("quest008").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++) { 
		opcionesCheckbox2[i]=xmlDoc.getElementById("quest008").getElementsByTagName('option')[i].innerHTML;
	}  
	ponerDatosCheckboxHtml2(tituloCheckbox2,opcionesCheckbox2);
	var nres = xmlDoc.getElementById("quest008").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasCheckbox2[i]=xmlDoc.getElementById("quest008").getElementsByTagName("answer")[i].innerHTML;
	}


	//**********	RADIO	**********

	//Recuperamos el título y las opciones, guardamos las respuestas correctas
	var tituloRadio = xmlDoc.getElementsByTagName("title")[3].innerHTML;
	var opcionesRadio = [];
	var nopt = xmlDoc.getElementById("quest004").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++) { 
		opcionesRadio[i]=xmlDoc.getElementById("quest004").getElementsByTagName('option')[i].innerHTML;
	}  
	ponerDatosRadio(tituloRadio,opcionesRadio);
	respuestaRadio=xmlDoc.getElementById("quest004").getElementsByTagName("answer")[0].innerHTML;	
	
	//**********	RADIO 2	**********
	//Recuperamos el título y las opciones, guardamos las respuestas correctas
	var tituloRadio2 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
	var opcionesRadio2 = [];
	var nopt = xmlDoc.getElementById("quest009").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++) { 
		opcionesRadio2[i]=xmlDoc.getElementById("quest009").getElementsByTagName('option')[i].innerHTML;
	}  
	ponerDatosRadio2(tituloRadio2,opcionesRadio2);
	respuestaRadio2=xmlDoc.getElementById("quest009").getElementsByTagName("answer")[0].innerHTML;	


	//**********	MULTIPLE	**********

	//Recuperamos el título y las opciones, guardamos la respuesta correcta
	var tituloSelectMultiple=xmlDoc.getElementsByTagName("title")[4].innerHTML;
	var opcionesSelectMultiple = [];
	var nopt = xmlDoc.getElementById("quest005").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++) { 
		opcionesSelectMultiple[i] = xmlDoc.getElementById("quest005").getElementsByTagName('option')[i].innerHTML;
	}
	ponerDatosMultipleSelectHtml(tituloSelectMultiple,opcionesSelectMultiple);
	var nres = xmlDoc.getElementById("quest005").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasMultiple[i]=xmlDoc.getElementById("quest005").getElementsByTagName("answer")[i].innerHTML;
	}

	//**********	MULTIPLE2	**********
	//Recuperamos el título y las opciones, guardamos la respuesta correcta
	var tituloSelectMultiple2=xmlDoc.getElementsByTagName("title")[9].innerHTML;
	var opcionesSelectMultiple2 = [];
	var nopt = xmlDoc.getElementById("quest010").getElementsByTagName('option').length;
	for (i = 0; i < nopt; i++) { 
		opcionesSelectMultiple2[i] = xmlDoc.getElementById("quest010").getElementsByTagName('option')[i].innerHTML;
	}
	ponerDatosMultipleSelectHtml2(tituloSelectMultiple2,opcionesSelectMultiple2);
	var nres = xmlDoc.getElementById("quest010").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasMultiple2[i]=xmlDoc.getElementById("quest010").getElementsByTagName("answer")[i].innerHTML;
	}
}




//****************************************************************************************************
//implementación de la corrección


//**********	CORECCION INPUT	**********

function corregirText(){
	//Vosotros debéis comparar el texto escrito con el texto que hay en el xml
	//en este ejemplo hace una comparación de números enteros
	var s=formElement.elements[0].value;     
	if (s.toLowerCase()==respuestaInput) {
		darRespuestaHtml("1ª pregunta: 1 punto");
		nota +=1;
	}else {
		darRespuestaHtml("1ª pregunta: 0 puntos");
	}
}

function corregirText2(){
	//Vosotros debéis comparar el texto escrito con el texto que hay en el xml
	//en este ejemplo hace	 una comparación de números enteros
	var s=document.getElementById("text2").value;     
	if (s.toLowerCase()==respuestaInput2) {
		darRespuestaHtml("6ª pregunta: 1 punto");
		nota +=1;
	}else {
		darRespuestaHtml("6ª pregunta: 0 puntos");
	}
}


//**********	CORECCION SELECT	**********

function corregirSelect(){
	var sel = document.getElementById("sel"); 
	if (sel.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
		darRespuestaHtml("2ª pregunta: 1 punto");
		nota +=1;
	} else darRespuestaHtml("2ª pregunta: 0 puntos");
}
function corregirSelect2(){
	var sel = document.getElementById("sel2"); 
	if (sel.selectedIndex-1==respuestaSelect2) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
		darRespuestaHtml("7ª pregunta: 1 punto");
		nota +=1;
	} else darRespuestaHtml("7ª pregunta: 0 puntos");
}


//**********	CORECCION CHECKBOX	**********

function corregirCheckbox(){
	var notaCheckbox = 0;
	var f=formElement;
	var escorrecta = [];
	for (i = 0; i < f.chckbx.length; i++) {  //"chckbx" es el nombre asignado a todos los checkbox
		if (f.chckbx[i].checked) {
			escorrecta[i]=false;     
			for (j = 0; j < respuestasCheckbox.length; j++) {
				if (i==respuestasCheckbox[j]) escorrecta[i]=true;
			}
			//si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
			if (escorrecta[i]) {
				nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas posibles
				notaCheckbox +=1.0/respuestasCheckbox.length;
			} else {
				nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas posibles   
			}   
		}
	}
	if (notaCheckbox != 1){
		darRespuestaHtml("3ª pregunta: " + notaCheckbox + " puntos")
	} else darRespuestaHtml("3ª pregunta: " + notaCheckbox + " punto")
	
}
function corregirCheckbox2(){
	var notaCheckbox = 0;
	var f=formElement;
	var escorrecta = [];
	for (i = 0; i < f.chckbx2.length; i++) {  //"chckbx" es el nombre asignado a todos los checkbox
		if (f.chckbx2[i].checked) {
		escorrecta[i]=false;     
			for (j = 0; j < respuestasCheckbox2.length; j++) {
				if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
			}
			//si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
			if (escorrecta[i]) {
				nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas posibles
				notaCheckbox +=1.0/respuestasCheckbox2.length;
			} else {
				nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas posibles   
			}   
		}
	}
	if (notaCheckbox != 1){
		darRespuestaHtml("8ª pregunta: " + notaCheckbox + " puntos")
	} else darRespuestaHtml("8ª pregunta: " + notaCheckbox + " punto")
}


//**********	CORECCION RADIO	**********

function corregirRadio(){
	var notaRadio = 0;
	var f=formElement;
	var escorrecta = null;
	for (i = 0; i < f.rd.length; i++) {  //"rd" es el nombre asignado a todos los radio.
		if (f.rd[i].checked) {
			escorrecta=false;   
			if (i==respuestaRadio) escorrecta=true;
			//si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
			if (escorrecta) {
				notaRadio +=1.0;  //dividido por el número de respuestas posibles
				nota +=1.0;
			}   
		}
	}
	if (notaRadio != 1){
		darRespuestaHtml("4ª pregunta: " + notaRadio + " puntos")
	} else darRespuestaHtml("4ª pregunta: " + notaRadio + " punto")
}
function corregirRadio2(){
	var notaRadio = 0;
	var f=formElement;
	var escorrecta = null;
	for (i = 0; i < f.rd2.length; i++) {  //"rd" es el nombre asignado a todos los radio.
		if (f.rd2[i].checked) {
			escorrecta=false;   
			if (i==respuestaRadio2) escorrecta=true;
			//si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
			if (escorrecta) {
				notaRadio +=1.0;  //dividido por el número de respuestas posibles
				nota +=1.0;
			}   
		}
	}
	if (notaRadio != 1){
		darRespuestaHtml("9ª pregunta: " + notaRadio + " puntos")
	} else darRespuestaHtml("9ª pregunta: " + notaRadio + " punto")
}


//**********	CORECCION MULTIPLE	**********

function corregirMultiple(){
	var f = formElement;
	var escorrecta = [];
	var multiple = document.getElementById("selectMultiple");
	var puntuacion = 0;
	for (var i = 0; i<multiple.options.length; i ++){
		if (multiple.options[i].selected){
			for (var j = 0; j<respuestasMultiple.length; j++){
				if (multiple.options[i].value == respuestasMultiple[j]){
					escorrecta.push(multiple.options[i].value);
				}
			}
		}
	}
	if (escorrecta.length > 0){
		puntuacion = escorrecta.length / respuestasMultiple.length;
		nota += puntuacion;
	}
	if (puntuacion != 1 & puntuacion != 0){
		darRespuestaHtml("5ª pregunta: " + puntuacion.toFixed(1) + " puntos")
	} else if (puntuacion == 0){
		darRespuestaHtml("5ª pregunta: 0 puntos");
	}else darRespuestaHtml("5ª pregunta: 1 punto")
}
function corregirMultiple2(){
	var f = formElement;
	var escorrecta = [];
	var multiple = document.getElementById("selectMultiple2");
	var puntuacion = 0;
	for (var i = 0; i<multiple.options.length; i ++){
		if (multiple.options[i].selected){
			for (var j = 0; j<respuestasMultiple2.length; j++){
				if (multiple.options[i].value == respuestasMultiple2[j]){
					escorrecta.push(multiple.options[i].value);
				}
			}
		}
	}
	if (escorrecta.length > 0){
		puntuacion = escorrecta.length / respuestasMultiple2.length;
		nota += puntuacion;
	}
	if (puntuacion != 1 & puntuacion != 0){
		darRespuestaHtml("10ª pregunta: " + puntuacion.toFixed(1) + " puntos")
	} else if (puntuacion == 0){
		darRespuestaHtml("10ª pregunta: 0 puntos");
	}else darRespuestaHtml("10ª pregunta: 1 punto")
}





//*******************************************************************************************************************************
// 	poner los datos recibios en el HTML

//Preguntas input
function ponerDatosInputHtml(t){
	document.getElementById("tituloInput").innerHTML = t;
}
function ponerDatosInput2Html(t){
	document.getElementById("tituloInput2").innerHTML = t;
}

//Preguntas select 
function ponerDatosSelectHtml(t,nodes){
	document.getElementById("tituloSelect").innerHTML=t;
	var select = document.getElementsByTagName("select")[0];
	var result = nodes.iterateNext();
	i=0;
	while (result) {
		var option = document.createElement("option");
		option.text = result.innerHTML;
		option.value=i+1; i++;
		select.options.add(option);
		result = nodes.iterateNext();
	}  
}
function ponerDatosSelectHtml2(t,nodes){
	document.getElementById("tituloSelect2").innerHTML=t;
	var select = document.getElementsByTagName("select")[2];
	var result = nodes.iterateNext();
	i=0;
	while (result) {
		var option = document.createElement("option");
		option.text = result.innerHTML;
		option.value=i+1; i++;
		select.options.add(option);
		result = nodes.iterateNext();
	}  
}

//Preguntas checkbox
function ponerDatosCheckboxHtml(t,opt){
	var checkboxContainer=document.getElementById('checkboxDiv');
	document.getElementById('tituloCheckbox').innerHTML = t;
	for (i = 0; i < opt.length; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opt[i];
		label.setAttribute("for", "chckbx_"+i);
		input.type="checkbox";
		input.name="chckbx";
		input.id="chckbx_"+i;;  
		checkboxContainer.appendChild(input);
		checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
	}  
}	
function ponerDatosCheckboxHtml2(t, opt){
	var checkboxContainer=document.getElementById('checkboxDiv2');
	document.getElementById('tituloCheckbox2').innerHTML = t;
	for (i = 0; i < opt.length; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opt[i];
		label.setAttribute("for", "chckbx2_"+i);
		input.type="checkbox";
		input.name="chckbx2";
		input.id="chckbx2_"+i;;    
		checkboxContainer.appendChild(input);
		checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
	} 
}

//Preguntas radio
function ponerDatosRadio(t,opt){
	var radioContainer=document.getElementById('radioDiv');
	document.getElementById('tituloRadio').innerHTML = t;
	for (i = 0; i < opt.length; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opt[i];
		label.setAttribute("for", "rd_"+i);
		input.type="radio";
		input.name="rd";
		input.id="rd_"+i;   
		radioContainer.appendChild(input);
		radioContainer.appendChild(label);
		radioContainer.appendChild(document.createElement("br"));
	}  
}
function ponerDatosRadio2(t,opt){
	var radioContainer=document.getElementById('radioDiv2');
	document.getElementById('tituloRadio2').innerHTML = t;
	for (i = 0; i < opt.length; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opt[i];
		label.setAttribute("for", "rd2_"+i);
		input.type="radio";
		input.name="rd2";
		input.id="rd2_"+i;;    
		radioContainer.appendChild(input);
		radioContainer.appendChild(label);
		radioContainer.appendChild(document.createElement("br"));
	}  
}

//Preguntas multiple
function ponerDatosMultipleSelectHtml(t,opt){
	document.getElementById("tituloSelectMultiple").innerHTML=t;
	var selectMultiple = document.getElementsByTagName("select")[1];
	for (i = 0; i < opt.length; i++) { 
		var option = document.createElement("option");
		option.text = opt[i];
		option.value=i+1;
		selectMultiple.options.add(option);
	} 
}
//Preguntas multiple
function ponerDatosMultipleSelectHtml2(t,opt){
	document.getElementById("tituloSelectMultiple2").innerHTML=t;
	var selectMultiple = document.getElementsByTagName("select")[3];
	for (i = 0; i < opt.length; i++) { 
		var option = document.createElement("option");
		option.text = opt[i];
		option.value=i+1;
		selectMultiple.options.add(option);
	} 
}

//*******************************************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
	var p = document.createElement("p");
	var node = document.createTextNode(r);
	p.appendChild(node);
	document.getElementById('resultadosDiv').appendChild(p);
}
function darRespuestaTotal(r){
	document.getElementById("myform").style.display = "none";
	document.getElementById("resultadoTotal").style.display = "block";
	var p = document.createElement("p");
	var p2 = document.getElementById("respuestas");
	p.id="total";
	p2.id="respuestas";  
	var node = document.createTextNode(r);
	var node2= document.createTextNode("Para puntuación detallada, pulsa aquí:");
	p.appendChild(node);
	p2.appendChild(node2);
	document.getElementById('resultadoTotal').appendChild(p);
	document.getElementById('resultadoTotal').appendChild(p2);

}
function tituloCorreccion(){
	darRespuestaHtml("Puntuaci\u00F3n obtenida por pregunta:");
}
function presentarNota(){
	darRespuestaTotal("Puntuación total: "+nota.toFixed(2));
}
//	inicializar la corrección
function inicializar(){
	document.getElementById('resultadosDiv').innerHTML = "";
	nota=0.0;
}


//Comprobar que se han introducido datos en el formulario
function comprobar(){
	var f=formElement;
	var checked=false;
	var checked2=false;
	var radioSelected=false;
	var radioSelected2=false;
	for (i = 0; i < f.chckbx.length; i++) {  //"chckbx" es el nombre asignado a todos los checkbox
		if (f.chckbx[i].checked) checked=true;
	}
	for (i = 0; i < f.chckbx2.length; i++) {  //"chckbx" es el nombre asignado a todos los checkbox
		if (f.chckbx2[i].checked) checked2=true;
	}
	for (i = 0; i < f.rd.length; i++) {
		if (f.rd[i].checked) radioSelected=true;
	}
	for (i = 0; i < f.rd2.length; i++) {
		if (f.rd2[i].checked) radioSelected2=true;
	}
	if (document.getElementById("text").value == "") {
		document.getElementById("text").focus();
		alert("La 1ª pregunta es obligatoria");
		return false;
	} else if (f.elements[1].selectedIndex==0) {
		document.getElementById("text").focus();
		alert("Selecciona una de las opciones en la 2ª pregunta");
		return false;
	} if (!checked) {    
		document.getElementById("tituloCheckbox").focus();
		alert("Debes elegir una opción en la 3ª pregunta");
		return false;
	} else if (!radioSelected) { 
		document.getElementById("tituloRadio").focus();
		alert("Selecciona una opción en la 4ª pregunta");
		return false;
	} else if (document.getElementById("selectMultiple").selectedIndex == -1){
		alert("Responde la 5ª pregunta");
		document.getElementById("selectMultiple").focus;
		return false;
	} else 	if (document.getElementById("text2").value == "") {
		document.getElementById("text2").focus();
		alert("La 6ª pregunta es obligatoria");
		return false;
	} else if (document.getElementById("sel2").selectedIndex==0) {
		document.getElementById("sel2").focus();
		alert("Selecciona una de las opciones en la 7ª pregunta");
		return false;
	} else if (!checked2) {    
		document.getElementById("tituloCheckbox2").focus();
		alert("Debes elegir una opción en la 8ª pregunta");
		return false;
	} else if (!radioSelected2) { 
		document.getElementById("tituloRadio2").focus();
		alert("Selecciona una opción en la 9ª pregunta");
		return false;
	} else if (document.getElementById("selectMultiple2").selectedIndex == -1){
		alert("Responde la 10ª pregunta");
		document.getElementById("selectMultiple2").focus;
		return false;
	}else return true;
}
