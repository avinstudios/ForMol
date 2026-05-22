const Storage = {
  save(tabs, activeTab) {
    localStorage.setItem("formol_tabs", JSON.stringify({
      tabs,
      activeTab
    }));
  },

  load() {
    return JSON.parse(localStorage.getItem("formol_tabs") || '{"tabs":[],"activeTab":0}');
  }
};
