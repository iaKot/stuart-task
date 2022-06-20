import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './styles.scss';
import { createContainer } from './notification-container';

interface Props {
    message: string;
    id: string;
    onDelete?: any;
}

const container = createContainer();

export const Notification: FC<Props> = ({ message, onDelete, id }) => {
    useEffect(() => {
        const interval = setTimeout(() => {
            onDelete(id);
        }, 5000);
        return () => {
            clearTimeout(interval);
        };
    }, [onDelete, id]);

    return createPortal(
        <div
            className='notification'
            onClick={() => onDelete(id)}
            data-testid='notification'
        >
            {message}
        </div>,
        container
    );
};
