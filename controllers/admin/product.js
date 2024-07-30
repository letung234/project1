const Product = require("../../models/product");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/searchHelper");
const Pagination = require("../../helpers/pagination");
const systemConfig = require('../../config/system')
const PATH_ADMIN = systemConfig.prefixAdmin;
module.exports.index = async (req, res) => {
    try {
        console.log(filterStatusHelper);
        
        let find = { deleted: false };
        const objectSearch = searchHelper(req.query);

        if (objectSearch.regex) {
            find.title = objectSearch.regex;
        }

        if (req.query.status) {
            find.status = req.query.status;
        }

        const filterStatus = filterStatusHelper(req.query);

        // Pagination
        const countProducts = await Product.countDocuments(find);
        const objectPagination = Pagination({
            limitItems: 4,
            currentPage: req.query.page || 1
        }, req.query, countProducts);

        // Get products with pagination
        const products = await Product.find(find)
            .sort({position :"desc"})
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);
            
        console.log(products);

        res.render('admin/pages/products/index', {
            pageTitle: "Danh Sách Sản Phẩm",
            products: products,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword,
            pagination: objectPagination
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Đã xảy ra lỗi trên máy chủ.");
    }
};

module.exports.changeStatus = async (req, res) => {
    try {
        const { status, id } = req.params;
        await Product.findByIdAndUpdate(id, { status: status });
        console.log(status) 
        console.log(id)
        req.flash('success','cập nhật trạng thái thành công!!!');
        res.redirect("back");
    } catch (error) {
        console.error(error);
        res.status(500).send("Đã xảy ra lỗi khi thay đổi trạng thái sản phẩm.");
    }
};

module.exports.changeMulti = async (req, res) => {
    try {
        const { type, ids } = req.body;
        const idArray = ids.split(',').map(id => id.trim());
        if (type === 'delete-all') {
            await Product.updateMany(
                { _id: { $in: idArray } },
                { deleted: true, deletedAt: Date.now() } 
            );
        } else if(type === 'change-position'){
            for(const item of idArray) {
                let [id, position] = item.split('-');
                await Product.findByIdAndUpdate(id, { position: parseInt(position) }, { new: true });
            }
        }
        else{
            
            await Promise.all(idArray.map(id =>
                Product.findByIdAndUpdate(id, { status: type }, { new: true })
            ));
        }

        res.redirect("back");
    } catch (error) {
        console.error(error);
        res.status(500).send("Đã xảy ra lỗi khi thay đổi trạng thái sản phẩm.");
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, { deleted: true, deletedAt: Date.now() });
        console.log(id)
        res.redirect("back");
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Đã xảy ra lỗi khi thay đổi trạng thái sản phẩm.");
    }
}

module.exports.create = (req, res) => {
    res.render('admin/pages/products/create', {
        pageTitle: "Thêm Mới Sản Phẩm"
    });
};
module.exports.store = async (req, res) => {
  
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    if(req.body.position == ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }

    const product = new Product(req.body);
    await product.save();
    
    console.log(req.body)
    res.redirect(`${PATH_ADMIN}/products`);
};

module.exports.editProduct = async (req, res) => {
    try {
        const find = {
            deleted:false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);
        res.render('admin/pages/products/edit', {
            pageTitle: "Cập Nhập Sản Phẩm",
            product: product
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).flash("error","Đã xảy ra l��i khi tìm kiếm sản phẩm.");
        res.redirect(`${PATH_ADMIN}/products`);
    }
};
module.exports.updateProduct = async (req, res) => {
    try {
        req.body.price = parseInt(req.body.price);
        req.body.stock = parseInt(req.body.stock);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        console.log(req.file.filename);
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, req.body);

        console.log(req.body);
        req.flash('success', "Cập nhật sản phẩm thành công");
        res.redirect(`${PATH_ADMIN}/products`);
    } catch (error) {
        console.error(error);
        req.flash('error', "Đã xảy ra lỗi khi cập nhật sản phẩm.");
        res.status(500).redirect(`${PATH_ADMIN}/products/edit/${req.params.id}`);
    }
};


module.exports.detail= async (req, res) => {
    try {

        const find = {
            deleted:false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);
        res.render('admin/pages/products/detail', {
            pageTitle: product.title,
            product: product
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).flash("error","Đã xảy ra l��i khi tìm kiếm sản phẩm.");
        res.redirect(`${PATH_ADMIN}/products`);
    }
};