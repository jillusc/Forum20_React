import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
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
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={SquareCaret} />
            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit">
                    <i className="fa-solid fa-pencil" />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete">
                    <i className="fa-solid fa-trash-can" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};