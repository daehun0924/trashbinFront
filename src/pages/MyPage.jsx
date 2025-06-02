import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        contact: '',
        name: '',
        password: '',
        address: '',
        workplace: '',
        role: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('check token: ' + token);

        if (!token) {
            setError('로그인 정보가 없습니다.');
            return;
        }

        axios
            .get('http://localhost:8080/api/member/me', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setForm(res.data))
            .catch(() => setError('회원 정보를 불러오는 데 실패했습니다.'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        axios
            .put('http://localhost:8080/api/member/update', form, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => alert('정보 수정 완료'))
            .catch(() => setError('정보 수정 실패'));
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        if (!window.confirm('정말 탈퇴하시겠습니까?')) return;

        axios
            .delete('http://localhost:8080/api/member', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert('회원 탈퇴 완료');
                localStorage.removeItem('token');
                navigate('/login');
            })
            .catch(() => setError('회원 탈퇴 실패'));
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h3 className="text-success">마이페이지</h3>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label className="form-label">전화번호</label>
                    <input type="text" className="form-control" value={form.contact} disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">이름</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">비밀번호</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">주소</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">근무지</label>
                    <input
                        type="text"
                        className="form-control"
                        name="workplace"
                        value={form.workplace}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex gap-2">
                    <button className="btn btn-success w-50" onClick={handleUpdate}>
                        정보 수정
                    </button>
                    <button className="btn btn-danger w-50" onClick={handleDelete}>
                        회원 탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
