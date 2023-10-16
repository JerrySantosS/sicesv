import React from 'react';

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <span>SICESV &copy; 2023</span>
        <p>Sistema de Controle de Entrada e Saída de Veículos </p>
      </div>
    </footer>
  );
}

export default Footer;
