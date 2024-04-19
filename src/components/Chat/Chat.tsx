import { Button, Input, Switch } from 'antd';
import { TopChatHeading } from '../Welcome/Welcome';
import { AudioOutlined, SendOutlined } from '@ant-design/icons';
import { InputTypingEffect } from '../InputTypingEffect/InputTypingEffect';
import ChatItem, { HelloUser } from '../ChatItem/ChatItem';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { IMessageUser, IResponse } from '@/utils/interface';
import { GetRuntimeAI } from '@/app/actions/action';
import { useAppStore } from '@/stores/appStore';

const Chat: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(true);
    const refAudio = useRef<SpeechRecognition | null>(null);
    const [isActiveAudio, setIsActiveAudio] = useState<boolean>(false);
    const divRenderChat = useRef<HTMLDivElement>(null);
    const [shouldSpeak, setShouldSpeak] = useState<boolean>(true);
    const [questionSuggest, setQuestionSuggest] = useState<string>('');

    const { data_chat, updateDataChat } = useAppStore();

    useEffect(() => {
        setText('Xin chào, hiện tại bot có thể giúp gì cho bạn');
    }, []);

    useEffect(() => {
        if (isMute) {
            setShouldSpeak(false);
            return;
        }
        setShouldSpeak(true);
    }, [isMute]);

    useEffect(() => {
        if (shouldSpeak) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            window.speechSynthesis.speak(msg);
        }
        setText('');
    }, [text, shouldSpeak]);

    useEffect(() => {
        if (!divRenderChat.current) return;
        divRenderChat.current.scrollIntoView();
    }, [data_chat]);

    const handleGetAudioAndSend = () => {
        if (!refAudio.current) return;
        refAudio.current.start();
        setIsActiveAudio(true);
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        refAudio.current = recognition;
        recognition.continuous = false;
        recognition.lang = 'vi';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function (event) {
            setIsActiveAudio(false);
            setInputText(event.results[0][0].transcript);
        };

        recognition.onspeechend = function () {
            recognition.stop();
        };
        recognition.onspeechend = function (e) {
            console.log(e);
        };

        recognition.onerror = function (event) {
            console.log(event);
            console.log(event.error);
        };
    }, []);

    const handleSendMessage = async () => {
        if (!inputText) return;
        const fetchAPI = async () => {
            const chatUser: any = {
                data: inputText,
                is_ai: false,
            };
            updateDataChat(chatUser);
            setIsLoading(true);
            const data = await GetRuntimeAI(inputText);
            if (data.is_mark_down && !data.is_table) {
                setText(data.data.content_mark_down);
            }
            setIsLoading(false);
            updateDataChat(data);
            setInputText('');
        };
        fetchAPI();
    };

    useEffect(() => {
        if (!questionSuggest.trim()) {
            return;
        }

        setInputText(questionSuggest.trim());
    }, [questionSuggest]);

    return (
        <div className="flex flex-col justify-between h-[100%] pb-3">
            <div className="relative">
                <TopChatHeading
                    is_show_setting
                    height={300}
                    text="Hãy đặt câu hỏi ở phía dưới. bạn có thể sử dụng micro để quá trình nhanh hơn nhé 😉"
                    dataMute={{
                        isMute,
                        setIsMute,
                    }}
                />
            </div>
            <div className="body_chat flex-1 bg-[#f0f3fa] px-[12px] py-[8px] overflow-auto">
                <HelloUser setQuestionSuggest={setQuestionSuggest} />
                {data_chat &&
                    data_chat.length > 0 &&
                    data_chat.map((chatItem, index) => {
                        console.log(chatItem);
                        return <ChatItem data={chatItem} key={index} />;
                    })}
                {isLoading && (
                    <div
                        className="is-typing"
                        style={{
                            paddingBottom: 40,
                            marginTop: 50,
                        }}
                    >
                        <div className="jump1"></div>
                        <div className="jump2"></div>
                        <div className="jump3"></div>
                    </div>
                )}
                <div ref={divRenderChat} />
            </div>
            <div
                className="chat_input flex justify-between items-center h-[40px] px-2 pt-3"
                style={{
                    borderTop: '1.5px solid #ccc',
                }}
            >
                <InputTypingEffect
                    placeholder="Hãy nhập câu hỏi (Địa chỉ, điểm chuẩn, mã xét tuyển) ..."
                    className="w-[100%] block outline-none px-[10px] h-[30px] text-[14px]"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                    value={inputText}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            handleSendMessage();
                        }
                    }}
                />
                <div className="px-[10px]">
                    {inputText ? (
                        <SendOutlined
                            style={{
                                fontSize: 16,
                                color: '#1677ff',
                            }}
                            className="rotate-[-45deg] cursor-pointer"
                            onClick={handleSendMessage}
                        />
                    ) : (
                        <AudioOutlined
                            onClick={handleGetAudioAndSend}
                            style={{
                                fontSize: 16,
                                color: '#1677ff',
                            }}
                            className={`cursor-pointer  ${isActiveAudio ? 'micro-active' : ''}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
