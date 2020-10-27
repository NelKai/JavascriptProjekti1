function addItem() {
    var inputTxt = document.forms.toDoForm.item.value;

    // Tapahtumateksti, joka kertoo onnistuiko lisäys
    
    var eventText = document.createElement('p');
    eventText.style.color = "green";
    eventText.innerHTML = "Tehtävä lisätty onnistuneesti.";
    
    var eventText_loc = document.getElementsByTagName('p');
    eventText_loc[0].appendChild(eventText);
    
    // Syötön tarkistus

    if (inputTxt.length < 1) {
        eventText.style.color = "red";
        eventText.innerHTML = "Ethän jätä kenttää tyhjäksi.";
        document.forms.toDoForm.item.style.border = "1px solid red";
        return false;
    }
    
    // Syötön lisäys listaan
    
    var listItem = document.createElement('li');

    listItem.innerHTML = "<li><input type='checkbox' onclick='checkItem()' id='cbox'>" + inputTxt + "</li>";
    document.getElementById("toDoList").appendChild(listItem);
     
}

function checkItem() {
    alert("Onneksi olkoon, suoritit tehtävän!");
}






