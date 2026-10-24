import { Link, useNavigate } from "react-router-dom";

function Header()
{
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem("loggedInUser");

    const handleLogout = () =>
    {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    return (
        <nav className="bg-cyan-900 flex flex-wrap justify-between items-center gap-4 px-4 sm:px-6 lg:px-10 py-4 sticky top-0 z-50">

            {/* DEV@Deakin Logo */}
            <Link
                to="/"
                className="text-rose-300 font-serif text-lg sm:text-xl tracking-widest shrink-0"
            >
                DEV@Deakin
            </Link>

            {/* Search Bar */}
            <div className="flex items-center gap-2 flex-1 min-w-0 sm:flex-none">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 rounded-md text-sm outline-none w-full sm:w-40 lg:w-64 min-w-0"
                />

                <button
                    className="bg-rose-400 text-white px-3 sm:px-4 py-2 rounded-md text-sm hover:bg-rose-500 transition-colors duration-200 shrink-0"
                >
                    Search
                </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 sm:gap-4">
                <button
                    className="text-gray-100 text-sm hover:text-rose-400 transition-colors duration-200"
                >
                    Post
                </button>

                {loggedInUser ? (
                    <button
                        onClick={handleLogout}
                        className="bg-rose-400 text-white px-3 sm:px-5 py-2 rounded-md text-sm hover:bg-rose-500 transition-colors duration-200"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-rose-400 text-white px-3 sm:px-5 py-2 rounded-md text-sm hover:bg-rose-500 transition-colors duration-200"
                    >
                        Login
                    </Link>
                )}
            </div>

        </nav>
    );
}

export default Header;