import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type HeaderProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Header = (props: HeaderProps): JSX.Element => {
  console.log(props);
  return (
  <div className="header_section">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* <a className="logo" href="/">
          <img src="images/logo.png" />
        </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/design">
                Our Design
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop">
                Shop
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact Us
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <div className="search_icon">
              <ul>
                <li>
                  <a href="#">
                    <img src="images/search-icon.png" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="images/user-icon.png" />
                  </a>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
);
      }

export default withDatasourceCheck()<HeaderProps>(Header);
