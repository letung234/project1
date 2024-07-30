// Import các module cần thiết
const express = require('express'); // Sử dụng Express framework
require('dotenv').config(); // Đọc biến môi trường từ file .env
const path = require('path'); // Module xử lý và thao tác với đường dẫn tệp
const bodyParser = require('body-parser'); // Middleware để xử lý dữ liệu từ body của request
const methodOverride = require('method-override'); // Middleware để ghi đè các phương thức HTTP
const systemConfig = require('./config/system'); // Tệp cấu hình hệ thống
const route = require("./routes/client/index"); // Tệp định tuyến cho client
const routeAdmin = require("./routes/admin/index"); // Tệp định tuyến cho admin
const database = require('./config/database'); // Tệp cấu hình và kết nối cơ sở dữ liệu

const multer= require('multer');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const flash = require('express-flash'); 
// Tạo ứng dụng Express
const app = express();
const port = process.env.PORT; // Lấy cổng từ biến môi trường
// Flash 

    app.use(cookieParser('sdfasdfdfgvcverfsd'));
    app.use(session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
// End Flash


// Sử dụng methodOverride để ghi đè phương thức HTTP
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));
// Kết nối cơ sở dữ liệu
database.connect();

// Thiết lập thư mục tĩnh để chứa các tệp public
app.use(express.static(`${__dirname}/public`));

// Thiết lập thư mục chứa các tệp views
app.set('views', path.join(__dirname, 'views'));

// Thiết lập biến cục bộ cho view
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Thiết lập view engine là pug
app.set('view engine', 'pug');

// Định tuyến cho ứng dụng client
route(app);

// Định tuyến cho ứng dụng admin
routeAdmin(app);

// Lắng nghe kết nối trên cổng được chỉ định
app.listen(port, () => {
    console.log("listening on port " + port); // In ra thông báo khi server chạy thành công
});
