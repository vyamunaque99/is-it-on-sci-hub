
/* DOI A USAR PARA PRUEBAS -> 10.1016/j.eswa.2021.115741 */

const description = document.getElementsByTagName("dd");
if (description) {
  //const doi_regex = new RegExp("/^10.\d{4,9}/[-._;()/:A-Z0-9]+$/i");
  const doi = description[3].innerText;
  const sci_hub_url="https://sci-hub.se/"
  const doi_url = sci_hub_url + doi;
  const download_button = document.createElement("button");

  chrome.runtime.sendMessage({ url: doi_url }, response => {
    var html=response
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const pdfElements = doc.querySelectorAll('embed[type="application/pdf"], object[type="application/pdf"]');
    const paper_sub_url=pdfElements[0].getAttribute("src");
    const paper_full_url=sci_hub_url+paper_sub_url;
    if (pdfElements.length) {
      download_button.textContent = "Descargar " + doi;
      download_button.setAttribute("onclick","location.href='"+paper_full_url+"'");
    } else {
      download_button.textContent = "No disponible :(";
    }
  })

  console.log(doi_url);
  const menu = document.getElementsByClassName("Stack-module__tT3r4 Stack-module__Y4rmW")[5];

  menu.insertAdjacentElement("beforeend", download_button);
}
