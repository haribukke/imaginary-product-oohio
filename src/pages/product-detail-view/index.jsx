import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../../components/ui/Header';
import PerformanceMonitor from '../../components/ui/PerformanceMonitor';
import AssessmentProgressIndicator from '../../components/ui/AssessmentProgress';
import { ErrorBoundaryStatusIndicator } from '../../components/ui/ErrorBoundaryStatus';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductConfiguration from './components/ProductConfiguration';
import ProductSpecifications from './components/ProductSpecifications';
import RelatedProducts from './components/RelatedProducts';
import CustomerReviews from './components/CustomerReviews';
import Icon from '../../components/AppIcon';

import { upsertItem } from '../../redux/slices/cartSlice';
import { MOCK_PRODUCT_DETAIL } from '../../constants/products';

const ProductDetailView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll position:', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadProduct = () => {
      try {
        // Simulate product data loading
        setTimeout(() => {
          setProduct(MOCK_PRODUCT_DETAIL);
          setLoading(false);
        }, 100);
      } catch (error) {
        throw new Error('ERR_PROD_LOAD_FAIL');
      }
    };

    loadProduct();
  }, [location?.search]);



  const handleAddToCart = (configuredProduct) => {
    console.log('Adding to cart:', configuredProduct);
    // Add required fields for cart item
    const cartItem = {
        id: configuredProduct.id || Date.now(), // Fallback ID if configuredProduct doesn't have it
        name: configuredProduct.name,
        price: configuredProduct.price,
        quantity: configuredProduct.quantity,
        image: configuredProduct.image || product.images[0].url, // Use first valid image
        category: product.category
    };
    
    dispatch(upsertItem(cartItem));
    alert(`Updated cart: ${configuredProduct?.quantity}x ${configuredProduct?.name}`);
  };

  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'Info' },
  { id: 'specifications', label: 'Specifications', icon: 'FileText' },
  { id: 'reviews', label: 'Reviews', icon: 'Star' }];


  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <PerformanceMonitor />
        <AssessmentProgressIndicator />
        <ErrorBoundaryStatusIndicator hasActiveErrors={false} />
        
        <div className="pt-[76px] px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PerformanceMonitor />
      <AssessmentProgressIndicator />
      <ErrorBoundaryStatusIndicator hasActiveErrors={true} />
      <div className="pt-[76px] px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-6 md:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm md:text-base mb-6 md:mb-8 overflow-x-auto">
            <button
              onClick={() => navigate('/product-assessment-dashboard')}
              className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">

              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            <span className="text-foreground font-medium truncate">{product?.name}</span>
          </nav>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
            {/* Left Column - Images */}
            <div>
              <ProductImageGallery images={product?.images} productName={product?.name} />
            </div>

            {/* Right Column - Info & Configuration */}
            <div className="space-y-6 md:space-y-8">
              <ProductInfo product={product} />
              <ProductConfiguration product={product} onAddToCart={handleAddToCart} />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-8 md:mb-12">
            <div className="border-b border-border overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                      flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 font-medium transition-all whitespace-nowrap
                      ${activeTab === tab?.id ?
                  'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}
                    `
                  }>

                    <Icon name={tab?.icon} size={18} />
                    <span className="text-sm md:text-base">{tab?.label}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="py-6 md:py-8">
              {activeTab === 'overview' &&
              <div className="prose prose-sm md:prose-base max-w-none">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                    Product Overview
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product?.description}
                  </p>
                </div>
              }

              {activeTab === 'specifications' &&
              <ProductSpecifications specifications={product?.specifications} />
              }

              {activeTab === 'reviews' &&
              <CustomerReviews
                productId={product?.id}
                averageRating={product?.rating}
                totalReviews={product?.reviewCount} />

              }
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts currentProductId={product?.id} category={product?.category} />
        </div>
      </div>
    </div>);

};

export default ProductDetailView;