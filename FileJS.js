//variabili globali

//var number_of_click la uso perchè dopo 5 click torniamo alla configurazione iniziale
var  number_of_click = 0;
var altezza =650 ; 
var larghezza = 1300;

//INIZIO MODIFICHE
var min_x=100;
var max_x = 900;

variazione_X= d3.scaleLinear()
.domain([0,1200])
.range([min_x,max_x]);

var min_y=100;
var max_y= 700;
variazione_Y= d3.scaleLinear()
.domain([0,800])
.range([min_y,max_y]);


var min_raggio=10;
var max_raggio= 70;
variazione_Raggio= d3.scaleLinear()
.domain([0,800])
.range([min_raggio,max_raggio]);

var min_Opacita=0.1;
var max_Opacita= 60;
variazione_Opacita= d3.scaleLinear()
.domain([0,100])
.range([min_Opacita,max_Opacita]);

var min_Spessore=1;
var max_Spessore= 90;
variazione_Spessore= d3.scaleLinear()
.domain([0,100])
.range([min_Spessore,max_Spessore]);

//FINE MODIFICHE
function change(data){
data.forEach(function(elem){
	// uso una variabile_di_supporto per mantenere il valore di orizzontale che altrimenti 
	//sarebbe assegnato in modo errato alla variabile tonalita
	variabile_di_supporto = elem.orizzontale
	elem.orizzontale = elem.verticale
    elem.verticale = elem.raggio
    elem.raggio = elem.spessore
    elem.spessore = elem.tonalita
    elem.tonalita=variabile_di_supporto
    ;})}
	
	function assesta_raggio(r) {
   //utilizzo let invece di var in quanto la utilizzo come dichiarazione locale
  let r1;
  r1 = variazione_Raggio(r);
  return r1;
   }
   
function assesta_Opacita(tonalita){
	let ton;
	ton=variazione_Opacita(tonalita);
return ton;}

function assesta_Spessore(bordo){
	let b;
	b=variazione_Spessore(bordo);
return b;}


function assestaY(y){
let y1;
y1= variazione_Y(y);
return y1;}

function assestaX(x){
let x1;
x1 = variazione_X(x);
return x1;}
var svg = d3.select("#circle")
	.append("svg")
	.attr("width",larghezza)
	.attr("height",altezza);
    		
	d3.json("Filejson.json").then(function(data){
	svg.selectAll("circle")
	.data(data)
	.enter().append("circle")
	.attr("cx", function(d) { return assestaX(d.orizzontale);})
                .attr("cy",function(d) { return assestaY(d.verticale);})
                .attr("r",function(d) { return assesta_raggio(d.raggio);})
                .style("fill", "blue")
                .style("stroke", "black")
				.style("stroke-width", function(d) { return assesta_Spessore(d.spessore);})
				.attr("transform","translate(100,50)")
                .style("opacity",function(d) { return assesta_Opacita(d.tonalita);});
  
	function aggiornamento(data){
	body=d3.select("body");   
	body.on("click",function(){
//quando invoco la funzione aggiornamento il numero dei click aumenta
     number_of_click++;
	
	change(data);
	   var circles = svg.selectAll("circle")
          .data(data);		 
      circles.transition()
          .duration(700)
          .attr("cx", function(d) { return assestaX(d.orizzontale);})
                .attr("cy",function(d) { return assestaY(d.verticale);})
                .attr("r",function(d) { return assesta_raggio(d.raggio);})
                .style("fill", "blue")
                .style("stroke", "black")
				.style("stroke-width", function(d) { return assesta_Spessore(d.spessore);})
				.attr("transform","translate(100,50)")
				.style("opacity",function(d) { return assesta_Opacita(d.tonalita);});
              
     
   if( number_of_click==5)
     {
		 //riazzera il contatore dei click
       number_of_click=0;
     }
	});}
	aggiornamento(data);
	});