import ReactDOM from 'react-dom';
import { FC, FormEvent, MouseEvent } from 'react';
import { TextButton } from '@components';
import styles from './Modal.module.scss';

export type SubmitEvent = FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>;

interface IModalContainerProps {
  height?: string;
  width?: string;
}

interface IModalProps extends IModalContainerProps {
  contentContainerTagName?: 'div' | 'form';
  onCloseClick: (event: unknown) => void;
  onSubmitClick?: (event: SubmitEvent) => void;
  isOpen: boolean;
  shouldShowButtons?: boolean;
  title: string;
}

export const Modal: FC<IModalProps> = ({
  children,
  contentContainerTagName = 'div',
  onCloseClick,
  onSubmitClick,
  height = '55vh',
  isOpen,
  shouldShowButtons = true,
  title,
  width = '35vw',
}) => {
  const Tag = contentContainerTagName;
  const modalRoot = document.getElementById('modal-root');

  if (!window || !modalRoot) return null;
  if (!modalRoot) {
    console.error('The div with modal-root id has not been added.');

    return null;
  }

  const handleFormTagSubmit = (event: unknown) => {
    if (contentContainerTagName !== 'form') return;

    const formEvent = event as FormEvent<HTMLFormElement>;

    formEvent.stopPropagation();
    if (onSubmitClick) onSubmitClick(formEvent);
  };

  return ReactDOM.createPortal(
    <div className={styles.container} style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className={styles.modalContainer} style={{ height, width }}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <TextButton fontSize="1.3rem" onClick={onCloseClick} text="X" />
        </div>
        <Tag
          className={styles.content}
          onSubmit={handleFormTagSubmit}
          style={{
            /*
             * 8 is for:
             *   header: 4rem,
             *   gap: 1rem,
             *   buttons: 3rem,
             */
            gridTemplateRows: shouldShowButtons
              ? `calc(${height} - 8rem) 3rem`
              : `calc(${height} - 5rem)`,
          }}
        >
          <div className={styles.childrenContainer}>{children}</div>
          {shouldShowButtons ? (
            <div className={styles.footer}>
              <button onClick={onCloseClick} type="button">
                Cancel
              </button>
              <button
                onClick={contentContainerTagName !== 'form' ? onSubmitClick : undefined}
                type="submit"
              >
                Continue
              </button>
            </div>
          ) : null}
        </Tag>
      </div>
      <div
        aria-label="Modal backdrop"
        className={styles.backdrop}
        onClick={onCloseClick}
        onKeyPress={onCloseClick}
        role="button"
        tabIndex={0}
      />
    </div>,
    modalRoot,
  );
};

export default Modal;
