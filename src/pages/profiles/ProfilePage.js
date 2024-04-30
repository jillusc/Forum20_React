import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import InfiniteScroll from "react-infinite-scroll-component";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import feedbackStyles from "../../styles/CustomFeedback.module.css"; // Import feedbackStyles

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../API/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";

import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import Post from "../posts/Post";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import NoResults from "../../assets/no-results-icon.png";
import { ErrorMessage } from "../../components/CustomFeedback";

function ProfilePage() {
    const [errors, setErrors] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                setErrors(err.response?.data);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Container className="position-relative">
                <div className={`${styles.ProfileDropdown}`}>
                    {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
                </div>
                <div className="text-center my-3">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                        alt="Profile avatar"
                    />
                    <h2 className="m-2">{profile?.owner}</h2>
                    {profile?.content && <h6>{profile.content}</h6>}
                    {currentUser && !is_owner && (
                        <Button
                            className={`${btnStyles.Button} mt-2 mb-2`}
                            onClick={profile?.following_id ? () => handleUnfollow(profile) : () => handleFollow(profile)}
                        >
                            {profile?.following_id ? "Unfollow" : "Follow"}
                        </Button>
                    )}
                </div>
            </Container>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <h5 className={`${styles.OwnersPostsText} text-left`}>{profile?.owner}'s posts</h5>
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPosts={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={appStyles.Content}>
                    {Object.keys(errors).map((key) =>
                        Array.isArray(errors[key]) && errors[key].map((message, idx) => (
                            <div key={`${key}-${idx}`} className={feedbackStyles.fixedMessage}>
                                <ErrorMessage message={message} />
                            </div>
                        ))
                    )}
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;
