document.addEventListener('DOMContentLoaded', function () {
  initReveal();
  initGalerias();
  initFormasProducto();
  initComparadores();
});

function initComparadores() {
  document.querySelectorAll('[data-mt-comparador]').forEach(function (contenedor) {
    var antes = contenedor.querySelector('[data-mt-comparador-antes]');
    var linea = contenedor.querySelector('[data-mt-comparador-linea]');
    if (!antes || !linea) return;

    var arrastrando = false;

    function mover(porcentajeX) {
      var pct = Math.min(100, Math.max(0, porcentajeX));
      antes.style.width = pct + '%';
      linea.style.left = pct + '%';
    }

    function porcentajeDesdeEvento(evento) {
      var rect = contenedor.getBoundingClientRect();
      var clientX = evento.touches ? evento.touches[0].clientX : evento.clientX;
      return ((clientX - rect.left) / rect.width) * 100;
    }

    contenedor.addEventListener('pointerdown', function (e) {
      arrastrando = true;
      mover(porcentajeDesdeEvento(e));
    });
    window.addEventListener('pointermove', function (e) {
      if (!arrastrando) return;
      mover(porcentajeDesdeEvento(e));
    });
    window.addEventListener('pointerup', function () { arrastrando = false; });
  });
}

function initReveal() {
  var elementos = document.querySelectorAll('.mt-reveal');
  if (!elementos.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elementos.forEach(function (el) { el.classList.add('mt-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('mt-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  elementos.forEach(function (el) { observer.observe(el); });
}

function initGalerias() {
  document.querySelectorAll('[data-mt-producto]').forEach(function (seccion) {
    var principal = seccion.querySelector('[data-mt-galeria-principal]');
    var minis = seccion.querySelectorAll('[data-mt-galeria-mini]');
    if (!principal || !minis.length) return;

    if (!principal.getAttribute('src') || principal.getAttribute('src') === '') {
      var primero = minis[0].getAttribute('data-full');
      if (primero) principal.setAttribute('src', primero);
    }

    minis.forEach(function (mini) {
      mini.addEventListener('click', function () {
        var url = mini.getAttribute('data-full');
        if (!url) return;
        principal.setAttribute('src', url);
        minis.forEach(function (m) { m.classList.remove('mt-activo'); });
        mini.classList.add('mt-activo');
      });
    });
  });
}

function initFormasProducto() {
  document.querySelectorAll('[data-mt-producto]').forEach(function (seccion) {
    var form = seccion.querySelector('[data-mt-form]');
    if (!form) return;

    var inputCantidad = seccion.querySelector('[data-mt-cantidad]');
    var btnMenos = seccion.querySelector('[data-mt-cantidad-menos]');
    var btnMas = seccion.querySelector('[data-mt-cantidad-mas]');
    if (inputCantidad && btnMenos && btnMas) {
      btnMenos.addEventListener('click', function () {
        var v = Math.max(1, (parseInt(inputCantidad.value, 10) || 1) - 1);
        inputCantidad.value = v;
      });
      btnMas.addEventListener('click', function () {
        var v = (parseInt(inputCantidad.value, 10) || 1) + 1;
        inputCantidad.value = v;
      });
    }

    var variantesScript = seccion.querySelector('[data-mt-variantes]');
    if (!variantesScript) return;

    var variantes;
    try { variantes = JSON.parse(variantesScript.textContent); } catch (e) { return; }

    var inputId = seccion.querySelector('[data-mt-variante-id]');
    var precioActual = seccion.querySelector('[data-mt-precio-actual]');
    var precioAnterior = seccion.querySelector('[data-mt-precio-anterior]');
    var btnComprar = seccion.querySelector('[data-mt-btn-comprar]');
    var btnTexto = seccion.querySelector('[data-mt-btn-texto]');
    var botonesOpciones = seccion.querySelectorAll('[data-mt-opcion-valor]');

    var seleccion = {};
    botonesOpciones.forEach(function (btn) {
      if (btn.classList.contains('mt-activo')) {
        seleccion[btn.getAttribute('data-opcion-posicion')] = btn.getAttribute('data-valor');
      }
    });

    function formatearDinero(centavos) {
      return (centavos / 100).toLocaleString(document.documentElement.lang || 'es', {
        style: 'currency',
        currency: (window.Shopify && Shopify.currency && Shopify.currency.active) || 'USD'
      });
    }

    function encontrarVariante() {
      return variantes.find(function (v) {
        return ['1', '2', '3'].every(function (pos) {
          if (!seleccion[pos]) return true;
          return v['option' + pos] === seleccion[pos];
        });
      });
    }

    function actualizar() {
      var variante = encontrarVariante();
      if (!variante) return;

      inputId.value = variante.id;

      if (precioActual) precioActual.textContent = formatearDinero(variante.price);
      if (precioAnterior) {
        if (variante.compare_at_price && variante.compare_at_price > variante.price) {
          precioAnterior.textContent = formatearDinero(variante.compare_at_price);
          precioAnterior.style.display = '';
        } else {
          precioAnterior.style.display = 'none';
        }
      }

      if (btnComprar) {
        btnComprar.disabled = !variante.available;
      }
      if (btnTexto) {
        btnTexto.textContent = variante.available
          ? btnTexto.getAttribute('data-texto-disponible') || btnTexto.textContent
          : btnTexto.getAttribute('data-texto-agotado') || 'Agotado';
      }
    }

    botonesOpciones.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var posicion = btn.getAttribute('data-opcion-posicion');
        seleccion[posicion] = btn.getAttribute('data-valor');

        seccion.querySelectorAll('[data-mt-opcion-valor][data-opcion-posicion="' + posicion + '"]').forEach(function (b) {
          b.classList.remove('mt-activo');
        });
        btn.classList.add('mt-activo');

        actualizar();
      });
    });
  });
}
