export default function Avatar({ friend, size = 42, selected }) {
    const hasImage = !!friend.profileImg

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                cursor: 'pointer',
                flexShrink: 0,
            }}
        >
            <div
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: selected ? '#111' : '#ececec',
                    border: `2.5px solid ${selected ? '#111' : 'transparent'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: size * 0.42,
                    transition: 'all 0.15s',
                    boxShadow: selected ? '0 3px 12px rgba(0,0,0,0.18)' : 'none',
                    overflow: 'hidden',
                }}
            >
                {hasImage ? (
                    <img
                        src={friend.profileImg}
                        alt={friend.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <svg
                        width={size * 0.46}
                        height={size * 0.46}
                        viewBox="0 0 22 22"
                        fill="none"
                    >
                        <circle cx="11" cy="8" r="4" fill={selected ? '#fff' : '#bbb'} />
                        <path
                            d="M3 19c0-4 3.6-7 8-7s8 3 8 7"
                            stroke={selected ? '#fff' : '#bbb'}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                )}
            </div>
            <span
                style={{
                    fontSize: 11,
                    fontWeight: selected ? 700 : 500,
                    color: selected ? '#111' : '#999',
                    whiteSpace: 'nowrap',
                }}
            >
        {friend.name}
      </span>
        </div>
    )
}