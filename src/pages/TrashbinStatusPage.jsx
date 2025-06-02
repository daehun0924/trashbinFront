import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrashbinStatusPage = () => {
    const [bins, setBins] = useState([]);
    const [error, setError] = useState('');

    const fetchBins = () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        axios
            .get('http://localhost:8080/api/waste/bins', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setBins(res.data))
            .catch((err) => {
                console.error('쓰레기통 목록 불러오기 실패', err);
                setError('쓰레기통 목록 불러오기 실패');
            });
    };

    useEffect(() => {
        fetchBins();
    }, []);

    const handleResetBin = async (binId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:8080/api/waste/bins/reset?binId=${binId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('쓰레기통이 수거 처리되었습니다.');
            fetchBins();
        } catch (error) {
            alert('쓰레기통 수거 실패');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-success mb-4">쓰레기통 상태 조회</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="card p-4 shadow">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>위치</th>
                            <th>현재용량</th>
                            <th>최대용량</th>
                            <th>상태</th>
                            <th>수거</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bins.map((bin) => (
                            <tr key={bin.binId}>
                                <td>{bin.binId}</td>
                                <td>{bin.location}</td>
                                <td>{bin.currentVolume}</td>
                                <td>{bin.maxVolume}</td>
                                <td>{bin.status}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={() => handleResetBin(bin.binId)}
                                    >
                                        수거
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrashbinStatusPage;
