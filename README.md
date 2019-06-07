# -INFOVIS
1 PROGETTO INFOVIS
Progetto INFOVIS <br/>
###############
Traccia : <br/>
Crea un file json con dei dati multivariati: ci sono 20 data-point e 
<br/>ogni data-point ha cinque variabili quantitative i cui valori sono 
tutti positivi. In base a questi dati disegna 20 cerchi nell'area di disegno 
<br/>(ogni cechio corrisponde ad un data-point). La prima variabile determina la 
<br/>posizione orizzontale del cerchio, la seconda variabile la posizione verticale, la terza variabile il raggio, 
<br/>la quarta variabile la lo spessore del bordo, e la quinta variabile la tonalità del riempimento. Facendo click con il 
<br/>pulsante sinistro sullo sfondo le variabili cambiano di ruolo: la prima viene sostituita dalla seconda, la seconda dalla terza, 
<br/>la terza dalla quarta e così via (l'ultima viene sostituita dalla prima). Cliccando ancora la sostituizione avviene di nuovo.
<br/> Dopo cinque click si torna alla configurazione iniziale. Fai in modo che i cambi di dimensioni e di posizione dei cerchi avvengano con un'animazione fluida.<br/>
##################<br/>
Le variabili ORIZZONTALE e VERTICALE hanno dei valori molto più alti rispetto alle altre 3 variabili rimanenti
<br/>
Quindi per poter gestire gli spostamenti e per far si che quando il RAGGIO assumesse le proprietà di 
ORIZZONTALE oppure VERTICALE potesse assumere delle dimensioni ragionevoli,
<br/>
ho utilizzato delle funzioni per assestare i cerchi tra cui <br/>
ASSESTA_RAGGIO: con questa funzione in tutti i casi (tranne quello iniziale) viene effettuato un ridimensionamento del raggio
<br/>
Ovviamente lo stesso problema si verificava nel momento in cui i valori di raggio,opacità e spessore<br/>
venivano inseriti come proprietà di ORIZZONTALE e VERTICALE. In questo caso, dato che i valori di raggio,opacità e spessore non superato valori maggiori di 40, 
<br/> succedeva che i cerchi non venivano neanche inseriti nel svg a causa delle cordinate assunte.
<br/> Ho quindi utilizzato due funzioni per gestire il problema: <br/>ASSESTA_X<br/>
ASSESTA_Y<br/>
<br/>Entrambe permettono di gestire le coordinate in tutti i casi meno che quello iniziale<br/>
Le altre funzioni presenti sono:<br/>
CHANGE: per lo scambio dei valori per ogni click
<br/>
AGGIORNAMENTO: gestice gli spostamenti dei cerchi
<br/>
