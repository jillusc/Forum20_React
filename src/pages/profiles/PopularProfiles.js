import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

const PopularProfiles = ({ mobile }) => {
    const { popularProfiles } = useProfileData();

    return (
        <Container className={`${appStyles.Content}
        ${mobile && "d-lg-none text-center mb-3"}`}>
            {popularProfiles.results.length ? (
                <>
                    <p>Most followed profiles</p>
                    <div className={mobile ? "d-flex justify-content-around" : ""}>
                        {popularProfiles.results.slice(0, 4).map((profile) => (
                            <Link key={profile.id} to={`/profile/${profile.username}`} className={appStyles.Link}>
                                <Profile profile={profile} mobile />
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles;
