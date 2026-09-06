/**
 * components/app/app.js calls google.load() and MathJax.Hub.Config() at load
 * time. Both globals came from third-party CDNs (google.com/jsapi,
 * cdn.mathjax.org) that the exhibit must not depend on, so they are no-ops
 * here. Nothing on the landing page uses either: no charts, no formulas.
 */
window.google = window.google || { load: function () {}, setOnLoadCallback: function () {} };
window.MathJax = window.MathJax || {
  Hub: { Config: function () {}, Queue: function () {}, Typeset: function () {} }
};
