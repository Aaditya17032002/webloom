
// Schema Loader for paruluniversity_ac_in
// Generated on 2025-06-16T11:15:50.492668
// Job ID: 4afc7fb1-3e4d-4ecb-b247-99ef0f5ff910

(function() {
    'use strict';
    
    const SCHEMA_BASE_URL = 'https://cdn.jsdelivr.net/gh/Aaditya17032002/webloom@main/schema_repo/paruluniversity_ac_in/';
    const PAGE_SCHEMAS = [];
    
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
