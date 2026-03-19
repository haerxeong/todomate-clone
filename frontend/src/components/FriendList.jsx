// components/FriendList.jsx
import Avatar from './Avatar'

export default function FriendList({ friends, selectedId, onSelect }) {
    return (
        <div className="friend-list">
            {friends.map((f) => (
                <div
                    key={f.id}
                    className="friend-item"
                    onClick={() => onSelect(f.id)}
                >
                    <Avatar friend={f} selected={selectedId === f.id} />
                </div>
            ))}
        </div>
    )
}