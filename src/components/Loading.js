import styled from "styled-components";

import loading from "../assets/loading.svg";

const Loading = styled.div`
  background-image: url(${loading});
  z-index: -1;
  position: fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

export default Loading;
