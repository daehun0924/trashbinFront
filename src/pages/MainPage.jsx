import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div
            className="container vh-100 d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: '#ccffcc' }}
        >
            <div className="card p-5 shadow-lg text-center">
                <h1 className="mb-4 text-success">쓰레기 배출 관리 시스템</h1>
                <p className="mb-3">로그인에 성공하셨습니다. 아래에서 메뉴를 선택하세요.</p>

                <div className="d-grid gap-3">
                    <button className="btn btn-outline-success" onClick={() => navigate('/wasteregister')}>
                        폐기물 등록
                    </button>
                    <button className="btn btn-outline-success" onClick={() => navigate('/myhistory')}>
                        배출 내역 보기
                    </button>
                    <button className="btn btn-outline-success" onClick={() => navigate('/mypage')}>
                        마이 페이지
                    </button>
                    <button className="btn btn-outline-warning" onClick={() => navigate('/admin')}>
                        관리자자 페이지
                    </button>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
