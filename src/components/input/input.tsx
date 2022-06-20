import {
    FC,
    ChangeEvent,
    ChangeEventHandler,
    InputHTMLAttributes,
    ReactNode
} from 'react';
import './styles.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    placeholder?: string;
    testId?: string;
    icon?: ReactNode;
}

export const Input: FC<Props> = props => {
    const { name, handleChange, placeholder, icon, testId, ...attr } = props;

    const onChange: ChangeEventHandler<HTMLInputElement> = e => {
        handleChange(e);
    };

    return (
        <div className='input-box'>
            {icon && (
                <div className='input-icon' data-testid='input-icon'>
                    {icon}
                </div>
            )}
            <input
                {...attr}
                type={'text'}
                onChange={onChange}
                data-testid={testId || 'input'}
                id={name}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
};
