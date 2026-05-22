let tabs = [];
let activeTab = 0;

const frame = document.getElementById("browserFrame");
const tabsEl = document.getElementById("tabs");
const urlBar = document.getElementById("urlBar");

function normalize(url) {
  if (!url.startsWith("http")) {
    return "https://www.google.com/search?q=" + encodeURIComponent(url);
  }
  return url;
}

function renderTabs() {
  tabsEl.innerHTML = "";

  tabs.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "tab" + (i === activeTab ? " active" : "");
    div.innerText = t.title || "New Tab";

    div.onclick = () => switchTab(i);
    tabsEl.appendChild(div);
  });

  Storage.save(tabs, activeTab);
}

function switchTab(i) {
  activeTab = i;
  frame.src = tabs[i].url;
  urlBar.value = tabs[i].url;
  renderTabs();
}

function newTab() {
  const tab = {
    url: "https://www.google.com",
    title: "New Tab",
    history: []
  };

  tabs.push(tab);
  activeTab = tabs.length - 1;
  switchTab(activeTab);
}

function navigate() {
  const url = normalize(urlBar.value);

  tabs[activeTab].url = url;
  tabs[activeTab].history.push(url);

  frame.src = url;
  renderTabs();
}

function refreshTab() {
  frame.src = frame.src;
}

function goBack() {
  const t = tabs[activeTab];
  if (t.history.length > 1) {
    t.history.pop();
    const prev = t.history[t.history.length - 1];
    frame.src = prev;
    urlBar.value = prev;
  }
}

function goForward() {
  // simple demo (not full history stack system)
  frame.contentWindow.location.reload();
}

frame.onload = () => {
  try {
    urlBar.value = frame.contentWindow.location.href;
  } catch (e) {}
};

window.addEventListener("load", () => {
  const saved = Storage.load();

  tabs = saved.tabs.length ? saved.tabs : [{
    url: "https://www.google.com",
    title: "New Tab",
    history: ["https://www.google.com"]
  }];

  activeTab = saved.activeTab || 0;
  switchTab(activeTab);
});
