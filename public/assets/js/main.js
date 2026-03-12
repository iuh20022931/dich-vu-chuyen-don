(function (window, document) {
  if (window.__fastGoMainBootstrapLoaded) return;
  window.__fastGoMainBootstrapLoaded = true;

  // Luôn sử dụng đường dẫn tuyệt đối gốc để tải các module
  const scriptBase = "/public/assets/js/";
  const modulePaths = [
    "main-core.js",
    "shared-modals.js",
    "modules/main-navigation.js",
    "modules/main-order.js",
    "modules/main-landing.js",
    "data/news-data.js",
    "modules/main-news.js",
  ];

  const current = document.currentScript;
  const versionSuffix =
    current && current.src && current.src.includes("?")
      ? "?" + current.src.split("?")[1]
      : "";

  function hasModule(modulePath) {
    return !!document.querySelector(
      `script[data-fastgo-module="${modulePath}"]`,
    );
  }

  function loadModuleAt(index) {
    if (index >= modulePaths.length) return;

    const modulePath = modulePaths[index];
    if (hasModule(modulePath)) {
      loadModuleAt(index + 1);
      return;
    }

    const script = document.createElement("script");
    script.src = `${scriptBase}${modulePath}${versionSuffix}`;
    script.async = false;
    script.defer = false;
    script.dataset.fastgoModule = modulePath;
    script.onload = function () {
      loadModuleAt(index + 1);
    };
    script.onerror = function () {
      console.error("Cannot load JS module:", modulePath);
      loadModuleAt(index + 1);
    };
    document.head.appendChild(script);
  }

  loadModuleAt(0);
})(window, document);
