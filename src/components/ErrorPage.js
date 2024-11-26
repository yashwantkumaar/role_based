import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <Container>
      <Content>
        <Heading>Oops, something went wrong</Heading>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Josefin Sans", sans-serif;
  color: white;
`;

const Content = styled.div`
  max-width: 800px;
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h1`
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: bold;
  color: rgb(77, 9, 9);
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.5;
`;

export default ErrorPage;
