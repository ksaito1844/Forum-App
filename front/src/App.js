import { useState, useEffect, useRef } from "react";
import Notif from "./components/Notif";
import SignIn from "./components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers, setUser } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useParams,
  useNavigate,
} from "react-router-dom";
import NewBlog from "./components/NewBlog";
import NavigationBar from "./components/NavigationBar";
import Login from "./services/login";
import { Navigate } from "react-router-dom";
import { initializeAllUsers } from "./reducers/allUsersReducer";
import users from "./services/users";
import BlogView from "./components/BlogView";
import UserView from "./components/UserView";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const allUsers = useSelector((state) => state.allUsers);

  const padding = {
    padding: 5,
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const match1 = useMatch("/users/:id");
  const userInView = match1
    ? allUsers.find((user) => user.id === match1.params.id)
    : null;

  return (
    <div className="dark  ">
      <div>
        <div>
          <NavigationBar user={user} />

          <Routes>
            <Route path="/create" element={<NewBlog />} />
            <Route
              path="/"
              element={<BlogList user={user} setUser={setUser} />}
            />
            <Route
              path="/login"
              element={user ? <Navigate replace to="/" /> : <SignIn />}
            />
            <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
            <Route
              path="/users/:id"
              element={<UserView userInView={userInView} />}
            />
          </Routes>
        </div>
        <Notif />
      </div>
    </div>
  );
};

export default App;
