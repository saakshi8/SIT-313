function ArticleCard(props) 
{ 
    return ( 
        <div> 
            <img 
                src={props.image} 
                alt={props.title} 
                className="w-40 h-24 h-auto rounded"
            /> 
 
            <h3>{props.title}</h3> 
 
            <p>{props.description}</p> 
            
            <p className="text-gray-600 text-bold font-serif">
           Rating: {props.rating} &nbsp;&nbsp; Author: {props.author}
           </p>
        </div> 
    ); 
} 
 
export default ArticleCard;