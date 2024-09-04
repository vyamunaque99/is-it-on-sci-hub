
/* DOI A USAR PARA PRUEBAS -> 10.1016/j.eswa.2021.115741 */


if (document.readyState !== 'loading') {
  console.log('document is already ready, just execute code here');
  const myTimeout = setTimeout(myInitCode, 350);
} else {
  document.addEventListener('DOMContentLoaded', function () {
      console.log('document was not ready, place code here');
      const myTimeout = setTimeout(myInitCode, 350);
  });
}

function myInitCode() {
  const description = document.getElementsByTagName("dd");
  const doi = description[3].innerText;

  const sci_hub_url="https://sci-hub.se/"
  const doi_url = sci_hub_url + doi;
  const doi_finder_url="http://127.0.0.1:8000/dois/";
  const doi_finder_full_url = doi_finder_url + doi;
  const download_button = document.createElement("button");
  const download_span= document.createElement("span");
  download_button.setAttribute("class","Button-module__nc6_8 Button-module__rphhF Button-module__nwgBo Button-module__R359q Button-module__hK_LA Button-module__x5a4w");
  download_span.setAttribute("class","Typography-module__lVnit Typography-module__Nfgvc Button-module__Imdmt")
  download_button.appendChild(download_span)

  chrome.runtime.sendMessage({ url: doi_finder_full_url }, response => {
    var json=JSON.parse(response);
    if (json.length>0) {
      download_span.textContent = "Descargar " + doi;
      download_button.setAttribute("onclick","window.open('"+doi_url+"')");
      download_button.setAttribute("target","_blank")
    } else {
      download_span.textContent = "No disponible :(";
    }
  })
  
  const menu = document.getElementsByClassName("Stack-module__tT3r4 Stack-module__Y4rmW")[7];
  menu.insertAdjacentElement("beforeend", download_button);
}