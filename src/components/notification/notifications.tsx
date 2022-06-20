import { FC } from 'react';
import { Notification } from './notification';
import { useNotificationContext } from './context';

export const Notifications: FC = () => {
    const { notifications, deleteNotification } = useNotificationContext();

    return (
        <>
            {notifications.map((item: any) => (
                <Notification
                    message={item.message}
                    key={item.id}
                    id={item.id}
                    onDelete={deleteNotification}
                />
            ))}
        </>
    );
};
