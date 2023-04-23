import styled from "styled-components";

export const Container = styled.div`
  height: 100px;
  /* box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25); */
  /* padding: 0.75rem; */
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  /* box-shadow below nav */
  &::after {
    content: " ";
    height: 100px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
  }

  > * {
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
  }

  .branding {
    font-weight: bold;
    font-size: 2.5rem;
    > div {
      color: black;
    }
    /* condense branding into smaller icon */
    @media (max-width: 1150px) {
      > div {
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(
          to bottom right,
          ${props => props.theme.colors.primary},
          ${props => props.theme.colors.primarydarkened}
        );
        opacity: 0.75;
      }
      .branding-blk-text {
        display: none;
      }
    }
  }

  .nav-search {
    display: flex;
    align-items: center;
    > * {
      margin-right: 3rem;
      &:last-of-type {
        margin-right: 0;
      }
    }
    .search-container {
      position: relative;
      .search-icon {
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translateY(-50%);
        color: #777;
        font-size: 1.5rem;
      }
      input {
        padding-left: 2.75rem;
      }
      /* replace search input with search icon, used to open a search menu */
      @media (max-width: 940px) {
        .search-icon {
          border: 3px solid #777;
          border-radius: 10rem;
          padding: 0.5rem;
          /* put icon back in document flow */
          position: relative;
          transform: none;
          &:hover {
            cursor: pointer;
          }
        }
        input {
          display: none;
        }
      }
    }
  }

  .login-register {
    display: flex;
    align-content: center;
  }

  .btn-secondary {
    margin-right: 1.5rem;
  }

  .hamburger-menu-icon {
    display: none;
    .bars-icon {
      font-size: 2rem;
      color: #333;
      cursor: pointer;
    }
  }

  /* removes login/register btns, places them in hamburger menu */
  @media (max-width: 550px) {
    height: 4rem;

    /* box-shadow below nav */
    &::after {
      content: " ";
      height: 4rem;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);

      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: -1;
    }

    .login-register {
      display: none;
    }

    .nav-search {
      position: absolute;
      right: 6rem;
      top: 0.6875rem;
    }

    .branding {
      > div {
        border: none;
      }
      .branding-blk-text {
        display: inline;
      }
    }

    .hamburger-menu-icon {
      display: flex;
      align-content: center;
      z-index: 1001;
      .bars-container {
        > * {
          height: 0.25rem;
          width: 2rem;
          background-color: black;
          margin: 0.4125rem 0;
        }

        &:hover {
          cursor: pointer;
        }

        > div.bars-container__bar:nth-child(1) {
          margin-top: 0;
        }

        > div.bars-container__bar:nth-child(3) {
          margin-bottom: 0;
        }

        @keyframes rotateTopBar {
          from {
            transform: rotateZ(0deg) translateX(0) translateY(0);
            background-color: #000000;
          }
          100% {
            transform: rotateZ(45deg) translateX(0.5rem) translateY(0.5rem);
            background-color: #ffffff;
          }
        }

        @keyframes fadeOutBar {
          from {
            opacity: 1;
            background-color: #000000;
          }
          to {
            opacity: 0;
            background-color: #ffffff;
          }
        }

        @keyframes rotateBottomBar {
          from {
            transform: rotateZ(0deg) translateX(0) translateY(0);
            background-color: #000000;
          }
          100% {
            transform: rotateZ(-45deg) translateX(0.5rem) translateY(-0.5rem);
            background-color: #ffffff;
          }
        }

        @keyframes rotateTopBarReverse {
          from {
            transform: rotateZ(45deg) translateX(0.5rem) translateY(0.5rem);
            background-color: #ffffff;
          }
          to {
            transform: rotateZ(0deg) translateX(0) translateY(0);
            background-color: #000000;
          }
        }

        @keyframes fadeInBar {
          from {
            opacity: 0;
            background-color: #ffffff;
          }
          to {
            opacity: 1;
            background-color: #000000;
          }
        }

        @keyframes rotateBottomBarReverse {
          from {
            transform: rotateZ(-45deg) translateX(0.5rem) translateY(-0.5rem);
            background-color: #ffffff;
          }
          to {
            transform: rotateZ(0deg) translateX(0) translateY(0);
            background-color: #000000;
          }
        }

        &[class*="animate"] {
          > * {
            animation-duration: 0.25s;
          }
        }

        &[class*="menu-opened"] {
          > * {
            animation-fill-mode: forwards;
          }

          > div.bars-container__bar:nth-child(1) {
            animation-name: rotateTopBar;
          }

          > div.bars-container__bar:nth-child(2) {
            animation-name: fadeOutBar;
          }

          > div.bars-container__bar:nth-child(3) {
            animation-name: rotateBottomBar;
          }
        }

        &[class*="menu-closed"] {
          > * {
            animation-fill-mode: forwards;
          }
          > div.bars-container__bar:nth-child(1) {
            animation-name: rotateTopBarReverse;
          }

          > div.bars-container__bar:nth-child(2) {
            animation-name: fadeInBar;
          }

          > div.bars-container__bar:nth-child(3) {
            animation-name: rotateBottomBarReverse;
          }
        }
      }
    }
  }

  @keyframes open-search-dropdown {
    from {
      opacity: 0;
      top: -50px;
    }
    to {
      opacity: 1;
      top: 0px;
    }
  }

  .search-dropdown {
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    top: 0;
    left: 0;
    right: 0;

    height: 6.25rem;
    z-index: 2000;

    animation: open-search-dropdown 0.5s;

    @media (max-width: 550px) {
      height: 4rem;
    }
  }

  @keyframes open-mobile-menu {
    from {
      opacity: 0;
      left: 200px;
    }
    to {
      opacity: 1;
      left: 0px;
    }
  }

  .mobile-hamburger-menu {
    position: absolute;
    background-color: ${props => props.theme.colors.primary};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;

    display: flex;
    flex-direction: column;
    justify-content: space-around;

    animation: open-mobile-menu;
    animation-duration: 0.5s;

    &__link {
      color: white;
      font-size: 3rem;
      font-weight: 300;
      letter-spacing: 2px;
      &:visited {
        color: white;
      }
    }

    &__close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 2rem;
      color: white;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
