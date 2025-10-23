import React, { useState } from 'react';
import { Player, Item, Skill, Monster } from '../types.ts';
import AdminPanel from './AdminPanel.tsx';

interface SettingsPanelProps {
    player: Player;
    onClose: () => void;
    isMuted: boolean;
    onToggleMute: () => void;
    onUpdatePlayerName: (name: string) => void;
    onOpenAvatarSelector: () => void;
    onLogout: () => void;
    onRedeemGiftcode: (code: string) => void;
    isAdmin: boolean;
    onAdminAddItem: (item: Item) => void;
    onAdminLearnSkill: (skill: Skill) => void;
    onAdminCreateItem: (item: Item) => void;
    onAdminCreateMonster: (monster: Monster) => void;
    masterItemList: Item[];
    isBottomNavBarVisible: boolean;
    onToggleBottomNavBar: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
    player, 
    onClose, 
    isMuted, 
    onToggleMute, 
    onUpdatePlayerName,
    onOpenAvatarSelector,
    onLogout,
    onRedeemGiftcode, 
    isAdmin, 
    onAdminAddItem, 
    onAdminLearnSkill, 
    onAdminCreateItem, 
    onAdminCreateMonster, 
    masterItemList,
    isBottomNavBarVisible,
    onToggleBottomNavBar
}) => {
    const [newName, setNewName] = useState(player.name);
    const [giftcode, setGiftcode] = useState('');
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    const handleSaveChanges = () => {
        if (newName.trim() !== player.name) {
            onUpdatePlayerName(newName.trim());
        }
        onClose();
    };

    const handleRedeem = () => {
        onRedeemGiftcode(giftcode);
        setGiftcode('');
    };
    
    const AvatarDisplay: React.FC<{ avatarUrl: string; alt: string; className: string; }> = ({ avatarUrl, alt, className }) => {
        const isVideo = avatarUrl.startsWith('data:video') || avatarUrl.endsWith('.mp4');
        if (isVideo) {
            return <video src={avatarUrl} className={className} autoPlay loop muted playsInline aria-label={alt} />;
        }
        return <img src={avatarUrl} alt={alt} className={className} />;
    };

    return (
        <>
            {showAdminPanel && isAdmin && (
                <AdminPanel
                    onClose={() => setShowAdminPanel(false)}
                    onAddItem={onAdminAddItem}
                    onLearnSkill={onAdminLearnSkill}
                    // FIX: Pass the correct prop 'onAdminCreateItem' to AdminPanel.
                    onCreateItem={onAdminCreateItem}
                    // FIX: Changed `onCreateMonster` to `onAdminCreateMonster` to pass the correct prop.
                    onCreateMonster={onAdminCreateMonster}
                    masterItemList={masterItemList}
                />
            )}
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <div className="bg-gray-900 border-2 border-yellow-700 rounded-lg w-full max-w-2xl flex flex-col animate-fadeIn" onClick={e => e.stopPropagation()}>
                    <header className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-2xl font-serif text-yellow-300">Cài Đặt</h2>
                        <button onClick={onClose} className="text-2xl font-bold hover:text-red-500 transition-colors">&times;</button>
                    </header>

                    <main className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
                        {/* Audio & UI Settings */}
                        <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
                            <h3 className="text-lg font-bold text-yellow-300 border-b border-gray-700 pb-2 mb-3">Hệ Thống</h3>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg">Âm Lượng Trò Chơi</span>
                                <button onClick={onToggleMute} className={`px-4 py-2 rounded-md font-bold transition-colors ${isMuted ? 'bg-red-600' : 'bg-green-600'}`}>
                                    {isMuted ? 'Đã Tắt' : 'Đang Bật'}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg">Thanh Điều Hướng (Dưới)</span>
                                <button onClick={onToggleBottomNavBar} className={`px-4 py-2 rounded-md font-bold transition-colors ${!isBottomNavBarVisible ? 'bg-red-600' : 'bg-green-600'}`}>
                                    {!isBottomNavBarVisible ? 'Đang Ẩn' : 'Đang Hiện'}
                                </button>
                            </div>
                        </div>

                        {/* Giftcode */}
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                            <label className="block font-semibold text-lg mb-2">Mã Quà Tặng</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={giftcode}
                                    onChange={e => setGiftcode(e.target.value)}
                                    placeholder="Nhập mã quà tặng..."
                                    className="flex-grow bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <button onClick={handleRedeem} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold">Đổi</button>
                            </div>
                        </div>

                        {/* ADMIN Panel Button */}
                        {isAdmin && (
                            <div className="bg-red-900/50 p-3 rounded-lg flex justify-between items-center border border-red-700">
                                <span className="font-bold text-lg text-red-400">Bảng Điều Khiển ADMIN</span>
                                <button onClick={() => setShowAdminPanel(true)} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold">
                                    Mở
                                </button>
                            </div>
                        )}

                        {/* Character Customization */}
                        <div className="bg-gray-800/50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="flex flex-col items-center">
                                <h3 className="text-lg font-semibold mb-2">Xem Trước Avatar</h3>
                                <div className="relative group w-48 h-48">
                                    <AvatarDisplay avatarUrl={player.avatarUrl} alt="Avatar Preview" className="w-full h-full rounded-lg object-cover border-2 border-yellow-600" />
                                     <button 
                                        onClick={onOpenAvatarSelector}
                                        className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                                    >
                                        Thay đổi
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-semibold text-lg mb-1">Danh Xưng</label>
                                    <input 
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="p-4 border-t border-gray-700 flex justify-between items-center">
                        <button onClick={onLogout} className="px-6 py-2 bg-red-800 hover:bg-red-700 rounded font-semibold transition-colors">
                            Đăng Xuất
                        </button>
                        <button onClick={handleSaveChanges} className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded font-semibold transition-colors">
                            Lưu Thay Đổi
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default SettingsPanel;