
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
     const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(
        localStorage.getItem("loggedInUser")
    );

    const location = useLocation();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(false

    
        );
        navigate("/");
    };

    return (
        <nav className="bg-cyan-900 flex flex-wrap justify-between items-center px-10 py-4 sticky top-0 z-50">
            <Link
                to="/"
                className="text-rose-300 font-serif text-xl tracking-widest"
            >
                DEV@Deakin
            </Link>

            <div className="flex flex-wrap items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 rounded-md outline-none"
                />

                <Link
                    to="/Subscription"
                    className="text-white hover:text-rose-300"
                >
                    Subscription Plans
                </Link>

                <button
                    type="button"
                    className="text-white hover:text-rose-300"
                >
                    Post
                </button>

                {loggedInUser ? (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-rose-300 text-cyan-900 px-4 py-2 rounded-md hover:bg-rose-200"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-rose-300 text-cyan-900 px-4 py-2 rounded-md hover:bg-rose-200"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Header;
