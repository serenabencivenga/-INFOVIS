//variabili globali

//var number_of_click la uso perchè dopo 5 click torniamo alla configurazione iniziale
var  number_of_click = 0;
var altezza =650 ; 
var larghezza = 1300;

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
  //inizio
  if (number_of_click == 5||number_of_click == 0){
   r1 = r
   ;}else if (number_of_click==1)
   
   {if (r<=1)
   {
   r1=r*10;}else{
   r1=r*2;}}
   else if (number_of_click==2)
   
   {if (r<=1)
   {
   r1=r*10;}else{
   r1=r;}}
   
   else{
   r1= r*0.1;}
   return r1;}

function assestaY(y){
let y1;
if(number_of_click == 2)
{y1 = y*10;}

else{
y1=y;}
return y1;}

function assestaX(x){
let x1;
if(number_of_click == 3)
{x1 = x*20;}
else{
x1=x;}
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
                .attr("r",function(d) { return d.raggio;})
                .style("fill", "blue")
                .style("stroke", "black")
				.style("stroke-width", function(d) { return d.spessore;})
				.attr("transform","translate(100,50)")
                .style("opacity",function(d) { return d.tonalita;});
  
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
				.style("stroke-width", function(d) { return d.spessore;})
				.attr("transform","translate(100,50)")
				.style("opacity",function(d) { return d.tonalita;});
              
     
   if( number_of_click==5)
     {
		 //riazzera il contatore dei click
       number_of_click=0;
     }
	});}
	aggiornamento(data);
	});