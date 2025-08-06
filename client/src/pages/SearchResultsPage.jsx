import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../lib/axios"; // ✅ use centralized axios instance

const SearchResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/projects/search?query=${query}`); // ✅ no hardcoded baseURL
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid gap-4">
          {results.map((item) =>
            item.title ? (
              <Link to={`/projects/${item._id}`} key={item._id}>
                <div className="border p-4 rounded shadow bg-white hover:bg-gray-100 cursor-pointer">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    By {item.user?.name || item.user?.username || "Unknown"}
                  </p>
                </div>
              </Link>
            ) : (
              <div key={item._id} className="border p-4 rounded shadow bg-white">
                <h3 className="text-lg font-semibold">{item.username || item.name}</h3>
                <p className="text-gray-500">User Profile</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
