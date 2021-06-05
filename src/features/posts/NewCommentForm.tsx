import { TextButton } from '@components';
import { NewCommentFormInputs } from '@features/posts';
import { EmailInput } from '@services';
import styles from './NewCommentForm.module.scss';

interface NewCommentFormProps {
  onInputChange: (inputValue: { [key: string]: string }) => void;
  newCommentForm: Partial<NewCommentFormInputs>;
}

export function NewCommentForm({ onInputChange, newCommentForm }: NewCommentFormProps) {
  const { body: inputBody, email, name } = newCommentForm;

  return (
    <div className={styles.inputsWithButtonContainer}>
      <div className={styles.inputsContainer}>
        <textarea
          key="body"
          onChange={(event) => onInputChange({ body: event.target.value })}
          placeholder="Add a comment..."
          required
          value={inputBody}
        />
        <div>
          <input
            key="name"
            onChange={(event) => onInputChange({ name: event.target.value })}
            placeholder="Name"
            required
            type="text"
            value={name}
          />
          <input
            key="email"
            onChange={(event) => onInputChange({ email: event.target.value as EmailInput })}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
        </div>
      </div>
      <TextButton
        hasHoverFeedback={false}
        isDisabled={!Object.values(newCommentForm).every(Boolean)}
        text="Post"
        type="submit"
      />
    </div>
  );
}
