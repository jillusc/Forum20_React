import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import Asset from "../../components/Asset";
import Comment from "./Comment";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../API/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";

const UserCommentsActivity = ({ mobile }) => {
    const currentUser = useCurrentUser();
    const [userComments, setUserComments] = useState({ results: [], loading: true, error: null });
    const [, setErrors] = useState({});

    useEffect(() => {
        const fetchUserComments = async () => {
            if (currentUser?.profile_id) {
                try {
                    const { data } = await axiosReq.get(`/comments/?user_id=${currentUser.profile_id}&user_comments=true`);

                    setUserComments({
                        results: data.results,
                        loading: false,
                        error: null
                    });
                } catch (err) {
                    setErrors(err.response?.data);
                }
            }
        };
        fetchUserComments();
    }, [currentUser?.profile_id, setErrors]);

    return (
        <Container className={appStyles.Content}>
            {userComments.loading ? (
                <Asset spinner />
            ) : (
                <InfiniteScroll
                    dataLength={userComments.results.length}
                    next={fetchMoreData}
                    hasMore={false}
                    loader={<Asset spinner />}
                >
                    {userComments.results.map(comment => (
                    <div key={comment.id}>
                        <p className="ml-3 mb-0">on post titled: {comment.post_title}</p>
                        <Comment
                            comment={comment}
                            content={comment.content}
                            id={comment.id}
                            owner={comment.owner}
                            profile_id={currentUser.profile_id}
                            profile_image={currentUser.profile_image}
                            updated_at={comment.updated_at}
                            post_title={comment.post_title}
                        />
                    </div>
                    ))}
                </InfiniteScroll>
            )}
        </Container>
    );
};

export default UserCommentsActivity;
