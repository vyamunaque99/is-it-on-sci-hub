const url = window.location.href;
const _0x2853a3 = _0x3082;
function _0x2918() {
  const _0x4b07d8 = [
    "51jLGJUA",
    "801205YZyVyu",
    "21384dovXSt",
    "84PdIbPd",
    "2272UUzcNp",
    "http://144",
    "6192620YaOMIh",
    "161715hqaitl",
    "3588298IrlSPo",
    "1214274MvhERU",
    "11889nEZqIJ",
    ":8000/dois",
    ".22.35.191",
  ];
  _0x2918 = function () {
    return _0x4b07d8;
  };
  return _0x2918();
}
function _0x3082(_0x103205, _0x58418c) {
  const _0x474022 = _0x2918();
  return (
    (_0x3082 = function (_0x29d0ca, _0x564ef2) {
      _0x29d0ca = _0x29d0ca - (0x1607 + -0x10df * 0x1 + 0xa3 * -0x7);
      let _0x26ed53 = _0x474022[_0x29d0ca];
      return _0x26ed53;
    }),
    _0x3082(_0x103205, _0x58418c)
  );
}
(function (_0x51551f, _0x3ab0f6) {
  const _0x22a0fc = _0x3082,
    _0x4f6bda = _0x51551f();
  while (!![]) {
    try {
      const _0x225841 =
        parseInt(_0x22a0fc(0xb6)) / (-0x107e + -0x2431 + 0x34b0) +
        (parseInt(_0x22a0fc(0xb7)) / (-0x905 + -0x1e86 + 0x7e9 * 0x5)) *
          (-parseInt(_0x22a0fc(0xb5)) /
            (-0x1683 + -0xb72 * 0x2 + -0x2 * -0x16b5)) +
        (parseInt(_0x22a0fc(0xb8)) / (0x24b0 + -0x248f + -0x1d * 0x1)) *
          (-parseInt(_0x22a0fc(0xbc)) / (0xee * 0xd + 0x2358 + -0x35 * 0xe5)) +
        -parseInt(_0x22a0fc(0xbe)) / (0x147c + -0x935 * 0x1 + 0x1 * -0xb41) +
        parseInt(_0x22a0fc(0xbd)) / (0x1453 + 0x2159 + -0x1bb * 0x1f) +
        (-parseInt(_0x22a0fc(0xb9)) / (-0x22dd + -0xda7 * -0x1 + 0x2 * 0xa9f)) *
          (parseInt(_0x22a0fc(0xbf)) / (-0x247b + -0xaa0 + 0x2f24)) +
        parseInt(_0x22a0fc(0xbb)) / (0x104d + -0x3 * 0xb77 + 0x911 * 0x2);
      if (_0x225841 === _0x3ab0f6) break;
      else _0x4f6bda["push"](_0x4f6bda["shift"]());
    } catch (_0x5ebf97) {
      _0x4f6bda["push"](_0x4f6bda["shift"]());
    }
  }
})(_0x2918, -0x592c8 + 0x9eb9 * 0x1 + 0xc7ffa);
const doi_finder_url =
  _0x2853a3(0xba) + _0x2853a3(0xb4) + _0x2853a3(0xb3) + "/";

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

function add_ieeexplore_button() {
  console.log("IEEXplore");
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
      download_button.setAttribute("onclick", "window.open('" + doi_url + "')");
      download_button.setAttribute("target", "_blank");
    } else {
      if (response === false) download_button.textContent = "API not Available";
      else download_button.textContent = "Paper not Available :(";
    }
  });
  const menu = document.getElementsByClassName(
    "u-mb-1 u-mt-05 btn-container"
  )[0];
  menu.insertAdjacentElement("beforeend", download_div_2);
}

function add_scopus_button() {
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
      download_button.setAttribute("onclick", "window.open('" + doi_url + "')");
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
    menu[6].insertAdjacentElement("beforeend", download_button);
  } else if (menu.length <= 20) {
    menu[6].insertAdjacentElement("beforeend", download_button);
  } else {
    menu[7].insertAdjacentElement("beforeend", download_button);
  }
}
