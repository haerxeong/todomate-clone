// components/BottomNav.jsx

const NAV_ITEMS = ['home', 'explore', 'alarm', 'share', 'profile']

function NavIcon({ k, active }) {
    const col = active ? '#111' : '#ccc'

    if (k === 'home') {
        return (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                    d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H14v-5H8v5H4a1 1 0 01-1-1V9.5z"
                    stroke={col}
                    strokeWidth="1.8"
                    fill={active ? col : 'none'}
                    strokeLinejoin="round"
                />
            </svg>
        )
    }

    if (k === 'explore') {
        return (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="8" stroke={col} strokeWidth="1.8" />
                <path d="M8 14l1.5-4L14 8l-1.5 4L8 14z" stroke={col} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            </svg>
        )
    }

    if (k === 'alarm') {
        return (
            <div className="nav-alarm-wrap">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                        d="M11 3a6 6 0 016 6v4l1.5 2H3.5L5 13V9a6 6 0 016-6z"
                        stroke={col}
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinejoin="round"
                    />
                    <path d="M9 19a2 2 0 004 0" stroke={col} strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <div className="nav-alarm-dot" />
            </div>
        )
    }

    if (k === 'share') {
        return (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                    d="M19 11l-8-8v5C5 8.5 3 12 3 18c2-4 5-5 8-5v5l8-7z"
                    stroke={col}
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }

    if (k === 'profile') {
        return (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="8" r="3.5" stroke={col} strokeWidth="1.8" />
                <path d="M4 19c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke={col} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        )
    }

    return null
}

export default function BottomNav({ activeNav, onNavChange }) {
    return (
        <div className="bottom-nav">
            {NAV_ITEMS.map((k) => (
                <button key={k} onClick={() => onNavChange(k)} aria-label={k}>
                    <NavIcon k={k} active={activeNav === k} />
                </button>
            ))}
        </div>
    )
}