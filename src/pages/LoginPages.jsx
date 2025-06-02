import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

const LoginPage = () => {
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post(
                'http://localhost:8080/api/member/login',
                qs.stringify({ contact, password }), // 폼 형식으로 바꿈
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            const token = res.data;
            localStorage.setItem('token', token);
            alert('로그인 성공!');
            navigate('/main');
        } catch (err) {
            setError('로그인 실패 ' + (err.response?.data?.message || 'server error'));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#ccffcc' }}>
            <div className="card p-4 shadow-lg" style={{ minWidth: '350px' }}>
                <h3 className="text-center mb-3 text-success">로그인</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">전화번호</label>
                        <input
                            type="text"
                            className="form-control"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger py-1">{error}</div>}
                    <button type="submit" className="btn btn-success w-100">
                        로그인
                    </button>
                    <div className="text-center mt-3">
                        <button className="btn btn-outline-secondary" onClick={() => navigate('/signup')}>
                            회원가입하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
