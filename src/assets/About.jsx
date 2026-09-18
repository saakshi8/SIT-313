function About()
{
    return (
        <section
            id="about"
            className="flex flex-col items-center py-16 px-6 text-center"
        >

            <img
                src="/profile.png"
                alt="Profile photo"
                className="w-28 h-28 rounded-full object-cover border-4 border-rose-200 mb-5"
            />

            <p className="text-gray-500 text-base max-w-md leading-relaxed mb-6">
                I am an aspiring software engineer currently in my third semester.
                I am passionate about technology and graphic designing.
            </p>

            <hr className="w-24 border-t-2 border-gray-200 mb-4" />

        </section>
    );
}

export default About;