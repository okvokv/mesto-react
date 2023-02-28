import { useState } from 'react';

//Подножие сайта ======================================================
function Footer() {
  //получение значения года
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy;{year}  Mesto Russia</p>
    </footer>
  );
};

export default Footer;