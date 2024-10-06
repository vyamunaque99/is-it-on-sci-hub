const url=window.location.href

if(url.includes('scopus')){
  if (document.readyState !== 'loading') {
    const myTimeout = setTimeout(add_scopus_button, 600);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      const myTimeout = setTimeout(add_scopus_button, 600);
    });
  }
}

if(url.includes('ieeexplore')){
  add_ieeexplore_button()
}


function add_ieeexplore_button(){
  console.log('IEEXplore')
  const doi = document.getElementsByClassName("u-pb-1 stats-document-abstract-doi")[0].innerText.substring(5);
  const sci_hub_url = "https://sci-hub.se/"
  const doi_url = sci_hub_url + doi;
  const doi_finder_url = "http://144.22.35.191:8000/dois/";
  const doi_finder_full_url = doi_finder_url + doi;
  const download_button = document.createElement("button");
  const download_div_1 = document.createElement("div");
  const download_xpl = document.createElement("xpl-cite-this-modal");
  const download_div_2 = document.createElement("div");
  download_button.setAttribute("class","xpl-btn-secondary");
  download_div_2.setAttribute("style","margin-left: 17px;");
  download_div_1.appendChild(download_button);
  download_xpl.appendChild(download_div_1);
  download_div_2.appendChild(download_xpl);
  chrome.runtime.sendMessage({ url: doi_finder_full_url }, response => {
    var json = JSON.parse(response);
    if (json.length > 0) {
      download_button.textContent = "Download " + doi;
      download_button.setAttribute("onclick", "window.open('" + doi_url + "')");
      download_button.setAttribute("target", "_blank")
    } else {
      if (response === false) download_button.textContent = "API not Available";
      else download_button.textContent = "Paper not Available :(";
    }
  })
  const menu = document.getElementsByClassName("u-mb-1 u-mt-05 btn-container")[0];
  menu.insertAdjacentElement("beforeend", download_div_2);
}


function add_scopus_button() {
  const description = document.getElementsByTagName("dd");
  const doi = description[3].innerText;
  const sci_hub_url = "https://sci-hub.se/"
  const doi_url = sci_hub_url + doi;
  const doi_finder_url = "http://144.22.35.191:8000/dois/";
  const doi_finder_full_url = doi_finder_url + doi;
  console.log(doi_finder_full_url)
  const download_button = document.createElement("button");
  const download_span = document.createElement("span");
  download_button.setAttribute("class", "Button-module__nc6_8 Button-module__rphhF Button-module__nwgBo Button-module__R359q Button-module__hK_LA Button-module__x5a4w");
  download_span.setAttribute("class", "Typography-module__lVnit Typography-module__Nfgvc Button-module__Imdmt")
  download_button.appendChild(download_span)

  chrome.runtime.sendMessage({ url: doi_finder_full_url }, response => {
    var json = JSON.parse(response);
    if (json.length > 0) {
      download_span.textContent = "Download " + doi;
      download_button.setAttribute("onclick", "window.open('" + doi_url + "')");
      download_button.setAttribute("target", "_blank")
    } else {
      if (response === false) download_span.textContent = "API not Available";
      else download_span.textContent = "Paper not Available :(";

    }
  })
  const menu = document.getElementsByClassName("Stack-module__tT3r4 Stack-module__Y4rmW");
  if (menu.length <= 13) {
    menu[6].insertAdjacentElement("beforeend", download_button);
  } else if (menu.length <= 20) {
    menu[6].insertAdjacentElement("beforeend", download_button);
  } else {
    menu[7].insertAdjacentElement("beforeend", download_button);
  }

}


