import { FC, ButtonHTMLAttributes, MouseEventHandler } from 'react';
import './styles.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    label: string;
    testId?: string;
    disabled?: boolean;
}

export const Button: FC<Props> = props => {
    const {
        label,
        handleClick,
        testId,
        children,
        className,
        disabled,
        ...attr
    } = props;

    return (
        <button
            {...attr}
            data-testid='button'
            className={`${className} button ${disabled && 'disabled'}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};
