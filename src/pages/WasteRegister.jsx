import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WasteRegisterPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [weight, setWeight] = useState('');
    const [disposalDate, setDisposalDate] = useState('');
    const [disposalTime, setDisposalTime] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // 🔐 카테고리 목록 불러오기
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        axios
            .get('http://localhost:8080/api/waste/categories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log('받은 카테고리 목록:', res.data);
                setCategories(res.data);
            })
            .catch((err) => {
                console.error('카테고리 목록 불러오기 실패', err);
                setError('카테고리 목록 불러오기 실패');
            });
    }, []);

    // 🔄 카테고리 선택 시 폐기물 종류 필터링
    useEffect(() => {
        if (selectedCategory) {
            const token = localStorage.getItem('token');
            axios
                .get('http://localhost:8080/api/waste/items', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log('📦 전체 아이템:', res.data);
                    const filtered = res.data.filter((item) => item.categoryId === Number(selectedCategory));
                    console.log('🎯 필터링된 아이템:', filtered);
                    setItems(filtered);
                })
                .catch((err) => {
                    console.error('❌ 폐기물 종류 불러오기 실패', err);
                    setError('폐기물 종류 불러오기 실패');
                });
        } else {
            setItems([]);
        }
    }, [selectedCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/waste/dispose', null, {
                params: {
                    categoryId: selectedCategory,
                    itemId: selectedItem,
                    weight,
                    disposalDate,
                    disposalTime,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('✅ 배출이 등록되었습니다.');
        } catch (error) {
            setMessage('❌ 등록 실패: ' + (error.response?.data || '에러 발생'));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-success mb-4">폐기물 등록</h2>
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">쓰레기통</label>
                    <select
                        className="form-select"
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
                </div>

                <div className="mb-3">
                    <label className="form-label">폐기물 종류</label>
                    <select
                        className="form-select"
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        required
                    >
                        <option value="">종류 선택</option>
                        {items.map((item) => (
                            <option key={item.wasteId} value={item.wasteId}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">무게 (kg)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">배출일자</label>
                    <input
                        type="date"
                        className="form-control"
                        value={disposalDate}
                        onChange={(e) => setDisposalDate(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">배출시간</label>
                    <input
                        type="time"
                        className="form-control"
                        value={disposalTime}
                        onChange={(e) => setDisposalTime(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">
                    등록하기
                </button>
                {message && <div className="mt-3 alert alert-info text-center">{message}</div>}
            </form>
        </div>
    );
};

export default WasteRegisterPage;
