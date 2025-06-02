import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newItemName, setNewItemName] = useState('');
    const [newItemDisposalDay, setNewItemDisposalDay] = useState('');
    const [newItemPart, setNewItemPart] = useState('');
    const [newBinLocation, setNewBinLocation] = useState('');
    const [newBinMaxVolume, setNewBinMaxVolume] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인 필요');
            navigate('/login');
            return;
        }
        try {
            const decoded = jwtDecode(token);
            console.log('토큰 내용:', decoded);
            if (decoded.role !== 'ADMIN') {
                alert('관리자만 접근할 수 있습니다.');
                navigate('/');
                return;
            }
        } catch (e) {
            console.error('토큰 디코딩 실패', e);
            alert('유효하지 않는 로그인 정보');
            navigate('/');
        }

        axios
            .get('http://localhost:8080/api/waste/categories', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.error('카테고리 목록 불러오기 실패', err);
                setError('카테고리 목록 불러오기 실패');
            });
    }, [navigate]);

    const handleCreateCategory = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:8080/api/waste/categories',
                {
                    name: newCategory,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setNewCategory('');
            window.location.reload();
        } catch (error) {
            alert('카테고리 등록 실패');
        }
    };

    const handleCreateItem = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:8080/api/waste/items',
                {
                    name: newItemName,
                    disposalDay: newItemDisposalDay,
                    part: newItemPart,
                    category: { categoryId: Number(selectedCategory) },
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setNewItemName('');
            setNewItemDisposalDay('');
            setNewItemPart('');
            window.location.reload();
        } catch (error) {
            alert('폐기물 종류 등록 실패');
        }
    };

    const handleCreateBin = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:8080/api/waste/bins/create', null, {
                params: {
                    categoryId: selectedCategory,
                    location: newBinLocation,
                    maxVolume: parseFloat(newBinMaxVolume),
                },
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewBinLocation('');
            setNewBinMaxVolume('');
            window.location.reload();
        } catch (error) {
            alert('쓰레기통 등록 실패');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-success mb-4">관리자 페이지</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="card p-4 shadow">
                <h4 className="text-center text-primary mb-3">관리자 등록 기능</h4>

                <div className="mb-3">
                    <label className="form-label">새로운 쓰레기통 카테고리 입력</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button className="btn btn-outline-primary mt-2" onClick={handleCreateCategory}>
                        카테고리 등록
                    </button>
                </div>

                <div className="mb-3">
                    <label className="form-label">쓰레기통 카테고리 선택</label>
                    <select
                        className="form-select mb-2"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">카테고리 선택</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <label className="form-label">폐기물 종류 및 정보 입력</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="이름"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="배출 요일"
                        value={newItemDisposalDay}
                        onChange={(e) => setNewItemDisposalDay(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="부피"
                        value={newItemPart}
                        onChange={(e) => setNewItemPart(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" onClick={handleCreateItem}>
                        종류 등록
                    </button>
                </div>

                <div className="mb-3">
                    <label className="form-label">새 쓰레기통 등록</label>

                    <select
                        className="form-select mb-2"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                    >
                        <option value="">카테고리 선택</option>
                        {categories.map((cat) => (
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="위치"
                        value={newBinLocation}
                        onChange={(e) => setNewBinLocation(e.target.value)}
                    />
                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="최대 용량"
                        value={newBinMaxVolume}
                        onChange={(e) => setNewBinMaxVolume(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleCreateBin}
                        disabled={!selectedCategory || !newBinLocation || !newBinMaxVolume}
                    >
                        쓰레기통 등록
                    </button>
                </div>
                <hr />
                <div className="mb-3">
                    <button className="btn btn-outline-primary" onClick={() => navigate('/trashbinstatus')}>
                        쓰레기통 상태 조회
                    </button>
                </div>
                <div className="mb-3">
                    <button className="btn btn-outline-primary" onClick={() => navigate('/memberlist')}>
                        회원별 배출내역
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
