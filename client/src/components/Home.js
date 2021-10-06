import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <Video
        autoPlay
        playsInline
        loop
        muted
        width={"100%"}
        poster="/assets/design/work-on-beach-poster.png"
        src="/assets/design/work-on-beach.mp4"
      />

      <Content>
        <h1>Home</h1>
        <p>Home</p>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
  display: flex;
  z-index: 2;
`;

const Video = styled.video`
  z-index: -1;
  object-fit: fill;
  top: 0;
  left: 0;
  /* display: block; */
  width: 100%;
  height: 100%;
  position: fixed;

  overflow: hidden;
  width: 100%;
  height: auto;
  z-index: -1;
  /* object-fit: cover; */
`;

const Content = styled.div`
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  height: 40%;
  padding: 20px;
  z-index: 4;
`;

export default Home;
