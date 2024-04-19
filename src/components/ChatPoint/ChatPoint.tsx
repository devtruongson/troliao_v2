import { IResponse } from '@/utils/interface';
import { Image } from 'antd';

const ChatPoint: React.FC<{ data: IResponse<any> }> = ({ data }) => {
    return (
        <div>
            {data.data.map((item: any, index: number) => {
                return (
                    <div key={index}>
                        <p className="py-3 px-2 font-[600] text-[18px]">{item.title}</p>
                        {item.image_url.map((image: string, index: number) => {
                            return (
                                <div key={index}>
                                    <Image src={`http://localhost:8080/upload/folder/app/${image}`} alt="Hình ảnh" />
                                </div>
                            );
                        })}
                        <div>
                            <div
                                className="preview-markdown"
                                dangerouslySetInnerHTML={{
                                    __html: item.content_html,
                                }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatPoint;
