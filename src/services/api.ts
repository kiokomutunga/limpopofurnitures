const API_BASE_URL = 'https://product-server-uete.onrender.com/api';

export const api = {
  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Login failed' };
        }
        return { success: false, message: errorData.message || 'Login failed' };
      }
      
      const data = await response.json();
      return { success: true, token: data.token };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  async register(userData: { name: string; email: string; phone: string; password: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Registration failed' };
        }
        return { success: false, message: errorData.message || 'Registration failed' };
      }
      
      const data = await response.json();
      return { success: true, message: data.message };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  async verifyOtp(data: { email: string; code: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'OTP verification failed' };
        }
        return { success: false, message: errorData.message || 'OTP verification failed' };
      }
      
      const result = await response.json();
      return { success: true, message: result.message };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  async getUserProfile() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('authToken');
          return { success: false, message: 'Authentication expired' };
        }
        
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Failed to fetch profile' };
        }
        return { success: false, message: errorData.message || 'Failed to fetch profile' };
      }
      
      const userData = await response.json();
      
      return { 
        success: true, 
        user: {
          id: userData._id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          isVerified: userData.isVerified
        }
      };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  async changePassword(passwordData: { currentPassword: string; newPassword: string }) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, message: 'Authentication required' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Failed to change password' };
        }
        return { success: false, message: errorData.message || 'Failed to change password' };
      }

      const result = await response.json();
      return { success: true, message: result.message };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  // Search products with filters and suggestions
  async searchProducts(params: {
    q?: string;
    cat?: string;
    min?: number;
    max?: number;
    sort?: string;
    page?: number;
    limit?: number;
  } = {}) {
    try {
      const searchParams = new URLSearchParams();
      
      if (params.q) searchParams.append('q', params.q);
      if (params.cat) searchParams.append('cat', params.cat);
      if (params.min !== undefined) searchParams.append('min', params.min.toString());
      if (params.max !== undefined) searchParams.append('max', params.max.toString());
      if (params.sort) searchParams.append('sort', params.sort);
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.limit) searchParams.append('limit', params.limit.toString());

      const response = await fetch(`${API_BASE_URL}/products/search?${searchParams}`);
      
      if (!response.ok) {
        return { success: false, message: 'Search failed' };
      }

      const data = await response.json();
      
      return {
        success: true,
        products: data.products.map((product: any) => ({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          commission: product.commission,
          stock: product.stock,
          category: product.category,
          images: product.images || [], // Use Cloudinary URLs directly
          image: product.images?.[0] || '', // Use first Cloudinary URL directly
          inStock: product.stock > 0,
          isNew: this.isNewProduct(product.createdAt),
          originalPrice: product.commission ? product.price + product.commission : undefined,
          createdAt: product.createdAt,
          reviews: product.reviews || [],
          numReviews: product.numReviews || 0,
          averageRating: product.averageRating || 0
        })),
        total: data.total,
        page: data.page,
        pages: data.pages,
        suggestions: data.suggestions || []
      };
    } catch (error) {
      console.error('Search error:', error);
      return { success: false, message: 'Search failed' };
    }
  },

  // Get search suggestions only (for autocomplete)
  async getSearchSuggestions(query: string) {
    if (!query.trim()) {
      return { success: true, suggestions: [] };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=5`);
      
      if (!response.ok) {
        return { success: false, suggestions: [] };
      }

      const data = await response.json();
      
      return {
        success: true,
        suggestions: data.suggestions || []
      };
    } catch (error) {
      console.error('Search suggestions error:', error);
      return { success: false, suggestions: [] };
    }
  },

  // Product endpoints
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const products = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          products: products.map((product: any) => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            commission: product.commission,
            stock: product.stock,
            category: product.category,
            images: product.images || [], // Use Cloudinary URLs directly
            image: product.images?.[0] || '', // Use first Cloudinary URL directly
            inStock: product.stock > 0,
            isNew: this.isNewProduct(product.createdAt),
            originalPrice: product.commission ? product.price + product.commission : undefined,
            createdAt: product.createdAt,
            reviews: product.reviews || [],
            numReviews: product.numReviews || 0,
            averageRating: product.averageRating || 0
          }))
        };
      } else {
        return {
          success: false,
          message: 'Failed to fetch products'
        };
      }
    } catch (error) {
      console.error('API getProducts error:', error);
      return {
        success: false,
        message: 'Something went wrong while fetching products.'
      };
    }
  },

  async getProductById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const products = await response.json();
      
      if (response.ok) {
        const product = products.find((p: any) => p._id === id);
        if (product) {
          return {
            success: true,
            product: {
              id: product._id,
              name: product.name,
              description: product.description,
              price: product.price,
              commission: product.commission,
              stock: product.stock,
              category: product.category,
              images: product.images || [], // Use Cloudinary URLs directly
              image: product.images?.[0] || '', // Use first Cloudinary URL directly
              inStock: product.stock > 0,
              isNew: this.isNewProduct(product.createdAt),
              originalPrice: product.commission ? product.price + product.commission : undefined,
              createdAt: product.createdAt,
              reviews: product.reviews || [],
              numReviews: product.numReviews || 0,
              averageRating: product.averageRating || 0
            }
          };
        } else {
          return {
            success: false,
            message: 'Product not found'
          };
        }
      } else {
        return {
          success: false,
          message: 'Failed to fetch product'
        };
      }
    } catch (error) {
      console.error('API getProductById error:', error);
      return {
        success: false,
        message: 'Something went wrong while fetching product.'
      };
    }
  },

  // Add product review
  async addProductReview(productId: string, reviewData: { rating: number; comment: string }) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, message: 'Authentication required' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Failed to add review' };
        }
        return { success: false, message: errorData.message || 'Failed to add review' };
      }

      const result = await response.json();
      return { success: true, message: result.message, reviews: result.reviews };
    } catch (error) {
      console.error('Add review error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  // Helper method to check if product is new
  isNewProduct(createdAt: string) {
    if (!createdAt) return false;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(createdAt) > thirtyDaysAgo;
  },

  async placeOrder(orderData: any) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, message: 'Authentication required' };
    }

    const backendOrderData = {
      items: orderData.items.map((item: any) => ({
        product: item.productId,
        quantity: item.quantity
      })),
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod,
      mpesaTransactionId: orderData.mpesaTransactionId || null,
      customerInfo: orderData.customerInfo,
      paymentStatus: orderData.paymentStatus,
      shippingAddress: orderData.shippingAddress,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(backendOrderData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Failed to place order' };
        }
        return { success: false, message: errorData.message || 'Failed to place order' };
      }

      const result = await response.json();
      return {
        success: true,
        order: {
          id: result.order._id,
          ...result.order
        }
      };
    } catch (error) {
      console.error('API placeOrder error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  },

async getUserOrders() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return { success: false, message: 'Authentication required' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/orders/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        return { success: false, message: 'Authentication expired' };
      }
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Failed to fetch orders' };
      }
      return { success: false, message: errorData.message || 'Failed to fetch orders' };
    }

    const result = await response.json();
    const ordersArray = result.orders || [];

    const transformedOrders = ordersArray.map((order: any) => ({
      id: order._id,
      date: new Date(order.createdAt).toLocaleDateString(),
      status: order.status,
      total: order.totalAmount,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      customerInfo: order.customerInfo,
      items: order.items.map((item: any) => ({
        name: item.product?.name || 'Product',
        quantity: item.quantity,
        price: item.product?.price || 0
      }))
    }));

    return {
      success: true,
      orders: transformedOrders
    };
  } catch (error) {
    console.error('API getUserOrders error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
},

async getOrderById(orderId: string) {
  const token = localStorage.getItem('authToken');

  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        return { success: false, message: 'Authentication expired' };
      }
      if (response.status === 404) {
        return { success: false, message: 'Order not found' };
      }

      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Failed to fetch order' };
      }
      return { success: false, message: errorData.message || 'Failed to fetch order' };
    }

    const result = await response.json();
    const rawOrder = result.order || result;

    return {
      success: true,
      order: {
        id: rawOrder._id,
        orderNumber: rawOrder._id,
        date: new Date(rawOrder.createdAt).toLocaleDateString(),
        status: rawOrder.status,
        total: rawOrder.totalAmount,
        paymentMethod: rawOrder.paymentMethod,
        paymentStatus: rawOrder.paymentStatus,
        customerInfo: rawOrder.customerInfo,
        shippingAddress: rawOrder.shippingAddress,
        items: (rawOrder.items || []).map((item: any) => ({
          name: item.product?.name || 'Product',
          quantity: item.quantity,
          price: item.product?.price || 0,
          product: item.product
        })),
        estimatedDelivery: rawOrder.estimatedDelivery || '2024-01-15'
      }
    };
  } catch (error) {
    console.error('API getOrderById error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.'
    };
  }
},

  async updateOrderStatus(orderId: string, status: string) {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/orders/status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      return response.json();
    } catch (error) {
      console.error('API updateOrderStatus error:', error);
      return { success: false, message: 'Failed to update order status' };
    }
  },

  async markOrderDelivered(orderId: string) {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/orders/deliver/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error('API markOrderDelivered error:', error);
      return { success: false, message: 'Failed to mark order delivered' };
    }
  },

  async cancelOrder(orderId: string) {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_BASE_URL}/orders/cancel/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error('API cancelOrder error:', error);
      return { success: false, message: 'Failed to cancel order' };
    }
  }
};
