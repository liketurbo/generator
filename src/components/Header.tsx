import { h } from 'preact';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => (
  <Navbar className="justify-content-center">
    <Navbar.Brand href="/">
      <img
        alt="logo"
        src="https://img.icons8.com/ios/50/000000/bar-chart.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
      {' Generator'}
    </Navbar.Brand>
  </Navbar>
);

export default Header;
