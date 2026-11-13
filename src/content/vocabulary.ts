import type { Word } from "./types";
import { nounContexts } from "./noun-contexts";
import { functionalWords } from "./functional-words";
// Formato: sustantivo con artículo | significado | plural | ejemplo opcional | traducción.
// Otras categorías: categoría:lema | significado | ejemplo | traducción | formas relevantes.
// Los ejemplos interrogativos de sustantivos concretos usan un marco nominativo seguro.
const raw = `@u01
expresión:hallo|hola|Hallo, Anna!|¡Hola, Anna!
expresión:guten Morgen|buenos días (mañana)|Guten Morgen, Ben!|¡Buenos días, Ben!
expresión:guten Tag|buenos días (día)|Guten Tag, Frau Klein!|¡Buenos días, señora Klein!
expresión:guten Abend|buenas tardes/noches (saludo)|Guten Abend, Herr Weber!|¡Buenas noches, señor Weber!
expresión:gute Nacht|buenas noches (despedida)|Gute Nacht, Mia!|¡Buenas noches, Mia!
expresión:auf Wiedersehen|adiós (formal)|Auf Wiedersehen, Frau Klein!|¡Adiós, señora Klein!
expresión:tschüss|adiós (informal)|Tschüss, bis morgen!|¡Adiós, hasta mañana!
expresión:bis bald|hasta pronto|Tschüss und bis bald!|¡Adiós y hasta pronto!
expresión:bis morgen|hasta mañana|Bis morgen, Anna!|¡Hasta mañana, Anna!
expresión:danke|gracias|Danke für den Tee.|Gracias por el té.
expresión:bitte|por favor; de nada|Ein Wasser, bitte.|Un agua, por favor.
expresión:Entschuldigung|perdón; disculpe|Entschuldigung, wie bitte?|Disculpe, ¿cómo?
expresión:ja|sí|Ja, ich bin Anna.|Sí, soy Anna.
expresión:nein|no|Nein, danke.|No, gracias.
expresión:gern|con gusto|Ich helfe gern.|Ayudo con gusto.
expresión:gut|bien; bueno|Mir geht es gut.|Estoy bien.
expresión:auch|también|Ich lerne auch Deutsch.|Yo también estudio alemán.
expresión:und|y|Anna und Ben sind hier.|Anna y Ben están aquí.
expresión:oder|o|Tee oder Kaffee?|¿Té o café?
expresión:wie|cómo|Wie heißt du?|¿Cómo te llamas?
verbo:heißen|llamarse|Ich heiße Anna.|Me llamo Anna.|ich heiße;du heißt;er heißt;hat geheißen
pronombre:ich|yo|Ich bin Anna.|Soy Anna.
pronombre:du|tú|Du bist Ben.|Tú eres Ben.
pronombre:Sie|usted; ustedes|Wie heißen Sie?|¿Cómo se llama usted?
der Name|el nombre|Namen|Mein Name ist Ben.|Me llamo Ben.
der Buchstabe|la letra|Buchstaben|A ist ein Buchstabe.|A es una letra.
das Wort|la palabra|Wörter|Das Wort ist neu.|La palabra es nueva.
die Sprache|la lengua; el idioma|Sprachen|Deutsch ist eine Sprache.|El alemán es una lengua.
das Alphabet|el alfabeto|Alphabete|Wir lernen das Alphabet.|Aprendemos el alfabeto.
die Pause|la pausa|Pausen|Wir machen eine Pause.|Hacemos una pausa.
expresión:wie bitte|cómo, perdona|Wie bitte? Noch einmal!|¿Cómo, perdona? ¡Otra vez!
expresión:noch einmal|otra vez|Bitte noch einmal.|Otra vez, por favor.
expresión:langsam|despacio|Sprechen Sie bitte langsam.|Hable despacio, por favor.
expresión:zusammen|juntos|Wir lernen zusammen.|Estudiamos juntos.
expresión:willkommen|bienvenido|Willkommen im Kurs!|¡Bienvenido al curso!
expresión:alles klar|todo entendido|Alles klar, danke.|Todo entendido, gracias.
@u02
verbo:sein|ser; estar|Ich bin hier.|Estoy aquí.|ich bin;du bist;er ist;wir sind;ihr seid;sie sind;ist gewesen
verbo:kommen|venir|Ich komme aus Spanien.|Vengo de España.|ich komme;du kommst;er kommt;ist gekommen
verbo:wohnen|vivir; residir|Ich wohne in Berlin.|Vivo en Berlín.|ich wohne;du wohnst;er wohnt;hat gewohnt
verbo:sprechen|hablar|Ich spreche Deutsch.|Hablo alemán.|ich spreche;du sprichst;er spricht;hat gesprochen
verbo:lernen|aprender; estudiar|Wir lernen Deutsch.|Estudiamos alemán.|ich lerne;du lernst;er lernt;hat gelernt
pronombre:er|él|Er ist Ben.|Él es Ben.
pronombre:sie|ella; ellos; ellas|Sie ist Anna.|Ella es Anna.
pronombre:es|ello; pronombre neutro|Es ist neu.|Es nuevo.
pronombre:wir|nosotros; nosotras|Wir sind hier.|Estamos aquí.
pronombre:ihr|vosotros; vosotras|Ihr seid neu.|Sois nuevos.
expresión:hier|aquí|Ich wohne hier.|Vivo aquí.
expresión:dort|allí|Ben wohnt dort.|Ben vive allí.
expresión:wo|dónde|Wo wohnst du?|¿Dónde vives?
expresión:woher|de dónde|Woher kommst du?|¿De dónde eres?
expresión:aus|de; desde (origen)|Ich komme aus Spanien.|Soy de España.
expresión:in|en; a (interior)|Ich wohne in Berlin.|Vivo en Berlín.
expresión:ein bisschen|un poco|Ich spreche ein bisschen Deutsch.|Hablo un poco de alemán.
expresión:neu|nuevo|Ich bin neu hier.|Soy nuevo aquí.
expresión:jetzt|ahora|Jetzt wohne ich hier.|Ahora vivo aquí.
expresión:Deutschland|Alemania|Ben kommt aus Deutschland.|Ben es de Alemania.
expresión:Spanien|España|Anna kommt aus Spanien.|Anna es de España.
expresión:Italien|Italia|Leo kommt aus Italien.|Leo es de Italia.
expresión:Frankreich|Francia|Sie wohnt in Frankreich.|Vive en Francia.
expresión:Österreich|Austria|Er kommt aus Österreich.|Es de Austria.
die Schweiz|Suiza|—|Sie wohnt in der Schweiz.|Vive en Suiza.
expresión:Deutsch|alemán (idioma)|Ich lerne Deutsch.|Estudio alemán.
expresión:Spanisch|español (idioma)|Ich spreche Spanisch.|Hablo español.
expresión:Englisch|inglés (idioma)|Ben spricht Englisch.|Ben habla inglés.
expresión:Französisch|francés (idioma)|Sara lernt Französisch.|Sara estudia francés.
expresión:Italienisch|italiano (idioma)|Leo spricht Italienisch.|Leo habla italiano.
das Land|el país|Länder|Spanien ist ein Land.|España es un país.
die Stadt|la ciudad|Städte|Berlin ist eine Stadt.|Berlín es una ciudad.
der Herr|el señor|Herren|Das ist Herr Weber.|Este es el señor Weber.
die Frau|la mujer; la señora|Frauen|Frau Klein ist hier.|La señora Klein está aquí.
der Mann|el hombre; el marido|Männer|Der Mann heißt Paul.|El hombre se llama Paul.
die Person|la persona|Personen|Hier sind zwei Personen.|Aquí hay dos personas.
@u03
número:null|cero|Die Nummer ist null.|El número es cero.
número:eins|uno|Ich zähle: eins, zwei, drei.|Cuento: uno, dos, tres.
número:zwei|dos|Ich habe zwei Bücher.|Tengo dos libros.
número:drei|tres|Das kostet drei Euro.|Eso cuesta tres euros.
número:vier|cuatro|Wir sind vier Personen.|Somos cuatro personas.
número:fünf|cinco|Mia ist fünf Jahre alt.|Mia tiene cinco años.
número:sechs|seis|Es ist sechs Uhr.|Son las seis.
número:sieben|siete|Ich komme um sieben Uhr.|Voy a las siete.
número:acht|ocho|Der Kurs beginnt um acht.|El curso empieza a las ocho.
número:neun|nueve|Ich arbeite ab neun Uhr.|Trabajo desde las nueve.
número:zehn|diez|Der Bus hat die Nummer zehn.|El autobús es el número diez.
número:elf|once|Es ist elf Uhr.|Son las once.
número:zwölf|doce|Die Hausnummer ist zwölf.|El número de la casa es doce.
número:dreizehn|trece|Sie ist dreizehn Jahre alt.|Tiene trece años.
número:vierzehn|catorce|Das kostet vierzehn Euro.|Cuesta catorce euros.
número:fünfzehn|quince|Ich warte fünfzehn Minuten.|Espero quince minutos.
número:sechzehn|dieciséis|Er ist sechzehn Jahre alt.|Tiene dieciséis años.
número:siebzehn|diecisiete|Meine Nummer ist siebzehn.|Mi número es diecisiete.
número:achtzehn|dieciocho|Tom ist achtzehn Jahre alt.|Tom tiene dieciocho años.
número:neunzehn|diecinueve|Der Zug fährt um neunzehn Uhr.|El tren sale a las diecinueve.
número:zwanzig|veinte|Ich bin zwanzig Jahre alt.|Tengo veinte años.
número:dreißig|treinta|Das dauert dreißig Minuten.|Dura treinta minutos.
número:vierzig|cuarenta|Der Mantel kostet vierzig Euro.|El abrigo cuesta cuarenta euros.
número:fünfzig|cincuenta|Hier sind fünfzig Euro.|Aquí tiene cincuenta euros.
número:sechzig|sesenta|Eine Stunde hat sechzig Minuten.|Una hora tiene sesenta minutos.
número:siebzig|setenta|Das kostet siebzig Euro.|Cuesta setenta euros.
número:achtzig|ochenta|Meine Oma ist achtzig.|Mi abuela tiene ochenta años.
número:neunzig|noventa|Das sind neunzig Cent.|Son noventa céntimos.
número:hundert|cien|Das kostet hundert Euro.|Cuesta cien euros.
número:tausend|mil|Das sind tausend Meter.|Son mil metros.
die Nummer|el número|Nummern|Meine Nummer ist zehn.|Mi número es diez.
die Adresse|la dirección|Adressen|Das ist meine Adresse.|Esta es mi dirección.
die Telefonnummer|el número de teléfono|Telefonnummern|Wie ist deine Telefonnummer?|¿Cuál es tu número de teléfono?
die Postleitzahl|el código postal|Postleitzahlen|Die Postleitzahl ist 10115.|El código postal es 10115.
das Alter|la edad|—|Wie alt bist du?|¿Cuántos años tienes?
das Jahr|el año|Jahre|Ein Jahr hat zwölf Monate.|Un año tiene doce meses.
@u04
die Familie|la familia|Familien|Meine Familie wohnt in Madrid.|Mi familia vive en Madrid.
die Mutter|la madre|Mütter|Meine Mutter heißt Eva.|Mi madre se llama Eva.
der Vater|el padre|Väter|Mein Vater ist hier.|Mi padre está aquí.
der Bruder|el hermano|Brüder|Mein Bruder ist achtzehn.|Mi hermano tiene dieciocho años.
die Schwester|la hermana|Schwestern|Meine Schwester hat ein Kind.|Mi hermana tiene un hijo.
das Kind|el niño; el hijo|Kinder|Das Kind spielt.|El niño juega.
der Sohn|el hijo|Söhne|Ihr Sohn heißt Leo.|Su hijo se llama Leo.
die Tochter|la hija|Töchter|Ihre Tochter heißt Mia.|Su hija se llama Mia.
die Eltern|los padres|solo plural|Meine Eltern sind hier.|Mis padres están aquí.
die Großeltern|los abuelos|solo plural|Meine Großeltern wohnen hier.|Mis abuelos viven aquí.
die Oma|la abuela|Omas|Meine Oma ist nett.|Mi abuela es simpática.
der Opa|el abuelo|Opas|Mein Opa liest gern.|A mi abuelo le gusta leer.
die Großmutter|la abuela (formal)|Großmütter|Meine Großmutter wohnt in Madrid.|Mi abuela vive en Madrid.
der Großvater|el abuelo (formal)|Großväter|Mein Großvater ist hier.|Mi abuelo está aquí.
der Onkel|el tío|Onkel|Mein Onkel heißt Paul.|Mi tío se llama Paul.
die Tante|la tía|Tanten|Meine Tante kommt morgen.|Mi tía viene mañana.
der Cousin|el primo|Cousins|Mein Cousin wohnt in Berlin.|Mi primo vive en Berlín.
die Cousine|la prima|Cousinen|Meine Cousine lernt Deutsch.|Mi prima estudia alemán.
der Freund|el amigo; el novio|Freunde|Ben ist mein Freund.|Ben es mi amigo.
die Freundin|la amiga; la novia|Freundinnen|Anna ist meine Freundin.|Anna es mi amiga.
der Partner|la pareja (hombre)|Partner|Mein Partner heißt Ben.|Mi pareja se llama Ben.
die Partnerin|la pareja (mujer)|Partnerinnen|Meine Partnerin ist hier.|Mi pareja está aquí.
der Nachbar|el vecino|Nachbarn|Mein Nachbar ist freundlich.|Mi vecino es amable.
die Nachbarin|la vecina|Nachbarinnen|Meine Nachbarin heißt Sara.|Mi vecina se llama Sara.
der Hund|el perro|Hunde|Der Hund heißt Max.|El perro se llama Max.
die Katze|el gato; la gata|Katzen|Die Katze schläft.|El gato duerme.
das Baby|el bebé|Babys|Das Baby schläft.|El bebé duerme.
verbo:haben|tener|Wir haben zwei Kinder.|Tenemos dos hijos.|ich habe;du hast;er hat;wir haben;ihr habt;sie haben;hat gehabt
posesivo:mein|mi (masculino/neutro)|Mein Vater ist hier.|Mi padre está aquí.
posesivo:dein|tu (masculino/neutro)|Dein Bruder ist nett.|Tu hermano es simpático.
posesivo:unser|nuestro|Unser Kind spielt.|Nuestro hijo juega.
adjetivo:verheiratet|casado|Ich bin verheiratet.|Estoy casado.
adjetivo:ledig|soltero|Er ist ledig.|Él es soltero.
adjetivo:jung|joven|Meine Schwester ist jung.|Mi hermana es joven.
adjetivo:alt|viejo; de edad|Wie alt ist dein Sohn?|¿Cuántos años tiene tu hijo?
adjetivo:nett|simpático|Deine Familie ist nett.|Tu familia es simpática.
@u05
verbo:arbeiten|trabajar|Sie arbeitet heute.|Ella trabaja hoy.|ich arbeite;du arbeitest;er arbeitet;hat gearbeitet
verbo:trinken|beber|Ich trinke Wasser.|Bebo agua.|ich trinke;du trinkst;er trinkt;hat getrunken
verbo:essen|comer|Wir essen Brot.|Comemos pan.|ich esse;du isst;er isst;hat gegessen
verbo:lesen|leer|Ich lese ein Buch.|Leo un libro.|ich lese;du liest;er liest;hat gelesen
verbo:schlafen|dormir|Das Kind schläft.|El niño duerme.|ich schlafe;du schläfst;er schläft;hat geschlafen
verbo:hören|oír; escuchar|Ich höre Musik.|Escucho música.|ich höre;du hörst;er hört;hat gehört
verbo:sehen|ver|Ich sehe Ben.|Veo a Ben.|ich sehe;du siehst;er sieht;hat gesehen
verbo:machen|hacer|Was machst du?|¿Qué haces?|ich mache;du machst;er macht;hat gemacht
verbo:gehen|ir a pie|Ich gehe nach Hause.|Voy a casa.|ich gehe;du gehst;er geht;ist gegangen
verbo:bleiben|quedarse|Ich bleibe hier.|Me quedo aquí.|ich bleibe;du bleibst;er bleibt;ist geblieben
verbo:kochen|cocinar|Wir kochen zusammen.|Cocinamos juntos.|ich koche;du kochst;er kocht;hat gekocht
verbo:spielen|jugar; tocar|Mia spielt im Park.|Mia juega en el parque.|ich spiele;du spielst;er spielt;hat gespielt
verbo:schreiben|escribir|Ich schreibe eine E-Mail.|Escribo un correo.|ich schreibe;du schreibst;er schreibt;hat geschrieben
verbo:fragen|preguntar|Ich frage den Lehrer.|Pregunto al profesor.|ich frage;du fragst;er fragt;hat gefragt
verbo:antworten|responder|Sie antwortet schnell.|Responde rápido.|ich antworte;du antwortest;er antwortet;hat geantwortet
verbo:brauchen|necesitar|Ich brauche Hilfe.|Necesito ayuda.|ich brauche;du brauchst;er braucht;hat gebraucht
verbo:suchen|buscar|Ich suche meinen Schlüssel.|Busco mi llave.|ich suche;du suchst;er sucht;hat gesucht
verbo:finden|encontrar|Ich finde den Schlüssel.|Encuentro la llave.|ich finde;du findest;er findet;hat gefunden
verbo:leben|vivir (vida)|Meine Eltern leben in Spanien.|Mis padres viven en España.|ich lebe;du lebst;er lebt;hat gelebt
verbo:warten|esperar|Wir warten auf den Bus.|Esperamos el autobús.|ich warte;du wartest;er wartet;hat gewartet
expresión:heute|hoy|Heute lerne ich.|Hoy estudio.
expresión:morgen|mañana|Morgen komme ich.|Mañana voy.
expresión:gestern|ayer|Gestern war ich hier.|Ayer estuve aquí.
expresión:immer|siempre|Ich trinke immer Tee.|Siempre tomo té.
expresión:oft|a menudo|Ich lese oft.|Leo a menudo.
expresión:manchmal|a veces|Manchmal bin ich müde.|A veces estoy cansado.
expresión:nie|nunca|Ich trinke nie Kaffee.|Nunca tomo café.
expresión:jeden Tag|todos los días|Ich lerne jeden Tag.|Estudio todos los días.
expresión:früh|temprano|Ich arbeite früh.|Trabajo temprano.
expresión:spät|tarde|Es ist spät.|Es tarde.
das Buch|el libro|Bücher
die Zeitung|el periódico|Zeitungen
die Musik|la música|—|Ich höre gern Musik.|Me gusta escuchar música.
der Alltag|la vida cotidiana|—|Das gehört zu meinem Alltag.|Eso forma parte de mi vida cotidiana.
adjetivo:müde|cansado|Ich bin müde.|Estoy cansado.
adjetivo:wach|despierto|Mia ist schon wach.|Mia ya está despierta.
@u06
der Kaffee|el café|Kaffees|Ich trinke Kaffee.|Tomo café.
der Tee|el té|Tees|Der Tee ist warm.|El té está caliente.
das Wasser|el agua|—|Ich trinke Wasser.|Bebo agua.
die Milch|la leche|—|Ich nehme Milch zum Kaffee.|Tomo leche con el café.
der Saft|el zumo|Säfte|Der Saft ist kalt.|El zumo está frío.
das Bier|la cerveza|Biere|Ein Bier, bitte.|Una cerveza, por favor.
der Wein|el vino|Weine|Ich trinke keinen Wein.|No bebo vino.
das Brot|el pan|Brote|Ich esse gern Brot.|Me gusta comer pan.
das Brötchen|el panecillo|Brötchen|Ich nehme zwei Brötchen.|Me llevo dos panecillos.
der Kuchen|la tarta; el bizcocho|Kuchen|Der Kuchen ist gut.|La tarta está buena.
die Suppe|la sopa|Suppen|Die Suppe ist warm.|La sopa está caliente.
der Salat|la ensalada|Salate|Ich esse einen Salat.|Como una ensalada.
der Reis|el arroz|—|Ich koche Reis.|Cocino arroz.
die Nudel|la pasta (una pieza)|Nudeln|Wir essen Nudeln.|Comemos pasta.
die Kartoffel|la patata|Kartoffeln|Ich koche Kartoffeln.|Cuezo patatas.
das Fleisch|la carne|—|Ich esse kein Fleisch.|No como carne.
der Fisch|el pescado; el pez|Fische|Heute gibt es Fisch.|Hoy hay pescado.
das Hähnchen|el pollo (comida)|Hähnchen|Ich nehme das Hähnchen.|Tomaré el pollo.
die Speisekarte|la carta|Speisekarten
die Rechnung|la cuenta; la factura|Rechnungen|Die Rechnung bitte.|La cuenta, por favor.
der Tisch|la mesa|Tische
das Glas|el vaso|Gläser
die Tasse|la taza|Tassen
der Teller|el plato|Teller
der Löffel|la cuchara|Löffel
die Gabel|el tenedor|Gabeln
das Messer|el cuchillo|Messer
das Restaurant|el restaurante|Restaurants
das Café|la cafetería|Cafés
verbo:bestellen|pedir (comida)|Ich bestelle einen Tee.|Pido un té.|ich bestelle;du bestellst;er bestellt;hat bestellt
verbo:nehmen|tomar; coger|Ich nehme die Suppe.|Tomaré la sopa.|ich nehme;du nimmst;er nimmt;hat genommen
adjetivo:warm|caliente; templado|Die Suppe ist warm.|La sopa está caliente.
adjetivo:kalt|frío|Das Wasser ist kalt.|El agua está fría.
adjetivo:lecker|rico; sabroso|Der Kuchen ist lecker.|La tarta está rica.
expresión:Hunger haben|tener hambre|Ich habe Hunger.|Tengo hambre.
expresión:Durst haben|tener sed|Ich habe Durst.|Tengo sed.
@u07
der Apfel|la manzana|Äpfel|Ich kaufe zwei Äpfel.|Compro dos manzanas.
die Banane|el plátano|Bananen|Die Banane ist gelb.|El plátano es amarillo.
die Orange|la naranja|Orangen|Ich nehme drei Orangen.|Me llevo tres naranjas.
die Zitrone|el limón|Zitronen|Der Tee ist mit Zitrone.|El té lleva limón.
die Tomate|el tomate|Tomaten|Ich kaufe Tomaten.|Compro tomates.
die Gurke|el pepino|Gurken|Die Gurke ist frisch.|El pepino está fresco.
die Zwiebel|la cebolla|Zwiebeln|Ich brauche eine Zwiebel.|Necesito una cebolla.
die Karotte|la zanahoria|Karotten|Mia isst eine Karotte.|Mia come una zanahoria.
das Gemüse|la verdura|—|Ich kaufe Gemüse.|Compro verdura.
das Obst|la fruta|—|Wir essen viel Obst.|Comemos mucha fruta.
das Ei|el huevo|Eier|Ich brauche zwei Eier.|Necesito dos huevos.
der Käse|el queso|Käse|Ich esse Brot mit Käse.|Como pan con queso.
die Butter|la mantequilla|—|Ich brauche Butter.|Necesito mantequilla.
der Joghurt|el yogur|Joghurts|Der Joghurt ist kalt.|El yogur está frío.
der Zucker|el azúcar|—|Ohne Zucker, bitte.|Sin azúcar, por favor.
das Salz|la sal|—|Die Suppe braucht Salz.|La sopa necesita sal.
das Öl|el aceite|Öle|Wir brauchen Öl zum Kochen.|Necesitamos aceite para cocinar.
der Markt|el mercado|Märkte
der Supermarkt|el supermercado|Supermärkte
der Laden|la tienda|Läden
die Kasse|la caja (para pagar)|Kassen
der Preis|el precio|Preise|Der Preis ist gut.|El precio está bien.
das Geld|el dinero|—|Ich habe kein Geld dabei.|No llevo dinero.
der Euro|el euro|Euro|Das kostet einen Euro.|Cuesta un euro.
der Cent|el céntimo|Cent|Das kostet fünfzig Cent.|Cuesta cincuenta céntimos.
das Kilo|el kilo|Kilo|Ein Kilo Äpfel, bitte.|Un kilo de manzanas, por favor.
der Liter|el litro|Liter|Ein Liter Milch, bitte.|Un litro de leche, por favor.
die Flasche|la botella|Flaschen
die Tüte|la bolsa|Tüten
verbo:kaufen|comprar|Ich kaufe Brot.|Compro pan.|ich kaufe;du kaufst;er kauft;hat gekauft
verbo:kosten|costar|Was kostet das?|¿Cuánto cuesta?|es kostet;hat gekostet
verbo:bezahlen|pagar|Ich bezahle mit Karte.|Pago con tarjeta.|ich bezahle;du bezahlst;er bezahlt;hat bezahlt
adjetivo:frisch|fresco|Das Brot ist frisch.|El pan está fresco.
adjetivo:teuer|caro|Das ist teuer.|Eso es caro.
adjetivo:günstig|económico|Die Äpfel sind günstig.|Las manzanas están bien de precio.
expresión:sonst noch etwas|algo más|Sonst noch etwas?|¿Algo más?
@u08
die Wohnung|el piso; la vivienda|Wohnungen
das Haus|la casa|Häuser
das Zimmer|la habitación|Zimmer
die Küche|la cocina|Küchen
das Bad|el baño|Bäder
das Wohnzimmer|el salón|Wohnzimmer
das Schlafzimmer|el dormitorio|Schlafzimmer
das Kinderzimmer|la habitación infantil|Kinderzimmer
der Flur|el pasillo|Flure
der Balkon|el balcón|Balkone
der Garten|el jardín|Gärten
die Tür|la puerta|Türen
das Fenster|la ventana|Fenster
die Wand|la pared|Wände
der Boden|el suelo|Böden
das Dach|el tejado|Dächer
die Treppe|la escalera|Treppen
der Aufzug|el ascensor|Aufzüge
das Bett|la cama|Betten
der Stuhl|la silla|Stühle
das Sofa|el sofá|Sofas
der Schrank|el armario|Schränke
das Regal|la estantería|Regale
die Lampe|la lámpara|Lampen
der Schlüssel|la llave|Schlüssel
die Dusche|la ducha|Duschen
die Toilette|el retrete; el aseo|Toiletten
der Kühlschrank|el frigorífico|Kühlschränke
die Waschmaschine|la lavadora|Waschmaschinen
die Miete|el alquiler|Mieten|Die Miete ist hoch.|El alquiler es alto.
adjetivo:groß|grande|Das Zimmer ist groß.|La habitación es grande.
adjetivo:klein|pequeño|Die Küche ist klein.|La cocina es pequeña.
adjetivo:hell|luminoso; claro|Die Wohnung ist hell.|El piso es luminoso.
adjetivo:dunkel|oscuro|Der Flur ist dunkel.|El pasillo es oscuro.
adjetivo:ruhig|tranquilo|Hier ist es ruhig.|Aquí se está tranquilo.
adjetivo:laut|ruidoso; alto (sonido)|Die Musik ist laut.|La música está alta.
@u09
der Bahnhof|la estación de tren|Bahnhöfe
die Haltestelle|la parada|Haltestellen
der Bus|el autobús|Busse
die Straßenbahn|el tranvía|Straßenbahnen
die U-Bahn|el metro|U-Bahnen
die S-Bahn|el tren de cercanías|S-Bahnen
der Zug|el tren|Züge
das Auto|el coche|Autos
das Fahrrad|la bicicleta|Fahrräder
die Straße|la calle|Straßen
der Weg|el camino|Wege
die Kreuzung|el cruce|Kreuzungen
die Ampel|el semáforo|Ampeln
die Brücke|el puente|Brücken
der Platz|la plaza; el sitio|Plätze
der Park|el parque|Parks
das Museum|el museo|Museen
die Apotheke|la farmacia|Apotheken
die Bank|el banco (entidad/asiento)|Banken; asientos: Bänke|Die Bank ist neben der Post.|El banco está al lado de correos.
die Post|correos|—|Ich gehe zur Post.|Voy a correos.
das Rathaus|el ayuntamiento|Rathäuser
die Polizei|la policía|—|Die Polizei hilft.|La policía ayuda.
der Parkplatz|el aparcamiento|Parkplätze
der Eingang|la entrada|Eingänge
der Ausgang|la salida|Ausgänge
verbo:fahren|ir (en vehículo)|Ich fahre mit dem Bus.|Voy en autobús.|ich fahre;du fährst;er fährt;ist gefahren
verbo:abbiegen|girar|Biegen Sie rechts ab.|Gire a la derecha.|ich biege ab;du biegst ab;er biegt ab;ist abgebogen
expresión:links|a la izquierda|Gehen Sie links.|Vaya a la izquierda.
expresión:rechts|a la derecha|Die Bank ist rechts.|El banco está a la derecha.
expresión:geradeaus|todo recto|Gehen Sie geradeaus.|Siga recto.
expresión:zu Fuß|a pie|Ich gehe zu Fuß.|Voy a pie.
expresión:weit|lejos|Ist das weit?|¿Está lejos?
expresión:nah|cerca|Der Park ist nah.|El parque está cerca.
preposición:neben|al lado de|Die Bank ist neben der Post.|El banco está al lado de correos.
preposición:vor|delante de; antes de|Ich stehe vor dem Haus.|Estoy delante de la casa.
preposición:hinter|detrás de|Der Garten ist hinter dem Haus.|El jardín está detrás de la casa.
@u10
der Beruf|la profesión|Berufe|Was sind Sie von Beruf?|¿Cuál es su profesión?
die Arbeit|el trabajo|Arbeiten|Ich habe viel Arbeit.|Tengo mucho trabajo.
der Arbeitsplatz|el puesto de trabajo|Arbeitsplätze
das Büro|la oficina|Büros
die Firma|la empresa|Firmen
der Chef|el jefe|Chefs
die Chefin|la jefa|Chefinnen
der Kollege|el compañero de trabajo|Kollegen
die Kollegin|la compañera de trabajo|Kolleginnen
der Lehrer|el profesor|Lehrer
die Lehrerin|la profesora|Lehrerinnen
der Arzt|el médico|Ärzte
die Ärztin|la médica|Ärztinnen
der Verkäufer|el vendedor|Verkäufer
die Verkäuferin|la vendedora|Verkäuferinnen
der Student|el estudiante universitario|Studenten
die Studentin|la estudiante universitaria|Studentinnen
die Schule|la escuela|Schulen
die Universität|la universidad|Universitäten
der Kurs|el curso|Kurse
die Aufgabe|la tarea|Aufgaben
die Übung|el ejercicio|Übungen
die Frage|la pregunta|Fragen|Ich habe eine Frage.|Tengo una pregunta.
die Antwort|la respuesta|Antworten|Die Antwort ist richtig.|La respuesta es correcta.
der Computer|el ordenador|Computer
das Handy|el móvil|Handys
der Stift|el bolígrafo|Stifte
das Papier|el papel|Papiere|Ich brauche Papier.|Necesito papel.
verbo:können|poder; saber hacer|Ich kann schwimmen.|Sé nadar.|ich kann;du kannst;er kann;wir können
verbo:müssen|tener que|Ich muss arbeiten.|Tengo que trabajar.|ich muss;du musst;er muss;wir müssen
verbo:dürfen|poder (permiso)|Darf ich hier sitzen?|¿Puedo sentarme aquí?|ich darf;du darfst;er darf;wir dürfen
verbo:wollen|querer|Ich will lernen.|Quiero aprender.|ich will;du willst;er will;wir wollen
verbo:sollen|deber (encargo/consejo)|Du sollst anrufen.|Debes llamar.|ich soll;du sollst;er soll;wir sollen
verbo:helfen|ayudar|Kannst du mir helfen?|¿Puedes ayudarme?|ich helfe;du hilfst;er hilft;hat geholfen
verbo:verstehen|entender|Ich verstehe das.|Entiendo eso.|ich verstehe;du verstehst;er versteht;hat verstanden
verbo:erklären|explicar|Sie erklärt die Aufgabe.|Ella explica la tarea.|ich erkläre;du erklärst;er erklärt;hat erklärt
@u11
die Freizeit|el tiempo libre|—|Ich habe wenig Freizeit.|Tengo poco tiempo libre.
das Hobby|la afición|Hobbys|Lesen ist mein Hobby.|Leer es mi afición.
der Sport|el deporte|—|Ich mache gern Sport.|Me gusta hacer deporte.
der Fußball|el fútbol; el balón|Fußbälle|Wir spielen Fußball.|Jugamos al fútbol.
das Tennis|el tenis|—|Ich spiele Tennis.|Juego al tenis.
das Kino|el cine|Kinos
der Film|la película|Filme
das Theater|el teatro|Theater
das Konzert|el concierto|Konzerte
die Gitarre|la guitarra|Gitarren
das Klavier|el piano|Klaviere
das Spiel|el juego; el partido|Spiele
die Mannschaft|el equipo deportivo|Mannschaften
die Einladung|la invitación|Einladungen|Danke für die Einladung.|Gracias por la invitación.
das Fest|la fiesta|Feste
die Party|la fiesta (informal)|Partys
das Wochenende|el fin de semana|Wochenenden|Am Wochenende habe ich Zeit.|El fin de semana tengo tiempo.
verbo:schwimmen|nadar|Ich schwimme gern.|Me gusta nadar.|ich schwimme;du schwimmst;er schwimmt;ist geschwommen
verbo:tanzen|bailar|Wir tanzen gern.|Nos gusta bailar.|ich tanze;du tanzt;er tanzt;hat getanzt
verbo:singen|cantar|Sie singt gut.|Ella canta bien.|ich singe;du singst;er singt;hat gesungen
verbo:wandern|hacer senderismo|Wir wandern am Sonntag.|Hacemos senderismo el domingo.|ich wandere;du wanderst;er wandert;ist gewandert
verbo:spazieren gehen|pasear|Ich gehe spazieren.|Voy a pasear.|ich gehe spazieren;du gehst spazieren;ist spazieren gegangen
verbo:treffen|encontrarse con|Ich treffe Ben.|Quedo con Ben.|ich treffe;du triffst;er trifft;hat getroffen
verbo:besuchen|visitar|Ich besuche meine Oma.|Visito a mi abuela.|ich besuche;du besuchst;er besucht;hat besucht
verbo:einladen|invitar|Ich lade dich ein.|Te invito.|ich lade ein;du lädst ein;er lädt ein;hat eingeladen
verbo:mitkommen|venir con alguien|Kommst du mit?|¿Vienes con nosotros?|ich komme mit;du kommst mit;ist mitgekommen
verbo:mitspielen|participar en un juego|Möchtest du mitspielen?|¿Quieres jugar con nosotros?|ich spiele mit;du spielst mit;hat mitgespielt
verbo:zuschauen|mirar (actividad)|Ich schaue zu.|Estoy mirando.|ich schaue zu;du schaust zu;hat zugeschaut
verbo:mögen|gustar|Ich mag Musik.|Me gusta la música.|ich mag;du magst;er mag;wir mögen
expresión:lieber|preferiblemente|Ich trinke lieber Tee.|Prefiero tomar té.
expresión:leider|por desgracia|Leider habe ich keine Zeit.|Por desgracia no tengo tiempo.
expresión:vielleicht|quizá|Vielleicht komme ich morgen.|Quizá venga mañana.
conjunción:aber|pero|Ich bin müde, aber glücklich.|Estoy cansado, pero contento.
conjunción:denn|porque (coordinante)|Ich bleibe, denn ich bin müde.|Me quedo porque estoy cansado.
adjetivo:interessant|interesante|Der Film ist interessant.|La película es interesante.
adjetivo:langweilig|aburrido|Das Buch ist langweilig.|El libro es aburrido.
@u12
die Zeit|el tiempo|Zeiten|Ich habe heute Zeit.|Hoy tengo tiempo.
die Uhr|el reloj; la hora|Uhren|Wie viel Uhr ist es?|¿Qué hora es?
die Stunde|la hora (duración)|Stunden|Der Kurs dauert eine Stunde.|El curso dura una hora.
die Minute|el minuto|Minuten|Ich warte fünf Minuten.|Espero cinco minutos.
die Sekunde|el segundo|Sekunden|Warte eine Sekunde!|¡Espera un segundo!
der Tag|el día|Tage|Ein Tag hat vierundzwanzig Stunden.|Un día tiene veinticuatro horas.
die Woche|la semana|Wochen|Eine Woche hat sieben Tage.|Una semana tiene siete días.
der Monat|el mes|Monate|Ein Jahr hat zwölf Monate.|Un año tiene doce meses.
der Morgen|la mañana (inicio)|Morgen|Am Morgen trinke ich Tee.|Por la mañana tomo té.
der Vormittag|la mañana (antes de mediodía)|Vormittage|Am Vormittag arbeite ich.|Trabajo por la mañana.
der Mittag|el mediodía|Mittage|Am Mittag esse ich.|Como al mediodía.
der Nachmittag|la tarde|Nachmittage|Am Nachmittag lese ich.|Por la tarde leo.
der Abend|la tarde/noche|Abende|Am Abend bin ich zu Hause.|Por la noche estoy en casa.
die Nacht|la noche|Nächte|In der Nacht schlafe ich.|Por la noche duermo.
der Montag|el lunes|Montage|Am Montag arbeite ich.|El lunes trabajo.
der Dienstag|el martes|Dienstage|Am Dienstag habe ich einen Kurs.|El martes tengo un curso.
der Mittwoch|el miércoles|Mittwoche|Am Mittwoch komme ich.|Vengo el miércoles.
der Donnerstag|el jueves|Donnerstage|Am Donnerstag habe ich frei.|El jueves tengo libre.
der Freitag|el viernes|Freitage|Am Freitag gehen wir ins Kino.|El viernes vamos al cine.
der Samstag|el sábado|Samstage|Am Samstag kaufe ich ein.|El sábado hago la compra.
der Sonntag|el domingo|Sonntage|Am Sonntag schlafe ich lange.|El domingo duermo hasta tarde.
der Termin|la cita|Termine|Ich habe einen Termin.|Tengo una cita.
der Kalender|el calendario|Kalender
der Wecker|el despertador|Wecker
verbo:aufstehen|levantarse|Ich stehe früh auf.|Me levanto temprano.|ich stehe auf;du stehst auf;er steht auf;ist aufgestanden
verbo:anfangen|empezar|Der Kurs fängt an.|El curso empieza.|ich fange an;du fängst an;er fängt an;hat angefangen
verbo:ankommen|llegar|Der Zug kommt an.|El tren llega.|ich komme an;du kommst an;ist angekommen
verbo:anrufen|llamar por teléfono|Ich rufe dich an.|Te llamo.|ich rufe an;du rufst an;hat angerufen
verbo:einkaufen|hacer la compra|Wir kaufen ein.|Hacemos la compra.|ich kaufe ein;du kaufst ein;hat eingekauft
verbo:mitbringen|traer consigo|Ich bringe Brot mit.|Traigo pan.|ich bringe mit;du bringst mit;hat mitgebracht
verbo:abholen|recoger|Ich hole Anna ab.|Recojo a Anna.|ich hole ab;du holst ab;hat abgeholt
expresión:halb|media (antes de hora)|Es ist halb acht.|Son las siete y media.
das Viertel|el cuarto|Viertel|Es ist Viertel nach zehn.|Son las diez y cuarto.
preposición:um|a las (hora)|Ich komme um acht.|Voy a las ocho.
expresión:pünktlich|puntual|Der Zug ist pünktlich.|El tren es puntual.
expresión:zu spät|demasiado tarde; con retraso|Ich komme zu spät.|Llego tarde.
@u13
die Reise|el viaje|Reisen|Die Reise dauert zwei Tage.|El viaje dura dos días.
der Urlaub|las vacaciones|Urlaube|Ich habe Urlaub.|Estoy de vacaciones.
die Fahrkarte|el billete de transporte|Fahrkarten
das Ticket|el billete; la entrada|Tickets
der Fahrplan|el horario de transporte|Fahrpläne
das Gleis|la vía|Gleise|Der Zug fährt von Gleis vier.|El tren sale de la vía cuatro.
der Bahnsteig|el andén|Bahnsteige
der Flughafen|el aeropuerto|Flughäfen
das Flugzeug|el avión|Flugzeuge
der Flug|el vuelo|Flüge|Mein Flug geht um zehn.|Mi vuelo sale a las diez.
der Koffer|la maleta|Koffer
das Gepäck|el equipaje|—|Mein Gepäck ist hier.|Mi equipaje está aquí.
der Reisepass|el pasaporte|Reisepässe
der Ausweis|el documento de identidad|Ausweise
das Hotel|el hotel|Hotels
die Rezeption|la recepción|Rezeptionen
die Reservierung|la reserva|Reservierungen|Ich habe eine Reservierung.|Tengo una reserva.
das Einzelzimmer|la habitación individual|Einzelzimmer
das Doppelzimmer|la habitación doble|Doppelzimmer
das Frühstück|el desayuno|Frühstücke|Das Frühstück ist inklusive.|El desayuno está incluido.
die Übernachtung|la pernoctación|Übernachtungen|Eine Übernachtung kostet sechzig Euro.|Una noche cuesta sesenta euros.
der Gast|el huésped; el invitado|Gäste|Der Gast heißt Weber.|El huésped se llama Weber.
die Abfahrt|la salida (transporte)|Abfahrten|Die Abfahrt ist um neun.|La salida es a las nueve.
die Ankunft|la llegada|Ankünfte|Die Ankunft ist um zehn.|La llegada es a las diez.
verbo:reservieren|reservar|Ich reserviere ein Zimmer.|Reservo una habitación.|ich reserviere;du reservierst;hat reserviert
verbo:reisen|viajar|Ich reise nach Berlin.|Viajo a Berlín.|ich reise;du reist;er reist;ist gereist
verbo:abfahren|salir (transporte)|Der Zug fährt ab.|El tren sale.|ich fahre ab;du fährst ab;er fährt ab;ist abgefahren
verbo:umsteigen|hacer transbordo|Ich muss umsteigen.|Tengo que hacer transbordo.|ich steige um;du steigst um;ist umgestiegen
verbo:einsteigen|subir (transporte)|Bitte steigen Sie ein.|Suba, por favor.|ich steige ein;du steigst ein;ist eingestiegen
verbo:aussteigen|bajar (transporte)|Hier steige ich aus.|Aquí me bajo.|ich steige aus;du steigst aus;ist ausgestiegen
expresión:hin und zurück|ida y vuelta|Ein Ticket hin und zurück, bitte.|Un billete de ida y vuelta, por favor.
expresión:einfach|solo ida; sencillo|Eine Fahrkarte, einfach bitte.|Un billete de ida, por favor.
adjetivo:frei|libre|Ist der Platz frei?|¿Está libre el asiento?
expresión:inklusive|incluido|Frühstück ist inklusive.|El desayuno está incluido.
preposición:für|para; durante|Das Zimmer ist für zwei Nächte.|La habitación es para dos noches.
preposición:bis|hasta|Ich bleibe bis Montag.|Me quedo hasta el lunes.
@u14
der Körper|el cuerpo|Körper|Mein Körper braucht Ruhe.|Mi cuerpo necesita descanso.
der Kopf|la cabeza|Köpfe|Mein Kopf tut weh.|Me duele la cabeza.
das Auge|el ojo|Augen|Meine Augen sind müde.|Tengo los ojos cansados.
das Ohr|la oreja; el oído|Ohren|Mein Ohr tut weh.|Me duele el oído.
die Nase|la nariz|Nasen|Meine Nase ist rot.|Mi nariz está roja.
der Mund|la boca|Münder|Öffnen Sie den Mund.|Abra la boca.
der Zahn|el diente|Zähne|Mein Zahn tut weh.|Me duele el diente.
der Hals|el cuello; la garganta|Hälse|Mein Hals tut weh.|Me duele la garganta.
der Arm|el brazo|Arme|Mein Arm tut weh.|Me duele el brazo.
die Hand|la mano|Hände|Wasch deine Hände!|¡Lávate las manos!
der Finger|el dedo (mano)|Finger|Mein Finger tut weh.|Me duele el dedo.
der Bauch|la barriga|Bäuche|Mein Bauch tut weh.|Me duele la barriga.
der Rücken|la espalda|Rücken|Mein Rücken tut weh.|Me duele la espalda.
das Bein|la pierna|Beine|Mein Bein tut weh.|Me duele la pierna.
der Fuß|el pie|Füße|Mein Fuß tut weh.|Me duele el pie.
das Herz|el corazón|Herzen|Das Herz schlägt.|El corazón late.
die Gesundheit|la salud|—|Gesundheit ist wichtig.|La salud es importante.
die Krankheit|la enfermedad|Krankheiten|Die Krankheit dauert eine Woche.|La enfermedad dura una semana.
das Fieber|la fiebre|—|Mia hat Fieber.|Mia tiene fiebre.
der Husten|la tos|—|Ich habe Husten.|Tengo tos.
der Schnupfen|el catarro; la congestión|—|Ich habe Schnupfen.|Estoy resfriado.
die Schmerzen|los dolores|solo plural|Ich habe Schmerzen.|Tengo dolores.
die Tablette|la pastilla|Tabletten|Nimm die Tablette.|Toma la pastilla.
das Medikament|el medicamento|Medikamente|Ich brauche ein Medikament.|Necesito un medicamento.
die Praxis|la consulta médica|Praxen
das Krankenhaus|el hospital|Krankenhäuser
die Gesundheitskarte|la tarjeta sanitaria|Gesundheitskarten
verbo:wehtun|doler|Mein Kopf tut weh.|Me duele la cabeza.|es tut weh;hat wehgetan
verbo:sich ausruhen|descansar|Ich ruhe mich aus.|Descanso.|ich ruhe mich aus;du ruhst dich aus;hat sich ausgeruht
adjetivo:krank|enfermo|Ich bin krank.|Estoy enfermo.
adjetivo:gesund|sano|Ich bin wieder gesund.|Ya estoy bien.
pronombre:mir|a mí (dativo)|Mir geht es gut.|Estoy bien.
pronombre:dir|a ti (dativo)|Wie geht es dir?|¿Cómo estás?
preposición:seit|desde (duración)|Seit gestern bin ich krank.|Estoy enfermo desde ayer.
expresión:gute Besserung|que te mejores|Gute Besserung, Mia!|¡Que te mejores, Mia!
expresión:zum Arzt gehen|ir al médico|Ich muss zum Arzt gehen.|Tengo que ir al médico.
@u15
die Kleidung|la ropa|—|Ich brauche neue Kleidung.|Necesito ropa nueva.
die Jacke|la chaqueta|Jacken
der Mantel|el abrigo|Mäntel
die Hose|el pantalón|Hosen
das Kleid|el vestido|Kleider
der Rock|la falda|Röcke
das Hemd|la camisa|Hemden
die Bluse|la blusa|Blusen
das T-Shirt|la camiseta|T-Shirts
der Pullover|el jersey|Pullover
der Schuh|el zapato|Schuhe
die Socke|el calcetín|Socken
der Hut|el sombrero|Hüte
die Mütze|el gorro|Mützen
der Schal|la bufanda|Schals
die Tasche|el bolso; la bolsa|Taschen
die Brille|las gafas|Brillen|Meine Brille ist neu.|Mis gafas son nuevas.
die Größe|la talla; el tamaño|Größen|Welche Größe brauchen Sie?|¿Qué talla necesita?
die Farbe|el color|Farben|Die Farbe gefällt mir.|Me gusta el color.
die Umkleide|el probador|Umkleiden
die Weste|el chaleco|Westen
verbo:anprobieren|probarse|Ich probiere die Jacke an.|Me pruebo la chaqueta.|ich probiere an;du probierst an;hat anprobiert
verbo:passen|quedar bien (talla)|Die Hose passt.|El pantalón queda bien.|ich passe;du passt;er passt;hat gepasst
verbo:gefallen|gustar|Die Jacke gefällt mir.|Me gusta la chaqueta.|es gefällt;hat gefallen
verbo:tragen|llevar puesto|Ich trage eine Jacke.|Llevo una chaqueta.|ich trage;du trägst;er trägt;hat getragen
adjetivo:rot|rojo|Die Jacke ist rot.|La chaqueta es roja.
adjetivo:blau|azul|Das Hemd ist blau.|La camisa es azul.
adjetivo:grün|verde|Die Tasche ist grün.|El bolso es verde.
adjetivo:gelb|amarillo|Die Mütze ist gelb.|El gorro es amarillo.
adjetivo:schwarz|negro|Der Mantel ist schwarz.|El abrigo es negro.
adjetivo:weiß|blanco|Das T-Shirt ist weiß.|La camiseta es blanca.
adjetivo:grau|gris|Die Hose ist grau.|El pantalón es gris.
adjetivo:braun|marrón|Die Schuhe sind braun.|Los zapatos son marrones.
adjetivo:schön|bonito|Das Kleid ist schön.|El vestido es bonito.
adjetivo:besser|mejor|Das ist besser.|Eso es mejor.
adjetivo:billig|barato|Die Jacke ist billig.|La chaqueta es barata.
@u16
das Wetter|el tiempo atmosférico|—|Das Wetter ist schön.|Hace buen tiempo.
die Sonne|el sol|Sonnen|Die Sonne scheint.|Brilla el sol.
der Regen|la lluvia|—|Der Regen ist stark.|La lluvia es fuerte.
der Schnee|la nieve|—|Der Schnee ist weiß.|La nieve es blanca.
der Wind|el viento|Winde|Der Wind ist kalt.|El viento es frío.
die Wolke|la nube|Wolken|Am Himmel sind Wolken.|Hay nubes en el cielo.
der Himmel|el cielo|Himmel|Der Himmel ist blau.|El cielo es azul.
das Gewitter|la tormenta|Gewitter|Heute gibt es ein Gewitter.|Hoy hay tormenta.
der Grad|el grado|Grade|Es sind zehn Grad.|Hace diez grados.
die Temperatur|la temperatura|Temperaturen|Die Temperatur ist niedrig.|La temperatura es baja.
der Frühling|la primavera|Frühlinge|Im Frühling ist es warm.|En primavera hace buen tiempo.
der Sommer|el verano|Sommer|Im Sommer schwimme ich.|En verano nado.
der Herbst|el otoño|Herbste|Im Herbst regnet es oft.|En otoño llueve a menudo.
der Winter|el invierno|Winter|Im Winter ist es kalt.|En invierno hace frío.
die Jahreszeit|la estación del año|Jahreszeiten|Der Sommer ist eine Jahreszeit.|El verano es una estación del año.
das Meer|el mar|Meere|Wir fahren ans Meer.|Vamos al mar.
der Strand|la playa|Strände
der See|el lago|Seen|Der See ist schön.|El lago es bonito.
der Berg|la montaña|Berge|Der Berg ist hoch.|La montaña es alta.
der Wald|el bosque|Wälder
der Baum|el árbol|Bäume
die Blume|la flor|Blumen
die Natur|la naturaleza|—|Ich bin gern in der Natur.|Me gusta estar en la naturaleza.
der Regenschirm|el paraguas|Regenschirme
verbo:regnen|llover|Es regnet.|Llueve.|es regnet;hat geregnet
verbo:schneien|nevar|Es schneit.|Nieva.|es schneit;hat geschneit
verbo:scheinen|brillar; parecer|Die Sonne scheint.|Brilla el sol.|sie scheint;hat geschienen
adjetivo:sonnig|soleado|Morgen ist es sonnig.|Mañana hará sol.
adjetivo:windig|ventoso|Heute ist es windig.|Hoy hace viento.
adjetivo:bewölkt|nublado|Es ist bewölkt.|Está nublado.
adjetivo:heiß|caliente; caluroso|Heute ist es heiß.|Hoy hace calor.
adjetivo:kühl|fresco (temperatura)|Am Abend ist es kühl.|Por la noche refresca.
adjetivo:nass|mojado|Meine Schuhe sind nass.|Mis zapatos están mojados.
adjetivo:trocken|seco|Die Jacke ist trocken.|La chaqueta está seca.
expresión:meistens|casi siempre|Meistens scheint die Sonne.|Casi siempre brilla el sol.
expresión:draußen|fuera (al aire libre)|Mia spielt draußen.|Mia juega fuera.
@u17
verbo:telefonieren|hablar por teléfono|Ich habe telefoniert.|He hablado por teléfono.|ich telefoniere;du telefonierst;hat telefoniert
verbo:putzen|limpiar|Ich habe das Bad geputzt.|He limpiado el baño.|ich putze;du putzt;hat geputzt
verbo:aufräumen|ordenar|Ich habe das Zimmer aufgeräumt.|He ordenado la habitación.|ich räume auf;du räumst auf;hat aufgeräumt
verbo:waschen|lavar|Ich habe die Kleidung gewaschen.|He lavado la ropa.|ich wasche;du wäschst;er wäscht;hat gewaschen
verbo:öffnen|abrir|Ich habe das Fenster geöffnet.|He abierto la ventana.|ich öffne;du öffnest;er öffnet;hat geöffnet
verbo:schließen|cerrar|Ich habe die Tür geschlossen.|He cerrado la puerta.|ich schließe;du schließt;hat geschlossen
verbo:bringen|traer; llevar|Ben hat Brot gebracht.|Ben ha traído pan.|ich bringe;du bringst;hat gebracht
verbo:geben|dar|Sie hat mir ein Buch gegeben.|Me ha dado un libro.|ich gebe;du gibst;er gibt;hat gegeben
verbo:bekommen|recibir|Ich habe eine E-Mail bekommen.|He recibido un correo.|ich bekomme;du bekommst;hat bekommen
verbo:vergessen|olvidar|Ich habe das Buch vergessen.|He olvidado el libro.|ich vergesse;du vergisst;er vergisst;hat vergessen
verbo:verlieren|perder|Ich habe den Schlüssel verloren.|He perdido la llave.|ich verliere;du verlierst;hat verloren
verbo:backen|hornear|Ich habe einen Kuchen gebacken.|He hecho una tarta al horno.|ich backe;du backst;er backt;hat gebacken
verbo:reparieren|reparar|Ich habe das Fahrrad repariert.|He reparado la bicicleta.|ich repariere;du reparierst;hat repariert
verbo:probieren|probar|Ich habe die Suppe probiert.|He probado la sopa.|ich probiere;du probierst;hat probiert
verbo:feiern|celebrar|Wir haben Geburtstag gefeiert.|Hemos celebrado un cumpleaños.|ich feiere;du feierst;hat gefeiert
verbo:lachen|reír|Wir haben viel gelacht.|Nos hemos reído mucho.|ich lache;du lachst;hat gelacht
verbo:erzählen|contar; narrar|Sie hat eine Geschichte erzählt.|Ha contado una historia.|ich erzähle;du erzählst;hat erzählt
verbo:zeigen|mostrar|Er hat mir das Foto gezeigt.|Me ha enseñado la foto.|ich zeige;du zeigst;hat gezeigt
verbo:üben|practicar|Ich habe Deutsch geübt.|He practicado alemán.|ich übe;du übst;hat geübt
verbo:wiederholen|repetir|Ich habe die Wörter wiederholt.|He repasado las palabras.|ich wiederhole;du wiederholst;hat wiederholt
expresión:schon|ya|Ich habe schon gegessen.|Ya he comido.
expresión:noch nicht|todavía no|Ich habe noch nicht gegessen.|Todavía no he comido.
expresión:danach|después de eso|Danach habe ich gelesen.|Después he leído.
expresión:zuerst|primero|Zuerst habe ich gekocht.|Primero he cocinado.
expresión:dann|entonces; después|Dann habe ich gegessen.|Después he comido.
expresión:zuletzt|por último|Zuletzt habe ich aufgeräumt.|Por último he recogido.
die Geschichte|la historia; el relato|Geschichten|Die Geschichte ist kurz.|La historia es corta.
das Foto|la foto|Fotos
das Bild|la imagen; el cuadro|Bilder
der Geburtstag|el cumpleaños|Geburtstage|Heute ist mein Geburtstag.|Hoy es mi cumpleaños.
das Geschenk|el regalo|Geschenke
der Besuch|la visita|Besuche|Danke für deinen Besuch.|Gracias por tu visita.
der Spaß|la diversión|—|Das macht Spaß.|Eso es divertido.
adjetivo:fertig|terminado|Ich bin fertig.|He terminado.
adjetivo:einfacher|más sencillo|Die Übung ist einfacher.|El ejercicio es más sencillo.
adjetivo:schwierig|difícil|Das war schwierig.|Eso fue difícil.
@u18
verbo:fliegen|volar|Ich bin nach Berlin geflogen.|He volado a Berlín.|ich fliege;du fliegst;ist geflogen
verbo:laufen|correr; ir andando|Ich bin nach Hause gelaufen.|He ido andando a casa.|ich laufe;du läufst;er läuft;ist gelaufen
verbo:zurückkommen|volver|Ich bin spät zurückgekommen.|He vuelto tarde.|ich komme zurück;du kommst zurück;ist zurückgekommen
verbo:zurückfahren|regresar (vehículo)|Wir sind zurückgefahren.|Hemos vuelto.|ich fahre zurück;du fährst zurück;ist zurückgefahren
verbo:mitfahren|ir con alguien (vehículo)|Anna ist mitgefahren.|Anna ha venido con nosotros.|ich fahre mit;du fährst mit;ist mitgefahren
verbo:aufwachen|despertarse|Ich bin früh aufgewacht.|Me he despertado temprano.|ich wache auf;du wachst auf;ist aufgewacht
verbo:passieren|suceder|Was ist passiert?|¿Qué ha pasado?|es passiert;ist passiert
verbo:fallen|caer|Das Glas ist gefallen.|Se ha caído el vaso.|ich falle;du fällst;er fällt;ist gefallen
verbo:wandern gehen|ir de excursión a pie|Wir sind wandern gegangen.|Hemos ido de excursión.|ich gehe wandern;ist wandern gegangen
expresión:war|era; estaba; fui|Ich war zu Hause.|Estaba en casa.
expresión:hatte|tenía; tuve|Ich hatte keine Zeit.|No tenía tiempo.
expresión:letzte Woche|la semana pasada|Letzte Woche war ich krank.|La semana pasada estuve enfermo.
expresión:letzten Monat|el mes pasado|Letzten Monat war ich in Berlin.|El mes pasado estuve en Berlín.
expresión:vor einem Jahr|hace un año|Vor einem Jahr war ich hier.|Hace un año estuve aquí.
expresión:nach Hause|a casa|Wir gehen nach Hause.|Vamos a casa.
expresión:zu Hause|en casa|Ich bin zu Hause.|Estoy en casa.
expresión:unterwegs|de camino|Ich bin unterwegs.|Estoy de camino.
expresión:zurück|de vuelta|Ich bin zurück.|Estoy de vuelta.
adjetivo:glücklich|contento; feliz|Wir waren glücklich.|Estábamos contentos.
adjetivo:traurig|triste|Sie war traurig.|Estaba triste.
adjetivo:kaputt|roto|Mein Fahrrad war kaputt.|Mi bicicleta estaba rota.
adjetivo:voll|lleno|Der Bus war voll.|El autobús estaba lleno.
adjetivo:leer|vacío|Das Glas war leer.|El vaso estaba vacío.
adjetivo:lang|largo|Die Reise war lang.|El viaje fue largo.
adjetivo:kurz|corto|Die Pause war kurz.|La pausa fue corta.
der Ausflug|la excursión|Ausflüge|Der Ausflug war schön.|La excursión estuvo bien.
der Hafen|el puerto|Häfen
die Altstadt|el casco antiguo|Altstädte
die Kirche|la iglesia|Kirchen
das Schloss|el castillo; la cerradura|Schlösser
die Insel|la isla|Inseln
das Dorf|el pueblo|Dörfer
der Fluss|el río|Flüsse
die Richtung|la dirección (rumbo)|Richtungen|Welche Richtung ist richtig?|¿Qué dirección es la correcta?
die Verspätung|el retraso|Verspätungen|Der Zug hat Verspätung.|El tren lleva retraso.
das Erlebnis|la experiencia vivida|Erlebnisse|Das war ein schönes Erlebnis.|Fue una experiencia bonita.
@u19
die Nachricht|el mensaje; la noticia|Nachrichten|Ich habe eine Nachricht bekommen.|He recibido un mensaje.
die E-Mail|el correo electrónico|E-Mails|Ich schreibe eine E-Mail.|Escribo un correo.
der Brief|la carta|Briefe|Der Brief ist für dich.|La carta es para ti.
die Postkarte|la postal|Postkarten|Ich schreibe eine Postkarte.|Escribo una postal.
der Briefkasten|el buzón|Briefkästen
die Briefmarke|el sello|Briefmarken
der Umschlag|el sobre|Umschläge
das Telefon|el teléfono|Telefone
das Internet|internet|—|Das Internet funktioniert nicht.|Internet no funciona.
die Website|la página web|Websites|Die Nummer steht auf der Website.|El número está en la web.
das Passwort|la contraseña|Passwörter|Mein Passwort ist lang.|Mi contraseña es larga.
der Kontakt|el contacto|Kontakte|Wir bleiben in Kontakt.|Seguimos en contacto.
die Verabredung|la cita (encuentro)|Verabredungen|Ich habe eine Verabredung.|He quedado con alguien.
der Treffpunkt|el punto de encuentro|Treffpunkte
der Vorschlag|la propuesta|Vorschläge|Das ist ein guter Vorschlag.|Es una buena propuesta.
der Grund|el motivo|Gründe|Was ist der Grund?|¿Cuál es el motivo?
verbo:schicken|enviar|Ich schicke dir eine Nachricht.|Te mando un mensaje.|ich schicke;du schickst;hat geschickt
verbo:senden|enviar; transmitir|Ich sende eine E-Mail.|Envío un correo.|ich sende;du sendest;hat gesendet
verbo:absagen|cancelar|Ich muss den Termin absagen.|Tengo que cancelar la cita.|ich sage ab;du sagst ab;hat abgesagt
verbo:vereinbaren|concertar|Wir vereinbaren einen Termin.|Concertamos una cita.|ich vereinbare;du vereinbarst;hat vereinbart
verbo:planen|planificar|Wir planen einen Ausflug.|Planeamos una excursión.|ich plane;du planst;hat geplant
verbo:hoffen|esperar (esperanza)|Ich hoffe, du kommst.|Espero que vengas.|ich hoffe;du hoffst;hat gehofft
verbo:sich freuen|alegrarse; tener ganas|Ich freue mich auf Samstag.|Tengo ganas de que llegue el sábado.|ich freue mich;du freust dich;hat sich gefreut
expresión:Bescheid sagen|avisar|Sag mir bitte Bescheid.|Avísame, por favor.
expresión:einverstanden|de acuerdo|Ja, einverstanden.|Sí, de acuerdo.
expresión:kein Problem|ningún problema|Kein Problem, ich helfe dir.|Sin problema, te ayudo.
expresión:das passt|me viene bien|Um sechs? Das passt.|¿A las seis? Me viene bien.
expresión:bis dann|hasta entonces|Gut, bis dann!|¡Bien, hasta entonces!
expresión:nächste Woche|la semana que viene|Wir treffen uns nächste Woche.|Quedamos la semana que viene.
expresión:später|más tarde|Ich komme später.|Voy más tarde.
expresión:vorher|antes de eso|Vorher muss ich arbeiten.|Antes tengo que trabajar.
expresión:sofort|enseguida|Ich komme sofort.|Voy enseguida.
conjunción:weil|porque (verbo al final)|Ich bleibe, weil ich krank bin.|Me quedo porque estoy enfermo.
pronombre:dich|a ti (acusativo)|Ich rufe dich an.|Te llamo.
pronombre:ihn|a él; lo (acusativo)|Ich sehe ihn.|Lo veo.
pronombre:uns|nos; a nosotros|Wir treffen uns morgen.|Nos vemos mañana.
@u20
die Hilfe|la ayuda|—|Ich brauche Hilfe.|Necesito ayuda.
der Notfall|la emergencia|Notfälle|Das ist ein Notfall.|Es una emergencia.
das Problem|el problema|Probleme|Ich habe ein Problem.|Tengo un problema.
die Information|la información|Informationen|Ich brauche eine Information.|Necesito una información.
das Formular|el formulario|Formulare
die Unterschrift|la firma|Unterschriften|Hier fehlt Ihre Unterschrift.|Aquí falta su firma.
der Eingangscode|el código de entrada|Eingangscodes|Wie ist der Eingangscode?|¿Cuál es el código de entrada?
die Versicherung|el seguro|Versicherungen|Ich habe eine Versicherung.|Tengo un seguro.
die Öffnungszeit|el horario de apertura|Öffnungszeiten|Die Öffnungszeiten stehen an der Tür.|El horario está en la puerta.
das Amt|la oficina pública|Ämter
der Schalter|la ventanilla; el interruptor|Schalter
das Fundbüro|la oficina de objetos perdidos|Fundbüros
der Kassenbon|el tique|Kassenbons|Haben Sie den Kassenbon?|¿Tiene el tique?
die Kreditkarte|la tarjeta de crédito|Kreditkarten
die Quittung|el recibo|Quittungen|Ich brauche eine Quittung.|Necesito un recibo.
das Konto|la cuenta bancaria|Konten|Ich habe ein Konto.|Tengo una cuenta bancaria.
die Rechnungskopie|la copia de la factura|Rechnungskopien|Ich brauche eine Rechnungskopie.|Necesito una copia de la factura.
verbo:unterschreiben|firmar|Bitte unterschreiben Sie hier.|Firme aquí, por favor.|ich unterschreibe;du unterschreibst;hat unterschrieben
verbo:ausfüllen|rellenar|Ich fülle das Formular aus.|Relleno el formulario.|ich fülle aus;du füllst aus;hat ausgefüllt
verbo:buchstabieren|deletrear|Können Sie das buchstabieren?|¿Puede deletrearlo?|ich buchstabiere;du buchstabierst;hat buchstabiert
verbo:buchen|reservar (viaje)|Ich buche einen Flug.|Reservo un vuelo.|ich buche;du buchst;hat gebucht
verbo:funktionieren|funcionar|Das Handy funktioniert nicht.|El móvil no funciona.|es funktioniert;hat funktioniert
verbo:fehlen|faltar|Was fehlt Ihnen?|¿Qué le ocurre?|es fehlt;hat gefehlt
verbo:halten|parar; sostener|Der Zug hält hier.|El tren para aquí.|ich halte;du hältst;er hält;hat gehalten
adjetivo:geöffnet|abierto|Das Büro ist geöffnet.|La oficina está abierta.
adjetivo:geschlossen|cerrado|Der Laden ist geschlossen.|La tienda está cerrada.
adjetivo:dringend|urgente|Das ist dringend.|Es urgente.
adjetivo:wichtig|importante|Die Adresse ist wichtig.|La dirección es importante.
adjetivo:richtig|correcto|Die Nummer ist richtig.|El número es correcto.
adjetivo:falsch|incorrecto|Die Antwort ist falsch.|La respuesta es incorrecta.
expresión:wenig|poco|Ich habe wenig Zeit.|Tengo poco tiempo.
expresión:viel|mucho|Ich habe viel gelernt.|He aprendido mucho.
expresión:mehr|más|Ich brauche mehr Zeit.|Necesito más tiempo.
expresión:noch|todavía; más|Ich lerne noch.|Todavía estudio.
expresión:weiter|seguir; más allá|Ich lerne weiter.|Sigo aprendiendo.
expresión:zum Beispiel|por ejemplo|Ich esse Obst, zum Beispiel Äpfel.|Como fruta, por ejemplo manzanas.`;
let unit = "u01";
export const vocabulary: Word[] = raw.split("\n").flatMap((row) => {
  if (row.startsWith("@")) {
    unit = row.slice(1);
    return [];
  }
  const [lemma, es, c, d, e] = row.split("|");
  const noun = /^(der|die|das) /.test(lemma);
  const [pos, ...rest] = lemma.split(":");
  const de = noun ? lemma : rest.join(":");
  const article = noun ? lemma.split(" ")[0] : undefined;
  const nounName = noun ? lemma.slice(article!.length + 1) : de;
  return [
    {
      id: `${unit}-w-${nounName.toLocaleLowerCase("de").replace(/[^\p{L}\p{N}]+/gu, "-")}`,
      unit,
      level: Number(unit.slice(1)) <= 3 ? "A0" : "A1",
      de,
      es,
      pos: noun ? "sustantivo" : pos,
      article,
      gender:
        article === "der"
          ? "masculino"
          : article === "das"
            ? "neutro"
            : c === "solo plural"
              ? "plural"
              : "femenino",
      plural: noun ? c : undefined,
      example: noun ? d || nounContexts[de]?.example || `Wo ist ${de}?` : c,
      translation: noun
        ? e || nounContexts[de]?.translation || `¿Dónde está ${es}?`
        : d,
      forms: noun ? undefined : e?.split(";"),
      irregular: noun
        ? undefined
        : e
          ? "Consulta las formas registradas; no extrapoles conjugaciones."
          : undefined,
      aliases: [],
      related: [`${unit}-grammar`],
    } as Word,
  ];
});

vocabulary.push(...functionalWords);
