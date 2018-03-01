function loading(){
  document.getElementById("loader").style.display = "block";
  document.getElementById("_video").style.display = "none";
}
function finishLoading(){
  var vid = document.getElementById("_video");
  document.getElementById("loader").style.display = "none";
  vid.style.display = "block";
  vid.setAttribute("controls","controls");

}
var xhr = new XMLHttpRequest();
xhr.responseType = 'blob';

xhr.onload = function() {
  finishLoading();
  
  var reader = new FileReader();
  
  reader.onloadend = function() {
  
    var byteCharacters = atob(reader.result.slice(reader.result.indexOf(',') + 1));
    
    var byteNumbers = new Array(byteCharacters.length);

    for (var i = 0; i < byteCharacters.length; i++) {
      
      byteNumbers[i] = byteCharacters.charCodeAt(i);
      
    }

    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {type: 'video/mp4'});
    var url = URL.createObjectURL(blob);
    
    document.getElementById('_video').src = url;
    
  }
  
  reader.readAsDataURL(xhr.response);
  
};
loading();
xhr.open('GET', 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.webm');
xhr.send();

