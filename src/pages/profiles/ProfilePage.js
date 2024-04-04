import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Image, Col, Row, Container } from "react-bootstrap";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../API/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import Post from "../posts/Post";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import NoResults from "../../assets/no-results-icon.png";
import InfiniteScroll from "react-infinite-scroll-component";

function ProfilePage() {
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
                const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
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
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center align-items-center">
                <Col lg={12}>
                    <Row className="justify-content-between align-items-center">
                        <Col xs={3} className="text-left">
                            <Image
                                className={styles.ProfileImage}
                                roundedCircle
                                src={profile?.image}
                            />
                        </Col>
                        <Col xs={6} className="text-center">
                            <h3 className="m-2">{profile?.owner}</h3>
                        </Col>
                        <Col xs={3} className="text-right">
                            {currentUser && !is_owner && (profile?.following_id ? (
                                <Button className={`${btnStyles.Button} ${styles.button}`} onClick={() => handleUnfollow(profile)}>
                                    Unfollow
                                </Button>
                            ) : (
                                <Button className={`${btnStyles.Button} ${styles.button}`} onClick={() => handleFollow(profile)}>
                                    Follow
                                </Button>
                            ))}
                        </Col>
                    </Row>
                </Col>
                {profile?.content && <Col className="p-3">{profile.content}</Col>}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s posts</p>
            <hr />
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
