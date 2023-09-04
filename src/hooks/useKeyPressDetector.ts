import {useEffect, useState} from 'react';


export const useKeyPressDetector = (keyCodes: number[]) => {
    const [pressedKeyCodes, setPressedKeyCodes] = useState<number[]>([]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (keyCodes.includes(event.keyCode)) {
            setPressedKeyCodes((prev)=> [...prev, event.keyCode]);
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (keyCodes.includes(event.keyCode)) {
            setPressedKeyCodes((prev)=> prev.filter((keyCode) => keyCode !== event.keyCode));
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

    return {
        pressedKeyCodes,
    };
};

