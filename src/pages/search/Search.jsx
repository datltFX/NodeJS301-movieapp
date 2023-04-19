import "./Search.css";
import Navbar from "../../components/Navbar/Navbar";
import SearchForm from "../../components/SearchForm/SearchForm";

const Search = () => {
  return (
    <div className="search__Container">
      <Navbar />
      <SearchForm />
    </div>
  );
};

export default Search;
