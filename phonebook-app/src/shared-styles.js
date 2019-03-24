import { css } from 'lit-element';

export const SharedStyles = css`
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
  }

  vaadin-button {
    font-size: 1.5rem;
    --lumo-button-size: 3.5rem;
  }
`;

export const SmallScreen = (content) => {
  return `
    @media only screen and (max-width: 60rem) {
      ${content}
    }
  `;
}