const productRepository = require('../../repositories/common/productRepository');
const licenceRepository = require('../../repositories/common/licenceRepository');
const { Op } = require('sequelize');

class ShopService {
    async getShopProducts(query) {
        const { search, min, max, sort, offers, special, category } = query;
        const isNew = query.new;

        const whereClause = { is_active: true };

        // Search logic (Need to handle joined columns searching if possible, or simplified)
        // Repository `findAll` handles `include`, but filtering on included columns in top-level `where` in Sequelize can be tricky ($Nested.column$).
        // Let's assume the repository structure allows this or we pass specific include-where.

        if (search) {
            whereClause[Op.or] = [
                { product_name: { [Op.like]: `% ${search}% ` } },
                // Simple search on product fields for now to avoid complexity in this refactor step unless critical
                // If strictness required:
                // { '$Category.category_name$': { [Op.like]: `% ${ search }% ` } } // Depends on alias in model/repo
            ];
        }

        if (min || max) {
            whereClause.price = {};
            if (min) whereClause.price[Op.gte] = min;
            if (max) whereClause.price[Op.lte] = max;
        }

        if (offers === 'true') {
            whereClause.discount = { [Op.gt]: 0 };
        }

        if (special === 'true') {
            whereClause.is_featured = true;
        }

        if (category) {
            whereClause['$Licence.licence_name$'] = category;
        }

        if (isNew === 'true') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            whereClause.created_at = { [Op.gte]: thirtyDaysAgo };
        }

        // Sorting
        let orderClause = [['created_at', 'DESC']];
        if (sort === 'price-ascending') orderClause = [['price', 'ASC']];
        if (sort === 'price-descending') orderClause = [['price', 'DESC']];
        if (sort === 'alpha-ascending') orderClause = [['product_name', 'ASC']];
        if (sort === 'alpha-descending') orderClause = [['product_name', 'DESC']];

        // Pagination
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 9;
        const offset = (page - 1) * limit;

        const { count, rows } = await productRepository.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit,
            offset
        });

        return {
            data: rows,
            pagination: {
                total: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit
            }
        };
    }
}

module.exports = new ShopService();
