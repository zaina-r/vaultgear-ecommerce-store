CREATE DATABASE vaultgear;
USE vaultgear;

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    model_number VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Simple product variants
CREATE TABLE product_variants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    variant_name VARCHAR(255),              -- "512GB Space Gray", "1TB Silver"
    sku VARCHAR(100) UNIQUE NOT NULL,       -- Each variant gets its own SKU
    price DECIMAL(10,2),                    -- Variants can have different prices
    stock_quantity INT DEFAULT 0,           -- Each variant has its own stock
    is_active BOOLEAN DEFAULT TRUE,         -- Can disable specific variants
    sort_order INT DEFAULT 0,               -- Display order
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_variants_product (product_id, sort_order),
    INDEX idx_variants_sku (sku),
    INDEX idx_variants_active (is_active)
);

-- NEW: Predefined specification types
CREATE TABLE specification_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    spec_key VARCHAR(50) UNIQUE NOT NULL,        -- "cpu", "ram", "storage"
    display_name VARCHAR(100) NOT NULL,          -- "Processor", "Memory", "Storage"
    data_type ENUM('text', 'number') DEFAULT 'text',  -- For validation
    unit VARCHAR(20),                            -- "GB", "inches", "GHz"
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,                    -- Display order in forms
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- IMPROVED: Product specifications now use predefined types
CREATE TABLE product_specifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    specification_type_id INT NOT NULL,          -- Links to predefined spec types
    spec_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (specification_type_id) REFERENCES specification_types(id) ON DELETE RESTRICT,
    UNIQUE KEY unique_product_spec (product_id, specification_type_id), -- One value per spec type per product
    INDEX idx_product_specs_product (product_id),
    INDEX idx_product_specs_type (specification_type_id)
);

-- Product images table
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,        -- URL to the image file
    alt_text VARCHAR(255),                  -- For accessibility/SEO
    is_primary BOOLEAN DEFAULT FALSE,       -- Main product image
    sort_order INT DEFAULT 0,               -- Order of display
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_images_product (product_id, sort_order),
    INDEX idx_product_images_primary (product_id, is_primary)
);

-- uninstall mongoose