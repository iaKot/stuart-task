import { FC, useState, useCallback, useMemo } from 'react';

import { NotificationContext, NotificationType } from './context';

export const NotificationContextProvider: FC<{ children: any }> = ({
    children
}) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    const createNotification = useCallback((message: string) => {
        setNotifications(notifications => [
            ...notifications,
            { message, id: notifications.length } as NotificationType
        ]);
    }, []);

    const deleteNotification = useCallback((id: number) => {
        setNotifications(notifications =>
            notifications.filter(item => item.id !== id)
        );
    }, []);

    const contextValue = useMemo(
        () => ({
            notifications,
            createNotification,
            deleteNotification
        }),
        [notifications] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
};
