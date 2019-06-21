//variabili globali

//var number_of_click la uso perchè dopo 5 click torniamo alla configurazione iniziale
var  number_of_click = 0;
var altezza =650 ; 
var larghezza = 1300;
var min_x=0;
var max_x =1200;

//PRIMO CLICK
variazione_X= d3.scaleLinear()
.domain([0,400])
.range([min_x,max_x]);

var min_y=0;
var max_y= 600;
variazione_Y= d3.scaleLinear()
.domain([0,600])
.range([min_y,max_y]);
////////////


//SECONDO CLICK
var min_y1=0;
var max_y1= 300;
variazione_Y1= d3.scaleLinear()
.domain([0,40])
.range([min_y1,max_y1]);

var min_x1=0;
var max_x1= 1000;
variazione_X1= d3.scaleLinear()
.domain([0,370])
.range([min_x1,max_x1]);
///////////////////

//TERZO CLICK
var min_y2=10;
var max_y2= 200;
variazione_Y2= d3.scaleLinear()
.domain([0,20])
.range([min_y2,max_y2]);

var min_x2=0;
var max_x2= 850;
variazione_X2= d3.scaleLinear()
.domain([0,40])
.range([min_x2,max_x2]);
////////////////////////

//QUARTO CLICK
var min_y3=0;
var max_y3= 50;
variazione_Y3= d3.scaleLinear()
.domain([0,1])
.range([min_y3,max_y3]);

var min_x3=10;
var max_x3= 650;
variazione_X3= d3.scaleLinear()
.domain([0,25])
.range([min_x3,max_x3]);

var min_raggio3=5;
var max_raggio3= 10;
variazione_Raggio3= d3.scaleLinear()
.domain([0,350])
.range([min_raggio3,max_raggio3]);

//////////////77

//QUINTI CLICK


var min_y4=0;
var max_y4= 500;
variazione_Y4= d3.scaleLinear()
.domain([0,350])
.range([min_y4,max_y4]);

var min_x4=0;
var max_x4= 900;
variazione_X4= d3.scaleLinear()
.domain([0,10])
.range([min_x4,max_x4]);

var min_raggio4=5;
var max_raggio4= 10;
variazione_Raggio4= d3.scaleLinear()
.domain([0,350])
.range([min_raggio3,max_raggio3]);
////
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
  if(number_of_click==3)
  {
  r1 = variazione_Raggio3(r);
  }else if (number_of_click==4)  
  {
  r1 = variazione_Raggio4(r);
  }else
  {
  r1 = variazione_Raggio(r);
  }
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


function assestaX(x){
let x1;
if(number_of_click==1)
{
x1=variazione_X1(x);
}else
if(number_of_click==2){
x1=variazione_X2(x);
}else 
if(number_of_click==3){
x1=variazione_X3(x);
}else
if(number_of_click==4){
x1=variazione_X4(x);
}
else{
x1= variazione_X(x);
}
return x1;}



function assestaY(y){

let y1;
if(number_of_click ==1){
y1=variazione_Y1(y);
}else
if(number_of_click ==2){
y1=variazione_Y2(y);
}
else
if(number_of_click ==3){
y1=variazione_Y3(y);
}else
if(number_of_click ==4){
y1=variazione_Y4(y);
}else
{
y1 = variazione_Y(y);
}
return y1;}
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
				.attr("transform","translate(120,40)")
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
				.attr("transform","translate(120,40)")
				.style("opacity",function(d) { return assesta_Opacita(d.tonalita);});
              
     
   if( number_of_click==5)
     {
		 //riazzera il contatore dei click
       number_of_click=0;
     }
	});}
	aggiornamento(data);
	});