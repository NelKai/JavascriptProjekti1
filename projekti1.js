
// Luodaan tapahtumateksti, joka antaa ilmoituksen ohjelman toiminnoista
var tapahtumaTeksti = document.createElement('p');
var tapahtumaTeksti_paikka = document.getElementsByTagName('p');

// Luetaan käyttäjän syötöt ja tallenetaan ne taulukkoon / localstorageen
function lisaaTeht() {
    var syotto = document.getElementById('input').value;
    var listaTaulukko = lataaLista(); // Tuodaan lataaLista-funktiosta taulukon arvot
    tapahtumaTeksti_paikka[0].appendChild(tapahtumaTeksti);

    if (syotto.length > 0) {
        listaTaulukko.push(syotto); // Tallennetaan käyttäjän syöttämät arvot taulukkoon
        localStorage.setItem('listaJasen', JSON.stringify(listaTaulukko)); // Tallennetaan taulukon sisältö localstorageen string-muodossa
       
        // Päivitetään tapahtumateksti syötön oikeellisuuden perusteella
        tapahtumaTeksti.style.color = "green";
        tapahtumaTeksti.innerHTML = "Tehtävä lisätty onnistuneesti.";
        document.getElementById("input").style.border = "1px solid black";

        luoLista(); // Kutsutaan funktiota, joka tuo listan ruudulle
    } else {
        document.getElementById("input").style.border = "1px solid red";
        tapahtumaTeksti.style.color = "red";
        tapahtumaTeksti.innerHTML = "Ethän jätä kenttää tyhjäksi.";
        return false;
    }
}

//Poistetaan listan jäsen, kun sen vieressä olevaa nappia painetaan
function poistaTeht() {
    var tehtID = this.getAttribute('id'); // Haetaan kyseisen listan jäsenen/poista-napin id
    var listaTaulukko = lataaLista();
    
    listaTaulukko.splice(tehtID, 1); // Poistetaan listan jäsen taulukosta/listasta id:n perusteella
    localStorage.setItem('listaJasen', JSON.stringify(listaTaulukko)); // ja päivitetään localstorage
    luoLista();
}

// Tyhjennetään koko lista kerrallaan
function tyhjennaLista() {
    var listaTaulukko = lataaLista();

    tapahtumaTeksti_paikka[0].appendChild(tapahtumaTeksti);

    // Tarkistetaan onko lista tyhjä vai ei ja päivitetään tapahtumateksti
    if (listaTaulukko.length > 0) {
        localStorage.clear();
        tapahtumaTeksti.style.color = "green";
        tapahtumaTeksti.innerHTML = "Lista tyhjennetty!";
        luoLista();
    } else {
        tapahtumaTeksti.style.color = "red";
        tapahtumaTeksti.innerHTML = "Lista on jo tyhjä.";
    }
}

// Tuodaan lista näkyviin ruudulle
function luoLista() {
    var listaTaulukko = lataaLista();
    var listaTeksti = "";

    // Luodaan listan jäsenet for-silmukalla ja luodaan jokaiselle poista-napille oma id
    for (var i = 0; i < listaTaulukko.length; i++) {
        listaTeksti += "<li><input type='checkbox' id='cbox_" + i + "' class='cbox'><label>" + listaTaulukko[i] + "</label><input type='button' id='" + i + "' class='poistoNappi' value='Poista'></li>";
    }
    document.getElementById("toDoLista").innerHTML = listaTeksti; // Sijoitetaan listan jäsenet html-listaan

    // Luodaan jokaiselle poista-napille oma tapahtumakuuntelija, joka kutsuu poistamisfunktiota
    var poistoNapit = document.getElementsByClassName("poistoNappi");
    for (var z = 0; z < poistoNapit.length; z++) {
        poistoNapit[z].addEventListener("click", poistaTeht);
    }
}

// Näytetään listassa jo olevat tehtävät napin painalluksella ja päivitetään tapahtumateksti
function naytaLista() {
    var listaTaulukko = lataaLista();
    tapahtumaTeksti_paikka[0].appendChild(tapahtumaTeksti);

    if (listaTaulukko.length == 0) {
        tapahtumaTeksti.style.color = "red";
        tapahtumaTeksti.innerHTML = "Lista on tyhjä."; 
    } else {
        luoLista();
    }
}

// Ladataan localstoragesta arvot ja tallennetaan taulukkoon
function lataaLista() {
    var listaTaulukko = []; // Luodaan taulukko, johon arvot tallennetaan
    var haetutTeht = localStorage.getItem('listaJasen'); // Haetaan arvoja localstoragesta

    // Tarkistetaan onko localstoragessa mitään, jos on tallennetaan siellä olevat arvot taulukkoon
    if (haetutTeht == null) {
        console.log("Mitään ei ole tallennettu.");
    } else {
         listaTaulukko = JSON.parse(haetutTeht);
    }

    return listaTaulukko; // Palautetaan taulukko muiden funktioiden käytettäväksi
}