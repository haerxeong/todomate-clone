// components/ProfileSection.jsx

export default function ProfileSection({ friend }) {
    return (
        <div className="profile-section">
            <div className="profile-info">
                <div className="profile-avatar">
                    {friend.avatar ? (
                        <span style={{ fontSize: 26 }}>{friend.avatar}</span>
                    ) : (
                        <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
                            <circle cx="11" cy="8" r="4" fill="#bbb" />
                            <path
                                d="M3 19c0-4 3.6-7 8-7s8 3 8 7"
                                stroke="#bbb"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    )}
                </div>

                <div>
                    <div className="profile-name">{friend.name}</div>
                    <div className="profile-bio">프로필에 자기소개를 입력해보세요</div>
                </div>
            </div>

            <button className="profile-edit-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                        cx="12"
                        cy="12"
                        r="9.5"
                        stroke="#ddd"
                        strokeWidth="1.3"
                        strokeDasharray="3 2.5"
                    />
                    <path
                        d="M12 8v8M8 12h8"
                        stroke="#ccc"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    )
}