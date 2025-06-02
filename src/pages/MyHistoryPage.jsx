import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyHistoryPage = () => {
    const [history, setHistoryList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !token.includes('.')) {
            setError('유효하지 않은 로그인 토큰입니다.');
            return;
        }

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
            const decoded = JSON.parse(atob(padded));
            const contact = decoded.sub;

            axios
                .get(`http://localhost:8080/api/waste/history?contact=${contact}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);

                    setHistoryList(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    setError('조회 실패: ' + (err.response?.data?.message || '서버 오류'));
                });
        } catch (e) {
            console.error(e);
            setError('토큰 파싱 중 오류 발생');
        }
    }, []);

    return (
        <div className="container py-5" style={{ backgroundColor: '#ccffcc', minHeight: '100vh' }}>
            <h2 className="mb-4 text-success text-center">나의 배출 내역</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-bordered table-striped">
                <thead className="table-success">
                    <tr>
                        <th>배출일</th>
                        <th>배출시간</th>
                        <th>무게 (kg)</th>
                        <th>배출 위치</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">
                                내역이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.disposalDate}</td>
                                <td>{item.disposalTime}</td>
                                <td>{item.weight}</td>
                                <td>{item.binLocation}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyHistoryPage;
