import React, { createContext, useState, useRef } from "react";
import useTinyEvents from './hooks/useTinyEvents'

export const MouseThingContext = createContext({ x: 0, y: 0 });
export const { Provider, Consumer } = MouseThingContext;

export default function MouseThing({ children, renderPointer }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [activeArea, setActiveArea] = useState(null)
  const [additionalProps, setAdditionalProps] = useState(null);
  const activeContainer = useRef(false);

  function handleMouseMove(e) {
    setMouse({
      x: e.clientX,
      y: e.clientY + window.scrollY
    })
  }

  useTinyEvents({
    mousemove: handleMouseMove
  });

  const setActiveContainer = el => {
    activeContainer.current = el
  }

  return (
    <Provider
      value={{
        mouse,
        activeArea,
        activeContainer: activeContainer.current,
        additionalProps,
        setActiveContainer,
        setActiveArea,
        setAdditionalProps,
      }}
    >
      <PureWrapper>{children}</PureWrapper>
    </Provider>
  );
}

class PureWrapper extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return this.props.children;
  }
}