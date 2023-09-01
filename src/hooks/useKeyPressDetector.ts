import { useState, useEffect } from 'react';

type KeyMap = {
    [keyCode: number]: boolean;
};

export const useKeyPressDetector = (keyCodes: number[]): KeyMap => {
    const [pressedKeys, setPressedKeys] = useState<KeyMap>({});

    const handleKeyDown = (event: KeyboardEvent) => {
        if (keyCodes.includes(event.keyCode)) {
            setPressedKeys((prevKeys) => ({ ...prevKeys, [event.keyCode]: true }));
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (keyCodes.includes(event.keyCode)) {
            setPressedKeys((prevKeys) => ({ ...prevKeys, [event.keyCode]: false }));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return pressedKeys;
};

