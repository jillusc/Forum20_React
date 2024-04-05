import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";
import styles from "../styles/MoreDropdown.module.css";

const SquareCaret = React.forwardRef(({ onClick }, ref) => (
    <i
        className={`fa-solid fa-square-caret-down ${styles.caretIcon}`}
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className={`ml-auto ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={SquareCaret} />
            <Dropdown.Menu className="text-center" popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className="fa-solid fa-pencil" /> Edit
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className="fas fa-trash-alt" /> Delete
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const ProfileEditDropdown = ({ id }) => {
    const history = useHistory();

    return (
        <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={SquareCaret} />
            <Dropdown.Menu>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <i className="fa-solid fa-pencil" /> Edit Profile
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >
                    <i className="fas fa-user-cog" /> Change Username
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <i className="fas fa-user-lock" /> Change Password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};