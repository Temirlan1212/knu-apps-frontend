import styles from './feature-signup.module.css';

/* eslint-disable-next-line */
export interface FeatureSignupProps {}

export function FeatureSignup(props: FeatureSignupProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FeatureSignup!</h1>
    </div>
  );
}

export default FeatureSignup;
