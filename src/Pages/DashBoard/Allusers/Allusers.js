import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Usetitle from '../../../Hook/Usetittle';

const Allusers = () => {
    Usetitle('AllBuyers');
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://gyan-vandar-server.vercel.app/users');
            const data = await res.json();
            return data
        }
    })
    const handlemakeAdmin = id =>{
        fetch(`https://gyan-vandar-server.vercel.app/users/admin/${id}`,{
            method :'PUT',
            headers :{
                authorization :`bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.modifiedCount > 0){
            toast.success('make admin successfully');
            console.log(data);
            refetch();
           }
            
        })
        
    
     }   
     const handleDelete = id =>{
        console.log(id);
        fetch(`https://gyan-vandar-server.vercel.app/users/${id}`,{
            method : "DELETE",
            headers :{
                authorization : `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json())
        .then(data=>{
           if(data.deletedCount>0){
            refetch();
            toast.success(` Deleted the buyers Successfully`)
           }
           
        })

     }
    return (
        <div>
        <h1 className='text-3xl text-center'>AllBuyers :{users.length}</h1>
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User-Role</th>
                        <th>Set-Role</th>
                        <th>Delete</th>
                        
                    </tr>
                </thead>
                <tbody>



                   {
                    users.map((user,i)=>
                        <tr className="hover" key={user._id}>
                        <th>{i+1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user?.power !=='admin' &&<button onClick={()=> handlemakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                        <td><button onClick={()=> handleDelete(user._id)} className='btn btn-xs btn-outline btn-warning'>DELETE</button></td>
                    </tr>
                        
                        
                        )
                   }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Allusers;