import { IMessageUser, IResponse } from '@/utils/interface';
import Image from 'next/image';
import { Typography } from 'antd';
import React, { useState } from 'react';
import ChatTable from '../ChatTable/ChatTable';
import ChatPoint from '../ChatPoint/ChatPoint';
import ChatMarkDown from '../ChatMarkDown/ChatMarkDown';

const { Paragraph, Text } = Typography;

const ChatItem: React.FC<{
    data: IResponse<any>;
}> = ({ data }) => {
    if (!data.is_ai) {
        return (
            <div className="mb-3">
                <ChatItemForUser data={data} />
            </div>
        );
    }
    return (
        <div className="mb-3">
            <ChatItemForBot data={data} is_null_result={data.data ? false : true} />
        </div>
    );
};

export default ChatItem;

function ChatItemForBot({ data, is_null_result = false }: { data: IResponse<any>; is_null_result?: boolean }) {
    return (
        <div className="flex gap-[10px] mb-4 max-w-[85%]">
            <Image
                className="flex-shrink-0 h-[30px] w-[30px] object-cover"
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                }}
                width={30}
                height={30}
                src="/robox.png"
                alt="Hình ảnh AI"
            />
            <div className="bg-[#fff] px-[12px] py-[8px] rounded-md shadow-md">
                {!is_null_result ? (
                    <>
                        {data.is_table && <ChatTable data={data} />}
                        {data.is_point && <ChatPoint data={data} />}
                        {!data.is_point && !data.is_table && data.is_mark_down && <ChatMarkDown data={data} />}
                        <p className="text-[#878734] opacity-[0.4] text-[12px] float-right mb-2">
                            Robox dự đoán {Math.floor(data.match_ai * 100)}% phù hợp với bạn
                        </p>
                    </>
                ) : (
                    <p>Bot xin lỗi vì chưa thể hiểu ý của bạn</p>
                )}
            </div>
        </div>
    );
}

function ChatItemForUser({ data }: { data: IMessageUser }) {
    return (
        <div>
            <div className="flex gap-[10px] mb-4 max-w-[85%] ml-auto justify-end">
                <div className="bg-[#fff] px-[12px] py-[8px] rounded-md shadow-md">
                    <p className="text-justify">
                        <Paragraph copyable>{data.data}</Paragraph>
                    </p>
                </div>
                <Image
                    className="flex-shrink-0 h-[30px] w-[30px] object-cover"
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                    }}
                    width={30}
                    height={30}
                    src="/user.png"
                    alt="Hình ảnh"
                />
            </div>
        </div>
    );
}

export const HelloUser: React.FC<{ setQuestionSuggest: React.Dispatch<React.SetStateAction<string>> }> = ({
    setQuestionSuggest,
}) => {
    return (
        <div className="flex gap-[10px] mb-4 max-w-[85%]">
            <Image
                className="flex-shrink-0 h-[30px] w-[30px] object-cover"
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                }}
                width={30}
                height={30}
                src="/robox.png"
                alt="Hình ảnh AI"
            />
            <div className="bg-[#fff] px-[12px] py-[8px] rounded-md shadow-md">
                <p className="text-justify">
                    <span className="text-[15px]">
                        Xin chào Anh/Chị. Em là Robox, trợ lý ảo của Đại Học Kinh Tế Kỹ Thuật Công Nghiệp Hà Nội. Em có
                        thể hỗ trợ Anh/Chị giải đáp một số thắc mắc
                    </span>
                    <ul
                        style={{
                            listStyle: 'disc',
                            marginLeft: 40,
                            marginTop: 6,
                        }}
                    >
                        <li
                            onClick={() => setQuestionSuggest('Địa điểm trường ở đâu')}
                            className="text-[#6565cf] cursor-pointer hover:text-[#ee4d2d]"
                        >
                            Địa điểm trường ở đâu
                        </li>
                        <li
                            onClick={() => setQuestionSuggest('Mã đăng ký xét tuyển là gì')}
                            className="text-[#45457a] cursor-pointer hover:text-[#ee4d2d]"
                        >
                            Mã đăng ký xét tuyển là gì
                        </li>
                        <li
                            onClick={() => setQuestionSuggest('Điểm chuẩn năm 2023')}
                            className="text-[#6969b1] cursor-pointer hover:text-[#ee4d2d]"
                        >
                            Điểm chuẩn năm 2023
                        </li>
                    </ul>
                </p>
            </div>
        </div>
    );
};
