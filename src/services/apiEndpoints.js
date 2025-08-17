/**
 * API Endpoints Configuration
 * Based on Swagger Documentation: http://foodapp-env.eba-db8ewiut.eu-north-1.elasticbeanstalk.com/swagger-ui/index.html
 */

// Base API URL
export const API_BASE_URL = 'https://foodapp-env.eba-db8ewiut.eu-north-1.elasticbeanstalk.com/api/v1';

// User Controller Endpoints
export const USER_ENDPOINTS = {
    REGISTER: '/user/register',
    LOGIN: '/user/login',
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    FORGOT_PASSWORD: '/user/forgot-password',
    RESET_PASSWORD: '/user/reset-password',
    VERIFY_EMAIL: '/user/verify-email',
    RESEND_VERIFICATION: '/user/resend-verification'
};

// Restaurant Controller Endpoints
export const RESTAURANT_ENDPOINTS = {
    GET_ALL: '/restaurants',
    GET_BY_ID: (id) => `/restaurants/${id}`,
    CREATE: '/admin/restaurants',
    UPDATE: (id) => `/admin/restaurants/${id}`,
    DELETE: (id) => `/admin/restaurants/${id}`,
    UPDATE_STATUS: (id) => `/admin/restaurants/${id}/status`,
    SEARCH: '/restaurants/search',
    GET_BY_CATEGORY: '/restaurants/category',
    GET_BY_LOCATION: '/restaurants/location',
    ADD_TO_FAVORITES: (id) => `/restaurants/${id}/add-favorites`,
    REMOVE_FROM_FAVORITES: (id) => `/restaurants/${id}/remove-favorites`,
    GET_FAVORITES: '/restaurants/favorites'
};

// Category Controller Endpoints
export const CATEGORY_ENDPOINTS = {
    GET_ALL: '/category',
    GET_BY_ID: (id) => `/category/${id}`,
    CREATE: '/admin/category',
    UPDATE: (id) => `/admin/category/${id}`,
    DELETE: (id) => `/admin/category/${id}`,
    GET_BY_RESTAURANT: (restaurantId) => `/category/restaurant/${restaurantId}`,
    GET_POPULAR: '/category/popular'
};

// Event Controller Endpoints
export const EVENT_ENDPOINTS = {
    GET_ALL: '/events',
    GET_BY_ID: (id) => `/events/${id}`,
    CREATE: '/admin/events',
    UPDATE: (id) => `/admin/events/${id}`,
    DELETE: (id) => `/admin/events/${id}`,
    GET_BY_RESTAURANT: (restaurantId) => `/events/restaurant/${restaurantId}`,
    GET_UPCOMING: '/events/upcoming',
    GET_BY_DATE: '/events/date'
};

// Cart Controller Endpoints
export const CART_ENDPOINTS = {
    GET: '/cart',
    ADD_ITEM: '/cart/add',
    UPDATE_ITEM: (itemId) => `/cart/items/${itemId}`,
    REMOVE_ITEM: (itemId) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear',
    CHECKOUT: '/cart/checkout',
    GET_TOTAL: '/cart/total',
    APPLY_COUPON: '/cart/apply-coupon',
    REMOVE_COUPON: '/cart/remove-coupon'
};

// Order Controller Endpoints
export const ORDER_ENDPOINTS = {
    GET_ALL: '/orders',
    GET_BY_ID: (id) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id) => `/orders/${id}`,
    CANCEL: (id) => `/orders/${id}/cancel`,
    GET_BY_STATUS: '/orders/status',
    GET_BY_RESTAURANT: (restaurantId) => `/orders/restaurant/${restaurantId}`,
    GET_TRACKING: (id) => `/orders/${id}/tracking`,
    UPDATE_STATUS: (id) => `/orders/${id}/status`
};

// Payment Controller Endpoints
export const PAYMENT_ENDPOINTS = {
    CREATE_PAYMENT: '/payments',
    GET_PAYMENT: (id) => `/payments/${id}`,
    UPDATE_PAYMENT: (id) => `/payments/${id}`,
    REFUND_PAYMENT: (id) => `/payments/${id}/refund',
    GET_PAYMENT_METHODS: '/payments/methods',
    ADD_PAYMENT_METHOD: '/payments/methods',
    REMOVE_PAYMENT_METHOD: (id) => `/payments/methods/${id}`
};

// Review Controller Endpoints
export const REVIEW_ENDPOINTS = {
    GET_ALL: '/reviews',
    GET_BY_ID: (id) => `/reviews/${id}`,
    CREATE: '/reviews',
    UPDATE: (id) => `/reviews/${id}`,
    DELETE: (id) => `/reviews/${id}`,
    GET_BY_RESTAURANT: (restaurantId) => `/reviews/restaurant/${restaurantId}`,
    GET_BY_USER: '/reviews/user',
    GET_RATING_SUMMARY: (restaurantId) => `/reviews/restaurant/${restaurantId}/rating-summary`
};

// Notification Controller Endpoints
export const NOTIFICATION_ENDPOINTS = {
    GET_ALL: '/notifications',
    GET_BY_ID: (id) => `/notifications/${id}`,
    MARK_AS_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_AS_READ: '/notifications/read-all',
    DELETE: (id) => `/notifications/${id}`,
    GET_UNREAD_COUNT: '/notifications/unread-count',
    UPDATE_PREFERENCES: '/notifications/preferences'
};

// Address Controller Endpoints
export const ADDRESS_ENDPOINTS = {
    GET_ALL: '/addresses',
    GET_BY_ID: (id) => `/addresses/${id}`,
    CREATE: '/addresses',
    UPDATE: (id) => `/addresses/${id}`,
    DELETE: (id) => `/addresses/${id}`,
    SET_DEFAULT: (id) => `/addresses/${id}/default',
    GET_DEFAULT: '/addresses/default'
};

// File Upload Endpoints
export const FILE_ENDPOINTS = {
    UPLOAD_IMAGE: '/files/upload/image',
    UPLOAD_DOCUMENT: '/files/upload/document',
    DELETE_FILE: (filename) => `/files/${filename}`,
    GET_FILE: (filename) => `/files/${filename}`
};

// Health Check Endpoints
export const HEALTH_ENDPOINTS = {
    HEALTH: '/health',
    READINESS: '/health/readiness',
    LIVENESS: '/health/liveness'
};

// API Response Status Codes
export const API_STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
};

// API Response Structure
export const API_RESPONSE_STRUCTURE = {
    SUCCESS: {
        message: 'string',
        payload: 'any',
        timestamp: 'string',
        status: 'number'
    },
    ERROR: {
        message: 'string',
        error: 'string',
        timestamp: 'string',
        status: 'number',
        path: 'string'
    }
};

// Pagination Parameters
export const PAGINATION_DEFAULTS = {
    PAGE: 0,
    SIZE: 10,
    MAX_SIZE: 100
};

// Search Parameters
export const SEARCH_PARAMS = {
    KEYWORD: 'keyword',
    CATEGORY: 'category',
    LOCATION: 'location',
    PRICE_RANGE: 'priceRange',
    RATING: 'rating',
    CUISINE: 'cuisine',
    DIETARY: 'dietary'
};

export default {
    USER_ENDPOINTS,
    RESTAURANT_ENDPOINTS,
    CATEGORY_ENDPOINTS,
    EVENT_ENDPOINTS,
    CART_ENDPOINTS,
    ORDER_ENDPOINTS,
    PAYMENT_ENDPOINTS,
    REVIEW_ENDPOINTS,
    NOTIFICATION_ENDPOINTS,
    ADDRESS_ENDPOINTS,
    FILE_ENDPOINTS,
    HEALTH_ENDPOINTS,
    API_STATUS_CODES,
    API_RESPONSE_STRUCTURE,
    PAGINATION_DEFAULTS,
    SEARCH_PARAMS
};
