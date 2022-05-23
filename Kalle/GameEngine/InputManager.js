class InputManager {
    construction(keyMap, inputListener) {
        this.keyMap = keyMap;
        this.inputListener = inputListeners;
        window.addEventListener("keydown", keydown, false);
        window.addEventListener("keyup", keyup, false);
    }
    keyMap;
    inputListener;

    keydown(event) {
        var key = keyMap[event.keyCode];
        if (typeof this.inputListener[key] !== 'undefined') {
            inputListener.pressedKeys[key] = true;
        }
    }

    keyup(event) {
        var key = keyMap[event.keyCode];
        if (typeof this.inputListener[key] !== 'undefined') {
            inputListener.pressedKeys[key] = false;
        }
    }
}

/* KeyMap
 * 68: 'right', (d)
 * 65: 'left', (a)
 * 87: 'up', (w)
 * 83: 'down' (s)
 */
    
