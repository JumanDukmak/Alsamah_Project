
const storage = {
    getToken: () => {
        return localStorage.getItem('token');
    },
    setToken: (token) => {
        localStorage.setItem('token', token);
    },
    setRole:(role)  => { 
        localStorage.setItem('role', role);
    },
    getRole:()  => { 
        return localStorage.getItem('role');
    }
};

export default storage