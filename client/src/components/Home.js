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
        src="/assets/design/work-from-anywhere-home.mp4"
      />

      <Content>
        <div style={{ width: "65%" }}>
          <HomeTitle>Welcome to Remotr</HomeTitle>
          <>
            <SubParagraphs>
              Remote work is a working style that allows professionals to work
              outside of a traditional office environment. It is based on the
              concept that work does not need to be done in a specific place to
              be executed successfully.
            </SubParagraphs>
            <SubParagraphs>
              Instead of commuting to an office each day to work from a
              designated desk or cubicle, remote employees can execute their
              projects wherever they please, whether at the cottage, on a beach
              in Mexico, in a café in Paris, etc.
            </SubParagraphs>
            <SubParagraphs>
              In a world where mandatory office attendance is no longer
              justifiable for many workers, Remotr aims to change the game for
              candidates and employers by promoting remote jobs around the
              world.
            </SubParagraphs>
          </>
        </div>
        <SloganContainer>
          <Slogan>
            "The Future <br />
            of Work Is <br />
            Location
            <br />
            Independent"
          </Slogan>
        </SloganContainer>
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
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: auto;
  z-index: -1;
`;

const Content = styled.div`
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #f1f1f1;
  width: 100%;
  height: 42%;
  padding: 30px 40px;
  z-index: 4;
  display: flex;
`;

const HomeTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 45px;
  color: #7de6e7;
  line-height: 1.3;

  @media only screen and (max-width: 1800px) {
    font-size: 30px;
  }
`;

const SloganContainer = styled.div`
  width: 35%;
  text-align: center;
  position: relative;
`;

const Slogan = styled.p`
  font-size: 45px;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  color: #7de6e7;
  font-weight: 600;
  width: 100%;
  font-family: "Permanent Marker", cursive;
  font-weight: lighter;

  @media only screen and (max-width: 1800px) {
    font-size: 40px;
  }
`;

const SubParagraphs = styled.p`
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 500;

  @media only screen and (max-width: 1800px) {
    margin-top: 17px;
    margin-bottom: 17px;
    font-size: 15.5px;
    font-weight: 500;
  }
`;
export default Home;
