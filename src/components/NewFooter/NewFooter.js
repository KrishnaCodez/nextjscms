import Link from 'next/link';
import React from 'react';
import styles from './NewFooter.module.scss';
import { BiEnvelope } from 'react-icons/bi';
import { BsArrowRightShort } from 'react-icons/bs';
import { TiSocialFacebook } from 'react-icons/ti';
import { TiSocialTwitter } from 'react-icons/ti';
import { TiSocialLinkedin } from 'react-icons/ti';
import Image from 'next/image';

const NewFooter = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.colume}>
            <Link href="/">
              <a>
                <Image height={55} width={240} src="/assests/black-logo.png" className={styles.sitelogo} alt="" />
              </a>
            </Link>
            <p>
              You don't have to scroll through a thousand tech websites, we'll give you the knowledge you need directly
              at your fingertips.
            </p>
          </div>
          <div className={styles.colume}>
            <h3>
              Office
              <div className={styles.animation}>
                <span></span>
              </div>
            </h3>
            <p>India</p>
            <p>Gujarat - </p>
            <p>ahmedabad, PIN 382150, US</p>
            <p className={styles.email}>info.urvish@gmail.com</p>
            {/* <h4 className={styles.callNumber}></h4> */}
          </div>
          <div className={styles.colume}>
            <h3>
              Link
              <div className={styles.animation}>
                <span></span>
              </div>
            </h3>
            <ul className={styles.ul}>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.colume}>
            <h3>
              Newsletter
              <div className={styles.animation}>
                <span></span>
              </div>
            </h3>
            <form action="" className={styles.flexmail}>
              <BiEnvelope className={styles.envelope} />
              <div>
                <input type="" placeholder="Enter your email id" required className={styles.input} />
              </div>
              <button type="submit" className={styles.submit}>
                <BsArrowRightShort className={styles.arrow} />
              </button>
            </form>
            <div className={styles.social}>
              <TiSocialFacebook className={styles.socialIcons} />
              <TiSocialTwitter className={styles.socialIcons} />
              <TiSocialLinkedin className={styles.socialIcons} />
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <p className={styles.copy}>Epic Tech © 2023 - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default NewFooter;
