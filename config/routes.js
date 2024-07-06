/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  // Authentication routes 
  'post /api/signup' : 'AuthController.registerUSer',
  'get /api/login' : 'AuthController.loginUser',

  // Products 
  'post /api/product/create' :'ProductController.createProduct',
  'get /api/products': 'ProductController.getAllProducts',
  'get /api/product/:id': 'ProductController.getProductById',
  'patch /api/product/update/:id': 'ProductController.updateProduct',
  'delete /api/product/delete/:id': 'ProductController.deleteProduct',
  'post /api/product/size/create': 'ProductSizesController.createProductSizes',
  'get /api/product/sizes': 'ProductSizesController.getAllProductSizes',
  'patch /api/product/size/update/:id': 'ProductSizesController.updateProductSize',
  'patch /api/product/size/delete/:id': 'ProductSizesController.deleteProductSize',



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
