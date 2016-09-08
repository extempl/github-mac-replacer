(function () {

  var base = document.getElementById('base')
  var template = document.getElementById('template')

// Saves options to chrome.storage
function save_options(e) {
  e.preventDefault()
  var baseVal = base.value;
  var templateVal = template.value;
  chrome.storage.sync.set({
    base: baseVal,
    template: templateVal
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.sync.get({
    base: '',
    template: ''
  }, function (items) {
    base.value = items.base;
    template.value = items.template;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('form').addEventListener('submit', save_options);

})()
