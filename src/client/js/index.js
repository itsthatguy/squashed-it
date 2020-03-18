
/* ---------------------------------------------------------------
  LiveReloading!
    ok - hear me out...

    By doing this, we can push updated javascript to the client,
    without needed a browser refresh!
--------------------------------------------------------------- */
import(`./app.js?v=${new Date().getTime()}`)
.then((module) => {
  window.app = new module.default();
});
