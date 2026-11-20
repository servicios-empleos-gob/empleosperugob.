(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const form = $('search-form');
  const fields = ['document', 'ruc'];
  function resetResults() {
    $('results').hidden = true;
    $('form-message').hidden = true;
    $('search-screen').classList.remove('has-results');
    [...fields, 'document-type'].forEach(id => $(id).removeAttribute('aria-invalid'));
  }
  function error(id, message) {
    $(id).setAttribute('aria-invalid', 'true');
    $('form-message').textContent = message;
    $('form-message').hidden = false;
    $(id).focus();
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    resetResults();
    fields.forEach(id => { $(id).value = $(id).value.trim(); });
    if (!/^\d{8}$/.test($('document').value)) return error('document', 'Ingresa un DNI de 8 d�gitos.');
    if (!/^\d{11}$/.test($('ruc').value)) return error('ruc', 'Ingresa un RUC de 11 d�gitos.');
    if ($('ruc').value !== '20601832390') return error('ruc', 'Usa el RUC de prueba indicado.');
    if ($('document-type').value !== 'DNI') return error('document-type', 'Esta ficha corresponde a un DNI.');
    if ($('document').value !== '25832167') return error('document', 'No se encontraron resultados.');
    $('results').hidden = false;
    $('search-screen').classList.add('has-results');
    $('results-title').focus({preventScroll: true});
  });
  form.addEventListener('input', resetResults);
  form.addEventListener('change', resetResults);
  $('clear').addEventListener('click', () => {
    resetResults();
    fields.forEach(id => { $(id).value = ''; });
    $('document-type').value = 'DNI';
    $('document').focus();
  });
  $('view-profile').addEventListener('click', () => $('profile-dialog').showModal());
})();

