class Category {
    constructor(name, inStock, children) {
        this.name = name;
        this.inStock = inStock;
        this.children = children || [];
    }

    getName(cb) {
        setTimeout(() => cb(null, this.name), 0);
    }

    checkInStock(cb) {
        setTimeout(() => cb(null, this.inStock), 0);
    }

    getChildren(cb) {
        setTimeout(() => cb(null, this.children), 0);
    }
}

class Product {
    constructor(name, inStock, price) {
        this.name = name;
        this.inStock = inStock;
        this.price = price;
    }

    getName(cb) {
        setTimeout(() => cb(null, this.name), 0);
    }

    checkInStock(cb) {
        setTimeout(() => cb(null, this.inStock), 0);
    }

    getPrice(cb) {
        setTimeout(() => cb(null, this.price), 0);
    }
}

// Your filterProducts function here
async function filterProducts(catalog, minPrice, maxPrice) {
    try {
        const filteredProducts = await getCategoryProducts(catalog, minPrice, maxPrice);
        return filteredProducts.sort((a, b) => a.price - b.price);
    } catch (error) {
        console.error("Error filtering products:", error.message);
        return [];
    }
}

async function getCategoryProducts(category, minPrice, maxPrice) {
    return new Promise((resolve, reject) => {
        category.getChildren(async (error, children) => {
            if (error) {
                reject(error);
            } else {
                const productsPromises = children.map(async (child) => {
                    if (child instanceof Product) {
                        const price = await getProductPrice(child);
                        if (price >= minPrice && price <= maxPrice) {
                            const name = await getProductName(child);
                            return { name, price };
                        }
                    } else if (child instanceof Category) {
                        return await getCategoryProducts(child, minPrice, maxPrice);
                    }
                });

                const products = await Promise.all(productsPromises);
                resolve(products.flat().filter((product) => product));
            }
        });
    });
}

async function getProductPrice(product) {
    return new Promise((resolve, reject) => {
        product.getPrice((error, price) => {
            if (error) {
                reject(error);
            } else {
                resolve(price);
            }
        });
    });
}

async function getProductName(product) {
    return new Promise((resolve, reject) => {
        product.getName((error, name) => {
            if (error) {
                reject(error);
            } else {
                resolve(name);
            }
        });
    });
}

const catalog = new Category("Catalog", true, [
    new Category("Electronics", true, [
        new Category("Smartphones", true, [
            new Product("Smartphone 1", true, 1000),
            new Product("Smartphone 2", true, 900),
            new Product("Smartphone 3", false, 900),
            new Product("Smartphone 4", true, 900),
            new Product("Smartphone 5", true, 900)
        ]),
        new Category("Laptops", true, [
            new Product("Laptop 1", false, 1200),
            new Product("Laptop 2", true, 900),
            new Product("Laptop 3", true, 1500),
            new Product("Laptop 4", true, 1600)
        ]),
    ]),
    new Category("Books", true, [
        new Category("Fiction", false, [
            new Product("Fiction book 1", true, 350),
            new Product("Fiction book 2", false, 400)
        ]),
        new Category("Non-Fiction", true, [
            new Product("Non-Fiction book 1", true, 250),
            new Product("Non-Fiction book 2", true, 300),
            new Product("Non-Fiction book 3", true, 400)
        ]),
    ]),
]);

// Example usage
const minPrice = 300;
const maxPrice = 1500;
const products = filterProducts(catalog, minPrice, maxPrice).then((value) => console.log(value));
