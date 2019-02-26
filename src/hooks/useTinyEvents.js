import { useEffect } from 'react'

export default function useTinyEvents(
    eventsMap,
    options = {
        container: window
    }
) {
    const { container } = options;

    function handleEvent(e) {
        return eventsMap[e.type](e);
    }

    useEffect(
        () => {
            Object.keys(eventsMap).forEach(eventName => {
                container && container.addEventListener(eventName, handleEvent);
            });

            return () => {
                Object.keys(eventsMap).forEach(eventName => {
                    container && container.removeEventListener(eventName, handleEvent);
                });
            };
        },
        [container]
    );
}