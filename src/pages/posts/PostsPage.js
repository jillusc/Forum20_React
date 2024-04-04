import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../API/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results-icon.png";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function PostsPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchPosts = async () => {
            const apiUrl = `/posts/?${filter}search=${query}`;
            try {
                const { data } = await axiosReq.get(apiUrl);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                /* console.log(err); */
            }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname, currentUser]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                {!currentUser && (
                    <div className="text-center mb-3">
                        <h1>forum20</h1>
                        <h4>Image sharing platform for 20th century art lovers.</h4>
                        <h6><Link to="/signup" className={styles.TextLink}>Join the community!</Link></h6>
                    </div>
                )}
                <PopularProfiles mobile />
                <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`} />
                <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
                    <Form.Control value={query} onChange={(event) => setQuery(event.target.value)}
                        type="text" className="mr-sm-2" placeholder="Search posts" />
                </Form>
                <p className="text-left ml-3 mt-4 mb-3">Latest posts from our members</p>
                {hasLoaded ? (
                    <>
                        {posts.results.length ? (
                            <InfiniteScroll
                                children={posts.results.map((post) => (
                                    <Post key={post.id} {...post} setPosts={setPosts} postPage={true} />
                                ))}
                                dataLength={posts.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!posts.next}
                                next={() => fetchMoreData(posts, setPosts)}
                            />
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default PostsPage;
