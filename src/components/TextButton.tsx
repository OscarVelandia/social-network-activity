import { MouseEvent } from 'react';
import styles from './TextButton.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';

interface TextButtonProps {
  fontSize?: string;
  isDisabled?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  text: string;
  type?: ButtonType;
}

export const TextButton = ({
  fontSize = '1.1rem',
  isDisabled,
  onClick,
  text,
  type = 'button',
}: TextButtonProps) => {
  return (
    <button
      className={styles.container}
      disabled={isDisabled}
      onClick={onClick}
      style={{ fontSize }}
      // This is an eslint bug https://github.com/yannickcr/eslint-plugin-react/issues/1555
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {text}
    </button>
  );
};
