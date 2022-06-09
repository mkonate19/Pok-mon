document.addEventListener("DOMContentLoaded", async () => {
    load_data();
    document.getElementById('result').innerHTML = navigator.deviceMemory ?? 'unknown'
    setTimeout(() => {
      document.getElementById('result').innerHTML = navigator.deviceMemory ?? 'unknown'
    }, 10000);
});
function load_data() {
    const contentElement = document.getElementById("content");

    contentElement.innerHTML = "";
    if (localStorage.getItem("pokemons")) {

        const persos = JSON.parse(localStorage.getItem("pokemons"));
        persos.forEach((perso, id) => {
            contentElement.innerHTML += `<div id="perso-${id}" class="card" > <br>
            <div class="img_pok">
                <img src="pokemons/${perso.img_pokemon}.png"> <br><br>
                </div>                      
                                            <div class="cadre">                                                          
                                            Nom : ${perso.name}<br><br>
                                            </div>
                                            <div class="cadre">
                                            health point : ${perso.hp} <br><br> 
                                            </div> 
                                            <div class="cadre">
                                            Attaque : ${perso.atq} <br><br>
                                            </div>
                                            <div class="cadre">
                                            Défense :  ${perso.def} <br><br>
                                            </div>
                                            
                                            <div class="button_load">
                                                <img src="icones/modif.png" onclick="modif_Perso('${id}')" id="modif">
                                                <img src="icones/sup.png" onclick="supr_Perso('${id}')" id="supr">
                                            </div>
                                            <style>
                                              .button_load {
                                                width:100%; 
                                                display: flex; 
                                                flex-direction: row; 
                                                      
                                              }
                                              .button_load img {
                                                width:40px; 
                                                height:40px; 
                                                margin:10px;
                                              }
                                              .button_load img:hover{
                                                -webkit-transform:scale(1.50); 
                                                -moz-transform:scale(1.50); 
                                                -ms-transform:scale(1.50); 
                                                -o-transform:scale(1.50);
                                                transform:scale(1.50);
                                                }
                                              .img_pok img{
                                                width:55%;   
                                              }   
                                              .img_pok {
                                                display: flex;
                                                justify-content: center;
                                              }
                                              .cadre{
                                                border: 2px solid green; 
                                                padding: 1px;
                                              }
                                             </style>
                                        </div>`;
        });
    }
}

function add() {
    const contentElement = document.getElementById("content");
    contentElement.innerHTML += `<div class="card" > <br><br>
                                        <label for="name">Nom : </label><br>
                                        <input placeholder="Nom" type="text" id="name_input"> <br><br>
                                        
                                        <label for="hp">health point : </label><br>
                                        <input placeholder="hp" type="number" id="hp_input"> <br><br> 

                                        <label for="atq">Attaque : </label><br>
                                        <input placeholder="atq" type="number" id="atq_input"><br><br>

                                        <label for="def">Défense : </label><br>
                                        <input placeholder="def" type="number" id="def_input"><br><br>
                                        
                                        <label for="img">Nom du pokémon <br>correspondant à l'image : </label><br>
                                        <input placeholder="Chemin vers l'image" type="text" id="img_pokemon" name="img_pokemon" accept="image/png, image/jpeg, image/gif"><br><br>
                                        
                                        <div class="modif_suppr_img">
                                          <img src="icones/Ajouter.png" onclick="send_champion()" id="add">
                                          <img src="icones/annuler.png" onclick="load_data()" id = "supr">
                                        </div>

                                        <style>
                                        
                                          .modif_suppr_img {
                                            width:100%; 
                                            display: flex; 
                                            flex-direction: row; 
                                                  
                                          }
                                          .modif_suppr_img img {
                                            width:40px; 
                                            height:40px; 
                                            margin:10px;
                                          }
                                          .modif_suppr_img img:hover{
                                            -webkit-transform:scale(1.50); 
                                            -moz-transform:scale(1.50); 
                                            -ms-transform:scale(1.50); 
                                            -o-transform:scale(1.50);
                                            transform:scale(1.50);
                                          } 
                                        </style>
                                </div>`;

}


function send_champion() {
    // Création du champion
    const name = document.getElementById("name_input").value;
    const hp = parseInt(document.getElementById("hp_input").value);
    const atq = parseInt(document.getElementById("atq_input").value);
    const img_pokemon = document.getElementById("img_pokemon").value;
    const def = parseInt(document.getElementById("def_input").value);
    const champion = {
        "name": name, "hp": hp, "atq": atq, "img_pokemon":img_pokemon, "def":def,
    };
    // envoi du champion en POST
    if (localStorage.getItem("pokemons")) {
        let tableau = JSON.parse(localStorage.getItem("pokemons"))
        tableau = [...tableau, champion]
        localStorage.setItem("pokemons", JSON.stringify(tableau))
    } else {
        let tableau = [champion]
        localStorage.setItem("pokemons", JSON.stringify(tableau))
    }
    load_data();
}

function modif_Perso(id) {
    const contentElement = document.getElementById(`perso-${id}`);


    contentElement.innerHTML = `<br><br>
                                <label for="name">Nom : </label><br>
                                <input value="${JSON.parse(localStorage.getItem("pokemons"))[id].name}" type="text" id="name_change"><br><br>

                                <label for="hp">health point : </label><br>
                                <input value="${JSON.parse(localStorage.getItem("pokemons"))[id].hp}" type="number" id="hp_change"> <br><br>
                                 

                                <label for="atq">Attaque : </label><br>
                                <input value="${JSON.parse(localStorage.getItem("pokemons"))[id].atq}" type="number" id="atq_change"> <br><br>

                                <label for="def">Défense : </label><br>
                                <input value="${JSON.parse(localStorage.getItem("pokemons"))[id].def}" type="number" id="def_change"> <br><br>
                                
                                
                                <label for="img">Chemin vers l'image : </label><br>
                                <input value="${JSON.parse(localStorage.getItem("pokemons"))[id].img_pokemon}" type="text" id="new_img_pokemon" name="img_pokemon" accept="image/png, image/jpeg"><br><br> 

                               

                                <div class="modif_perso_img">
                                          <img src="icones/val.png" onclick="sauv_Perso('${id}')" id="modif">
                                          <img src="icones/annuler.png" onclick="load_data()" id="supr">
                                </div>

                                <style>
                                    .modif_perso_img {
                                      width:100%; 
                                      display: flex; 
                                      flex-direction: row; 
                                            
                                    }
                                    .modif_perso_img img {
                                      width:40px; 
                                      height:40px; 
                                      margin:10px;
                                    }
                                    .modif_perso_img img:hover{
                                      -webkit-transform:scale(1.50); 
                                      -moz-transform:scale(1.50); 
                                      -ms-transform:scale(1.50); 
                                      -o-transform:scale(1.50);
                                      transform:scale(1.50);
                                      }
                                </style>
                                `;
}

function sauv_Perso(edit_id) {
    const name = document.getElementById("name_change").value;
    const hp = parseInt(document.getElementById("hp_change").value);
    const atq = parseInt(document.getElementById("atq_change").value);
    const def = parseInt(document.getElementById("def_change").value);
    const new_img_pokemon = document.getElementById("new_img_pokemon").value;
    const champion = {
        "name": name, "hp": hp, "atq": atq, "img_pokemon":new_img_pokemon, "def":def,
    };
    const persos = JSON.parse(localStorage.getItem("pokemons"))
    for (let id = 0; id < persos.length; id++) {
        if (edit_id == id) {
            persos[id] = champion
        }

    }
    localStorage.setItem("pokemons", JSON.stringify(persos))
    load_data();
}



function supr_Perso(supprimer_id) {

    let persos = JSON.parse(localStorage.getItem("pokemons"))
    for (let id = 0; id < persos.length; id++) {
        if (supprimer_id == id) {
            persos.splice(id, 1)
        }

    }
    // Pour ajouter le tableau dans le storage
    localStorage.setItem("pokemons", JSON.stringify(persos))

    load_data();
}

function subscriberForm() {
    const formulaire = document.getElementById("form");
    formulaire.innerHTML = `<div>
    <div style="width: 50%;height: 100%;">
        <div id="photoVideo" style="display: flex; flex-wrap: wrap; width: 100%; justify-content: center; color:azure;"></div>
        <div id="photoPrise" style="display: flex; flex-wrap: wrap; width: 100%; justify-content: center; color:azure;"></div>
        <div id="buttonGetStream" style="width: 100%">
            <img src="icones/cam.png" alt="Prendre une photo" onclick="getStream()"><br>
            <p>Cliquer ici pour prendre la photo 👆</p>
        </div>
        
    </div style="width: 10%; height: 10%;">
    <div class="formulaire">

            <p>Saisissez vos informations</p>
            <label for="name">Nom : </label><br>
            <input type="text" placeholder="Nom" name="nom_subscriber"><br><br>

            <label for="name">Prénom : </label><br>
            <input type="text" placeholder="Prénom" name="prenom_subscriber"><br><br>

            <label for="name">Pseudo : </label><br>
            <input type="text" placeholder="Pseudo" name="pseudo"><br><br>

            <label for="name">Adresse email : </label><br>
            <input type="email" placeholder="Email" name="email_subscriber"><br><br>
    </div>
<button class="button_important" onclick="submitForm()">Soumettre le formulaire ! 😃</button>

<style>
button {
  position: relative;
  background-color: #4CAF50;
  border: none;
  font-size: 16px;
    color: #FFFFFF;
    padding: 5px;
    width: 158px;
  text-align: center;
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  border-radius : 10%;
}

button:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
</style>`;


}

function submitForm() {
    const formulaire = document.getElementById("form");
    formulaire.innerHTML = `<p style="text-align: center;">
        Vous voulez rejoindre notre équipe de developpeur ? <br><br>
        C'est simple ! Cliquez sur le bouton ci-dessous, remplissez et soumettez-nous le formulaire. 
    </p>
    <button id = "btn3" onclick="subscriberForm()">Remplir maintenant ! ✏️</button>
    
    <style>
    button {
      position: relative;
      background-color: #4CAF50;
      border: none;
      font-size: 16px;
    color: #FFFFFF;
    padding: 5px;
    width: 158px;
      text-align: center;
      transition-duration: 0.4s;
      text-decoration: none;
      overflow: hidden;
      cursor: pointer;
      border-radius : 10%;
    }
    
    button:after {
      content: "";
      background: #f1f1f1;
      display: block;
      position: absolute;
      padding-top: 300%;
      padding-left: 350%;
      margin-left: -20px !important;
      margin-top: -120%;
      opacity: 0;
      transition: all 0.8s
    }
    
    button:active:after {
      padding: 0;
      margin: 0;
      opacity: 1;
      transition: 0s
    }
    <style/>`;
}

function getUserMedia(options, successCallback, failureCallback) {
    let api = navigator.getUserMedia ?? navigator.webkitGetUserMedia ?? navigator.mozGetUserMedia ?? navigator.msGetUserMedia;
    if (api) { return api.bind(navigator)(options, successCallback, failureCallback);}
}
  
let theStream;
  
function getStream() {
    const cadrePhotoVideo = document.getElementById("photoVideo");
    cadrePhotoVideo.innerHTML += `
    <div style="width:100%;"><video autoplay style="height: 180px; width: 240px; border: solid white 1px;"></video></div>
    <img style="width:10%;" src="icones/cam1.png" alt="Prendre la photo" onclick="takePhoto()"></div>`;
    const cadrePhotoPrise = document.getElementById("photoPrise");
    cadrePhotoPrise.innerHTML = ``;
    const buttonGetStream = document.getElementById("buttonGetStream");
    buttonGetStream.innerHTML = ``;
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia && !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }
    
    let constraints = {
      video: true
    };
  
    getUserMedia(constraints, function (stream) {
      let mediaControl = document.querySelector('video');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL ?? window.webkitURL).createObjectURL(stream);
      }
      theStream = stream;
    }, function (err) {
      alert('Error: ' + err);
    });
}
  
function takePhoto() {
    const cadrePhotoPrise = document.getElementById("photoPrise");
    cadrePhotoPrise.innerHTML += `<div style="width:100%;"><img id="imageTag" style="height: 180px; width: 240px;"></div><button class="buttonGetStream" onclick="getStream()">Reprendre !</button>`;
    if (!('ImageCapture' in window)) {
      alert('ImageCapture is not available');
      return;
    }
    
    if (!theStream) {
      alert('Grab the video stream first!');
      return;
    }
    
    let theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
  
    theImageCapturer.takePhoto()
      .then(blob => {
        let theImageTag = document.getElementById('imageTag');
        theImageTag.src = URL.createObjectURL(blob);
      })
      .catch(err => alert('Error: ' + err));
    const cadrePhotoVideo = document.getElementById("photoVideo");
    cadrePhotoVideo.innerHTML = ``;
}


