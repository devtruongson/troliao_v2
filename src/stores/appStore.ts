import { IAppState } from '@/utils/interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create<IAppState>()(
    persist(
        (set) => ({
            is_welcome: false,
            data_chat: [],
            is_robox: true,
            updateIsWelcome(is_welcome) {
                set((state) => {
                    return {
                        ...state,
                        is_welcome,
                    };
                });
            },
            updateChangeRobox(is_robox) {
                set((state) => {
                    return {
                        ...state,
                        is_robox,
                    };
                });
            },
            updateDataChat(data) {
                set((state) => {
                    return {
                        ...state,
                        data_chat: [...state.data_chat, data],
                    };
                });
            },
        }),
        {
            name: 'app_data',
        },
    ),
);
