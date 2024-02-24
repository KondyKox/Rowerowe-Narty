export default class InputManager {
  constructor() {
    // Keys to play
    this.keys = {
      // Movement
      w: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },

      // Shoot
      ArrowUp: {
        pressed: false,
      },
      ArrowDown: {
        pressed: false,
      },
      ArrowLeft: {
        pressed: false,
      },
      ArrowRight: {
        pressed: false,
      },
    };
  }
}
