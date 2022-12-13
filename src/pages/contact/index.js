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
      <h1>hekk</h1>
    </>
  );
};

export default Contact;
