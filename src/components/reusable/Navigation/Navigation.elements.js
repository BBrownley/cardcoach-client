import styled from "styled-components";

export const Container = styled.div`
  height: 100px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;

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
    @media (max-width: 1300px) {
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

  .clr-primary {
    color: ${props => props.theme.colors.primary};
  }

  .nav-links {
    display: flex;
    align-items: center;
    > * {
      margin-right: 3rem;
      &:last-of-type {
        margin-right: 0;
      }
    }
    .search-container {
      margin-left: 3rem;
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
      @media (max-width: 1060px) {
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

  .hamburger-menu {
    display: none;
    .bars-icon {
      font-size: 2rem;
      color: #333;
      cursor: pointer;
    }
  }

  @media (max-width: 700px) {
    height: 4rem;

    .login-register,
    .nav-links {
      display: none;
    }
    .branding {
      > div {
        border: none;
      }
      .branding-blk-text {
        display: inline;
      }
    }

    .hamburger-menu {
      display: flex;
      align-content: center;
    }
  }
`;
