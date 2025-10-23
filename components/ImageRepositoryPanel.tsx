import React, { useRef } from 'react';
import { StoredMedia } from '../types.ts';

interface MediaRepositoryPanelProps {
    mediaRepository: StoredMedia[];
    onUpload: (file: File) => void;
    onDelete: (mediaId: string) => void;
    onSetBackground: (url: string) => void;
}

const MediaRepositoryPanel: React.FC<MediaRepositoryPanelProps> = ({ mediaRepository, onUpload, onDelete, onSetBackground }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onUpload(event.target.files[0]);
            event.target.value = ''; // Reset input to allow re-uploading the same file
        }
    };

    return (
        <div className="h-full w-full flex flex-col">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
            />
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-3xl font-serif text-yellow-300">Thư Viện Media</h3>
                    <p className="text-gray-400 mt-1">Quản lý hình ảnh và video cho avatar, ảnh nền.</p>
                </div>
                <button
                    onClick={handleFileUploadClick}
                    className="px-5 py-2 text-lg font-bold rounded-lg border-2 transition-all duration-300 bg-blue-600 hover:bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/20"
                >
                    Tải Lên
                </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                {mediaRepository.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {mediaRepository.map(media => (
                            <div key={media.id} className="group relative bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden aspect-square">
                                {media.mediaType === 'image' ? (
                                    <img src={media.dataUrl} alt={media.name} className="w-full h-full object-cover" />
                                ) : (
                                    <video src={media.dataUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                                )}
                                <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-xs text-white truncate mb-2">{media.name}</p>
                                    <div className="space-y-1">
                                         <button 
                                            onClick={() => onSetBackground(media.dataUrl)} 
                                            className="w-full text-xs text-center py-1 rounded bg-green-600 hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                                            disabled={media.mediaType === 'video'}
                                         >
                                            Đặt làm nền
                                        </button>
                                        <button onClick={() => onDelete(media.id)} className="w-full text-xs text-center py-1 rounded bg-red-600 hover:bg-red-500">
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">Thư viện của bạn trống. Hãy tải lên một vài media!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaRepositoryPanel;