import Review from "./Review";
import Rating from "./Rating";


function Card(props){


    return(
        <div className="container cards">
            <div className="row">
                <div className="col-sm-4 col1"></div>
                <div className="col-sm-8 col2">
                    <div className="title hlt"><h3>{props.title}</h3></div>
                    <div className="author hlt"><h5>{props.author} </h5></div>
                    <div className="publisher hlt"><h6><span className="by">published by {props.publisher}</span></h6></div>
                    <div className="rating hlt" id="rating"><p>rating: &nbsp;{props.rating}/10 &nbsp;&nbsp;&nbsp;({props.totatRatings})</p></div>

                    <Rating _id = {props._id} />

                    <div className="hlt">
                        <p className="user" style={{color:"grey"}}>Submitted by:&nbsp; {props.user}</p>
                    </div>
                    
                    <div className="review hlt">
                        <p className="user">{props.user}</p>
                        <p className="rvw">{props.review} </p>
                    </div>

                    <Review _id = {props._id} />

                </div>
            </div>
        </div>
    );
}

export default Card;