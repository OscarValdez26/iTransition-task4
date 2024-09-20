import { useAuth } from '../context/AuthContext.jsx';
import Datatable from 'react-data-table-component';
import { useEffect, useState } from 'react';

function AdminPage() {
    const { user, signout, getusers, allUsers, updateuser, updateLog } = useAuth();
    const [modify, setModify] = useState([]);
    const [statusChanged, setStatusChanged] = useState(false);
    const [toggledClearRows,setToggledClearRows] = useState(false);
    let data = allUsers;

    useEffect(() => {
        let newUser = user;
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        newUser.lastLogin = today.toUTCString();
        updateLog(newUser);
    }, []);
    useEffect(() => {
        getusers();
    }, [statusChanged]);
    useEffect(() => {
        data = allUsers;
        if (allUsers.length > 0) {
            const filtro = allUsers.filter((userContained) => userContained.email === user.email);
            if (filtro.length > 0) {
                if (filtro[0].status === "Blocked") {
                    signout();
                }
            }
            else {
                signout();
            }
        }
    }, [allUsers]);
    const columns = [
        {
            name: "Id",
            selector: row => row._id,
        },
        {
            name: "Username",
            selector: row => row.username,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Last log in",
            selector: row => row.lastLogin,
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true
        },
    ];
    const lockUser = () => {
        let newModify = modify;
        newModify.forEach(element => {
            element.status = "Blocked";
            updateuser(element);
        });
        clearRows();
        changeStat();
    }
    const unlockUser = () => {
        let newModify = modify;
        newModify.forEach(element => {
            element.status = "Unblocked";
            updateuser(element);
        });
        clearRows();
        changeStat();
    }
    const deleteUser = () => {
        let newModify = modify;
        newModify.forEach(element => {
            element.status = "Deleted";
            updateuser(element);
        });
        clearRows();
        changeStat();
    }
    const changeStat = () =>{
        setStatusChanged(!statusChanged);
    }
    const clearRows = () => {
        setToggledClearRows(!toggledClearRows);
      }
    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='text-bold text-2xl m-2'>Welcome {user.username} </h1>
                <button className='text-bold text-sky-500 m-2 p-2 rounded-md bg-gray-700' onClick={() => { signout() }}>Log Out</button>
            </div>
            <div className='flex justify-start'>
                <button className='text-bold text-white m-2 bg-red-500 p-2 rounded-md' onClick={() => { lockUser() }}>Block</button>
                <button className='text-bold text-sky-500 m-2 bg-white p-2 rounded-md' onClick={() => { unlockUser() }}><img src='/unblock.png' className='w-8' /></button>
                <button className='text-bold text-sky-500 m-2 bg-white p-2 rounded-md' onClick={() => { deleteUser() }}><img src='/trash.png' className='w-8' /></button>
            </div>
            <Datatable 
                title="Registered Users"
                columns={columns}
                data={data}
                selectableRows
                onSelectedRowsChange={(selected) => { setModify(selected.selectedRows)}}
                pagination 
                paginationPerPage={25} 
                fixedHeader
                clearSelectedRows={toggledClearRows}
            />
        </div>
    );
}

export default AdminPage;