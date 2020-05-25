[Netlify link](https://werkstuk-dev4-el-baba-mayes.netlify.app/)

Om te beginnen met de opdracht heb ik beslist om de data met fetch functie uit te halen van de JSON file
en ik heb besloten om mijn code in JavaScript te schrijven om de filter functie te kunnen uitvoeren
ik heb gewerkt met verschillende Array om erin de data te tonen en verschillende funcites 
Als basis heb ik gebruik gemaakt van de cursus van het van Dev2 en W3schools en vooral voor de filter functie. 

Hoe werkt de site: 
1/ Als je de site start zie je alle voorstellingen verschijnen de bedoeling is dat je ze kan filteren
2/ Als je op één van de filters klikt moet de gevraagde filter getoond worden ' bv. concert'
3/ om zeker te zijn dat aleen de 'concert' items getoond worden krijgt de button een andere kleur, 
indien u een andere filter wilt zien 'bv. comedy' dan klik je eerst de 'concert' af en zorg dat alleen de 
'comedy' button gekleurd is.
4/ Zo werkt het voor alle filters 
5/ voor de doelgroepen geldt het ook hetzelfde , je moet één klikken en zodat je alleen de items van de 
geselecteerde doelgroep kan zien.

De bouwstructuur van mijn code:
1/ Data tonen met fetch() 
2/ lopen door alle soorten genres en de dublicatie verwijderen
3/ de HTML structuur tonen in showVoorstellingen();
4/ de functie doelGroepen() zorgt dat het id van elke doelgroep mee genomen wordt
5/ selectedDoelgroep[], om alle items van de geselecteerde doelgroep in te pushen aan de hand van de id
6/ filterCategory() om te zorgen dat de cat. gefilterd is en alleen getoond wordt wat er gevraagd wordt
bv. de items van familie alleen tonen
7/ itemsArray[] , slaat de id van de aangeklikt element op
8/ filterItem() , het zorgt voor de controle als een button van de genre voor de eerste keer is aangeklikt of niet
indien het eerste keer is wordt de kleur van de button verandert en indien niet wordt het verwijdert van de itemsArray.
9/ remove_from_array(), indien de item niet tot de behoorde genre hoort wordt het verwijdert van de array.
10/ genres_filter() , zorgt voor het filteren van de genres.
11/ selectedGenres[] , werkt hetzelfde als selectedDoelgroep[] maar in dit geval voor de genres