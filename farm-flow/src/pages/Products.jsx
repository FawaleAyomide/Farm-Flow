import { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import userAvatar from "../Images/userAvatar.svg";
import {
  RiNotification2Line,
  RiShoppingCartLine,
  RiSearchLine,
  RiFilter3Line,
  RiHeart3Line,
  RiHeart3Fill,
} from "react-icons/ri";
import BottomNav from "../components/BottomNav";
import "./Products.css";

const Products = () => {
  const { user } = useAuth();
  const { favourites, toggleFavourite, addToCart, cart } = useShop();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all products once
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://farmarket.up.railway.app/api/products`);
      const data = await res.json();

      const fetched = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.products)
        ? data.products
        : [];

      setProducts(fetched);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`https://farmarket.up.railway.app/api/categories`);
      const data = await res.json();

      const catList = data.data || [];
      const catMap = {};
      catList.forEach((c) => {
        catMap[c._id] = c.name;
      });

      setCategories(["All", ...catList.map((c) => c.name)]);
      setCategoryMap(catMap);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Filter + search logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const productCategoryName = categoryMap[p.category] || "Uncategorized";
    const matchesFilter =
      filter === "All" || productCategoryName === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div className="user-info">
          <img src={userAvatar} alt="User" className="user-avatar" />
          <div className="user-text">
            <p className="welcome-text">Welcome</p>
            <h3 className="user-name">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : "User"}
            </h3>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/checkout" className="basket-btn">
            <RiShoppingCartLine className="cart" size={20} />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>
          <RiNotification2Line className="notification" size={20} />
        </div>
      </div>

      {/* Search bar */}
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <RiSearchLine className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Explore"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <RiFilter3Line size={30} className="filter-btn" />
      </div>

      {/* Category filters */}
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <h3 className="explore">Explore your Categories</h3>

      {/* Products Grid */}
      {loading ? (
        <p className="loader">Loading products...</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((p) => {
            const isFav = favourites.find((f) => f.id === p.id);
            const categoryName = categoryMap[p.category] || "Uncategorized";

            return (
              <div key={p._id} className="product-card">
                <div className="image-wrapper">
                  <img
                    src={p.images?.[0]?.url || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="product-image"
                  />
                </div>
                <div className="cat-wrapper">
                  <span className="product-category">{categoryName}</span>
                  <div
                    className={`fav-btn ${isFav ? "active" : ""}`}
                    onClick={() => toggleFavourite(p)}
                  >
                    {isFav ? (
                      <RiHeart3Fill size={18} className="heart-fill" />
                    ) : (
                      <RiHeart3Line size={18} className="heart-line" />
                    )}
                  </div>
                </div>
                <div className="pn-wrapper">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">
                    ₦{p.pricePerUnit?.toLocaleString() || "N/A"}
                  </p>
                </div>
                <button className="add-to-cart" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
                <Link to={`/product/${p._id}`} className="see-details">
                  See Details
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <div className="bottom-nav-wrapper">
        <BottomNav />
      </div>
    </div>
  );
};

export default Products;


// import { useState, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useAuth } from "../Auth/AuthProvider";
// import { Link } from "react-router-dom";
// import { useShop } from "../context/ShopContext";
// import userAvatar from "../Images/userAvatar.svg";
// import {
//   RiNotification2Line,
//   RiShoppingCartLine,
//   RiSearchLine,
//   RiFilter3Line,
//   RiHeart3Line,
//   RiHeart3Fill,
// } from "react-icons/ri";
// import BottomNav from "../components/BottomNav";
// import "./Products.css";

// const Products = () => {
//   const { user } = useAuth();
//   const { favourites, toggleFavourite, addToCart, cart } = useShop();

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]); // ✅ full category objects
//   const [hasMore, setHasMore] = useState(true);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch products
// const fetchProducts = async (pageNum = 1) => {
//   try {
//     setLoading(true);
//     const res = await fetch(
//       `https://farmarket.up.railway.app/api/products?page=${pageNum}`
//     );
//     const data = await res.json();

//     if (!res.ok) throw new Error(data.message || "Failed to fetch products");

//     // ✅ Handle different backend response formats
//     const fetched = Array.isArray(data.data)
//       ? data.data
//       : Array.isArray(data.products)
//       ? data.products
//       : Array.isArray(data.items)
//       ? data.items
//       : [];

//     console.log("Fetched products:", fetched);

//     setProducts((prev) => (pageNum === 1 ? fetched : [...prev, ...fetched]));

//     // ✅ Stop infinite scroll if no more
//     if (fetched.length === 0 || fetched.length < 10) {
//       setHasMore(false);
//     }
//   } catch (err) {
//     console.error("Error fetching products:", err);
//   } finally {
//     setLoading(false);
//   }
// };

//   // ✅ Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await fetch(
//         "https://farmarket.up.railway.app/api/categories"
//       );
//       const data = await res.json();

//       if (!res.ok)
//         throw new Error(data.message || "Failed to fetch categories");

//       // Keep full category objects (we need _id + name)
//       setCategories(data.data);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   // ✅ Fetch on mount
//   useEffect(() => {
//     fetchProducts(1);
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//   console.log("Products:", products);
//   console.log("Categories:", categories);
// }, [products, categories]);

//   // ✅ Infinite scroll
//   const fetchMoreProducts = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     fetchProducts(nextPage);
//   };

//   // ✅ Filter + search logic
//   const filteredProducts = products.filter((p) => {
//     const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());

//     // Match filter by category name or ID
//     const categoryObj = categories.find((c) => c._id === p.category);
//     const productCategoryName =
//       p.category?.name || categoryObj?.name || "Uncategorized";

//     const matchesFilter = filter === "All" || productCategoryName === filter;

//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="products-page">
//       {/* Header */}
//       <div className="products-header">
//         <div className="user-info">
//           <img src={userAvatar} alt="User" className="user-avatar" />
//           <div className="user-text">
//             <p className="welcome-text">Welcome</p>
//             <h3 className="user-name">
//               {user?.firstName && user?.lastName
//                 ? `${user.firstName} ${user.lastName}`
//                 : "User"}
//             </h3>
//           </div>
//         </div>
//         <div className="header-actions">
//           <Link to="/checkout" className="basket-btn">
//             <RiShoppingCartLine className="cart" size={20} />
//             {cart.length > 0 && (
//               <span className="cart-count">{cart.length}</span>
//             )}
//           </Link>
//           <RiNotification2Line className="notification" size={20} />
//         </div>
//       </div>

//       {/* Search bar */}
//       <div className="search-bar-wrapper">
//         <div className="search-bar">
//           <RiSearchLine className="search-icon" size={20} />
//           <input
//             type="text"
//             placeholder="Explore"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <RiFilter3Line size={30} className="filter-btn" />
//       </div>

//       {/* Category filters */}
//       <div className="filter-buttons">
//         <button
//           className={filter === "All" ? "active" : ""}
//           onClick={() => setFilter("All")}
//         >
//           All
//         </button>
//         {categories.map((cat) => (
//           <button
//             key={cat._id}
//             className={filter === cat.name ? "active" : ""}
//             onClick={() => setFilter(cat.name)}
//           >
//             {cat.name}
//           </button>
//         ))}
//       </div>

//       <h3 className="explore">Explore your Categories</h3>

//       {/* Products Grid */}
//       <InfiniteScroll
//         dataLength={filteredProducts.length}
//         next={fetchMoreProducts}
//         hasMore={hasMore}
//         loader={<p className="loader">Loading more products...</p>}
//         endMessage={
//           <p className="end-message">You have seen all products 🎉</p>
//         }
//         className="products-grid"
//       >
//         {filteredProducts.map((p) => {
//           const isFav = favourites.find((f) => f.id === p.id);
//           const categoryObj = categories.find((c) => c._id === p.category);
//           const categoryName =
//             p.category?.name || categoryObj?.name || "Uncategorized";

//           return (
//             <div key={p.id} className="product-card">
//               <div className="image-wrapper">
//                 <img
//                   src={p.images?.[0]?.url || "https://via.placeholder.com/150"}
//                   alt={p.name}
//                   className="product-image"
//                 />
//               </div>

//               <div className="cat-wrapper">
//                 <span className="product-category">{categoryName}</span>
//                 <div
//                   className={`fav-btn ${isFav ? "active" : ""}`}
//                   onClick={() => toggleFavourite(p)}
//                 >
//                   {isFav ? (
//                     <RiHeart3Fill size={18} className="heart-fill" />
//                   ) : (
//                     <RiHeart3Line size={18} className="heart-line" />
//                   )}
//                 </div>
//               </div>

//               <div className="pn-wrapper">
//                 <h3 className="product-name">{p.name}</h3>
//                 <p className="product-price">
//                   ₦{p.pricePerUnit?.toLocaleString() || p.price || "N/A"}
//                 </p>
//               </div>

//               <button className="add-to-cart" onClick={() => addToCart(p)}>
//                 Add to Cart
//               </button>

//               <Link to={`/product/${p.id}`} className="see-details">
//                 See Details
//               </Link>
//             </div>
//           );
//         })}
//       </InfiniteScroll>

//       <div className="bottom-nav-wrapper">
//         <BottomNav />
//       </div>
//     </div>
//   );
// };

// export default Products;
