import React from 'react';

function Footer({ loggedIn }) {

  const currentYear = new Date().getFullYear();

  return (
    <footer className= {loggedIn ? 'footer' : 'footer_invisible'}>
      <p className='footer__copyright'>&copy; {currentYear} Mesto Russia</p>
      <p className="footer__text">Developed by <a className="footer__link" href="https://github.com/genevy/react-mesto-auth#readme">Evgeny Stiganov</a></p>
    </footer>
  );
}

export default Footer;
