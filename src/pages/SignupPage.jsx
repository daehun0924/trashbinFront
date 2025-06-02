import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        contact: '',
        name: '',
        password: '',
        address: '',
        workplace: '',
        role: 'USER', // 기본값 USER
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/member/signup', formData);
            alert('회원가입 완료!');
            console.log(response.data);
            navigate('/login'); // 회원가입 후 로그인 페이지로 이동
        } catch (error) {
            alert('회원가입 실패');
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4" style={{ backgroundColor: '#e6ffe6' }}>
                <h2 className="text-center mb-4">회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">전화번호</label>
                        <input
                            type="text"
                            className="form-control"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">이름</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">주소</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">근무지</label>
                        <input
                            type="text"
                            className="form-control"
                            name="workplace"
                            value={formData.workplace}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">권한 선택</label>
                        <select
                            className="form-select"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="USER">사용자</option>
                            <option value="ADMIN">관리자</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                        가입하기
                    </button>
                    <div className="text-center mt-3">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/login')}>
                            로그인하러 가기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
