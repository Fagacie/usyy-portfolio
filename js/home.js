(() => {
  "use strict";

  const scene = document.querySelector("[data-engineering-scene]");
  if (!scene) return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const layers = Array.from(scene.querySelectorAll("[data-scene-layer]"));

  if (!layers.length || motionPreference.matches || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  let rect = null;
  let frame = 0;
  let pendingPoint = null;

  const strengthByLayer = {
    portrait: 3,
    workflow: 7,
    iot: 5
  };

  function resetLayers() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    pendingPoint = null;
    layers.forEach((layer) => {
      layer.style.setProperty("--scene-x", "0px");
      layer.style.setProperty("--scene-y", "0px");
    });
    scene.classList.remove("is-pointer-active");
  }

  function updateLayers() {
    frame = 0;
    if (!rect || !pendingPoint) return;

    const x = ((pendingPoint.x - rect.left) / rect.width) * 2 - 1;
    const y = ((pendingPoint.y - rect.top) / rect.height) * 2 - 1;

    layers.forEach((layer) => {
      const strength = strengthByLayer[layer.dataset.sceneLayer] || 3;
      layer.style.setProperty("--scene-x", String((-x * strength).toFixed(2)) + "px");
      layer.style.setProperty("--scene-y", String((-y * strength).toFixed(2)) + "px");
    });
  }

  scene.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    rect = scene.getBoundingClientRect();
    scene.classList.add("is-pointer-active");
  }, { passive: true });

  scene.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch" || motionPreference.matches) return;
    if (!rect) rect = scene.getBoundingClientRect();
    pendingPoint = { x: event.clientX, y: event.clientY };

    if (!frame) frame = requestAnimationFrame(updateLayers);
  }, { passive: true });

  scene.addEventListener("pointerleave", resetLayers, { passive: true });

  window.addEventListener("resize", () => {
    rect = null;
    resetLayers();
  }, { passive: true });

  if (typeof motionPreference.addEventListener === "function") {
    motionPreference.addEventListener("change", (event) => {
      if (event.matches) resetLayers();
    });
  }
})();
