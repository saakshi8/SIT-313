function TutorialCard(props)
{
    return (
        <div className="w-64 p-4 bg-white rounded shadow">
            <img
                src={props.image}
                alt={props.title}
                className="w-40 h-24 h-auto rounded"
            />

            <h3 className="text-rose-900 font-semibold text-lg mb-2">
                {props.title}
                </h3>

            <p className="font sm font-serif ">{props.description}</p>

            <p className="font-bold font-serif">
             Rating: {props.rating} &nbsp;&nbsp; Author: {props.username}
             </p>
        </div>
    );
}

export default TutorialCard;