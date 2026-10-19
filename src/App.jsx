import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, Heart,
  Menu, Minus, Plus, Search, ShieldCheck, ShoppingBag, Sparkles, Star,
  Truck, X, RotateCcw
} from "lucide-react";

const products = [
  { id: 1, name: "Studio Wireless Headphones", category: "Tech", price: 2499, oldPrice: 3299, rating: 4.9, badge: "BESTSELLER", color: "#e5ded2", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85", description: "Immersive sound meets everyday comfort. A clean, minimal design for focused work, long playlists and everything in between." },
  { id: 2, name: "Everyday Runner Sneakers", category: "Fashion", price: 2999, oldPrice: 3999, rating: 4.8, badge: "POPULAR", color: "#e3e3df", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", description: "Lightweight comfort with a confident silhouette. Made for everyday movement, city walks and off-duty plans." },
  { id: 3, name: "Classic Minimal Watch", category: "Accessories", price: 1899, oldPrice: 2499, rating: 4.7, badge: "NEW ARRIVAL", color: "#dfe5dd", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85", description: "A timeless finishing touch. Understated detailing and a versatile profile that works from weekdays to weekends." },
  { id: 4, name: "City Explorer Backpack", category: "Accessories", price: 1599, oldPrice: 2199, rating: 4.6, badge: "", color: "#e5dcd1", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85", description: "Room for your daily essentials without the bulk. A practical carry-all for college, commutes and weekend plans." },
  { id: 5, name: "Soft Glow Desk Lamp", category: "Lifestyle", price: 1299, oldPrice: 1799, rating: 4.6, badge: "NEW ARRIVAL", color: "#e5e0d8", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85", description: "Bring a warm, considered glow to your workspace. Simple lines, soft light and a design that feels right at home." },
  { id: 6, name: "Everyday Sun Frames", category: "Fashion", price: 999, oldPrice: 1499, rating: 4.5, badge: "", color: "#e0dfd9", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85", description: "An easy-to-wear frame with a modern shape. A small detail that pulls together your everyday look." },
  { id: 7, name: "Portable Bluetooth Speaker", category: "Tech", price: 1799, oldPrice: 2299, rating: 4.8, badge: "TRENDING", color: "#dbe2e5", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85", description: "Bring your soundtrack along. Compact, easy to carry and ready for slow mornings or spontaneous get-togethers." },
  { id: 8, name: "Ceramic Coffee Set", category: "Lifestyle", price: 799, oldPrice: 1199, rating: 4.5, badge: "", color: "#e8ded2", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85", description: "Make a little ritual out of your coffee break with a simple ceramic set designed for everyday use." }
];

const money = (amount) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(amount);

function Header({ count, wishlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="announcement">A LITTLE SOMETHING EXTRA — FREE SHIPPING OVER ₹1,999</div>
      <nav className="nav container">
        <button className="mobile-menu icon-btn" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <Link to="/" className="wordmark">nexa<span>.</span></Link>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <a href="/#shop" onClick={() => setMenuOpen(false)}>Shop all</a>
          <a href="/#story" onClick={() => setMenuOpen(false)}>Our story</a>
        </div>
        <div className="nav-actions">
          <a className="wishlist-nav" href="/#shop" aria-label={`${wishlistCount} saved products`}><Heart size={19} /><span className="nav-count">{wishlistCount}</span></a>
          <Link to="/cart" className="cart-nav" aria-label={`Cart, ${count} items`}>
            <ShoppingBag size={19} /><span className="cart-label">Bag</span><span className="nav-count filled">{count}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

function ProductCard({ product, addToCart, favorites, toggleFavorite }) {
  const saved = favorites.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image-wrap" style={{ background: product.color }}>
        <Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button className={`favorite-btn ${saved ? "saved" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}>
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <button className="quick-add" onClick={() => addToCart(product)}><Plus size={16} /> Quick add</button>
      </div>
      <div className="product-details">
        <div className="product-meta"><span>{product.category}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating}</span></div>
        <Link to={`/product/${product.id}`} className="product-title">{product.name}</Link>
        <div className="product-price"><strong>{money(product.price)}</strong><del>{money(product.oldPrice)}</del></div>
      </div>
    </article>
  );
}

function Home({ addToCart, favorites, toggleFavorite }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const categories = ["All", "Tech", "Fashion", "Accessories", "Lifestyle"];

  const visibleProducts = useMemo(() => {
    let list = products.filter((p) => (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase()));
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow light"><span className="eyebrow-dot" /> THE EVERYDAY EDITION</div>
          <h1>Good things.<br /><em>Better living.</em></h1>
          <p>Thoughtfully picked essentials for your everyday. Less noise, better choices, and little things that just feel right.</p>
          <a className="button button-lime" href="#shop">Explore the collection <ArrowUpRight size={17} /></a>
          <div className="hero-bottom"><span>CURATED FOR REAL LIFE</span><span>01 — 08</span></div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90" alt="Curated fashion and lifestyle essentials" fetchPriority="high" />
          <div className="hero-image-caption"><span>THE NEW SEASON</span><strong>Find your kind of everyday.</strong></div>
          <div className="floating-stamp"><Sparkles size={17} /><span>GOOD<br />BY DESIGN</span></div>
        </div>
      </section>

      <section className="trust-strip container">
        <div><Truck size={19} /><span>Free shipping over ₹1,999</span></div>
        <i />
        <div><ShieldCheck size={19} /><span>Thoughtfully selected</span></div>
        <i />
        <div><RotateCcw size={19} /><span>Easy 7-day returns</span></div>
      </section>

      <section className="shop-section container" id="shop">
        <div className="section-heading">
          <div><span className="eyebrow">A FEW VERY GOOD THINGS</span><h2>Meet your new <em>favourites.</em></h2><p>Everyday essentials. A little more considered.</p></div>
          <span className="result-count">{visibleProducts.length.toString().padStart(2, "0")} PRODUCTS</span>
        </div>
        <div className="shop-toolbar">
          <div className="category-tabs">
            {categories.map((c) => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}
          </div>
          <div className="shop-tools">
            <label className="search-field"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." aria-label="Search products" /></label>
            <select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option>
            </select>
          </div>
        </div>
        {visibleProducts.length ? <div className="product-grid">
          {visibleProducts.map((p) => <ProductCard key={p.id} product={p} addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />)}
        </div> : <div className="empty-results"><Search size={30} /><h3>No matches this time.</h3><p>Try another search or category.</p><button className="button button-dark" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
        <div className="collection-footer"><span>GOOD DESIGN, EVERY DAY.</span><span>Showing {visibleProducts.length} of {products.length} pieces</span></div>
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="A calm, curated retail space" loading="lazy" /></div>
        <div className="story-copy"><span className="eyebrow light">A NOTE FROM NEXA</span><h2>Less, but<br /><em>so much better.</em></h2><p>We believe the everyday deserves a little more thought. Nexa is a concept store for useful things, considered design and small upgrades that make ordinary days feel special.</p><a href="#shop" className="story-link">A better everyday starts here <ArrowRight size={17} /></a><span className="story-mark">n.</span></div>
      </section>

      <section className="newsletter container">
        <div><span className="eyebrow">THE GOOD STUFF, OCCASIONALLY</span><h2>A little note from us.</h2><p>New finds, thoughtful picks and no unnecessary noise.</p></div>
        <NewsletterForm />
      </section>
    </>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setSubmitted(true); }}>
    {submitted ? <div className="newsletter-success"><Check size={18} /> You're on the list (demo).</div> : <>
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" aria-label="Subscribe"><ArrowRight size={19} /></button>
    </>}
    <small>By subscribing, you agree to receive occasional updates.</small>
  </form>;
}

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const [added, setAdded] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  if (!product) return <main className="container not-found"><h1>That product wandered off.</h1><Link className="button button-dark" to="/">Back to shop</Link></main>;
  return <main className="container product-page">
    <button className="back-link" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back to the collection</button>
    <div className="product-page-grid">
      <div className="product-page-image" style={{ background: product.color }}><img src={product.image} alt={product.name} /></div>
      <div className="product-page-copy"><span className="eyebrow">{product.category.toUpperCase()} / NEXA EDIT</span><h1>{product.name}</h1><div className="detail-rating"><Star size={15} fill="currentColor" /> {product.rating} <span>· Curated customer favourite</span></div><div className="detail-price"><strong>{money(product.price)}</strong><del>{money(product.oldPrice)}</del><span>{Math.round((1 - product.price / product.oldPrice) * 100)}% OFF</span></div><p className="detail-description">{product.description}</p><div className="detail-actions"><button className="button button-lime" onClick={() => { addToCart(product); setAdded(true); }}><ShoppingBag size={18} /> {added ? "Add one more" : "Add to bag"} <ArrowUpRight size={17} /></button><span className="secure-note"><ShieldCheck size={15} /> Safe and simple checkout experience</span></div><div className="product-perks"><div><Truck size={18} /><span><strong>Shipping</strong><small>Free over ₹1,999</small></span></div><div><RotateCcw size={18} /><span><strong>Returns</strong><small>Within 7 days</small></span></div><div><ShieldCheck size={18} /><span><strong>Quality</strong><small>Selected with care</small></span></div></div></div>
    </div>
    <section className="you-may-like"><div className="section-heading"><div><span className="eyebrow">KEEP EXPLORING</span><h2>More good things.</h2></div><Link to="/" className="text-arrow">Shop all <ArrowRight size={16} /></Link></div><div className="related-grid">{products.filter((p) => p.id !== product.id).slice(0, 3).map((p) => <ProductCard key={p.id} product={p} addToCart={addToCart} favorites={[]} toggleFavorite={() => {}} />)}</div></section>
  </main>;
}

function CartPage({ cart, updateQuantity, removeItem }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [checkoutMessage, setCheckoutMessage] = useState(false);
  return <main className="container cart-page">
    <span className="eyebrow">YOUR NEXA BAG</span><h1>Your picks<span>.</span></h1><p className="cart-intro">{count ? `${count} lovely ${count === 1 ? "thing" : "things"} in your bag.` : "A little space for something good."}</p>
    {!cart.length ? <div className="cart-empty"><div className="empty-bag-icon"><ShoppingBag size={30} /></div><h2>Your bag is waiting.</h2><p>Go find something that feels like you.</p><Link className="button button-dark" to="/">Explore the collection <ArrowRight size={16} /></Link></div> : <div className="cart-layout">
      <div className="cart-list">{cart.map((item) => <article className="cart-item" key={item.id}><Link to={`/product/${item.id}`} className="cart-item-image"><img src={item.image} alt={item.name} /></Link><div className="cart-item-info"><span>{item.category}</span><Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link><strong>{money(item.price)}</strong><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(item.id, 1)}><Plus size={13} /></button></div></div><button className="remove-item" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}><X size={17} /></button></article>)}</div>
      <aside className="order-card"><h2>The little details</h2><div><span>Subtotal</span><strong>{money(total)}</strong></div><div><span>Shipping</span><strong>{total >= 1999 ? "On us" : money(99)}</strong></div><div className="order-total"><span>Total</span><strong>{money(total + (total >= 1999 ? 0 : 99))}</strong></div><button className="button button-lime checkout-btn" onClick={() => setCheckoutMessage(true)}>Continue to checkout <ArrowUpRight size={17} /></button>{checkoutMessage && <p className="demo-message">This is a demo storefront. Real checkout requires a backend and payment provider.</p>}<small>Taxes included where applicable. No real payment is collected.</small></aside>
    </div>}
  </main>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-top"><div><Link to="/" className="wordmark">nexa<span>.</span></Link><p>Good things. Better living.</p></div><div className="footer-links"><a href="/#shop">Shop</a><a href="/#story">Our story</a><a href="mailto:hello@nexa.example">Contact</a></div><span className="footer-note">A CONCEPT STORE BUILT FOR EVERYDAY.</span></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Nexa Store</span><span>Made with a little more thought <Heart size={12} /></span></div></footer>;
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("nexa-cart") || "[]"); } catch { return []; }
  });
  const [favorites, setFavorites] = useState([]);
  useEffect(() => { localStorage.setItem("nexa-cart", JSON.stringify(cart)); }, [cart]);
  const addToCart = (product) => setCart((current) => {
    const found = current.find((item) => item.id === product.id);
    return found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
  });
  const updateQuantity = (id, amount) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  const removeItem = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return <><Header count={count} wishlistCount={favorites.length} /><Routes>
    <Route path="/" element={<Home addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />} />
    <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
    <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} />
    <Route path="*" element={<main className="container not-found"><span className="eyebrow">404 / WRONG TURN</span><h1>This page took a little detour.</h1><Link to="/" className="button button-dark">Back to the good stuff <ArrowRight size={16} /></Link></main>} />
  </Routes><Footer /></>;
}