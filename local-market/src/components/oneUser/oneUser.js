import { Link } from 'react-router-dom';

function OneUser(props) {
    let id= `/users/${props.id}`
    
    return (
        <div className="user">
            <Link className="info" to={id}>
                <div>
                    <h3 className="name">
                        {props.user_name}
                    </h3>
                    <h3 className="name">
                        {props.names}
                    </h3>
                    <h3 className="name">
                        {props.surname}
                    </h3>
                    <h3 className="name">
                        {props.email}
                    </h3>
                </div>
            </Link>
        </div>
    )
}

export default OneUser