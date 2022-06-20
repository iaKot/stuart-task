import { createContext, useContext } from 'react';

export interface NotificationType {
    message: string;
    id: number;
}

export type NotificationContextType = {
    notifications: NotificationType[];
    createNotification: (message: string) => void;
    deleteNotification: (id: number) => void;
};

export const NotificationContext = createContext<NotificationContextType>({
    notifications: [],
    createNotification: () => {},
    deleteNotification: () => {}
});

export const useNotificationContext = () => useContext(NotificationContext);
