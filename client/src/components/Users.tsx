import React from 'react';

type User = {
    email: string;
    number: string;
};

type Props = {
    users: User[];
};

function Users({ users }: Props) {
    return (
        <div className="usersList">
            {users?.map((user, index) => (
                <div key={index} className="user">
                    <p>{user?.email}</p>
                    <p>{user?.number.replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3')}</p>
                </div>
            ))}
        </div>
    );
}

export default Users;
