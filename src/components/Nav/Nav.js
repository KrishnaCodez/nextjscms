import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import useSearch, { SEARCH_STATE_LOADED } from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

import Section from 'components/Section';

import styles from './Nav.module.scss';
import NavListItem from 'components/NavListItem';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai';

const Nav = () => {
  const formRef = useRef();

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

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);

  const { metadata = {}, menus } = useSite();
  const { title } = metadata;

  const navigationLocation = process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || MENU_LOCATION_NAVIGATION_DEFAULT;
  const navigation = findMenuByLocation(menus, navigationLocation);

  const { query, results, search, clearSearch, state } = useSearch({
    maxResults: 5,
  });

  const searchIsLoaded = state === SEARCH_STATE_LOADED;

  // When the search visibility changes, we want to add an event listener that allows us to
  // detect when someone clicks outside of the search box, allowing us to close the results
  // when focus is drawn away from search

  useEffect(() => {
    // If we don't have a query, don't need to bother adding an event listener
    // but run the cleanup in case the previous state instance exists

    if (searchVisibility === SEARCH_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    // When the search box opens up, additionall find the search input and focus
    // on the element so someone can start typing right away

    const searchInput = Array.from(formRef.current.elements).find((input) => input.type === 'search');

    searchInput.focus();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVisibility]);

  /**
   * addDocumentOnClick
   */

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * removeDocumentOnClick
   */

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * handleOnDocumentClick
   */

  function handleOnDocumentClick(e) {
    if (!e.composedPath().includes(formRef.current)) {
      setSearchVisibility(SEARCH_HIDDEN);
      clearSearch();
    }
  }

  /**
   * handleOnSearch
   */

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  /**
   * handleOnToggleSearch
   */

  function handleOnToggleSearch() {
    setSearchVisibility(SEARCH_VISIBLE);
  }

  /**
   * addResultsRoving
   */

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  /**
   * removeResultsRoving
   */

  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  /**
   * handleResultsRoving
   */

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
        focusElement.nextSibling.children[0].firstChild.firstChild.focus();
      } else if (focusElement.parentElement.nextSibling) {
        focusElement.parentElement.nextSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
        focusElement.parentElement.previousSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  }

  /**
   * escFunction
   */

  // pressing esc while search is focused will close it

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
      setSearchVisibility(SEARCH_HIDDEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        shadow ? 'fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-00 bg-gray-50 ' : 'fixed w-full h-20 z-[100]'
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 ">
        <Link href="/">
          <a>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="3264.000000pt"
              height="637.000000pt"
              viewBox="0 0 3264.000000 637.000000"
              preserveAspectRatio="xMidYMid meet"
              className={styles.logo}
            >
              <g transform="translate(0.000000,637.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path
                  d="M6275 5714 c-387 -40 -660 -118 -970 -278 -424 -218 -767 -541 -1013
-952 -464 -778 -471 -1773 -16 -2552 421 -721 1147 -1180 1984 -1253 700 -62
1450 213 1956 716 400 398 644 879 731 1445 25 162 25 548 0 710 -84 546 -330
1041 -702 1416 -201 203 -391 342 -640 470 -362 186 -698 271 -1105 279 -102
1 -203 1 -225 -1z m1232 -1223 l96 -184 -14 -36 c-8 -20 -48 -100 -89 -179
l-75 -142 -596 0 c-534 0 -598 -2 -610 -16 -7 -9 -63 -107 -124 -217 l-112
-202 408 -5 c224 -3 409 -7 412 -10 2 -3 46 -85 97 -184 l93 -179 -21 -41
c-12 -22 -55 -104 -96 -181 l-74 -140 -617 -5 -618 -5 -113 -205 c-62 -113
-117 -206 -121 -207 -4 -2 -27 34 -51 80 -23 45 -119 228 -212 406 l-169 324
29 51 c16 28 128 233 250 456 122 223 297 541 388 708 l166 302 839 -2 839 -3
95 -184z m286 -2198 c-21 -38 -112 -203 -204 -368 l-166 -300 -859 0 -859 0
-143 273 -143 273 53 95 53 94 1153 0 1153 0 -38 -67z"
                />
                <path
                  d="M10560 4207 c-66 -44 -80 -78 -80 -190 0 -82 4 -106 21 -136 27 -47
58 -70 113 -80 60 -11 112 8 157 58 l37 41 562 0 c626 0 604 -2 658 68 23 30
27 45 27 98 0 68 -15 98 -69 138 -27 21 -38 21 -710 24 l-682 2 -34 -23z"
                />
                <path
                  d="M16795 4224 c-464 -64 -800 -388 -865 -833 -19 -127 -8 -444 19 -551
26 -101 94 -249 155 -334 53 -75 171 -187 249 -239 242 -161 570 -204 843
-111 173 58 375 197 410 281 45 107 -21 220 -133 230 -55 6 -112 -17 -148 -57
-37 -43 -168 -120 -239 -143 -105 -33 -291 -32 -395 2 -155 51 -298 175 -371
324 -58 118 -73 211 -68 417 4 149 8 173 33 250 75 219 261 381 490 426 188
37 370 -14 537 -151 60 -48 89 -65 121 -70 96 -14 177 50 185 148 6 70 -11
100 -93 174 -112 100 -253 173 -413 213 -74 19 -255 33 -317 24z"
                />
                <path
                  d="M21044 4216 c-17 -8 -44 -31 -60 -52 -28 -36 -29 -41 -29 -150 0 -98
3 -116 21 -140 73 -98 196 -103 270 -10 l29 36 563 0 c616 0 604 -1 655 59 68
81 47 199 -43 250 -37 21 -46 21 -706 21 -541 -1 -675 -3 -700 -14z"
                />
                <path
                  d="M24045 4224 c-16 -2 -64 -12 -105 -20 -359 -77 -640 -349 -738 -713
-23 -89 -25 -112 -26 -311 0 -137 4 -237 13 -275 82 -391 351 -675 726 -770
142 -36 318 -36 460 0 200 50 435 196 486 302 26 53 22 121 -8 162 -29 38 -92
71 -138 71 -47 0 -82 -18 -162 -83 -209 -171 -503 -195 -732 -60 -126 75 -237
213 -283 353 -18 55 -22 95 -26 254 -5 257 15 349 108 486 77 114 188 195 335
246 155 54 360 32 510 -55 28 -16 73 -50 102 -75 88 -79 148 -93 223 -53 30
16 51 37 67 67 46 87 26 151 -74 237 -123 105 -259 175 -418 214 -78 19 -260
32 -320 23z"
                />
                <path
                  d="M12805 4181 c-81 -38 -105 -84 -105 -205 0 -107 25 -160 90 -193 77
-40 154 -24 206 41 l29 36 327 0 c306 0 331 -1 382 -21 73 -27 148 -96 183
-167 25 -50 28 -68 28 -152 0 -81 -4 -103 -25 -145 -31 -64 -101 -134 -165
-165 l-50 -25 -440 -5 c-392 -4 -443 -7 -472 -22 -117 -64 -117 -232 0 -296
28 -15 74 -17 401 -20 203 -2 412 1 465 6 175 18 312 81 426 196 79 80 136
170 167 266 29 91 36 270 14 365 -55 234 -227 416 -471 496 -68 23 -81 23
-510 26 -414 3 -442 2 -480 -16z"
                />
                <path
                  d="M19124 4185 c-391 -7 -722 -16 -735 -20 -41 -13 -79 -45 -99 -85 -19
-36 -20 -60 -20 -319 0 -173 4 -290 11 -308 16 -43 69 -92 111 -104 25 -6 145
-7 343 -3 l305 7 0 -558 c0 -537 1 -560 20 -599 57 -118 221 -122 292 -8 l23
37 0 665 c0 634 -1 667 -19 703 -11 22 -37 51 -59 65 l-41 27 -325 0 -326 0 0
75 0 75 385 7 c212 5 570 11 795 15 384 8 412 9 444 28 110 65 114 210 7 289
-25 19 -42 21 -214 22 -103 1 -507 -4 -898 -11z"
                />
                <path
                  d="M15011 4158 c-19 -12 -44 -36 -55 -51 -21 -28 -21 -33 -24 -954 l-2
-926 25 -42 c60 -103 220 -103 280 0 l25 42 -2 926 c-3 917 -3 926 -24 953
-36 49 -70 67 -131 72 -48 3 -64 0 -92 -20z"
                />
                <path
                  d="M25610 4158 c-19 -13 -45 -39 -57 -57 l-23 -34 0 -477 0 -477 23 -33
c12 -18 35 -43 50 -54 28 -21 37 -21 693 -24 l664 -2 0 -386 c0 -371 1 -388
21 -423 47 -85 156 -112 236 -59 78 51 73 -15 73 1016 l0 919 -23 34 c-12 18
-38 44 -57 57 -68 46 -190 14 -232 -61 -10 -16 -14 -120 -18 -392 l-5 -370
-545 0 -545 0 -5 365 c-6 403 -6 404 -72 451 -48 35 -132 38 -178 7z"
                />
                <path
                  d="M11048 3450 c-325 -55 -568 -341 -568 -670 0 -106 23 -200 72 -299
34 -69 59 -103 128 -171 100 -99 170 -144 283 -179 l82 -25 445 0 c495 -1 481
-3 534 67 31 40 41 83 32 132 -7 37 -53 97 -90 118 -15 9 -144 13 -466 17
-437 5 -446 5 -491 28 -74 36 -125 87 -161 160 -30 60 -33 75 -33 157 0 83 2
95 34 153 41 75 94 125 170 161 l56 26 440 5 c403 5 443 7 468 23 54 35 86
114 72 177 -10 45 -69 107 -113 120 -44 12 -823 12 -894 0z"
                />
                <path
                  d="M21540 3453 c-161 -27 -274 -86 -390 -202 -93 -93 -142 -177 -176
-301 -24 -87 -24 -251 0 -340 57 -210 225 -391 432 -466 102 -38 224 -46 635
-42 l376 3 36 25 c101 70 101 218 0 281 l-38 24 -440 5 -440 5 -55 26 c-70 33
-136 99 -169 169 -34 74 -36 201 -4 272 30 66 69 114 120 149 91 63 87 63 565
69 423 5 437 6 465 26 54 40 75 83 71 145 -5 68 -35 114 -92 140 -38 17 -71
18 -456 17 -228 0 -426 -3 -440 -5z"
                />
                <path
                  d="M25610 2748 c-19 -13 -45 -39 -57 -57 -22 -33 -23 -42 -23 -248 0
-233 5 -262 58 -303 64 -51 149 -50 209 3 59 51 63 73 63 297 0 225 -7 255
-72 301 -48 35 -132 38 -178 7z"
                />
                <path
                  d="M12780 2578 c-69 -47 -75 -64 -78 -226 -3 -138 -2 -150 20 -191 28
-52 91 -91 147 -91 47 0 109 36 138 79 21 32 23 44 23 185 0 138 -2 154 -23
190 -12 21 -38 47 -57 57 -50 27 -128 25 -170 -3z"
                />
              </g>
            </svg>
          </a>
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex mr-20 mt-4 ">
            {navigation?.map((listItem) => {
              return (
                <div className="pl-10 font-medium uppercase" key={listItem.id}>
                  <NavListItem item={listItem} />
                </div>
              );
            })}
          </ul>
          {/* Hamburger Icon */}
          <div style={{ color: `${linkColor}` }} onClick={handleNav} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div className={nav ? 'md:hidden fixed right-0 top-0 w-full h-full bg-black/70 ' : ''}>
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? ' fixed right-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-full bg-[#ecf0f3] p-10 ease-in duration-500'
              : 'fixed right-[-100%] top-0 p-10 ease-in duration-600'
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <a>
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="2381.000000pt"
                    height="534.000000pt"
                    viewBox="0 0 2381.000000 534.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className={styles.mobilelogo}
                  >
                    <g
                      transform="translate(0.000000,534.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path
                        d="M2575 5224 c-387 -40 -660 -118 -970 -278 -424 -218 -767 -541 -1013
                        -952 -464 -778 -471 -1773 -16 -2552 421 -721 1147 -1180 1984 -1253 700 -62
                        1450 213 1956 716 400 398 644 879 731 1445 25 162 25 548 0 710 -84 546 -330
                        1041 -702 1416 -201 203 -391 342 -640 470 -362 186 -698 271 -1105 279 -102
                        1 -203 1 -225 -1z m1232 -1223 l96 -184 -14 -36 c-8 -20 -48 -100 -89 -179
                        l-75 -142 -596 0 c-534 0 -598 -2 -610 -16 -7 -9 -63 -107 -124 -217 l-112
                        -202 408 -5 c224 -3 409 -7 412 -10 2 -3 46 -85 97 -184 l93 -179 -21 -41
                        c-12 -22 -55 -104 -96 -181 l-74 -140 -617 -5 -618 -5 -113 -205 c-62 -113
                        -117 -206 -121 -207 -4 -2 -27 34 -51 80 -23 45 -119 228 -212 406 l-169 324
                        29 51 c16 28 128 233 250 456 122 223 297 541 388 708 l166 302 839 -2 839 -3
                        95 -184z m286 -2198 c-21 -38 -112 -203 -204 -368 l-166 -300 -859 0 -859 0
                        -143 273 -143 273 53 95 53 94 1153 0 1153 0 -38 -67z"
                      />
                      <path
                        d="M6860 3717 c-66 -44 -80 -78 -80 -190 0 -82 4 -106 21 -136 27 -47
                        58 -70 113 -80 60 -11 112 8 157 58 l37 41 562 0 c626 0 604 -2 658 68 23 30
                        27 45 27 98 0 68 -15 98 -69 138 -27 21 -38 21 -710 24 l-682 2 -34 -23z"
                      />
                      <path
                        d="M13095 3734 c-464 -64 -800 -388 -865 -833 -19 -127 -8 -444 19 -551
                        26 -101 94 -249 155 -334 53 -75 171 -187 249 -239 242 -161 570 -204 843
                        -111 173 58 375 197 410 281 45 107 -21 220 -133 230 -55 6 -112 -17 -148 -57
                        -37 -43 -168 -120 -239 -143 -105 -33 -291 -32 -395 2 -155 51 -298 175 -371
                        324 -58 118 -73 211 -68 417 4 149 8 173 33 250 75 219 261 381 490 426 188
                        37 370 -14 537 -151 60 -48 89 -65 121 -70 96 -14 177 50 185 148 6 70 -11
                        100 -93 174 -112 100 -253 173 -413 213 -74 19 -255 33 -317 24z"
                      />
                      <path
                        d="M17344 3726 c-17 -8 -44 -31 -60 -52 -28 -36 -29 -41 -29 -150 0 -98
                        3 -116 21 -140 73 -98 196 -103 270 -10 l29 36 563 0 c616 0 604 -1 655 59 68
                        81 47 199 -43 250 -37 21 -46 21 -706 21 -541 -1 -675 -3 -700 -14z"
                      />
                      <path
                        d="M20345 3734 c-16 -2 -64 -12 -105 -20 -359 -77 -640 -349 -738 -713
                        -23 -89 -25 -112 -26 -311 0 -137 4 -237 13 -275 82 -391 351 -675 726 -770
                        142 -36 318 -36 460 0 200 50 435 196 486 302 26 53 22 121 -8 162 -29 38 -92
                        71 -138 71 -47 0 -82 -18 -162 -83 -209 -171 -503 -195 -732 -60 -126 75 -237
                        213 -283 353 -18 55 -22 95 -26 254 -5 257 15 349 108 486 77 114 188 195 335
                        246 155 54 360 32 510 -55 28 -16 73 -50 102 -75 88 -79 148 -93 223 -53 30
                        16 51 37 67 67 46 87 26 151 -74 237 -123 105 -259 175 -418 214 -78 19 -260
                        32 -320 23z"
                      />
                      <path
                        d="M9105 3691 c-81 -38 -105 -84 -105 -205 0 -107 25 -160 90 -193 77
                      -40 154 -24 206 41 l29 36 327 0 c306 0 331 -1 382 -21 73 -27 148 -96 183
                      -167 25 -50 28 -68 28 -152 0 -81 -4 -103 -25 -145 -31 -64 -101 -134 -165
                      -165 l-50 -25 -440 -5 c-392 -4 -443 -7 -472 -22 -117 -64 -117 -232 0 -296
                      28 -15 74 -17 401 -20 203 -2 412 1 465 6 175 18 312 81 426 196 79 80 136
                      170 167 266 29 91 36 270 14 365 -55 234 -227 416 -471 496 -68 23 -81 23
                      -510 26 -414 3 -442 2 -480 -16z"
                      />
                      <path
                        d="M15424 3695 c-391 -7 -722 -16 -735 -20 -41 -13 -79 -45 -99 -85 -19
                        -36 -20 -60 -20 -319 0 -173 4 -290 11 -308 16 -43 69 -92 111 -104 25 -6 145
                        -7 343 -3 l305 7 0 -558 c0 -537 1 -560 20 -599 57 -118 221 -122 292 -8 l23
                        37 0 665 c0 634 -1 667 -19 703 -11 22 -37 51 -59 65 l-41 27 -325 0 -326 0 0
                        75 0 75 385 7 c212 5 570 11 795 15 384 8 412 9 444 28 110 65 114 210 7 289
                        -25 19 -42 21 -214 22 -103 1 -507 -4 -898 -11z"
                      />
                      <path
                        d="M11311 3668 c-19 -12 -44 -36 -55 -51 -21 -28 -21 -33 -24 -954 l-2
                        -926 25 -42 c60 -103 220 -103 280 0 l25 42 -2 926 c-3 917 -3 926 -24 953
                        -36 49 -70 67 -131 72 -48 3 -64 0 -92 -20z"
                      />
                      <path
                        d="M21910 3668 c-19 -13 -45 -39 -57 -57 l-23 -34 0 -477 0 -477 23 -33
                        c12 -18 35 -43 50 -54 28 -21 37 -21 693 -24 l664 -2 0 -386 c0 -371 1 -388
                        21 -423 47 -85 156 -112 236 -59 78 51 73 -15 73 1016 l0 919 -23 34 c-12 18
                        -38 44 -57 57 -68 46 -190 14 -232 -61 -10 -16 -14 -120 -18 -392 l-5 -370
                        -545 0 -545 0 -5 365 c-6 403 -6 404 -72 451 -48 35 -132 38 -178 7z"
                      />
                      <path
                        d="M7348 2960 c-325 -55 -568 -341 -568 -670 0 -106 23 -200 72 -299 34
                        -69 59 -103 128 -171 100 -99 170 -144 283 -179 l82 -25 445 0 c495 -1 481 -3
                        534 67 31 40 41 83 32 132 -7 37 -53 97 -90 118 -15 9 -144 13 -466 17 -437 5
                        -446 5 -491 28 -74 36 -125 87 -161 160 -30 60 -33 75 -33 157 0 83 2 95 34
                        153 41 75 94 125 170 161 l56 26 440 5 c403 5 443 7 468 23 54 35 86 114 72
                        177 -10 45 -69 107 -113 120 -44 12 -823 12 -894 0z"
                      />
                      <path
                        d="M17840 2963 c-161 -27 -274 -86 -390 -202 -93 -93 -142 -177 -176
                      -301 -24 -87 -24 -251 0 -340 57 -210 225 -391 432 -466 102 -38 224 -46 635
                      -42 l376 3 36 25 c101 70 101 218 0 281 l-38 24 -440 5 -440 5 -55 26 c-70 33
                      -136 99 -169 169 -34 74 -36 201 -4 272 30 66 69 114 120 149 91 63 87 63 565
                      69 423 5 437 6 465 26 54 40 75 83 71 145 -5 68 -35 114 -92 140 -38 17 -71
                      18 -456 17 -228 0 -426 -3 -440 -5z"
                      />
                      <path
                        d="M21910 2258 c-19 -13 -45 -39 -57 -57 -22 -33 -23 -42 -23 -248 0
                        -233 5 -262 58 -303 64 -51 149 -50 209 3 59 51 63 73 63 297 0 225 -7 255
                        -72 301 -48 35 -132 38 -178 7z"
                      />
                      <path
                        d="M9080 2088 c-69 -47 -75 -64 -78 -226 -3 -138 -2 -150 20 -191 28
                        -52 91 -91 147 -91 47 0 109 36 138 79 21 32 23 44 23 185 0 138 -2 154 -23
                        190 -12 21 -38 47 -57 57 -50 27 -128 25 -170 -3z"
                      />
                    </g>
                  </svg>
                </a>
              </Link>
              <div onClick={handleNav} className="rounded-full ml-3 shadow-lg shadow-gray-400 p-4 cursor-pointer -mr-4">
                <AiOutlineClose />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4">Stay up to date with the latest tech news</p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="font-medium uppercase">
              {navigation?.map((listItem) => {
                return (
                  <div className="mb-3 -ml-6">
                    <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
