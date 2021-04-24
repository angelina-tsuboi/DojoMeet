import Search from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import styles from "./Searchbar.module.css";
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({onChange, placeholder}) => {
    return (

      <div className={styles.search}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>


    );
  };

  export default SearchBar;