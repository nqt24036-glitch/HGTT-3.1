import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChatMessage } from '../types.ts';

interface ChatPanelProps {
    messages: ChatMessage[];
    onSendMessage: (content: string, channel: 'Thế Giới' | 'Khu Vực') => void;
    currentPlayerName: string;
    currentAreaId?: string | null;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, currentPlayerName, currentAreaId }) => {
    const [currentChannel, setCurrentChannel] = useState<'Thế Giới' | 'Khu Vực'>('Thế Giới');
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const filteredMessages = useMemo(() => {
        return messages.filter(msg => {
            if (currentChannel === 'Thế Giới') {
                return msg.channel === 'Thế Giới';
            }
            // For 'Khu Vực' channel
            return msg.channel === 'Khu Vực' && msg.areaId === currentAreaId;
        });
    }, [messages, currentChannel, currentAreaId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [filteredMessages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input, currentChannel);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-shrink-0 mb-4 text-center">
                 <h3 className="text-3xl font-serif text-yellow-300">Trò Chuyện</h3>
            </div>
            <div className="flex-shrink-0 flex justify-center border-b border-gray-700 mb-4">
                {(['Thế Giới', 'Khu Vực'] as const).map(channel => (
                    <button
                        key={channel}
                        onClick={() => setCurrentChannel(channel)}
                        className={`px-6 py-2 text-lg font-semibold transition-colors ${
                        currentChannel === channel
                            ? 'text-yellow-300 border-b-2 border-yellow-300'
                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                        }`}
                    >
                        {channel}
                    </button>
                ))}
            </div>

            <div className="flex-grow bg-black/30 p-4 rounded-lg overflow-y-auto mb-4 border border-gray-700">
                <div className="space-y-4">
                    {filteredMessages.map(msg => {
                        const isSelf = msg.username === currentPlayerName;
                        return (
                            <div key={msg.id} className={`flex items-start gap-3 ${isSelf ? 'justify-end' : ''}`}>
                                {!isSelf && (
                                    <img src={msg.avatarUrl} alt={msg.username} className="w-8 h-8 rounded-full flex-shrink-0" />
                                )}
                                <div className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                                    <span className={`text-xs ${isSelf ? 'text-cyan-400' : 'text-gray-400'}`}>{msg.username}</span>
                                    <div className={`mt-1 p-3 rounded-lg max-w-xs md:max-w-md break-words ${isSelf ? 'bg-blue-800/80' : 'bg-gray-700/80'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                                {isSelf && (
                                    <img src={msg.avatarUrl} alt={msg.username} className="w-8 h-8 rounded-full flex-shrink-0" />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="flex-shrink-0 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Nhắn tin ở kênh ${currentChannel}...`}
                    className="flex-grow bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors">
                    Gửi
                </button>
            </form>
        </div>
    );
};

export default ChatPanel;