import React from "react";

import styled from "styled-components";

import imgUrl from "./img.jpeg";
import imgUrl2 from "./img2.jpeg";

import MouseTrap from "./components/MouseTrap";

import { animated, useSpring, interpolate } from 'react-spring'
import { clamp } from 'lodash-es'

function Magnet({ x, y, active, children }) {
  const raffe = React.useRef()

  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))

  React.useEffect(() => {
    const box = raffe.current.getBoundingClientRect()

    const newX = box ? x - box.x - (box.width / 2) : 0
    const newY = box ? y - box.y - (box.height / 2) : 0

    set({
      xy: active ?
        [clamp(newX, -80, 80), clamp(newY, -80, 80)] : [0, 0],
      config: { mass: 1, tension: 300, friction: 14 }
    })

  }, [x, y, active])

  return (
    <MagnetContainer ref={raffe} active={active}>
      <MagnetInner style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }}>
        {children}
      </MagnetInner>
    </MagnetContainer>
  )

}

const MagnetContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MagnetInner = styled(animated.div)`
  pointer-events: none;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: white;
`

function Hello(props) {
  return (
    <Container>
      <Wrapper>
        <div>
          <Row>
            <MouseTrap area="anchor" hold render={({ ref }) => <Trap ref={ref}>Hold!</Trap>} />
            <MouseTrap area="anchor" component={({ ref }) => <Trap ref={ref}>Trap!</Trap>} />
            <MouseTrap area="anchor">
              {({ ref }) => (
                <Trap ref={ref}>
                  Trap
                </Trap>
              )}
            </MouseTrap>
          </Row>

          <Row>
            <MouseTrap area="magnet">
              {({ ref, x, y, active }) => (
                <div ref={ref}>
                  <Magnet x={x} y={y} ref={ref} active={active}>
                  </Magnet>
                </div>
              )}
            </MouseTrap>

          </Row>

          <Row>
            <MouseTrap area="image" additionalProps={{ text: "Zoom" }}>
              {({ ref }) => <Img ref={ref} src={imgUrl} />}
            </MouseTrap>
          </Row>

          <Row>
            <MouseTrap area="image" additionalProps={{ text: "Buy" }}>
              {({ ref }) => <Img ref={ref} src={imgUrl2} />}
            </MouseTrap>
          </Row>
        </div>
      </Wrapper>
    </Container>
  );
}


const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 4rem;
  margin-top: 4rem;
`;

const Img = styled.img`
  width: 600px;
  height: auto;
  margin: 0 auto;
`;

const Trap = styled.div`
  height: 32px;

  padding: 0 2rem;

  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 1rem;

  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;

  background-color: #121212;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Hello;
