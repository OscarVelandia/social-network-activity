import { TextButton } from '@components';
import { NewCommentFormInputs } from '@features/posts';
import { EmailInput } from '@services';
import styles from './NewCommentForm.module.scss';

interface NewCommentFormProps {
  form: Partial<NewCommentFormInputs>;
  onInputChange: (inputValue: { [key: string]: string }) => void;
}

export function NewCommentForm({ onInputChange, form }: NewCommentFormProps) {
  return (
    <div className={styles.inputsWithButtonContainer}>
      <div className={styles.inputsContainer}>
        <textarea
          key="body"
          onChange={(event) => onInputChange({ body: event.target.value })}
          placeholder="Add a comment..."
          required
          value={form.body}
        />
        <div>
          <input
            key="name"
            onChange={(event) => onInputChange({ name: event.target.value })}
            placeholder="Name"
            required
            type="text"
            value={form.name}
          />
          <input
            key="email"
            onChange={(event) => onInputChange({ email: event.target.value as EmailInput })}
            placeholder="Email"
            required
            type="email"
            value={form.email}
          />
        </div>
      </div>
      <TextButton
        hasHoverFeedback={false}
        isDisabled={!Object.values(form).every(Boolean)}
        text="Post"
        type="submit"
      />
    </div>
  );
}
