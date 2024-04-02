import React from "react";
import { Link } from "react-router-dom";
import { Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_at, content } = props;

    return (
        <div>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className={`align-self-center ml-2 ${styles.MediaBody}`}>
                    <div className={styles.OwnerAndDate}>
                        <span className={styles.Owner}>{owner}</span>
                        <span className={styles.Date}>{updated_at}</span>
                    </div>
                    <p className={styles.Comment}>{content}</p>
                </Media.Body>
            </Media>
        </div>
    );
};

export default Comment;