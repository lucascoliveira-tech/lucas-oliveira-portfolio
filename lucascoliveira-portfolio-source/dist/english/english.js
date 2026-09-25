(() => {
  const fallback = {
    overallPracticeAccuracy: 90.6,
    metrics: [
      ["Modal verbs",93],["Be able to",93],["Modal + be able to",92],
      ["Likely / unlikely to",90],["Likely/unlikely + be able to",91],
      ["Autonomous modal choice",89],["Articles (a / the)",87],
      ["Prepositions",88],["Vocabulary & naturalness",90],["Sentence structure",93]
    ].map(([label,value]) => ({label,value}))
  };

  const render = data => {
    document.querySelectorAll("[data-overall]").forEach(el => {
      el.textContent = Number(data.overallPracticeAccuracy).toFixed(1) + "%";
    });
    const grid = document.getElementById("metricsGrid");
    if (!grid) return;
    grid.innerHTML = data.metrics.map(item => `
      <article class="metric-card">
        <div><span>${item.label}</span><strong>${item.value}%</strong></div>
        <div class="progress-track"><i style="width:${item.value}%"></i></div>
      </article>`
    ).join("");
  };

  fetch("/english/progress.json", {cache:"no-store"})
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(render)
    .catch(() => render(fallback));
})();