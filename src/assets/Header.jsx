function Header()
{
    return (
        <nav className="bg-cyan-900 flex justify-between items-center px-10 py-4 sticky top-0 z-50">

            <ul className="flex gap-8 list-none">

                <li>
                    <a
                        href="#about"
                        className="text-gray-100 text-sm tracking-wide hover:text-rose-400 transition-colors duration-200"
                    >
                        About
                    </a>
                </li>

                <li>
                    <a
                        href="#work"
                        className="text-gray-100 text-sm tracking-wide hover:text-rose-400 transition-colors duration-200"
                    >
                        Work
                    </a>
                </li>

                <li>
                    <a
                        href="#contact"
                        className="text-gray-100 text-sm tracking-wide hover:text-rose-400 transition-colors duration-200"
                    >
                        Contact
                    </a>
                </li>

            </ul>

            <div className="text-rose-300 font-serif text-xl tracking-widest">
                DEV@Deakin
            </div>

        </nav>
    );
}

export default Header;