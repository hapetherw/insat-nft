import React from 'react';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <ClipLoader color="navy" loading={true} css={override} size={80} />
    </div>
  )
}

export default Loading;