import { useContext, useState } from 'react'
import useTinyEvents from './useTinyEvents'

import { MouseThingContext } from '../myContext'

const useMouseThing = () => {
    const [key, setKey] = useState()
    const {
        mouse,
        setActiveContainer,
        setActiveArea,
        setAdditionalProps,
        activeContainer,
        additionalProps,
        activeArea,
    } = useContext(MouseThingContext);

    function handleMouseMove(e) {
        setKey(new Date().getTime())
    }

    function handleMouseEnter({ area, additionalProps }, e) {
        setActiveArea(area);
        setActiveContainer(e.target);
        setAdditionalProps(additionalProps);

        setKey(new Date().getTime())
    }

    function handleMouseLeave({ area, additionalProps }) {
        setActiveArea(undefined);
        setActiveContainer(false);
        setAdditionalProps(undefined);

        setKey(new Date().getTime())
    }

    useTinyEvents({
        mousemove: handleMouseMove,
    });

    return {
        key,
        mouse,
        setActiveContainer,
        setActiveArea,
        setAdditionalProps,
        activeContainer,
        additionalProps,
        activeArea,
        mouseenter: area => e => handleMouseEnter(area, e),
        mouseleave: area => e => handleMouseLeave(area, e),
    }

}

export default useMouseThing