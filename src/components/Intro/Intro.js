/* eslint-disable */
import styles from './Intro.module.scss';

const Intro = () => {
  return (
    <div className={styles.HeadContainer}>
      <div className={styles.jm}>
        <div className={styles.blurBombsContainer}>
          <div className={styles.blurBombs}>
            <div className={styles.blurtriangle}>
              <img src="./assests/job-blob-triangle.svg" alt="" className="blur1" />
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <div className={styles.itemContainer}>
              <div className={styles.container}>
                <h1 className={styles.has1}>
                  <span>
                    Let&#39;s Explore Your Own Tech World
                    <span className={styles.dot}>!</span>
                  </span>
                </h1>
                <div className={styles.infoContainer}>
                  <p className={styles.info}>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam possimus sunt autem sint facilis
                      labore ullam saepe! Dolorum, sint non quas eveniet eos error,
                    </span>
                  </p>
                </div>
              </div>

              <div className={styles.blurSemiCircle}>
                <img src="./assests/job-circle.svg" alt="" className="blur2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
