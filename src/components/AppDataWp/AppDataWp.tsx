'use client';

import { useAppStore } from '@/stores/appStore';
import Welcome from '../Welcome/Welcome';
import Chat from '../Chat/Chat';

const AppDataWp: React.FC = () => {
    const { is_welcome } = useAppStore();

    return <div className="h-[100%]">{!is_welcome ? <Welcome /> : <Chat />}</div>;
};

export default AppDataWp;
