import React from "react";
import { render } from "react-dom";
import { Spring } from "react-spring/renderprops";

import { Motion, spring } from "react-motion";
import styled from "styled-components";

import "./style.css";

import MouseThing from "./myContext";
import PointerHelper from './components/PointerHelper'
import Hello from "./Hello";

import useMouseThing from './hooks/useMouseThing'

function Pointer(props) {
  const { mouse, activeContainer, activeArea, mousedown, additionalProps } = useMouseThing()
  const { x, y } = mouse

  const box = activeContainer && activeContainer.getBoundingClientRect();
  const trapped = activeArea === "anchor" || activeArea === "big";

  return (
    <React.Fragment>
      <Spring
        from={{ x: 0, y: 0, scale: 1 }}
        to={{
          x: trapped ? box.x + box.width / 2 : x,
          y: trapped ? box.y + box.height / 2 + window.scrollY : y,
          width: trapped ? Math.max(box.width, box.height) * 1.3 : 3,
          height: trapped ? Math.max(box.width, box.height) * 1.3 : 3
        }}
      >
        {({ x, y, width, height, scale }) => (
          <PointerHelper center={[x, y]}>
            <RedBall
              style={{
                transform: `scale(${scale})`,
                width,
                height
              }}
            />
          </PointerHelper>
        )}
      </Spring>

      <Motion
        defaultStyle={{ scale: 1 }}
        style={{
          scale: spring(activeArea === "image" ? 1 : 0.15)
        }}
      >
        {({ scale }) => (
          <PointerHelper center={[x, y]}>
            <BlackBall
              style={{
                transform: `scale(${scale})`,
                backgroundColor: mousedown && "#ec5858",
                color: mousedown && "white"
              }}
              active={activeArea === "image"}
            >
              <span>{additionalProps && additionalProps.text}</span>
            </BlackBall>
          </PointerHelper>
        )}
      </Motion>
    </React.Fragment>
  );
}

const App = () => (
  <MouseThing>
    <Pointer />
    <Hello name="CodeSandbox" />
  </MouseThing>
);

const RedBall = styled.div`
  border-radius: 50%;
  border: 2px solid #ec5858;
`;

const BlackBall = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;

  color: #121212;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;

  background-color: white;

  span {
    text-transform: uppercase;
    font-weight: bold;
    transform-origin: center;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.3s 0.2s ease, opacity 0.3s 0.2s ease;
  }

  ${props =>
    props.active &&
    `
    span {
      opacity: 1;
      transform: translateY(0%);
      transition-delay: 0;
    }
  `}
`;

render(<App />, document.getElementById("root"));
