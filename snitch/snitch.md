# Flow of Snitch:

=> product.model.js -> for creating productSchema .
productSchema:-
--seller: Schema.Types.objectId -> for creating objectId type in schema.
export the productModel to use in other files.

=>Notes: Edge Server is used to load the orignal server data for faster response to users request away from the original server. (these are the servers which are located in different geographical locations to reduce latency and improve performance. Hosting is coslty and requires a lot of resources to maintain the servers infra.) - (HOT & COLD instances)
--Thats why we use CDN (Content Delivery Network) which does the same thing as edge server but it is more cost effective and easy to maintain. It is a network of servers that are distributed across different geographical locations to deliver content to users based on their location. It caches the content and serves it from the nearest server to the user, reducing latency and improving performance.
--Server bandwidth cost are required - 0.01 to 0.02 $ per GB.
--CDN bandwidth cost are required - 0.005 to 0.012 $ per GB.(Very cost effective and easy to maintain.)
for example : ImageKit server is used to store the images and videos of the products. It is a CDN server which is used to deliver the content to the users based on their location. It caches the content and serves it from the nearest server to the user, reducing latency and improving performance.
--CDN network of cloudflare is Best.

=> product.routes.js -> for creating product routes.
=> controller: productController.js -> for creating product controller.

-- import authenticate middleware 

--createProduct -> for creating product.
--- check if its the seller who is creating the product or not.
--- extractand validate : title, description, price{currency,amount}, categories, sizes, quantity, images from req.body.

Visit imageKit -- copy the private key and paste it in .env file. under IMAGEKIT_PRIVATE_KEY then add in config

=> create a services folder -> storage.service.js -> for creating storage service.
-- import imageKit from imagekit.
-- import config from config file.
-- create a new instance of imageKit with the config.
-- uploadFile() -> for uploading the file to imageKit server it returns the url.
-- npm i multer -> for handling multipart/form-data, which is used for uploading files.
-- import multer from multer.
-- initialize multer with storage as memoryStorage() and fileFilter to filter the files based on the mimetype.
-- use to keep the file temporary in memory and then upload it to imageKit server.
-- upload.array('images', 10) -> for uploading multiple images at once. (max 10 images)

=>productController.js -> createProduct() -> for creating product.
-- extract the images from req.files and upload them to imageKit server using storage service.
-- urls[] = await storageService.uploadFile(file, fileName) -> for uploading the files to imageKit server and getting the urls.(uploading multiple files at once)
promise.all(urls) -> for waiting for all the promises to resolve and get the urls of the uploaded files.
--     


#Express Validator : validation middleware for express.js for validating and sanitizing user input.
=> validator -> auth.validator.js -> its used to put checks on the user inputs with messages in response if the checks fails.
-- we put validationResult on req to check which return an error array if there is any error in the user input. 
-- if the error array is empty we go next().
-- remove the validation from the controller (resgister).
similarly create the registerValidator & loginValidator.
-- It also cantains a callback with req, res, next to error validations..which is repeated in every validator file so we can create a utils folder and create a validateRequest function in validate.js and export it to use in every validator file.

=> product.validate.js -> CreateProductValidator -> for title, description, price, categories, sizes, files.

=> How to apdate role as seller : login as user -> go to database -> users collection -> find the user and update the role as seller. then login again as seller and create the product.

=> test products API : form-data to send the post req with images, title, description, price, categories, sizes, categories.but it was in string . (use postman to test the API)
-- so we will add a middleware to parse the string to array in product.routes.js file before createProductValidator middleware.
-- Autherization: Bearer token is used to authorize after updating the role as seller. (token is generated after login and it is used to authorize the user to create the product.)
-- storage response url need to be removed.

=> productController.js -> updateProduct() -> for updating product.
-- product exists or not, if not then return error message.
-- check if the user is the seller of the product or not, if not then return error message.
-- extract the images from req.files and upload them to imageKit server using storage service.
-- urls[] = await storageService.uploadFile(file, fileName) -> for uploading the files.
-- update the product with the new data and return the updated product.

--meduim article for express validator.


=> productController.js -> deleteImage() -> for deleting Image.
pull is used to remove the image from the product images array.
pull the image from the product images array and return the updated product.
=> productRoutes.js -> deleteImage() -> for deleting Image.
-- togglePublishProduct() -> for toggling the publish status of the product.
-- totalProducts() -> for getting the total number of products.

=> cart.routes.js -> for creating cart routes.
=> controller: cart.controller.js -> for creating cart controller.
=> cart.validator.js -> for creating cart validator. i.e addToCartValidator, removeFromCartValidator, updateCartValidator.

=>ui layer: react components / ui & Navigation
=>state layer: data store
=>api layer: how to fetch data from api
=>custom hooks layer: how data stored in state from api layer and how to use it in ui layer.

=>auth & product & interceptors & refreshtoken 
=> mcp.json -> for creating mcp.json file to store the api endpoints.{to estabish conncection with the tool on interent with the vs code or copilot}