import React from 'react';

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <span>SICESV </span> - Sistema de Controle de Entrada e Saída de
        Veículos &copy; 2023
      </p>
    </footer>
  );
}

export default Footer;
