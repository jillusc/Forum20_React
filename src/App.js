import { Route, Switch } from "react-router-dom";

import styles from "./App.module.css";

import Container from "react-bootstrap/Container";

import "./API/axiosDefaults";

import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

import { useCurrentUser } from "./contexts/CurrentUserContext";

import SignUpForm from "./pages/auth/SignUpForm";
import LogInForm from "./pages/auth/LogInForm";

import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";

import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import UserActivity from "./pages/user_activity/UserActivity";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/feed" render={() => (<PostsPage message="No results found. Try a different keyword or follow a user." filter={`owner__followed__owner__profile=${profile_id}&`} />)} />
          <Route exact path="/activity" render={() => <UserActivity />} />
          <Route exact path="/" render={() => (<PostsPage isHomePage={true} message="No results found. Please try a different keyword." />)} />
          <Route exact path="/login" render={() => <LogInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
