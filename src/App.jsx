import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Leaf, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Plus, Heart } from 'lucide-react';
import { PLANTS } from './data';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['Tất cả', 'Bonsai', 'Trong nhà', 'Để bàn', 'Dễ chăm sóc'];

  const filteredPlants = activeCategory === 'Tất cả'
    ? PLANTS
    : PLANTS.filter(p => p.category === activeCategory);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`glass ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <a href="#" className="logo">
            <Leaf size={28} />
            <span>GreenGarden</span>
          </a>
          <div className="nav-links">
            <a href="#home">Trang chủ</a>
            <a href="#shop">Cửa hàng</a>
            <a href="#about">Về chúng tôi</a>
            <a href="#contact">Liên hệ</a>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Search size={22} style={{ cursor: 'pointer' }} />
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setCartCount(c => c + 1)}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'var(--accent)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero" style={{ backgroundImage: 'url("/images/hero.png")' }}>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Mang Thiên Nhiên Vào Ngôi Nhà Của Bạn</h1>
            <p>Khám phá bộ sưu tập cây cảnh tuyển chọn từ những nghệ nhân tâm huyết nhất. Mỗi cái cây là một câu chuyện, một linh hồn cho tổ ấm của bạn.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-primary" onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}>
                Mua ngay
              </button>
              <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                Tìm hiểu thêm
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section id="shop">
        <div className="container">
          <div className="section-title">
            <h2>Sản Phẩm Nổi Bật</h2>
            <p>Chọn lọc những mẫu cây đẹp nhất và dễ chăm sóc nhất cho bạn.</p>
          </div>

          <div className="categories-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="product-grid"
          >
            <AnimatePresence>
              {filteredPlants.map(plant => (
                <motion.div
                  key={plant.id}
                  className="product-card"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={plant.image} alt={plant.name} className="product-image" />
                  <div className="product-info">
                    <span className="product-category">{plant.category}</span>
                    <h3 className="product-name">{plant.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                      <span className="product-price">{plant.price}</span>
                      <button className="add-to-cart" onClick={() => setCartCount(c => c + 1)}>
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: '16px', right: '16px', color: 'rgba(0,0,0,0.3)', cursor: 'pointer' }}>
                    <Heart size={20} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="/images/monstera.png" alt="About" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)' }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '36px', color: 'var(--primary)', marginBottom: '24px' }}>Hơn Cả Một Cửa Hàng</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
                Chúng tôi tin rằng cây xanh không chỉ là vật trang trí. Chúng mang lại sự bình yên, cải thiện chất lượng không khí và biến ngôi nhà thành một tổ ấm thực sự.
              </p>
              <ul style={{ listStyle: 'none', marginBottom: '32px' }}>
                {['Chọn lọc từ vườn nhà', 'Tư vấn chăm sóc trọn đời', 'Giao hàng nhanh trong 2h', 'Bảo hành 1 đổi 1'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontWeight: '500' }}>
                    <Leaf size={18} color="var(--primary)" /> {item}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary">Tìm hiểu câu chuyện của chúng tôi</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="glass" style={{ padding: '60px', borderRadius: 'var(--radius-lg)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
            <div>
              <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Cần thêm tư vấn?</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>Hãy để lại thông tin, đội ngũ nghệ nhân của chúng tôi sẽ liên hệ trong vòng 30 phút.</p>
              <div style={{ display: 'grid', gap: '16px' }}>
                <input type="text" placeholder="Họ và tên" style={{ padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', width: '100%' }} />
                <input type="email" placeholder="Email" style={{ padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', width: '100%' }} />
                <textarea placeholder="Nội dung cần tư vấn..." rows="4" style={{ padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', width: '100%' }}></textarea>
                <button className="btn btn-primary" style={{ width: '100%' }}>Gửi yêu cầu</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--secondary)', padding: '12px', borderRadius: '50%' }}><MapPin color="var(--primary)" /></div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Địa chỉ</h4>
                  <p style={{ color: 'var(--text-light)' }}>123 Đường Cây Xanh, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--secondary)', padding: '12px', borderRadius: '50%' }}><Phone color="var(--primary)" /></div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Số điện thoại</h4>
                  <p style={{ color: 'var(--text-light)' }}>(+84) 90 123 4567</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--secondary)', padding: '12px', borderRadius: '50%' }}><Mail color="var(--primary)" /></div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Email</h4>
                  <p style={{ color: 'var(--text-light)' }}>hello@greengarden.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <a href="#" className="logo footer-logo">
                <Leaf size={28} />
                <span>GreenGarden</span>
              </a>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Chúng tôi mang sắc xanh và sự sống đến không gian của bạn. Chuyên cung cấp các loại cây cảnh nội ngoại thất cao cấp.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Facebook size={20} style={{ cursor: 'pointer' }} />
                <Instagram size={20} style={{ cursor: 'pointer' }} />
                <Twitter size={20} style={{ cursor: 'pointer' }} />
              </div>
            </div>
            <div className="footer-col">
              <h4>Liên kết nhanh</h4>
              <ul>
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Sản phẩm</a></li>
                <li><a href="#">Chăm sóc cây</a></li>
                <li><a href="#">Giao hàng</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Hỗ trợ</h4>
              <ul>
                <li><a href="#">Trung tâm trợ giúp</a></li>
                <li><a href="#">Chính sách bảo hành</a></li>
                <li><a href="#">Hoàn trả</a></li>
                <li><a href="#">Điều khoản</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Đăng ký tin tức</h4>
              <p style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-light)' }}>Nhận ngay ưu đãi 10% cho đơn hàng đầu tiên.</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" placeholder="Email" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', flex: 1 }} />
                <button className="btn btn-primary" style={{ padding: '8px 16px' }}>Gửi</button>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '40px', borderTop: '1px solid rgba(0,0,0,0.05)', color: 'var(--text-light)', fontSize: '14px' }}>
            <p>© 2026 GreenGarden. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
