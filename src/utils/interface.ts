export interface IAppState {
    is_welcome: boolean;
    is_robox: boolean;
    updateChangeRobox: (is_robox: boolean) => void;
    updateIsWelcome: (is_welcome: boolean) => void;
    data_chat: IResponse<any>[];
    updateDataChat: (data: IResponse<any>) => void;
}

export interface IMessageUser {
    is_ai: boolean;
    data: string;
}

export interface IResponse<T> {
    code: number;
    match_query: number;
    match_ai: number;
    is_table: boolean;
    is_mark_down: boolean;
    msg: string;
    data: T;
    is_ai: true;
    is_point: boolean;
    is_video: boolean;
    is_audio: boolean;
    is_unknown: boolean;
}

export interface IMarkDown {
    title: string;
    content_mark_down: string;
    content_html: string;
}
