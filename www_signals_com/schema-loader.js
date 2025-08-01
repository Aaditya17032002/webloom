
// Schema Loader for www_signals_com
// Generated on 2025-08-01T18:43:07.921277
// Job ID: 08623ea0-4beb-413c-adea-0ed027326d19

(function() {
    'use strict';
    
    const SCHEMA_BASE_URL = 'https://cdn.jsdelivr.net/gh/Aaditya17032002/webloom@main/schema_repo/www_signals_com/';
    const PAGE_SCHEMAS = [
    {
        "filename": "ShopCategory_aspx.json",
        "url": "https://www.signals.com/ShopCategory.aspx?ID=841,6788",
        "title": "\n\tAll Women's Clothing & Thoughtful Gifts for All Ages - Shop All Women's Clothing Today\n"
    },
    {
        "filename": "itemdy00_aspx.json",
        "url": "https://www.signals.com/itemdy00.aspx?ID=841,6788&T1=PE4017+MV+XS",
        "title": "\n\tMoonlit Embossed Velvet Top - Quirky & Thoughtful Gifts for All Ages\n"
    },
    {
        "filename": "ShopCategory_aspx_1.json",
        "url": "https://www.signals.com/ShopCategory.aspx?ID=848,6813",
        "title": "\n\tAll Accessories & Thoughtful Gifts for All Ages - Shop All Accessories Today\n"
    },
    {
        "filename": "ViewCart_aspx.json",
        "url": "https://www.signals.com/ViewCart.aspx",
        "title": "\n\tView Cart - Uniquely Thoughtful Gifts, Clothing, Jewelry, Accessories, Home D\u00e9cor, and More!\n"
    },
    {
        "filename": "itemdy00_aspx_1.json",
        "url": "https://www.signals.com/itemdy00.aspx?ID=841,6788&T1=L25510+IV+S",
        "title": "\n\tTextured Button Tunic - Quirky & Thoughtful Gifts for All Ages\n"
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
