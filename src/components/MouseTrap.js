import { useRef } from 'react'
import useTinyEvents from '../hooks/useTinyEvents'

import { MouseThingContext } from '../myContext'

import useMouseThing from '../hooks/useMouseThing'

export function MouseTrap(props) {
    const {
        mouse: { x, y },
        mouseenter,
        activeArea,
        mouseleave,
    } = useMouseThing(MouseThingContext);

    const ref = useRef();
    const { area, additionalProps, render, children, component } = props;

    const renderProp =
        typeof render === "function" ? render : typeof children === "function" ? children : component;

    useTinyEvents({
        mouseenter: mouseenter({ area, additionalProps }),
        mouseleave: mouseleave({ area, additionalProps })
    }, { container: ref && ref.current });

    return renderProp({ x, y, ref, additionalProps, active: activeArea === area })
};

export default MouseTrap