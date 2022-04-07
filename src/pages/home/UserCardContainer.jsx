import styles from './Sidebar.module.css';

const UserCardContainer = ({ onClose, isLoading, children }) => {

  return (
    <div className={styles.userCardContainer}>
      <div className={styles.backButton} onClick={onClose}>
        {'< Back'}
      </div>
      {!isLoading && children}
    </div>
  )
}

export default UserCardContainer;
