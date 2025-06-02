import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPages';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import WasteRegisterPage from './pages/WasteRegister';
import MyHistoryPage from './pages/MyHistoryPage';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';
import TrashbinStatusPage from './pages/TrashbinStatusPage';
import MemberList from './pages/MemberList';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/wasteregister" element={<WasteRegisterPage />} />
                <Route path="/myhistory" element={<MyHistoryPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/trashbinstatus" element={<TrashbinStatusPage />} />
                <Route path="/memberlist" element={<MemberList />} />
            </Routes>
        </Router>
    );
}

export default App;
