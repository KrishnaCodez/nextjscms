// import ClassName from 'models/classname';
// import styles from './NavListItem.module.scss';
import Link from 'next/link';
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';

const NavListItem = ({ className, item }) => {
  const nestedItems = (item.children || []).map((item) => {
    return <NavListItem key={item.id} item={item} />;
  });
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState('#fff');
  const [linkColor, setLinkColor] = useState('rgb(31, 31, 30)');

  const handleNav = () => {
    setNav(!nav);
  };
  //   nav
  //   ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
  //   : "fixed left-[-100%] top-0 p-10 ease-in duration-600"
  // }
  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
  }, []);
  return (
    <li key={item.id} className="list-none uppercase hover:border-b text-lg font-medium mt-4">
      {!item.path.includes('http') && !item.target && (
        <Link href={item.path}>
          <a title={item.title}>{item.label}</a>
        </Link>
      )}

      {nestedItems.length > 0 && <ul>{nestedItems}</ul>}
    </li>
  );
};

export default NavListItem;
