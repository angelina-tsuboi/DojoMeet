import Search from '@material-ui/icons/Search';
import styles from "./Searchbar.module.css";

const SearchBar = ({onChange, placeholder}) => {
    return (

      <div className={styles.wrap}>
      <div className={styles.search}>
        <input type="text" className={styles.searchTerm}
        onChange={onChange}
        placeholder={placeholder} />
        <button type="submit" className={styles.searchButton}>
        <Search />
        </button>
      </div>
      </div>
    );
  };

  export default SearchBar;