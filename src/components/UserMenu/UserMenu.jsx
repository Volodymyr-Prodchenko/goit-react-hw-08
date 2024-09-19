import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { clearContacts } from "../../redux/contacts/slice";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      dispatch(clearContacts());
    });
  };

  return (
    <div className={styles.container}>
      <span className={styles.username}>Welcome, {user.name}</span>
      <button className={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
