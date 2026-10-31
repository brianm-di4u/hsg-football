// The kit designs and their compiler now live in the game (src/js/kits.js); the showroom and compat checks use them
// from there. data.js (imported by kits.js) must be loaded after globalThis.SCHOOLS is set.
export { FIXED, FINISH, KITS, resolve, designFor, checkLook } from '../../src/js/kits.js';
