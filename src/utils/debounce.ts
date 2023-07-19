export function debounce <T = unknown>(func: (args: T) => void, delay: number): (args: T) => void {
    let timer: NodeJS.Timeout;
    return (args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
        func(args);
        }, delay);
    };
}
