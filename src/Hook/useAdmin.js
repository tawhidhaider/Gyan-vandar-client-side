import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading,setIsAdminLoading] = useState(true);
    //console.log(email);
    useEffect(() => {
        if (email) {
            //console.log(email);
            fetch(`https://gyan-vandar-server.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                   // console.log(data);
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false);

                })
        }
    }, [email])
    return [isAdmin,isAdminLoading];
}


export default useAdmin;