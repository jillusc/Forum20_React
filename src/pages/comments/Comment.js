import React, { useState } from "react";
import { Link } from "react-router-dom";

import Media from "react-bootstrap/Media";

import Avatar from "../../components/Avatar";
import MoreDropdown from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../API/axiosDefaults";

import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_at, content, id, setPost,
        setComments,
    } = props;
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            // console.log('Attempting to delete comment with ID:', id);
            await axiosRes.delete(`/comments/${id}/`);
            // console.log('Comment deleted successfully'); 
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count - 1,
                    },
                ],
            }));


            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch (err) { }
    };

    return (
        <>
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
                    <MoreDropdown handleEdit={() => setShowEditForm(true)} handleDelete={handleDelete} />
                )}
            </Media>
        </>
    );
}
export default Comment;
