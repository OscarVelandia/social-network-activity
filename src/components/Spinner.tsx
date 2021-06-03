import styles from './Spinner.module.scss';

interface ISpinnerProps {
  diameter?: string;
}

export const Spinner = ({ diameter = '4rem' }: ISpinnerProps) => {
  return <div className={styles.baseStyles} style={{ height: diameter, width: diameter }} />;
};
