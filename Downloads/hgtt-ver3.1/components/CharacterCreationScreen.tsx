import React, { useState } from 'react';
import { CharacterCreationData } from '../types.ts';

interface Props {
  onCharacterCreate: (data: CharacterCreationData) => void;
}

const GENDERS: Array<'Nam' | 'Nữ'> = ['Nam', 'Nữ'];

interface LoginProps {
    onLogin: (username: string, password: string) => boolean;
    onRegister: (username: string, password: string) => boolean;
}

export const LoginOrRegisterScreen: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError('Tên đăng nhập và mật khẩu không được để trống.');
            return;
        }
        setError('');
        let success = false;
        if (isLogin) {
            success = onLogin(username, password);
            if (!success) setError('Tên đăng nhập hoặc mật khẩu không đúng.');
        } else {
            success = onRegister(username, password);
            if (!success) setError('Tên đăng nhập đã tồn tại.');
        }
    };
    
    return (
        <div className="h-screen w-screen flex items-center justify-center p-4 font-sans text-gray-200">
            <div className="w-full max-w-md bg-black bg-opacity-70 border border-gray-700 rounded-lg p-8 shadow-2xl shadow-black/50 backdrop-blur-sm">
                <h1 className="text-4xl font-serif text-center text-yellow-300 mb-6 animate-lightning-glow">Huyền Giới Tu Tiên</h1>
                <h2 className="text-2xl font-semibold text-center text-gray-300 mb-6">{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Tài Khoản</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Mật Khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-green-600 text-white text-lg font-bold py-3 rounded-lg border-2 border-green-400 hover:bg-green-500 transition-all duration-300">
                        {isLogin ? 'Tiến Vào' : 'Tạo Tài Khoản'}
                    </button>
                </form>
                <p className="text-center mt-6">
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-cyan-400 hover:text-cyan-300">
                        {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
                    </button>
                </p>
            </div>
        </div>
    );
};


const CharacterCreationScreen: React.FC<Props> = ({ onCharacterCreate }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!name.trim()) {
      setError('Vui lòng nhập danh xưng của bạn.');
      return;
    }
    setError('');
    onCharacterCreate({ name, gender });
  };
  
  const avatarUrl = gender === 'Nữ'
    ? 'https://i.postimg.cc/tgmHkbYf/95cd50f0-80f1-4c6c-bcf6-44b70ce73044.jpg'
    : 'https://i.postimg.cc/VLDxJPCJ/418dcf6b-8615-4669-a1d6-044b157f0cd4.jpg';

  const AvatarDisplay: React.FC<{ avatarUrl: string; alt: string; className: string; }> = ({ avatarUrl, alt, className }) => {
    const isVideo = avatarUrl.startsWith('data:video') || avatarUrl.endsWith('.mp4');
    if (isVideo) {
        return <video src={avatarUrl} className={className} autoPlay loop muted playsInline aria-label={alt} />;
    }
    return <img src={avatarUrl} alt={alt} className={className} />;
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 font-sans text-gray-200">
      <div className="w-full max-w-4xl bg-black bg-opacity-60 border border-gray-700 rounded-lg p-6 md:p-8 shadow-2xl shadow-black/50 flex flex-col md:flex-row gap-8 overflow-y-auto">
        
        <div className="w-full md:w-2/3 flex flex-col space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif text-center text-yellow-300 mb-2">Sáng Tạo Nhân Vật</h1>
          
          <div>
            <label className="block text-lg font-semibold text-yellow-400 font-serif mb-1">Danh Xưng</label>
            <input 
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên nhân vật..."
              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          <div>
              <label className="block text-lg font-semibold text-yellow-400 font-serif mb-1">Giới Tính</label>
              <div className="flex gap-2">
                {GENDERS.map(g => (
                  <button key={g} onClick={() => setGender(g)} className={`px-4 py-2 rounded border-2 transition-colors w-full ${gender === g ? 'bg-yellow-500 text-black border-yellow-400' : 'bg-transparent border-gray-600 hover:bg-gray-700'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

          <div className="pt-4 flex-grow flex flex-col justify-center items-center bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-bold text-cyan-300 font-serif mb-3">Số Mệnh Tiền Định</h3>
                <p className="text-center text-gray-400">
                Linh căn ban đầu sẽ là "Chưa biết".
                <br />
                Sau khi đạt Cấp 5, hãy đến gặp Giám Linh Sư Yến Tử Nguyệt tại Thành Vân Lâm để giám định. Linh căn có thể được tẩy luyện lại bằng Tẩy Linh Thạch.
                </p>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="pt-4">
            <button onClick={handleCreate} disabled={!name.trim()} className="w-full bg-green-600 text-white text-xl font-bold py-3 rounded-lg border-2 border-green-400 hover:bg-green-500 transition-all duration-300 shadow-lg shadow-green-500/30 disabled:bg-gray-600 disabled:cursor-not-allowed">
              Tiến Vào Huyền Giới
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center">
          <h2 className="text-2xl font-serif text-yellow-300 mb-4">Hình Dáng</h2>
          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-yellow-600 mb-4 flex-shrink-0">
             <AvatarDisplay avatarUrl={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover bg-gray-800" />
          </div>
           <div className="text-center text-gray-400 italic">
             <p>"Nhất Mộng Tiên Duyên, Phàm Nhân Tu Đạo"</p>
             <p className="mt-2">Mỗi lựa chọn hôm nay, sẽ tạo nên truyền kỳ ngàn năm sau.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreationScreen;