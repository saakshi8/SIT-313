function ProjectCard(props)
{
    return (
        <div className="bg-white rounded-xl shadow-md w-72 overflow-hidden">

            <img
                src={props.image}
                alt={props.title}
                className="w-full h-44 h-auto rounded"
            />

            <div className="p-5">

                <h3 className="text-rose-900 font-semibold text-base mb-2">
                    {props.title}
                </h3>

                <p className="text-gray-900 text-sm leading-relaxed mb-3">
                    {props.description}
                </p>

                <a
                    href={props.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-950 text-sm font-serif hover:text-fuchsia-500 transition-colors"
                >
                    View on GitHub →
                </a>

            </div>

        </div>
    );
}

export default ProjectCard;