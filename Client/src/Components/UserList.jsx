import React from 'react';

const UserList = ({ users, onItemClick, onClose }) => {
  const handleClick = (username) => {
    onItemClick(username);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full max-h-48 overflow-y-auto bg-white border rounded-lg shadow-md mt-2">
      <ul>
        {users.map((user) => (
          <li
            key={user.code}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleClick(user.code)}
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
