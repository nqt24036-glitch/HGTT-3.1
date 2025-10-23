import React from 'react';
import { StoredMedia } from '../types.ts';

interface MediaSelectorModalProps {
    images: StoredMedia[];
    onSelect: (imageUrl: string) => void;
    onClose: () => void;
}

const MediaSelectorModal: React.FC<MediaSelectorModalProps> = ({ images: media, onSelect, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 z-[70] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-gray-900 border border-yellow-600 rounded-lg p-6 w-full max-w-3xl animate-fadeIn flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-yellow-300 mb-4 flex-shrink-0">Chọn Avatar</h3>
                <div className="flex-grow overflow-y-auto pr-2 max-h-[60vh]">
                     {media.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {media.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onSelect(item.dataUrl)}
                                    className="group relative bg-gray-800 rounded-lg overflow-hidden aspect-square border-2 border-transparent hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    {item.mediaType === 'image' ? (
                                        <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <video src={item.dataUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-1 bg-black/60 text-white text-xs truncate text-center">
                                        {item.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Không có media nào trong thư viện.</p>
                        </div>
                    )}
                </div>
                <div className="mt-4 text-right flex-shrink-0">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded">Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default MediaSelectorModal;