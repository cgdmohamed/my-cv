(function () {
  var cv = window.CV || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  // Highlight [TODO] placeholders so they're impossible to miss
  var txt = function (s) {
    return esc(s).replace(/\[TODO\]/g, '<mark class="todo">TODO</mark>');
  };
  var hide = function (el) { if (el) el.hidden = true; };
  var has = function (a) { return Array.isArray(a) && a.length > 0; };

  $("name").innerHTML = txt(cv.name);
  $("title").innerHTML = txt(cv.title);
  $("location").innerHTML = txt(cv.location);
  $("summary").innerHTML = txt(cv.summary);
  $("footName").textContent = cv.name || "";
  $("year").textContent = new Date().getFullYear();
  if (cv.nickname) $("brand").textContent = cv.nickname;
  if (cv.available) $("available").innerHTML = txt(cv.available); else hide($("available"));
  if (cv.photo) { $("photo").src = cv.photo; $("photo").alt = cv.name || ""; } else hide($("photo"));

  if (has(cv.stats)) {
    $("stats").innerHTML = cv.stats.map(function (s) {
      return '<div class="stat"><strong>' + txt(s.value) + "</strong><span>" + txt(s.label) + "</span></div>";
    }).join("");
  } else hide($("stats"));

  if (has(cv.experience)) {
    $("experienceList").innerHTML = cv.experience.map(function (e) {
      return '<li class="job"><div class="job-head"><div><h3>' + txt(e.role) + '</h3><p class="org">' + txt(e.org) +
        (e.place ? ' · <span class="muted">' + txt(e.place) + "</span>" : "") + '</p></div><p class="period">' + txt(e.period) +
        "</p></div>" + (has(e.points) ? "<ul>" + e.points.map(function (p) { return "<li>" + txt(p) + "</li>"; }).join("") + "</ul>" : "") + "</li>";
    }).join("");
  } else hide($("experience"));

  if (has(cv.skills)) {
    $("skillList").innerHTML = cv.skills.map(function (g) {
      return '<div class="skill"><h3>' + txt(g.group) + '</h3><ul class="chips">' +
        g.items.map(function (i) { return "<li>" + txt(i) + "</li>"; }).join("") + "</ul></div>";
    }).join("");
  } else hide($("skills"));

  if (has(cv.projects)) {
    $("projectList").innerHTML = cv.projects.map(function (p) {
      var head = '<span class="tag">' + txt(p.tag) + "</span><h3>" + txt(p.name) + "</h3><p>" + txt(p.desc) + "</p>";
      return p.link
        ? '<a class="card" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + head + '<span class="more">Visit ↗</span></a>'
        : '<div class="card">' + head + "</div>";
    }).join("");
  } else hide($("projects"));

  if (has(cv.education)) {
    $("educationList").innerHTML = cv.education.map(function (e) {
      return "<li><strong>" + txt(e.title) + "</strong><span>" + txt(e.org) + " · " + txt(e.period) + "</span></li>";
    }).join("");
  } else hide($("educationBlock"));

  if (has(cv.languages)) {
    $("languageList").innerHTML = cv.languages.map(function (l) {
      return "<li><strong>" + txt(l.name) + "</strong><span>" + txt(l.level) + "</span></li>";
    }).join("");
  } else hide($("languagesBlock"));

  if (has(cv.contact)) {
    $("contactList").innerHTML = cv.contact.map(function (c) {
      var ext = /^https?:/.test(c.href || "");
      return '<li><span class="muted">' + txt(c.label) + '</span><a href="' + esc(c.href || "#") + '"' +
        (ext ? ' target="_blank" rel="noopener"' : "") + ">" + txt(c.value) + "</a></li>";
    }).join("");
    var mail = cv.contact.filter(function (c) { return /^mailto:/.test(c.href || ""); })[0];
    if (mail) $("ctaPrimary").href = mail.href;
  } else hide($("contact"));

  // Theme toggle (remembered per browser)
  $("themeBtn").addEventListener("click", function () {
    var root = document.documentElement;
    var dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  $("printBtn").addEventListener("click", function () { window.print(); });
})();
