(function () {
  'use strict';

  var capacitor = window.Capacitor;
  var isNative = Boolean(
    capacitor &&
    capacitor.isNativePlatform &&
    capacitor.isNativePlatform()
  );

  window.MISSING_PUN_NATIVE_APP = isNative;
  window.ESCAPE_NATIVE_APP = isNative;
  if (!isNative) return;

  document.documentElement.classList.add('native-app');

  function call(pluginName, methodName, options) {
    var plugin = capacitor.Plugins && capacitor.Plugins[pluginName];
    if (!plugin || typeof plugin[methodName] !== 'function') return Promise.resolve();
    try {
      return Promise.resolve(plugin[methodName](options || {})).catch(function () {});
    } catch (error) {
      return Promise.resolve();
    }
  }

  function configureNativeShell() {
    call('StatusBar', 'hide');
    call('ScreenOrientation', 'lock', { orientation: 'landscape' });

    var voiceRow = document.querySelector('.lb-voice');
    if (voiceRow) {
      voiceRow.setAttribute('aria-hidden', 'true');
      voiceRow.hidden = true;
    }

    window.setTimeout(function () {
      call('SplashScreen', 'hide', { fadeOutDuration: 250 });
    }, 250);
  }

  document.addEventListener('DOMContentLoaded', configureNativeShell, { once: true });
  document.addEventListener('contextmenu', function (event) {
    if (!event.target.closest('input, select, textarea')) event.preventDefault();
  });
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
})();
