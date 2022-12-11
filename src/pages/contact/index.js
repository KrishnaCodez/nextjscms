import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from 'styles/pages/Contact.module.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import Head from 'next/head';
import Nav from 'components/Nav';

const Result = () => {
  return <p>Your message has been recorded</p>;
};
const Contact = () => {
  const [result, showResult] = useState(false);
  const [verified, setVerified] = useState(true);
  const [recaptchaNeeded, setRecaptchaNeeded] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    window.grecaptcha.reset();

    emailjs.sendForm('service_tpvua5b', 'template_2bp8pcp', form.current, 'aOTbOevVSkpD7v4XO').then(
      (result) => {
        console.log(result.text);
        e.target.reset();
      },
      (error) => {
        console.log(error.text);
      }
    );
    e.target.reset();
    showResult(true);
  };
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <Nav />
      <h1 className={styles.hidden}>H</h1>
      <div className={styles.HeadContainer}>
        <div className={styles.jm}>
          <div className={styles.blurBombsContainer}>
            <div className={styles.blurBombs}>
              <div className={styles.blurtriangle}>
                <img src="../../assests/job-blob-triangle.svg" alt="" className="blur1" />
              </div>
            </div>
          </div>
          <div className={styles.Introwrapper}>
            <div className={styles.head}>
              <div className={styles.itemContainer}>
                <div className={styles.container}>
                  <h1 className={styles.has1}>
                    <span>Contact </span>
                  </h1>
                  <div className={styles.infoContainer}>
                    <p className={styles.introInfo}>
                      <span>
                        We are located at India in Gujarat and are happy to meet physically or digitally. Fill in the
                        form below or call us on 08-410 99 141.
                      </span>
                    </p>
                  </div>
                </div>

                <div className={styles.blurSemiCircle}>
                  <img src="../../assests/job-circle.svg" alt="" className="blur2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formboldmainwrapper}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h1 className={styles.contact}>Contact us</h1>
            <p className={styles.contactInfo}>
              Do you want to discuss an idea, develop your technical platform or have thoughts on how to begin your
              digital journey? Do not hesitate to get in touch.
            </p>

            <img src="../../assests/map.webp" alt="" className={styles.mapimg} />
          </div>

          <div className={styles.right}>
            <div className={styles.formboldformwrapper}>
              <form ref={form} onSubmit={sendEmail} className={styles.contact}>
                <div className={styles.formboldmb5}>
                  <label htmlFor="name" className={styles.formboldformlabel}>
                    Full Name
                  </label>
                  <input
                    className={styles.formboldforminput}
                    type="text"
                    name="firstName"
                    onChange={() => setRecaptchaNeeded(true)}
                    placeholder="Full Name"
                    required={true}
                  />
                </div>

                <div className={styles.formboldmb5}>
                  <label htmlFor="email" className={styles.formboldformlabel}>
                    Email Address
                  </label>
                  <input
                    placeholder="Enter your email"
                    className={styles.formboldforminput}
                    onChange={() => setRecaptchaNeeded(true)}
                    type="text"
                    name="email"
                    required={true}
                  />
                </div>

                <div className={styles.formboldmb5}>
                  <label htmlFor="subject" className={styles.formboldformlabel}>
                    Subject
                  </label>
                  <input
                    placeholder="Enter your subject"
                    className={styles.formboldforminput}
                    onChange={() => setRecaptchaNeeded(true)}
                    type="text"
                    name="lastName"
                    required={true}
                  />
                </div>

                <div className={styles.formboldmb5}>
                  <label htmlFor="message" className={styles.formboldformlabel}>
                    Message
                  </label>
                  <textarea
                    placeholder="Type your message"
                    className={styles.formboldforminput}
                    onChange={() => setRecaptchaNeeded(true)}
                    name="message"
                    required={true}
                  ></textarea>
                </div>
                <div className={styles.recapcha}>
                  {recaptchaNeeded && (
                    <ReCAPTCHA sitekey="6LceQ8ciAAAAAIHIzvYztvlUe3Dsr_lwd4XLrztG" onChange={() => setVerified(false)} />
                  )}
                </div>

                <button type="submit" value="Send" disabled={verified} className={styles.formboldbtn}>
                  Send
                </button>
                <div className={styles.row}>{result ? <Result /> : null}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
