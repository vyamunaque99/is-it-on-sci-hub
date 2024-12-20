const url = window.location.href;

const doi_finder_url = "http://144.22.35.191:8000/dois/";

if (url.includes("scopus")) {
  if (document.readyState !== "loading") {
    const myTimeout = setTimeout(add_scopus_button, 600);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      const myTimeout = setTimeout(add_scopus_button, 600);
    });
  }
}

if (url.includes("ieeexplore")) {
  add_ieeexplore_button();
}

if (url.includes("webofscience")) {
  if (document.readyState !== "loading") {
    const myTimeout = setTimeout(add_webofscience_button, 2000);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      const myTimeout = setTimeout(add_webofscience_button, 2000);
    });
  }
}

if (url.includes("pubmed")) {
  add_pubmed_button();
}

function add_webofscience_button() {
  console.log("WebOfScience");
  try {
    const doi = document.getElementById("FullRTa-DOI").innerText;
    console.log(doi);
    const sci_hub_url = "https://sci-hub.se/";
    const doi_url = sci_hub_url + doi;
    const doi_finder_full_url = doi_finder_url + doi;
    const download_button = document.createElement("a");
    const download_span_1 = document.createElement("span");
    const download_span_2 = document.createElement("span");
    const download_span_3 = document.createElement("span");
    const download_span_4 = document.createElement("span");
    download_button.setAttribute(
      "class",
      "mat-focus-indicator mat-tooltip-trigger flex-align-center-center margin-right-10--reversible full-text-publisher-style full-record-breadcrumbs-styles disableContext mat-stroked-button mat-button-base mat-primary mobile-link-button ng-star-inserted"
    );
    download_button.setAttribute("color", "primary");
    download_button.setAttribute("target", "_blank");
    download_button.setAttribute("cdxanalyticsaction", "click");
    download_button.setAttribute("aria-disabled", "false");
    //Span 1
    download_span_1.setAttribute("class", "mat-button-wrapper");
    //Span 2
    download_span_2.setAttribute(
      "class",
      "mat-tooltip-trigger ng-star-inserted"
    );
    download_span_2.setAttribute(
      "aria-describedby",
      "cdk-describedby-message-ypo-1-520"
    );
    download_span_2.setAttribute("cdk-describedby-host", "ypo-1");
    //Span 3
    download_span_3.setAttribute("class", "mat-ripple mat-button-ripple");
    //Span 4
    download_span_4.setAttribute("class", "mat-button-focus-overlay");

    download_button.appendChild(download_span_1);
    download_span_1.appendChild(download_span_2);
    download_button.appendChild(download_span_3);
    download_button.appendChild(download_span_4);
    chrome.runtime.sendMessage({ url: doi_finder_full_url }, (response) => {
      var json = JSON.parse(response);
      if (json.length > 0) {
        download_button.textContent = "Download " + doi;
        download_button.setAttribute(
          "onclick",
          "window.open('" + doi_url + "')"
        );
        download_button.setAttribute("target", "_blank");
      } else {
        if (response === false)
          download_button.textContent = "API not Available";
        else download_button.textContent = "Paper not Available :(";
      }
    });
    const menu = document.getElementsByClassName(
      "flex-align-center-center ng-star-inserted"
    )[0];
    menu.insertAdjacentElement("beforeend", download_button);
  } catch (error) {
    console.log(error);
  }
}

function add_pubmed_button() {
  console.log("PubMed");
  try {
    const doi = document.getElementsByClassName("identifier doi")[0].getElementsByClassName("id-link")[0].innerText;
    const sci_hub_url = "https://sci-hub.se/";
    const doi_url = sci_hub_url + doi;
    const doi_finder_full_url = doi_finder_url + doi;
    const download_button = document.createElement("button");
    download_button.setAttribute("type", "button");
    download_button.setAttribute(
      "class",
      "save-results save-results-panel-trigger"
    );
    chrome.runtime.sendMessage({ url: doi_finder_full_url }, (response) => {
      var json = JSON.parse(response);
      if (json.length > 0) {
        download_button.textContent = "Download " + doi;
        download_button.setAttribute(
          "onclick",
          "window.open('" + doi_url + "')"
        );
        download_button.setAttribute("target", "_blank");
      } else {
        if (response === false)
          download_button.textContent = "API not Available";
        else download_button.textContent = "Paper not Available :(";
      }
    });
    const menu = document.getElementsByClassName("multiple-results-actions")[0];
    menu.insertAdjacentElement("beforeend", download_button);
  } catch (error) {
    console.log(error);
  }
}

function add_ieeexplore_button() {
  console.log("IEEXplore");
  try {
    const doi = document
      .getElementsByClassName("u-pb-1 stats-document-abstract-doi")[0]
      .innerText.substring(5);
    const sci_hub_url = "https://sci-hub.se/";
    const doi_url = sci_hub_url + doi;
    const doi_finder_full_url = doi_finder_url + doi;
    const download_button = document.createElement("button");
    const download_div_1 = document.createElement("div");
    const download_xpl = document.createElement("xpl-cite-this-modal");
    const download_div_2 = document.createElement("div");
    download_button.setAttribute("class", "xpl-btn-secondary");
    download_div_2.setAttribute("style", "margin-left: 17px;");
    download_div_1.appendChild(download_button);
    download_xpl.appendChild(download_div_1);
    download_div_2.appendChild(download_xpl);
    chrome.runtime.sendMessage({ url: doi_finder_full_url }, (response) => {
      var json = JSON.parse(response);
      if (json.length > 0) {
        download_button.textContent = "Download " + doi;
        download_button.setAttribute(
          "onclick",
          "window.open('" + doi_url + "')"
        );
        download_button.setAttribute("target", "_blank");
      } else {
        if (response === false)
          download_button.textContent = "API not Available";
        else download_button.textContent = "Paper not Available :(";
      }
    });
    const menu = document.getElementsByClassName(
      "u-mb-1 u-mt-05 btn-container"
    )[0];
    menu.insertAdjacentElement("beforeend", download_div_2);
  } catch (error) {
    console.log(error);
  }
}

function add_scopus_button() {
  try {
    const description = document.getElementsByTagName("dd");
    const doi = description[3].innerText;
    const sci_hub_url = "https://sci-hub.se/";
    const doi_url = sci_hub_url + doi;
    const doi_finder_full_url = doi_finder_url + doi;
    const download_button = document.createElement("button");
    const download_span = document.createElement("span");
    download_button.setAttribute(
      "class",
      "Button-module__nc6_8 Button-module__rphhF Button-module__nwgBo Button-module__R359q Button-module__hK_LA Button-module__x5a4w"
    );
    download_span.setAttribute(
      "class",
      "Typography-module__lVnit Typography-module__Nfgvc Button-module__Imdmt"
    );
    download_button.appendChild(download_span);

    chrome.runtime.sendMessage({ url: doi_finder_full_url }, (response) => {
      var json = JSON.parse(response);
      if (json.length > 0) {
        download_span.textContent = "Download " + doi;
        download_button.setAttribute(
          "onclick",
          "window.open('" + doi_url + "')"
        );
        download_button.setAttribute("target", "_blank");
      } else {
        if (response === false) download_span.textContent = "API not Available";
        else download_span.textContent = "Paper not Available :(";
      }
    });
    const menu = document.getElementsByClassName(
      "Stack-module__tT3r4 Stack-module__Y4rmW"
    );
    if (menu.length <= 13) {
      menu[7].insertAdjacentElement("beforeend", download_button);
    } else if (menu.length <= 20) {
      menu[7].insertAdjacentElement("beforeend", download_button);
    } else {
      menu[8].insertAdjacentElement("beforeend", download_button);
    }
  } catch (error) {
    console.log.error;
  }
}
