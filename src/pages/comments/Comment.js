import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Media from "react-bootstrap/Media";

import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../API/axiosDefaults";

import styles from "../../styles/Comment.module.css";
import feedbackStyles from "../../styles/CustomFeedback.module.css"

import { SuccessMessage, ErrorMessage } from "../../components/CustomFeedback";

const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_at, content, id, setPost,
        setComments,
    } = props;
    const [showEditForm, setShowEditForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
        if (confirmDelete) {
            try {
                await axiosRes.delete(`/comments/${id}/`);
                setSuccessMessage("Comment successfully deleted.");
                setTimeout(() => {
                    setSuccessMessage("");
                    window.location.reload();
                }, 2000);
            } catch (err) {
                /* console.log(err); */
            }
        }
    };

    return (
        <>
            {successMessage && (
                <div className={feedbackStyles.fixedMessage}>
                    <SuccessMessage message={successMessage} />
                </div>
            )}
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
                    {showEditForm ? (
                        <CommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setComments={setComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p className={styles.Comment}>{content}</p>
                    )}
                </Media.Body>
                {is_owner && !showEditForm && (
                    <div className={styles.caretIconContainer}>
                        <MoreDropdown handleEdit={() => setShowEditForm(true)} handleDelete={handleDelete} />
                    </div>
                )}
            </Media>
        </>
    );
}
export default Comment;
