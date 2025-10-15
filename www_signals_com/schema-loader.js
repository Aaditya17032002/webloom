
// Schema Loader for www_signals_com
// Generated on 2025-10-15T09:10:13.710526
// Job ID: d4490729-2488-4f92-a50c-848576b91373

(function() {
    'use strict';
    
    const SCHEMA_BASE_URL = 'https://cdn.jsdelivr.net/gh/Aaditya17032002/webloom@main/schema_repo/www_signals_com/';
    const PAGE_SCHEMAS = [
    {
        "filename": "ShopCategory_aspx.json",
        "url": "https://www.signals.com/ShopCategory.aspx?ID=835,6762",
        "title": "\n\tUnder $30 & Thoughtful Gifts for All Ages - Shop Under $30 Today\n"
    },
    {
        "filename": "ShopCategory_aspx_1.json",
        "url": "https://www.signals.com/ShopCategory.aspx?ID=848,6816",
        "title": "\n\tScarves & Shawls & Thoughtful Gifts for All Ages - Shop Scarves & Shawls Today\n"
    },
    {
        "filename": "itemdy00_aspx.json",
        "url": "https://www.signals.com/itemdy00.aspx?ID=835,6762&T1=LHBT122+PE",
        "title": "\n\tFrench Credit Card Wallet - Quirky & Thoughtful Gifts for All Ages\n"
    },
    {
        "filename": "_Default_aspx.json",
        "url": "https://www.signals.com/\\Default.aspx",
        "title": "\n\tUniquely Thoughtful Gifts, Clothing, Jewelry, Accessories, Home D\u00e9cor, and More! | signals.com\n"
    },
    {
        "filename": "ShopCategory_aspx_2.json",
        "url": "https://www.signals.com/ShopCategory.aspx?ID=850,6832",
        "title": "\n\tPuzzles & Thoughtful Gifts for All Ages - Shop Puzzles Today\n"
    },
    {
        "filename": "CustomerService_aspx.json",
        "url": "https://www.signals.com/CustomerService.aspx?page=Our+Guarantee",
        "title": "\n\tOur Guarantee - Signals Customer Service\n"
    },
    {
        "filename": "ShopCategory_aspx_3.json",
        "url": "https://www.signals.com/ShopCategory.aspx?ID=845,6803",
        "title": "\n\tTees for Pet Lovers & Thoughtful Gifts for All Ages - Shop Tees for Pet Lovers Today\n"
    },
    {
        "filename": "ShopCategory_aspx_4.json",
        "url": "https://www.signals.com/ShopCategory.aspx?ID=836,6773",
        "title": "\n\tHome & Garden & Thoughtful Gifts for All Ages - Shop Home & Garden Today\n"
    },
    {
        "filename": "ShopCategory_aspx_5.json",
        "url": "https://www.signals.com/ShopCategory.aspx?ID=841,6788",
        "title": "\n\tAll Women's Clothing & Thoughtful Gifts for All Ages - Shop All Women's Clothing Today\n"
    },
    {
        "filename": "itemdy00_aspx_1.json",
        "url": "https://www.signals.com/itemdy00.aspx?ID=835,6762&T1=L25519+NHIS",
        "title": "\n\tSmithsonian\u00ae Word Search Puzzle Books - Quirky & Thoughtful Gifts for All Ages\n"
    }
];
    
    function getCurrentPageSchema() {
        const currentUrl = window.location.href;
        const currentPath = window.location.pathname;
        
        // Find matching schema based on URL or path
        for (const page of PAGE_SCHEMAS) {
            const pageUrl = new URL(page.url);
            const pagePath = pageUrl.pathname;
            
            // Exact URL match
            if (currentUrl === page.url) {
                return page.filename;
            }
            
            // Path match
            if (currentPath === pagePath) {
                return page.filename;
            }
            
            // Homepage match
            if ((currentPath === '/' || currentPath === '') && 
                (pagePath === '/' || page.filename === 'homepage.json')) {
                return page.filename;
            }
        }
        
        // Default to homepage schema if no match found
        return PAGE_SCHEMAS.find(p => p.filename === 'homepage.json')?.filename || PAGE_SCHEMAS[0]?.filename;
    }
    
    async function loadAndInjectSchema() {
        try {
            const schemaFile = getCurrentPageSchema();
            if (!schemaFile) {
                console.warn('No schema file found for current page');
                return;
            }
            
            const response = await fetch(SCHEMA_BASE_URL + schemaFile);
            if (!response.ok) {
                throw new Error(`Failed to load schema: ${response.status}`);
            }
            
            const schemaData = await response.json();
            const jsonLd = schemaData.json_ld;
            
            // Create and inject script tag
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(jsonLd, null, 2);
            
            // Remove existing schema if any
            const existing = document.querySelector('script[type="application/ld+json"][data-crawler-generated]');
            if (existing) {
                existing.remove();
            }
            
            script.setAttribute('data-crawler-generated', 'true');
            document.head.appendChild(script);
            
            console.log('Schema loaded successfully:', schemaFile);
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('schemaLoaded', {
                detail: { schemaFile, jsonLd, pageInfo: schemaData.page_info }
            }));
            
        } catch (error) {
            console.error('Error loading schema:', error);
        }
    }
    
    // Load schema when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAndInjectSchema);
    } else {
        loadAndInjectSchema();
    }
    
    // Expose utility functions
    window.SchemaLoader = {
        reload: loadAndInjectSchema,
        getAvailableSchemas: () => PAGE_SCHEMAS,
        getCurrentSchema: getCurrentPageSchema,
        baseUrl: SCHEMA_BASE_URL
    };
    
})();
