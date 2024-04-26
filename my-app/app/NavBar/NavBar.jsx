"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <img src="/Images/logo.png" alt="CLOTH logo" className={styles.logo_img} />
        </Link>

        <div className={`${styles.nav_links} ${showMenu ? styles.show_menu : ''}`} id="nav_links">
          <ul >
            <li>
              <Link href="/mens_section" className={styles.nav_link} id="menSec">
                Men
              </Link>
            </li>
            <li>
              <Link href="/women_section" className={styles.nav_link} id="womenSec">
                Women
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.nav_link}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.nav_link}>
                Contact Us
              </Link>
            </li>
          </ul>

          <img
            src="/images/svj/x.svg"
            id="close_button"
            className={`${styles.nav_button} ${styles.close_button}`}
            alt="x"
            onClick={toggleMenu}
          />
        </div>

        <div className={styles.nav_buttons}>
          <Link href="/login" className={styles.nav_button}>
            <img src="/images/svj/user-round.svg" className={styles.nav_button} alt="login" />
          </Link>

          <svg
            className={`${styles.nav_button} ${styles.toggle_button}`}
            id="toggle_button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={toggleMenu}
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;  