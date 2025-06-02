import React, { useState } from 'react';
import axios from 'axios';

const MemberList = () => {
    const [contact, setContact] = useState('');
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(`http://localhost:8080/api/waste/history/member?contact=${contact}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHistory(res.data);
            console.log(res.data);

            setError('');
        } catch (err) {
            console.error(err);
            setError('회원 배출 이력을 불러오지 못했습니다.');
            setHistory([]);
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-success mb-3 text-center">회원별 배출 이력 조회</h3>

            <div className="card p-4 shadow mb-4">
                <div className="mb-3">
                    <label className="form-label">회원 연락처</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="01012345678"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleSearch}>
                    이력 조회
                </button>
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            {history.length > 0 && (
                <div className="card p-4 shadow">
                    <h5 className="text-primary mb-3">배출 이력</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>배출일자</th>
                                <th>배출시간</th>
                                <th>무게 (kg)</th>
                                <th>배출 위치</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((h, idx) => (
                                <tr key={idx}>
                                    <td>{h.disposalDate}</td>
                                    <td>{h.disposalTime}</td>
                                    <td>{h.weight}</td>
                                    <td>{h.binLocation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MemberList;
