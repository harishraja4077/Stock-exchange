/* ==========================================
   STACKLY JAVASCRIPT ENGINE
   ========================================== */

// 1. MOCK FINANCIAL DATABASE
const stockDatabase = [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: 2942.50, prevClose: 2921.20, open: 2928.00, high: 2955.00, low: 2925.00, high52: 3024.90, low52: 2220.30, volume: 48.5, trend: [2921, 2928, 2932, 2927, 2939, 2945, 2942] },
    { symbol: "TCS", name: "Tata Consultancy Services Ltd.", price: 3815.10, prevClose: 3790.40, open: 3795.00, high: 3830.00, low: 3788.00, high52: 4254.75, low52: 3070.30, volume: 22.4, trend: [3790, 3795, 3810, 3802, 3822, 3808, 3815] },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", price: 1564.80, prevClose: 1572.10, open: 1570.00, high: 1578.00, low: 1558.00, high52: 1757.50, low52: 1363.55, volume: 85.1, trend: [1572, 1570, 1568, 1575, 1562, 1560, 1564] },
    { symbol: "INFOSYS", name: "Infosys Ltd.", price: 1488.25, prevClose: 1475.05, open: 1480.00, high: 1495.00, low: 1472.00, high52: 1733.00, low52: 1215.40, volume: 39.2, trend: [1475, 1480, 1492, 1481, 1484, 1489, 1488] },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", price: 1118.40, prevClose: 1109.80, open: 1111.00, high: 1124.00, low: 1108.00, high52: 1169.80, low52: 898.15, volume: 54.8, trend: [1109, 1111, 1118, 1113, 1121, 1115, 1118] },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.", price: 1385.90, prevClose: 1378.30, open: 1380.00, high: 1395.00, low: 1374.00, high52: 1420.00, low52: 785.40, volume: 31.7, trend: [1378, 1380, 1388, 1382, 1391, 1383, 1385] },
    { symbol: "SBIN", name: "State Bank of India", price: 832.15, prevClose: 840.40, open: 839.00, high: 842.00, low: 829.00, high52: 912.00, low52: 543.15, volume: 112.5, trend: [840, 839, 835, 841, 830, 833, 832] },
    { symbol: "ITC", name: "ITC Ltd.", price: 428.60, prevClose: 425.20, open: 426.00, high: 431.50, low: 425.10, high52: 499.70, low52: 399.30, volume: 92.3, trend: [425, 426, 428, 429, 430, 427, 428] },
    { symbol: "LT", name: "Larsen & Toubro Ltd.", price: 3512.00, prevClose: 3535.80, open: 3540.00, high: 3555.00, low: 3502.00, high52: 3919.90, low52: 2210.00, volume: 18.9, trend: [3535, 3540, 3528, 3545, 3515, 3508, 3512] },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd.", price: 2475.40, prevClose: 2465.10, open: 2468.00, high: 2488.00, low: 2460.00, high52: 2769.65, low52: 2170.25, volume: 14.6, trend: [2465, 2468, 2471, 2473, 2482, 2470, 2475] }
];

const indexData = {
    nifty50: {
        name: "NIFTY 50",
        price: 23456.80,
        prevClose: 23314.65,
        history: {
            "1d": [23315, 23340, 23375, 23350, 23395, 23440, 23420, 23465, 23442, 23456],
            "1w": [23180, 23220, 23150, 23290, 23350, 23410, 23456],
            "1m": [22850, 22920, 23100, 23050, 23210, 23340, 23456]
        }
    },
    niftybank: {
        name: "NIFTY BANK",
        price: 51280.40,
        prevClose: 51392.70,
        history: {
            "1d": [51392, 51320, 51360, 51280, 51220, 51295, 51240, 51310, 51255, 51280],
            "1w": [50890, 51100, 51420, 51250, 51500, 51310, 51280],
            "1m": [49600, 50200, 50900, 50600, 51350, 51100, 51280]
        }
    },
    niftyit: {
        name: "NIFTY IT",
        price: 38125.15,
        prevClose: 37879.25,
        history: {
            "1d": [37879, 37920, 37980, 37910, 38040, 38110, 38075, 38150, 38100, 38125],
            "1w": [37420, 37600, 37550, 37780, 37920, 38080, 38125],
            "1m": [36200, 36550, 37200, 36900, 37500, 37820, 38125]
        }
    }
};

const announcements = [
    { tag: "Circular", text: "Revision in Transaction Charges for Cash Equity Segment effective from next month.", time: "10 mins ago" },
    { tag: "Board Meet", text: "Reliance Industries Ltd. announces Board Meeting to declare Q1 financials.", time: "45 mins ago" },
    { tag: "Listing", text: "New Debt Instruments listing approval issued for HDFC Bank Infrastructure Bonds.", time: "2 hours ago" },
    { tag: "Surveillance", text: "Additional Surveillance Measure (ASM) framework updates declared for mid-cap stocks.", time: "4 hours ago" },
    { tag: "Corporate Action", text: "Tata Consultancy Services (TCS) announces Final Dividend payout distribution records.", time: "6 hours ago" }
];

let activeIndex = "nifty50";
let activeTimeframe = "1d";

// 2. DOM CONTENT LOADED INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    // Shared Layout Components
    initMobileNav();
    initGlobalTickers();
    initSearch();
    
    // Page-Specific Checks
    if (document.getElementById("nifty-svg-chart")) {
        initDashboard();
    }
    if (document.querySelector(".timeline")) {
        initTimeline();
    }
    if (document.getElementById("turnover-amount")) {
        initCalculator();
    }
    if (document.getElementById("login-form-submit")) {
        initLoginPortal();
    }
    if (document.getElementById("investor-dashboard-anchor")) {
        initInvestorDashboard();
    }
    if (document.getElementById("corporate-dashboard-anchor")) {
        initCorporateDashboard();
    }
    if (document.getElementById("market-page-anchor")) {
        initMarketPage();
    }
    if (document.getElementById("stock-detail-anchor")) {
        initStockDetailPage();
    }
    if (document.getElementById("register-form-submit")) {
        initRegisterForm();
    }
});

// Helper: Format Numbers to Indian Style (e.g. ₹ 1,23,456.78)
function formatCurrency(num, decimals = 2) {
    const parts = num.toFixed(decimals).split(".");
    let lastThree = parts[0].substring(parts[0].length - 3);
    const otherBits = parts[0].substring(0, parts[0].length - 3);
    if (otherBits !== "") {
        lastThree = "," + lastThree;
    }
    const formattedInt = otherBits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return decimals > 0 ? formattedInt + "." + parts[1] : formattedInt;
}

// ==========================================
// 3. MOBILE NAVIGATION DRAWER
// ==========================================
function initMobileNav() {
    const toggleBtn = document.getElementById("mobile-nav-toggle");
    const menuDrawer = document.getElementById("mobile-menu-drawer");
    
    if (toggleBtn && menuDrawer) {
        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleBtn.classList.toggle("active");
            menuDrawer.classList.toggle("active");
        });
        
        // Close menu on document click
        document.addEventListener("click", () => {
            toggleBtn.classList.remove("active");
            menuDrawer.classList.remove("active");
        });
        
        menuDrawer.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }
}

// ==========================================
// 4. TOP HORIZONTAL SCROLL TICKER
// ==========================================
function initGlobalTickers() {
    const scrollFeed = document.getElementById("ticker-scroll-feed");
    if (!scrollFeed) return;
    
    // Build feed list (double items to create infinite scroll effect)
    let feedHTML = "";
    
    function buildItems() {
        let items = "";
        // First list indices
        Object.keys(indexData).forEach(key => {
            const idx = indexData[key];
            const changeVal = idx.price - idx.prevClose;
            const changePct = (changeVal / idx.prevClose) * 100;
            const sign = changeVal >= 0 ? "+" : "";
            const textClass = changeVal >= 0 ? "text-up" : "text-down";
            const badgeIcon = changeVal >= 0 ? "▲" : "▼";
            
            items += `
                <div class="ticker-item">
                    <span class="ticker-symbol">${idx.name}</span>
                    <span class="ticker-price">${formatCurrency(idx.price, 2)}</span>
                    <span class="ticker-change ${textClass}">${badgeIcon} ${sign}${formatCurrency(changeVal, 2)} (${sign}${changePct.toFixed(2)}%)</span>
                </div>
            `;
        });
        
        // Then list stocks
        stockDatabase.forEach(stk => {
            const changeVal = stk.price - stk.prevClose;
            const changePct = (changeVal / stk.prevClose) * 100;
            const sign = changeVal >= 0 ? "+" : "";
            const textClass = changeVal >= 0 ? "text-up" : "text-down";
            const badgeIcon = changeVal >= 0 ? "▲" : "▼";
            
            items += `
                <div class="ticker-item" style="cursor:pointer;" onclick="openStockModal('${stk.symbol}')">
                    <span class="ticker-symbol">${stk.symbol}</span>
                    <span class="ticker-price">${formatCurrency(stk.price, 2)}</span>
                    <span class="ticker-change ${textClass}">${badgeIcon} ${sign}${changePct.toFixed(2)}%</span>
                </div>
            `;
        });
        return items;
    }
    
    // Set content (duplicated for seamless loop)
    scrollFeed.innerHTML = buildItems() + buildItems();
}

// ==========================================
// 5. GLOBAL SEARCH AUTOCOMPLETE
// ==========================================
function initSearch() {
    const searchInput = document.getElementById("symbol-search");
    const dropdown = document.getElementById("search-dropdown");
    
    if (!searchInput || !dropdown) return;
    
    searchInput.addEventListener("input", (e) => {
        const val = e.target.value.toUpperCase().trim();
        if (val.length === 0) {
            dropdown.style.display = "none";
            return;
        }
        
        // Search filter matching symbols and names
        const matches = stockDatabase.filter(stk => 
            stk.symbol.includes(val) || stk.name.toUpperCase().includes(val)
        );
        
        if (matches.length > 0) {
            dropdown.innerHTML = matches.map(stk => {
                const changeVal = stk.price - stk.prevClose;
                const sign = changeVal >= 0 ? "+" : "";
                const textClass = changeVal >= 0 ? "text-up" : "text-down";
                
                return `
                    <div class="search-item" onclick="selectSearchSymbol('${stk.symbol}')">
                        <div>
                            <span class="item-symbol">${stk.symbol}</span>
                            <span class="item-name">${stk.name}</span>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: 700; font-family: monospace;">₹${formatCurrency(stk.price, 2)}</div>
                            <div class="${textClass}" style="font-size: 0.75rem; font-weight: 600;">${sign}${((changeVal/stk.prevClose)*100).toFixed(2)}%</div>
                        </div>
                    </div>
                `;
            }).join("");
            dropdown.style.display = "block";
        } else {
            dropdown.innerHTML = `<div style="padding: 15px; color: var(--text-muted); text-align: center; font-size: 0.85rem;">No matching securities found</div>`;
            dropdown.style.display = "block";
        }
    });
    
    // Hide search when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-wrapper")) {
            dropdown.style.display = "none";
        }
    });
}

function selectSearchSymbol(symbol) {
    const searchInput = document.getElementById("symbol-search");
    const dropdown = document.getElementById("search-dropdown");
    if (searchInput) searchInput.value = "";
    if (dropdown) dropdown.style.display = "none";
    openStockModal(symbol);
}

// ==========================================
// 6. DASHBOARD & SVG CHART ENGINE
// ==========================================
function initDashboard() {
    // Load announcements
    renderAnnouncements();
    
    // Render Movers table
    renderMoversTable("gainers");
    
    // Initial Chart Drawing
    drawIndexChart();
    
    // Add Index card click handlers
    document.querySelectorAll(".index-card").forEach(card => {
        card.addEventListener("click", () => {
            document.querySelectorAll(".index-card").forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            activeIndex = card.getAttribute("data-index");
            
            // Update chart header title
            document.getElementById("chart-index-title").textContent = indexData[activeIndex].name + " Index";
            drawIndexChart();
        });
    });
    
    // Add Timeframe togglers
    document.querySelectorAll(".tf-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tf-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeTimeframe = btn.getAttribute("data-tf");
            drawIndexChart();
        });
    });
    
    // Movers Tab Menu
    document.querySelectorAll(".mover-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".mover-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.getAttribute("data-tab");
            renderMoversTable(category);
        });
    });
    
    // Quick footer selects
    document.querySelectorAll(".quick-index-select").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const targetIndex = el.getAttribute("data-select");
            const card = document.getElementById(`idx-${targetIndex}`);
            if (card) {
                card.scrollIntoView({ behavior: "smooth" });
                card.click();
            }
        });
    });
    
    // Modal controls
    const closeBtn = document.getElementById("modal-close-btn");
    const overlay = document.getElementById("stock-modal");
    if (closeBtn && overlay) {
        closeBtn.addEventListener("click", () => {
            overlay.classList.remove("active");
        });
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.remove("active");
            }
        });
    }

    // Start Price Simulation Engine
    setInterval(simulateMarketFluctuations, 2500);
}

// Render announcements list in sidebar
function renderAnnouncements() {
    const listContainer = document.getElementById("corporate-news-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = announcements.map(ann => `
        <div class="announcement-item">
            <span class="announce-tag">${ann.tag}</span>
            <div class="announce-text">${ann.text}</div>
            <div class="announce-time">${ann.time}</div>
        </div>
    `).join("");
}

// Render dynamic tables for Movers (gainers, losers, active)
function renderMoversTable(category) {
    const tbody = document.getElementById("mover-table-body");
    if (!tbody) return;
    
    let sorted = [...stockDatabase];
    
    if (category === "gainers") {
        sorted.sort((a, b) => {
            const chgA = ((a.price - a.prevClose) / a.prevClose);
            const chgB = ((b.price - b.prevClose) / b.prevClose);
            return chgB - chgA;
        });
        sorted = sorted.slice(0, 5);
    } else if (category === "losers") {
        sorted.sort((a, b) => {
            const chgA = ((a.price - a.prevClose) / a.prevClose);
            const chgB = ((b.price - b.prevClose) / b.prevClose);
            return chgA - chgB;
        });
        sorted = sorted.slice(0, 5);
    } else { // active volume
        sorted.sort((a, b) => b.volume - a.volume);
        sorted = sorted.slice(0, 5);
    }
    
    tbody.innerHTML = sorted.map(stk => {
        const changeVal = stk.price - stk.prevClose;
        const changePct = (changeVal / stk.prevClose) * 100;
        const sign = changeVal >= 0 ? "+" : "";
        const textClass = changeVal >= 0 ? "text-up" : "text-down";
        const badgeClass = changeVal >= 0 ? "bg-up-badge" : "bg-down-badge";
        
        // Generate sparkline coordinates
        const minVal = Math.min(...stk.trend);
        const maxVal = Math.max(...stk.trend);
        const range = maxVal - minVal || 1;
        const pts = stk.trend.map((val, idx) => {
            const x = (idx / (stk.trend.length - 1)) * 80;
            const y = 22 - ((val - minVal) / range) * 20; // 22 max height with margin
            return `${x},${y}`;
        }).join(" ");
        
        const sparklineColor = changeVal >= 0 ? "#10b981" : "#ef4444";
        
        return `
            <tr onclick="openStockModal('${stk.symbol}')" style="cursor: pointer;" id="mover-row-${stk.symbol}">
                <td>
                    <span class="stock-symbol">${stk.symbol}</span>
                    <span class="company-name">${stk.name}</span>
                </td>
                <td style="font-family: monospace; font-weight: 700;">₹${formatCurrency(stk.price, 2)}</td>
                <td class="${textClass}" style="font-family: monospace;">${sign}${formatCurrency(changeVal, 2)}</td>
                <td><span class="${badgeClass}">${sign}${changePct.toFixed(2)}%</span></td>
                <td>
                    <svg class="sparkline-svg">
                        <path class="sparkline-path" d="M ${pts}" stroke="${sparklineColor}"></path>
                    </svg>
                </td>
                <td style="font-family: monospace;">${stk.volume.toFixed(1)} L</td>
            </tr>
        `;
    }).join("");
}

// Drawing custom responsive SVG chart
function drawIndexChart() {
    const svg = document.getElementById("nifty-svg-chart");
    if (!svg) return;
    
    const viewport = document.getElementById("chart-viewport-box");
    const width = viewport.clientWidth;
    const height = 300; // Fixed chart inner height
    
    const data = indexData[activeIndex].history[activeTimeframe];
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    
    // Add vertical margin buffer to min/max
    const buffer = (maxVal - minVal) * 0.1 || 10;
    const yMin = minVal - buffer;
    const yMax = maxVal + buffer;
    
    // Update axis text labels
    document.getElementById("y-label-max").textContent = formatCurrency(yMax, 1);
    document.getElementById("y-label-mid").textContent = formatCurrency((yMax + yMin) / 2, 1);
    document.getElementById("y-label-min").textContent = formatCurrency(yMin, 1);
    
    // Calculate mapping points
    const points = data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - yMin) / (yMax - yMin)) * (height - 30) - 15; // padding top/bottom
        return { x, y, val };
    });
    
    // Set dynamic gradient color for Nifty positive/negative state
    const isUp = data[data.length - 1] >= data[0];
    const accentColor = isUp ? "var(--color-up)" : "var(--color-down)";
    const glowColor = isUp ? "var(--color-up-glow)" : "var(--color-down-glow)";
    
    // Build path line
    let lineD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        // Curve fitting/interpolation
        const cpX1 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
        const cpY1 = points[i-1].y;
        const cpX2 = cpX1;
        const cpY2 = points[i].y;
        lineD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`;
    }
    
    // Build area fill path
    const areaD = `${lineD} L ${width} ${height} L 0 ${height} Z`;
    
    // Update SVG elements
    const areaPath = svg.querySelector(".chart-path-area");
    const linePath = svg.querySelector(".chart-path-line");
    
    areaPath.setAttribute("d", areaD);
    linePath.setAttribute("d", lineD);
    
    // Change style theme based on values
    linePath.style.stroke = accentColor;
    
    // Update gradient stop color
    const stop0 = document.querySelector("#chart-gradient stop[offset='0%']");
    const stop1 = document.querySelector("#chart-gradient stop[offset='100%']");
    if (stop0 && stop1) {
        stop0.setAttribute("stop-color", isUp ? "#10b981" : "#ef4444");
        stop1.setAttribute("stop-color", isUp ? "#10b981" : "#ef4444");
    }
    
    // Setup mouse interactions on chart
    const trackerLine = svg.querySelector(".chart-tracker-line");
    const trackerDot = svg.querySelector(".chart-tracker-dot");
    const tooltip = document.getElementById("chart-hover-tooltip");
    
    if (trackerLine && trackerDot && tooltip) {
        viewport.onmousemove = (e) => {
            const rect = svg.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            
            // Find nearest data index
            let nearestIndex = 0;
            let minDiff = Infinity;
            for (let i = 0; i < points.length; i++) {
                const diff = Math.abs(points[i].x - mouseX);
                if (diff < minDiff) {
                    minDiff = diff;
                    nearestIndex = i;
                }
            }
            
            const pt = points[nearestIndex];
            
            // Render tracker dot and line
            trackerLine.setAttribute("x1", pt.x);
            trackerLine.setAttribute("x2", pt.x);
            trackerLine.style.display = "block";
            
            trackerDot.setAttribute("cx", pt.x);
            trackerDot.setAttribute("cy", pt.y);
            trackerDot.style.stroke = accentColor;
            trackerDot.style.display = "block";
            
            // Update and position tooltip
            tooltip.style.display = "block";
            
            // Set mock timestamps
            let stamp = "";
            if (activeTimeframe === "1d") {
                const hour = 9 + Math.floor(nearestIndex * 0.7);
                const min = Math.floor((nearestIndex * 42) % 60);
                stamp = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} IST`;
            } else if (activeTimeframe === "1w") {
                const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Mon", "Today"];
                stamp = days[Math.min(nearestIndex, days.length - 1)];
            } else {
                stamp = `Week ${nearestIndex + 1}`;
            }
            
            tooltip.querySelector(".tooltip-time").textContent = stamp;
            tooltip.querySelector(".tooltip-val").textContent = `₹ ${formatCurrency(pt.val, 2)}`;
            
            // Position tooltip dynamically with boundary constraints
            const tooltipWidth = tooltip.clientWidth;
            const tooltipHeight = tooltip.clientHeight;
            let tooltipX = pt.x + 15;
            let tooltipY = pt.y - 45;
            
            if (tooltipX + tooltipWidth > width) {
                tooltipX = pt.x - tooltipWidth - 15;
            }
            if (tooltipY < 0) {
                tooltipY = pt.y + 15;
            }
            
            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY}px`;
        };
        
        viewport.onmouseleave = () => {
            trackerLine.style.display = "none";
            trackerDot.style.display = "none";
            tooltip.style.display = "none";
        };
    }
}

// Redraw chart when window scales to keep it vector responsive
window.addEventListener("resize", () => {
    if (document.getElementById("nifty-svg-chart")) {
        drawIndexChart();
    }
});

// ==========================================
// 7. STOCK DETAILED MODAL DISPLAY
// ==========================================
function openStockModal(symbol) {
    const stock = stockDatabase.find(s => s.symbol === symbol);
    if (!stock) return;
    
    const overlay = document.getElementById("stock-modal");
    if (!overlay) return;
    
    // Update values
    document.getElementById("modal-stock-title").textContent = stock.symbol;
    document.getElementById("modal-stock-subtitle").textContent = stock.name;
    document.getElementById("modal-stock-ltp").textContent = `₹${formatCurrency(stock.price, 2)}`;
    
    const change = stock.price - stock.prevClose;
    const changePct = (change / stock.prevClose) * 100;
    const sign = change >= 0 ? "+" : "";
    const textClass = change >= 0 ? "text-up" : "text-down";
    
    const modalChange = document.getElementById("modal-stock-change");
    modalChange.textContent = `${sign}${formatCurrency(change, 2)} (${sign}${changePct.toFixed(2)}%)`;
    modalChange.className = textClass;
    
    document.getElementById("modal-stock-prev").textContent = formatCurrency(stock.prevClose, 2);
    document.getElementById("modal-stock-open").textContent = formatCurrency(stock.open, 2);
    document.getElementById("modal-stock-high").textContent = formatCurrency(stock.high, 2);
    document.getElementById("modal-stock-low").textContent = formatCurrency(stock.low, 2);
    document.getElementById("modal-stock-52high").textContent = formatCurrency(stock.high52, 2);
    document.getElementById("modal-stock-52low").textContent = formatCurrency(stock.low52, 2);
    
    // Show Modal
    overlay.classList.add("active");
}

// ==========================================
// 8. REAL-TIME MARKET VALUE SIMULATOR
// ==========================================
function simulateMarketFluctuations() {
    // Select 3 random stocks to modify
    const shuffled = [...stockDatabase].sort(() => 0.5 - Math.random());
    const targets = shuffled.slice(0, 3);
    
    targets.forEach(target => {
        const originalPrice = target.price;
        const percentChange = (Math.random() * 0.4 - 0.2) / 100; // -0.2% to +0.2%
        const delta = target.price * percentChange;
        
        target.price += delta;
        
        // Boundaries checks
        if (target.price > target.high) target.high = target.price;
        if (target.price < target.low) target.low = target.price;
        
        // Update trend array (shift older, push newer)
        target.trend.shift();
        target.trend.push(target.price);
        
        // Check if row exists in active movers table
        const row = document.getElementById(`mover-row-${target.symbol}`);
        if (row) {
            const flashClass = delta >= 0 ? "price-flash-up" : "price-flash-down";
            row.classList.add(flashClass);
            setTimeout(() => {
                row.classList.remove(flashClass);
            }, 600);
        }
    });
    
    // Perturb active index values matching stock trends
    Object.keys(indexData).forEach(key => {
        const idx = indexData[key];
        const percentChange = (Math.random() * 0.16 - 0.08) / 100; // smaller index fluctuation
        const delta = idx.price * percentChange;
        idx.price += delta;
        
        // Update trend value
        idx.history["1d"].shift();
        idx.history["1d"].push(idx.price);
        
        // Update active indices elements
        const cardVal = document.getElementById(`val-${key}`);
        const cardChg = document.getElementById(`chg-${key}`);
        
        if (cardVal && cardChg) {
            const changeVal = idx.price - idx.prevClose;
            const changePct = (changeVal / idx.prevClose) * 100;
            const sign = changeVal >= 0 ? "+" : "";
            const textClass = changeVal >= 0 ? "text-up" : "text-down";
            const badgeClass = changeVal >= 0 ? "bg-up-badge" : "bg-down-badge";
            
            cardVal.textContent = formatCurrency(idx.price, 2);
            cardChg.className = `index-change-wrap ${textClass}`;
            cardChg.innerHTML = `
                <span>${sign}${formatCurrency(changeVal, 2)}</span>
                <span class="${badgeClass}">${sign}${changePct.toFixed(2)}%</span>
            `;
            
            // Add tiny price flash animation
            const parentCard = cardVal.closest(".index-card");
            if (parentCard) {
                const flashClass = delta >= 0 ? "price-flash-up" : "price-flash-down";
                parentCard.classList.add(flashClass);
                setTimeout(() => {
                    parentCard.classList.remove(flashClass);
                }, 600);
            }
        }
    });
    
    // Refresh table and ticker feeds
    const activeMoverTab = document.querySelector(".mover-tab-btn.active");
    if (activeMoverTab) {
        renderMoversTable(activeMoverTab.getAttribute("data-tab"));
    }
    initGlobalTickers();
    
    // Redraw active index chart if on dashboard
    if (document.getElementById("nifty-svg-chart")) {
        drawIndexChart();
    }
}

// ==========================================
// 9. TIMELINE ACCORDION ON ABOUT PAGE
// ==========================================
function initTimeline() {
    document.querySelectorAll(".timeline-card").forEach(card => {
        card.addEventListener("click", () => {
            // Check if active
            const isActive = card.classList.contains("active");
            
            // Collapse all
            document.querySelectorAll(".timeline-card").forEach(c => c.classList.remove("active"));
            
            // If not active before, expand this one
            if (!isActive) {
                card.classList.add("active");
            }
        });
    });
}

// ==========================================
// 10. SERVICES TRANSACTION FEE CALCULATOR
// ==========================================
function initCalculator() {
    const inputVal = document.getElementById("turnover-amount");
    const sliderVal = document.getElementById("turnover-slider");
    const textLabel = document.getElementById("calc-slider-value");
    
    let activeSegment = "delivery";
    
    if (!inputVal || !sliderVal) return;
    
    // Sync ranges slider & direct numbers input
    sliderVal.addEventListener("input", (e) => {
        inputVal.value = e.target.value;
        textLabel.textContent = `₹ ${formatCurrency(parseInt(e.target.value), 0)}`;
        calculateCharges(parseInt(e.target.value), activeSegment);
    });
    
    inputVal.addEventListener("input", (e) => {
        let val = parseInt(e.target.value) || 0;
        if (val > 10000000) val = 10000000;
        sliderVal.value = val;
        textLabel.textContent = `₹ ${formatCurrency(val, 0)}`;
        calculateCharges(val, activeSegment);
    });
    
    // Segment Buttons click
    document.querySelectorAll(".asset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".asset-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeSegment = btn.getAttribute("data-segment");
            calculateCharges(parseInt(inputVal.value), activeSegment);
        });
    });
    
    // Initial Compute
    calculateCharges(500000, "delivery");
}

function calculateCharges(turnover, segment) {
    let exchangeFee = 0;
    let stt = 0;
    let sebi = 0;
    let ipft = 0;
    let brokerage = 0;
    
    // Fee Structures depending on selected asset segment
    if (segment === "delivery") {
        exchangeFee = turnover * 0.0000345; // 0.00345%
        stt = turnover * 0.001;            // 0.1% (Buy + Sell average)
        sebi = turnover * 0.000001;        // 0.0001%
        ipft = turnover * 0.0000001;       // 0.00001%
        brokerage = Math.min(turnover * 0.0001, 20); // 0.01% capped at ₹20
    } else if (segment === "intraday") {
        exchangeFee = turnover * 0.0000345;
        stt = turnover * 0.00025;          // 0.025%
        sebi = turnover * 0.000001;
        ipft = turnover * 0.0000001;
        brokerage = Math.min(turnover * 0.0003, 20); // 0.03% capped at ₹20
    } else if (segment === "futures") {
        exchangeFee = turnover * 0.000019;  // 0.0019%
        stt = turnover * 0.000125;         // 0.0125%
        sebi = turnover * 0.000001;
        ipft = turnover * 0.0000001;
        brokerage = Math.min(turnover * 0.0003, 20);
    } else if (segment === "options") {
        // Options premium trades are lower turnover, let's say average premium is 10% of standard turnover
        const premiumTurnover = turnover * 0.08;
        exchangeFee = premiumTurnover * 0.00053; // 0.053%
        stt = premiumTurnover * 0.000625;        // 0.0625%
        sebi = premiumTurnover * 0.000001;
        ipft = premiumTurnover * 0.0000001;
        brokerage = 20; // flat ₹20 per trade
    }
    
    const total = exchangeFee + stt + sebi + ipft + brokerage;
    
    // Update elements
    document.getElementById("fee-exchange").textContent = `₹ ${formatCurrency(exchangeFee, 2)}`;
    document.getElementById("fee-stt").textContent = `₹ ${formatCurrency(stt, 2)}`;
    document.getElementById("fee-sebi").textContent = `₹ ${formatCurrency(sebi, 2)}`;
    document.getElementById("fee-ipft").textContent = `₹ ${formatCurrency(ipft, 2)}`;
    document.getElementById("fee-brokerage").textContent = `₹ ${formatCurrency(brokerage, 2)}`;
    document.getElementById("fee-total").textContent = `₹ ${formatCurrency(total, 2)}`;
}

// ==========================================
// 11. CLIENT PORTAL LOGIN FLOW
// ==========================================
function initLoginPortal() {
    const tabInvestor = document.getElementById("login-tab-investor");
    const tabCorporate = document.getElementById("login-tab-corporate");
    const idLabel = document.getElementById("label-client-id");
    const idInput = document.getElementById("login-client-id");
    const errorBlock = document.getElementById("login-error-message");
    const form = document.getElementById("login-form-submit");
    const submitBtn = document.getElementById("btn-login-submit");
    const otpContainer = document.getElementById("otp-field-container");
    const otpInput = document.getElementById("login-otp-code");
    const togglePass = document.getElementById("password-toggle-visibility");
    const passInput = document.getElementById("login-password");
    
    let isCorporate = false;
    let step = 1; // Step 1: User/Pass validation, Step 2: OTP authentication
    
    // Tab switching
    if (tabInvestor && tabCorporate) {
        tabInvestor.addEventListener("click", () => {
            tabCorporate.classList.remove("active");
            tabInvestor.classList.add("active");
            idLabel.textContent = "PAN Card / Client ID";
            idInput.placeholder = "e.g. ABCDE1234F or 100489";
            isCorporate = false;
            errorBlock.style.display = "none";
        });
        
        tabCorporate.addEventListener("click", () => {
            tabInvestor.classList.remove("active");
            tabCorporate.classList.add("active");
            idLabel.textContent = "Corporate CIN / GSTIN";
            idInput.placeholder = "e.g. U12345DL2023PLC123456";
            isCorporate = true;
            errorBlock.style.display = "none";
        });
    }
    
    // Password toggle
    if (togglePass && passInput) {
        togglePass.addEventListener("click", () => {
            if (passInput.type === "password") {
                passInput.type = "text";
                togglePass.style.color = "var(--accent-blue)";
            } else {
                passInput.type = "password";
                togglePass.style.color = "var(--text-muted)";
            }
        });
    }
    
    // Form submission flow
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            errorBlock.style.display = "none";
            
            const clientVal = idInput.value.trim();
            const passVal = passInput.value.trim();
            
            if (step === 1) {
                // Mock verification of client id format
                if (clientVal.length < 5 || passVal.length < 6) {
                    errorBlock.textContent = isCorporate 
                        ? "Authentication failed. Verify CIN/GSTIN format and password." 
                        : "Invalid Login details. Ensure PAN format is correct.";
                    errorBlock.style.display = "block";
                    return;
                }
                
                // Success: Transition to Step 2 OTP
                submitBtn.querySelector("span").textContent = "Verifying Credentials...";
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    step = 2;
                    submitBtn.disabled = false;
                    submitBtn.querySelector("span").textContent = "Verify & Access Account";
                    otpContainer.style.display = "block";
                    otpInput.required = true;
                    otpInput.focus();
                    
                    // Alert simulation value
                    alert("DEMO SECURITY PIN: Enter '123456' to proceed successfully.");
                }, 1000);
                
            } else if (step === 2) {
                const otpVal = otpInput.value.trim();
                if (otpVal !== "123456") {
                    errorBlock.textContent = "Invalid security PIN code. Please check and try again.";
                    errorBlock.style.display = "block";
                    return;
                }
                
                // Mock Success redirect
                submitBtn.querySelector("span").textContent = "Redirecting to Dashboard...";
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert(`Welcome to Stackly! Successfully authenticated account: ${clientVal}`);
                    if (isCorporate) {
                        window.location.href = "coperate-dashboard.html";
                    } else {
                        window.location.href = "investor-dashboard.html";
                    }
                }, 1200);
            }
        });
    }
}

// ==========================================
// 12. PORTFOLIO STATE MANAGEMENT (INVESTOR)
// ==========================================
function getPortfolioState() {
    if (!sessionStorage.getItem("investor_holdings")) {
        const defaultHoldings = [
            { symbol: "RELIANCE", qty: 15, buyPrice: 2850.00 },
            { symbol: "TCS", qty: 8, buyPrice: 3750.00 },
            { symbol: "INFOSYS", qty: 25, buyPrice: 1440.00 },
            { symbol: "HDFCBANK", qty: 40, buyPrice: 1520.00 }
        ];
        sessionStorage.setItem("investor_holdings", JSON.stringify(defaultHoldings));
    }
    if (!sessionStorage.getItem("investor_cash")) {
        sessionStorage.setItem("investor_cash", "250000.00");
    }
    if (!sessionStorage.getItem("investor_transactions")) {
        const defaultTx = [
            { symbol: "RELIANCE", type: "BUY", qty: 15, price: 2850.00, time: "2026-06-19 14:32" },
            { symbol: "TCS", type: "BUY", qty: 8, price: 3750.00, time: "2026-06-18 10:15" },
            { symbol: "INFOSYS", type: "BUY", qty: 25, price: 1440.00, time: "2026-06-17 11:45" },
            { symbol: "HDFCBANK", type: "BUY", qty: 40, price: 1520.00, time: "2026-06-16 09:20" }
        ];
        sessionStorage.setItem("investor_transactions", JSON.stringify(defaultTx));
    }
    return {
        holdings: JSON.parse(sessionStorage.getItem("investor_holdings")),
        cash: parseFloat(sessionStorage.getItem("investor_cash")),
        transactions: JSON.parse(sessionStorage.getItem("investor_transactions"))
    };
}

function updatePortfolioState(holdings, cash, transactions) {
    sessionStorage.setItem("investor_holdings", JSON.stringify(holdings));
    sessionStorage.setItem("investor_cash", cash.toFixed(2));
    sessionStorage.setItem("investor_transactions", JSON.stringify(transactions));
}

// ==========================================
// 13. INVESTOR DASHBOARD CONTROLLER
// ==========================================
function initInvestorDashboard() {
    const state = getPortfolioState();
    renderInvestorStats(state);
    renderHoldingsTable(state.holdings);
    renderTransactionsTable(state.transactions);
    
    // Quick buy/sell hooks in sidebar console
    const symbolSelect = document.getElementById("inv-console-symbol");
    const qtyInput = document.getElementById("inv-console-qty");
    const valLabel = document.getElementById("inv-console-value");
    const executeBtn = document.getElementById("inv-console-execute");
    const typeTabs = document.querySelectorAll(".trade-tab-btn");
    
    let orderType = "BUY"; // default
    
    // Populate stock symbols dropdown
    if (symbolSelect) {
        symbolSelect.innerHTML = stockDatabase.map(stk => `
            <option value="${stk.symbol}">${stk.symbol} (LTP: ₹${stk.price.toFixed(2)})</option>
        `).join("");
        
        // Value sync
        const updateVal = () => {
            const sym = symbolSelect.value;
            const qty = parseInt(qtyInput.value) || 0;
            const stk = stockDatabase.find(s => s.symbol === sym);
            if (stk) {
                const totalVal = stk.price * qty;
                valLabel.textContent = `₹ ${formatCurrency(totalVal, 2)}`;
            }
        };
        
        symbolSelect.addEventListener("change", updateVal);
        qtyInput.addEventListener("input", updateVal);
        updateVal();
        
        // Buy/Sell toggle tabs
        typeTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                typeTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                orderType = tab.getAttribute("data-type");
                executeBtn.textContent = orderType === "BUY" ? "Place Buy Order" : "Place Sell Order";
                executeBtn.className = `btn-execute ${orderType === "BUY" ? "buy" : "sell"}`;
            });
        });
        
        // Execute trade
        executeBtn.addEventListener("click", () => {
            const sym = symbolSelect.value;
            const qty = parseInt(qtyInput.value) || 0;
            if (qty <= 0) {
                alert("Please enter a valid quantity.");
                return;
            }
            
            const stk = stockDatabase.find(s => s.symbol === sym);
            if (!stk) return;
            
            const state = getPortfolioState();
            const totalCost = stk.price * qty;
            
            if (orderType === "BUY") {
                if (state.cash < totalCost) {
                    alert("Insufficient cash balance to complete this purchase.");
                    return;
                }
                state.cash -= totalCost;
                
                // Add/Update Holdings
                const existing = state.holdings.find(h => h.symbol === sym);
                if (existing) {
                    const totalQty = existing.qty + qty;
                    existing.buyPrice = ((existing.qty * existing.buyPrice) + totalCost) / totalQty;
                    existing.qty = totalQty;
                } else {
                    state.holdings.push({ symbol: sym, qty, buyPrice: stk.price });
                }
            } else {
                const existing = state.holdings.find(h => h.symbol === sym);
                if (!existing || existing.qty < qty) {
                    alert("You do not hold enough shares to complete this sale.");
                    return;
                }
                state.cash += totalCost;
                existing.qty -= qty;
                
                // Remove if 0
                if (existing.qty === 0) {
                    state.holdings = state.holdings.filter(h => h.symbol !== sym);
                }
            }
            
            // Log transaction
            const now = new Date();
            const timeStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
            state.transactions.unshift({ symbol: sym, type: orderType, qty, price: stk.price, time: timeStr });
            
            // Save state
            updatePortfolioState(state.holdings, state.cash, state.transactions);
            
            // Re-render
            renderInvestorStats(state);
            renderHoldingsTable(state.holdings);
            renderTransactionsTable(state.transactions);
            qtyInput.value = "";
            updateVal();
            
            alert(`Order executed successfully! ${orderType} ${qty} ${sym} shares.`);
        });
    }
    
    // Live update hook for statistics & table values during simulation
    setInterval(() => {
        const state = getPortfolioState();
        renderInvestorStats(state);
        updateLiveHoldingsPL();
    }, 2500);
}

function renderInvestorStats(state) {
    const netWorthEl = document.getElementById("inv-net-worth");
    const portfolioEl = document.getElementById("inv-portfolio-val");
    const cashEl = document.getElementById("inv-cash-balance");
    const plEl = document.getElementById("inv-total-pl");
    
    if (!netWorthEl) return;
    
    let holdingsVal = 0;
    let originalCost = 0;
    
    state.holdings.forEach(h => {
        const dbStock = stockDatabase.find(s => s.symbol === h.symbol);
        if (dbStock) {
            holdingsVal += dbStock.price * h.qty;
        }
        originalCost += h.buyPrice * h.qty;
    });
    
    const netWorth = state.cash + holdingsVal;
    const totalPL = holdingsVal - originalCost;
    const plPct = originalCost > 0 ? (totalPL / originalCost) * 100 : 0.00;
    
    netWorthEl.textContent = `₹ ${formatCurrency(netWorth, 2)}`;
    portfolioEl.textContent = `₹ ${formatCurrency(holdingsVal, 2)}`;
    cashEl.textContent = `₹ ${formatCurrency(state.cash, 2)}`;
    
    const sign = totalPL >= 0 ? "+" : "";
    const colorClass = totalPL >= 0 ? "text-up" : "text-down";
    const badgeClass = totalPL >= 0 ? "bg-up-badge" : "bg-down-badge";
    
    plEl.className = `dashboard-stat-subtext ${colorClass}`;
    plEl.innerHTML = `<span class="${badgeClass}">${sign}${plPct.toFixed(2)}%</span> <span>${sign}₹${formatCurrency(totalPL, 2)} All Time</span>`;
}

function renderHoldingsTable(holdings) {
    const tbody = document.getElementById("holdings-table-body");
    if (!tbody) return;
    
    if (holdings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px 10px;">No portfolio holdings found. Add securities using the Order entry console.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = holdings.map(h => {
        const stk = stockDatabase.find(s => s.symbol === h.symbol);
        const ltp = stk ? stk.price : h.buyPrice;
        const currentVal = ltp * h.qty;
        const cost = h.buyPrice * h.qty;
        const pl = currentVal - cost;
        const plPct = (pl / cost) * 100;
        const sign = pl >= 0 ? "+" : "";
        const textClass = pl >= 0 ? "text-up" : "text-down";
        
        return `
            <tr onclick="window.location.href='stock.html?symbol=${h.symbol}'" style="cursor: pointer;">
                <td>
                    <span class="stock-symbol">${h.symbol}</span>
                    <span class="company-name">${stk ? stk.name : ""}</span>
                </td>
                <td style="font-family: monospace; font-weight: 600;">${h.qty}</td>
                <td style="font-family: monospace;">₹${h.buyPrice.toFixed(2)}</td>
                <td style="font-family: monospace; font-weight: 700;" id="holdings-ltp-${h.symbol}">₹${ltp.toFixed(2)}</td>
                <td style="font-family: monospace; font-weight: 700;" id="holdings-val-${h.symbol}">₹${formatCurrency(currentVal, 2)}</td>
                <td class="${textClass}" style="font-family: monospace; font-weight: 700;" id="holdings-pl-${h.symbol}">
                    ${sign}₹${formatCurrency(pl, 2)}
                </td>
                <td id="holdings-plpct-${h.symbol}">
                    <span class="${pl >= 0 ? 'bg-up-badge' : 'bg-down-badge'}">${sign}${plPct.toFixed(2)}%</span>
                </td>
            </tr>
        `;
    }).join("");
}

function updateLiveHoldingsPL() {
    const state = getPortfolioState();
    state.holdings.forEach(h => {
        const stk = stockDatabase.find(s => s.symbol === h.symbol);
        if (!stk) return;
        
        const ltpEl = document.getElementById(`holdings-ltp-${h.symbol}`);
        const valEl = document.getElementById(`holdings-val-${h.symbol}`);
        const plEl = document.getElementById(`holdings-pl-${h.symbol}`);
        const plpctEl = document.getElementById(`holdings-plpct-${h.symbol}`);
        
        if (ltpEl && valEl && plEl && plpctEl) {
            const currentVal = stk.price * h.qty;
            const cost = h.buyPrice * h.qty;
            const pl = currentVal - cost;
            const plPct = (pl / cost) * 100;
            const sign = pl >= 0 ? "+" : "";
            const textClass = pl >= 0 ? "text-up" : "text-down";
            const badgeClass = pl >= 0 ? "bg-up-badge" : "bg-down-badge";
            
            ltpEl.textContent = `₹${stk.price.toFixed(2)}`;
            valEl.textContent = `₹${formatCurrency(currentVal, 2)}`;
            plEl.textContent = `${sign}₹${formatCurrency(pl, 2)}`;
            plEl.className = `${textClass}`;
            plpctEl.innerHTML = `<span class="${badgeClass}">${sign}${plPct.toFixed(2)}%</span>`;
        }
    });
}

function renderTransactionsTable(transactions) {
    const tbody = document.getElementById("transactions-list-body");
    if (!tbody) return;
    
    if (transactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px 10px;">No transaction logs available.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = transactions.slice(0, 10).map(t => {
        const typeClass = t.type === "BUY" ? "text-up" : "text-down";
        const val = t.price * t.qty;
        
        return `
            <tr>
                <td style="font-size: 0.8rem; color: var(--text-secondary);">${t.time}</td>
                <td style="font-weight: 700;">${t.symbol}</td>
                <td><span style="font-weight: 800; font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; background: ${t.type==='BUY'?'var(--color-up-bg)':'var(--color-down-bg)'}" class="${typeClass}">${t.type}</span></td>
                <td style="font-family: monospace;">${t.qty} @ ₹${t.price.toFixed(2)}</td>
                <td style="font-family: monospace; font-weight: 700;">₹${formatCurrency(val, 2)}</td>
            </tr>
        `;
    }).join("");
}

// ==========================================
// 14. CORPORATE DASHBOARD CONTROLLER
// ==========================================
function getCorporateFilings() {
    if (!sessionStorage.getItem("corporate_filings")) {
        const defaultFilings = [
            { title: "Financial Results for Q4 FY25-26", category: "Financials", status: "VERIFIED", date: "2026-05-15" },
            { title: "Shareholding Pattern for Period Ending March 2026", category: "Disclosures", status: "VERIFIED", date: "2026-04-10" },
            { title: "Outcome of Board Meeting held on April 2nd", category: "Board Meet", status: "VERIFIED", date: "2026-04-02" }
        ];
        sessionStorage.setItem("corporate_filings", JSON.stringify(defaultFilings));
    }
    return JSON.parse(sessionStorage.getItem("corporate_filings"));
}

function initCorporateDashboard() {
    renderFilingsList();
    
    // Live update company share stats (We use RELIANCE as corporate database entity)
    const stockPriceEl = document.getElementById("corp-share-price");
    const stockMarketcapEl = document.getElementById("corp-market-cap");
    const stockChangeEl = document.getElementById("corp-price-change");
    
    const updateCorpStats = () => {
        const stk = stockDatabase.find(s => s.symbol === "RELIANCE");
        if (stk && stockPriceEl) {
            stockPriceEl.textContent = `₹${stk.price.toFixed(2)}`;
            
            // Mock shares outstanding = 676 crore shares
            const marketCapCr = (stk.price * 6760000000) / 10000000;
            stockMarketcapEl.textContent = `₹ ${formatCurrency(marketCapCr, 1)} Cr`;
            
            const change = stk.price - stk.prevClose;
            const changePct = (change / stk.prevClose) * 100;
            const sign = change >= 0 ? "+" : "";
            const colorClass = change >= 0 ? "text-up" : "text-down";
            const badgeClass = change >= 0 ? "bg-up-badge" : "bg-down-badge";
            
            stockChangeEl.className = `dashboard-stat-subtext ${colorClass}`;
            stockChangeEl.innerHTML = `<span class="${badgeClass}">${sign}${changePct.toFixed(2)}%</span> <span>Daily Change</span>`;
        }
    };
    updateCorpStats();
    setInterval(updateCorpStats, 2500);
    
    // Setup new regulatory filing submit handler
    const form = document.getElementById("new-filing-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("filing-title").value.trim();
            const category = document.getElementById("filing-category").value;
            
            if (!title) return;
            
            const filings = getCorporateFilings();
            const now = new Date();
            const dateStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}`;
            
            filings.unshift({ title, category, status: "PENDING", date: dateStr });
            sessionStorage.setItem("corporate_filings", JSON.stringify(filings));
            
            // Add announcement to the global feed so it shows up in sidebar
            announcements.unshift({ tag: category, text: `RELIANCE: ${title}`, time: "Just now" });
            if (typeof renderAnnouncements === "function") {
                renderAnnouncements();
            }
            
            renderFilingsList();
            form.reset();
            alert("Disclosure filing submitted successfully to exchange clearing surveillance division.");
        });
    }
}

function renderFilingsList() {
    const list = document.getElementById("corp-filings-list");
    if (!list) return;
    
    const filings = getCorporateFilings();
    
    list.innerHTML = filings.map(f => `
        <div class="filing-item">
            <div>
                <span class="announce-tag" style="margin-bottom:4px; font-size:0.6rem;">${f.category}</span>
                <h4 style="font-size:0.9rem; margin-top:2px;">${f.title}</h4>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Submitted: ${f.date}</div>
            </div>
            <span class="filing-status ${f.status.toLowerCase()}">${f.status}</span>
        </div>
    `).join("");
}

// ==========================================
// 15. MARKET PORTAL CONTROLLER
// ==========================================
function initMarketPage() {
    renderMarketTable("all");
    renderAdvanceDecline();
    
    // Movers Tab Menu
    document.querySelectorAll(".mover-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".mover-tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.getAttribute("data-tab");
            renderMarketTable(category);
        });
    });
    
    // Live update calculations during fluctuation
    setInterval(() => {
        renderAdvanceDecline();
        const activeTab = document.querySelector(".mover-tab-btn.active");
        if (activeTab) {
            renderMarketTable(activeTab.getAttribute("data-tab"));
        }
        updateMarketHeatmap();
    }, 2500);
}

function renderAdvanceDecline() {
    const barAdvances = document.getElementById("ad-advances");
    const barDeclines = document.getElementById("ad-declines");
    const labelAdvances = document.getElementById("ad-label-advances");
    const labelDeclines = document.getElementById("ad-label-declines");
    
    if (!barAdvances) return;
    
    let advances = 0;
    let declines = 0;
    
    stockDatabase.forEach(stk => {
        if (stk.price >= stk.prevClose) {
            advances++;
        } else {
            declines++;
        }
    });
    
    const total = advances + declines;
    const advPct = (advances / total) * 100;
    const decPct = (declines / total) * 100;
    
    barAdvances.style.width = `${advPct}%`;
    barDeclines.style.width = `${decPct}%`;
    
    labelAdvances.textContent = `${advances} Advances (${advPct.toFixed(0)}%)`;
    labelDeclines.textContent = `${declines} Declines (${decPct.toFixed(0)}%)`;
}

function updateMarketHeatmap() {
    // IT sector averages TCS + INFOSYS
    const tcs = stockDatabase.find(s => s.symbol === "TCS");
    const infy = stockDatabase.find(s => s.symbol === "INFOSYS");
    if (tcs && infy) {
        const avgItPct = (((tcs.price - tcs.prevClose)/tcs.prevClose) + ((infy.price - infy.prevClose)/infy.prevClose)) / 2 * 100;
        setHeatmapCard("heat-it", avgItPct);
    }
    
    // Banking: HDFCBANK, ICICIBANK, SBIN
    const hdfc = stockDatabase.find(s => s.symbol === "HDFCBANK");
    const icici = stockDatabase.find(s => s.symbol === "ICICIBANK");
    const sbin = stockDatabase.find(s => s.symbol === "SBIN");
    if (hdfc && icici && sbin) {
        const avgBkPct = (((hdfc.price - hdfc.prevClose)/hdfc.prevClose) + ((icici.price - icici.prevClose)/icici.prevClose) + ((sbin.price - sbin.prevClose)/sbin.prevClose)) / 3 * 100;
        setHeatmapCard("heat-banking", avgBkPct);
    }
    
    // Energy: RELIANCE
    const reliance = stockDatabase.find(s => s.symbol === "RELIANCE");
    if (reliance) {
        const energyPct = ((reliance.price - reliance.prevClose)/reliance.prevClose) * 100;
        setHeatmapCard("heat-energy", energyPct);
    }
    
    // Consumer Goods: ITC, HINDUNILVR
    const itc = stockDatabase.find(s => s.symbol === "ITC");
    const hul = stockDatabase.find(s => s.symbol === "HINDUNILVR");
    if (itc && hul) {
        const avgCgPct = (((itc.price - itc.prevClose)/itc.prevClose) + ((hul.price - hul.prevClose)/hul.prevClose)) / 2 * 100;
        setHeatmapCard("heat-fmcg", avgCgPct);
    }
    
    // Infrastructure: LT
    const lt = stockDatabase.find(s => s.symbol === "LT");
    if (lt) {
        const infraPct = ((lt.price - lt.prevClose)/lt.prevClose) * 100;
        setHeatmapCard("heat-infra", infraPct);
    }
}

function setHeatmapCard(id, value) {
    const card = document.getElementById(id);
    if (!card) return;
    
    const sign = value >= 0 ? "+" : "";
    const colorClass = value >= 0 ? "up" : "down";
    const textClass = value >= 0 ? "text-up" : "text-down";
    
    card.className = `heatmap-card ${colorClass}`;
    card.querySelector(".change").className = `change ${textClass}`;
    card.querySelector(".change").textContent = `${sign}${value.toFixed(2)}%`;
}

function renderMarketTable(category) {
    const tbody = document.getElementById("market-table-body");
    if (!tbody) return;
    
    let sorted = [...stockDatabase];
    
    if (category === "gainers") {
        sorted = sorted.filter(s => s.price > s.prevClose).sort((a, b) => {
            const chgA = ((a.price - a.prevClose) / a.prevClose);
            const chgB = ((b.price - b.prevClose) / b.prevClose);
            return chgB - chgA;
        });
    } else if (category === "losers") {
        sorted = sorted.filter(s => s.price < s.prevClose).sort((a, b) => {
            const chgA = ((a.price - a.prevClose) / a.prevClose);
            const chgB = ((b.price - b.prevClose) / b.prevClose);
            return chgA - chgB;
        });
    } else if (category === "volume") {
        sorted.sort((a, b) => b.volume - a.volume);
    }
    
    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px 10px;">No stocks matching category criteria.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = sorted.map(stk => {
        const changeVal = stk.price - stk.prevClose;
        const changePct = (changeVal / stk.prevClose) * 100;
        const sign = changeVal >= 0 ? "+" : "";
        const textClass = changeVal >= 0 ? "text-up" : "text-down";
        const badgeClass = changeVal >= 0 ? "bg-up-badge" : "bg-down-badge";
        
        return `
            <tr onclick="window.location.href='stock.html?symbol=${stk.symbol}'" style="cursor: pointer;">
                <td>
                    <span class="stock-symbol">${stk.symbol}</span>
                    <span class="company-name">${stk.name}</span>
                </td>
                <td style="font-family: monospace; font-weight: 700;">₹${formatCurrency(stk.price, 2)}</td>
                <td class="${textClass}" style="font-family: monospace;">${sign}${formatCurrency(changeVal, 2)}</td>
                <td><span class="${badgeClass}">${sign}${changePct.toFixed(2)}%</span></td>
                <td style="font-family: monospace;">₹${formatCurrency(stk.prevClose, 2)}</td>
                <td style="font-family: monospace;">₹${formatCurrency(stk.high, 2)} / ₹${formatCurrency(stk.low, 2)}</td>
                <td style="font-family: monospace;">${stk.volume.toFixed(1)} L</td>
            </tr>
        `;
    }).join("");
}

// ==========================================
// 16. STOCK DETAIL & CALCULATOR CONTROLLER
// ==========================================
function initStockDetailPage() {
    // Parse query symbol
    const params = new URLSearchParams(window.location.search);
    const sym = (params.get("symbol") || "RELIANCE").toUpperCase();
    
    let stk = stockDatabase.find(s => s.symbol === sym);
    if (!stk) stk = stockDatabase[0];
    
    renderStockDetails(stk);
    drawStockChart(stk);
    
    // Hook quantity calculations
    const qtyInput = document.getElementById("trade-qty");
    const costLtpEl = document.getElementById("trade-est-price");
    const costBrokerageEl = document.getElementById("trade-est-charges");
    const costTotalEl = document.getElementById("trade-est-total");
    const executeBtn = document.getElementById("trade-btn-execute");
    const typeTabs = document.querySelectorAll(".trade-tab-btn");
    
    let tradeMode = "BUY"; // default
    
    const syncCalculations = () => {
        const qty = parseInt(qtyInput.value) || 0;
        const ltpCost = stk.price * qty;
        
        // Brokerage rules: 0.05% capped at ₹20 per side
        const brokerage = Math.min(ltpCost * 0.0005, 20.00);
        const total = tradeMode === "BUY" ? (ltpCost + brokerage) : (ltpCost - brokerage);
        
        costLtpEl.textContent = `₹${formatCurrency(ltpCost, 2)}`;
        costBrokerageEl.textContent = `₹${formatCurrency(brokerage, 2)}`;
        costTotalEl.textContent = `₹${formatCurrency(Math.max(total, 0), 2)}`;
    };
    
    if (qtyInput) {
        qtyInput.addEventListener("input", syncCalculations);
        
        typeTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                typeTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                tradeMode = tab.getAttribute("data-type");
                executeBtn.textContent = tradeMode === "BUY" ? "Place Buy Order" : "Place Sell Order";
                executeBtn.className = `btn-execute ${tradeMode === "BUY" ? "buy" : "sell"}`;
                syncCalculations();
            });
        });
        
        executeBtn.addEventListener("click", () => {
            const qty = parseInt(qtyInput.value) || 0;
            if (qty <= 0) {
                alert("Please enter a valid stock quantity.");
                return;
            }
            
            const state = getPortfolioState();
            const ltpCost = stk.price * qty;
            const brokerage = Math.min(ltpCost * 0.0005, 20.00);
            
            if (tradeMode === "BUY") {
                const total = ltpCost + brokerage;
                if (state.cash < total) {
                    alert("Insufficient cash balance in your brokerage account.");
                    return;
                }
                state.cash -= total;
                const existing = state.holdings.find(h => h.symbol === stk.symbol);
                if (existing) {
                    const originalCostVal = existing.qty * existing.buyPrice;
                    existing.qty += qty;
                    existing.buyPrice = (originalCostVal + ltpCost) / existing.qty;
                } else {
                    state.holdings.push({ symbol: stk.symbol, qty, buyPrice: stk.price });
                }
            } else {
                const existing = state.holdings.find(h => h.symbol === stk.symbol);
                if (!existing || existing.qty < qty) {
                    alert("You do not hold enough shares of this security to complete this sale.");
                    return;
                }
                const total = ltpCost - brokerage;
                state.cash += total;
                existing.qty -= qty;
                if (existing.qty === 0) {
                    state.holdings = state.holdings.filter(h => h.symbol !== stk.symbol);
                }
            }
            
            // Log transaction
            const now = new Date();
            const timeStr = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
            state.transactions.unshift({ symbol: stk.symbol, type: tradeMode, qty, price: stk.price, time: timeStr });
            
            updatePortfolioState(state.holdings, state.cash, state.transactions);
            qtyInput.value = "";
            syncCalculations();
            
            alert(`Trade executed successfully! ${tradeMode} ${qty} shares of ${stk.symbol}.`);
        });
    }
    
    // Live fluctuations updates for detailing
    setInterval(() => {
        const activeStk = stockDatabase.find(s => s.symbol === stk.symbol);
        if (activeStk) {
            renderStockDetails(activeStk);
            syncCalculations();
        }
    }, 2500);
}

function renderStockDetails(stk) {
    const symbolEl = document.getElementById("stock-detail-symbol");
    const nameEl = document.getElementById("stock-detail-name");
    const ltpEl = document.getElementById("stock-detail-ltp");
    const changeEl = document.getElementById("stock-detail-change");
    
    const prevEl = document.getElementById("stock-detail-prev");
    const openEl = document.getElementById("stock-detail-open");
    const highEl = document.getElementById("stock-detail-high");
    const lowEl = document.getElementById("stock-detail-low");
    const high52El = document.getElementById("stock-detail-52high");
    const low52El = document.getElementById("stock-detail-52low");
    const volEl = document.getElementById("stock-detail-volume");
    
    if (!symbolEl) return;
    
    symbolEl.textContent = stk.symbol;
    nameEl.textContent = stk.name;
    ltpEl.textContent = `₹${stk.price.toFixed(2)}`;
    
    const change = stk.price - stk.prevClose;
    const changePct = (change / stk.prevClose) * 100;
    const sign = change >= 0 ? "+" : "";
    const colorClass = change >= 0 ? "text-up" : "text-down";
    const badgeClass = change >= 0 ? "bg-up-badge" : "bg-down-badge";
    
    changeEl.className = `index-change-wrap ${colorClass}`;
    changeEl.innerHTML = `<span>${sign}${change.toFixed(2)}</span> <span class="${badgeClass}">${sign}${changePct.toFixed(2)}%</span>`;
    
    prevEl.textContent = formatCurrency(stk.prevClose, 2);
    openEl.textContent = formatCurrency(stk.open, 2);
    highEl.textContent = formatCurrency(stk.high, 2);
    lowEl.textContent = formatCurrency(stk.low, 2);
    high52El.textContent = formatCurrency(stk.high52, 2);
    low52El.textContent = formatCurrency(stk.low52, 2);
    volEl.textContent = `${stk.volume.toFixed(1)} Lakhs`;
}

function drawStockChart(stk) {
    const svg = document.getElementById("stock-svg-chart");
    if (!svg) return;
    
    const viewport = document.getElementById("stock-chart-viewport");
    const width = viewport.clientWidth;
    const height = 320;
    
    const data = stk.trend; // uses the 7-day trend array
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    
    const buffer = (maxVal - minVal) * 0.15 || 5;
    const yMin = minVal - buffer;
    const yMax = maxVal + buffer;
    
    // Labels
    document.getElementById("sy-label-max").textContent = formatCurrency(yMax, 1);
    document.getElementById("sy-label-mid").textContent = formatCurrency((yMax + yMin) / 2, 1);
    document.getElementById("sy-label-min").textContent = formatCurrency(yMin, 1);
    
    const points = data.map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - yMin) / (yMax - yMin)) * (height - 30) - 15;
        return { x, y, val };
    });
    
    const isUp = data[data.length - 1] >= data[0];
    const accentColor = isUp ? "var(--color-up)" : "var(--color-down)";
    
    let lineD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        const cpX = points[i-1].x + (points[i].x - points[i-1].x) / 2;
        lineD += ` C ${cpX} ${points[i-1].y}, ${cpX} ${points[i].y}, ${points[i].x} ${points[i].y}`;
    }
    const areaD = `${lineD} L ${width} ${height} L 0 ${height} Z`;
    
    svg.querySelector(".chart-path-area").setAttribute("d", areaD);
    svg.querySelector(".chart-path-line").setAttribute("d", lineD);
    svg.querySelector(".chart-path-line").style.stroke = accentColor;
    
    // Stop gradient colors
    const stop0 = document.querySelector("#stock-chart-gradient stop[offset='0%']");
    const stop1 = document.querySelector("#stock-chart-gradient stop[offset='100%']");
    if (stop0 && stop1) {
        stop0.setAttribute("stop-color", isUp ? "#10b981" : "#ef4444");
        stop1.setAttribute("stop-color", isUp ? "#10b981" : "#ef4444");
    }
}

// ==========================================
// 17. CLIENT REGISTRATION MULTI-STEP FLOW
// ==========================================
function initRegisterForm() {
    const pane1 = document.getElementById("pane-step-1");
    const pane2 = document.getElementById("pane-step-2");
    const pane3 = document.getElementById("pane-step-3");
    
    const dot1 = document.getElementById("dot-step-1");
    const dot2 = document.getElementById("dot-step-2");
    const dot3 = document.getElementById("dot-step-3");
    
    const progressFill = document.getElementById("progress-fill-line");
    
    const next1 = document.getElementById("btn-next-1");
    const next2 = document.getElementById("btn-next-2");
    
    const prev2 = document.getElementById("btn-prev-2");
    const prev3 = document.getElementById("btn-prev-3");
    
    const formSubmit = document.getElementById("register-form-submit");
    
    // Multi-step transitions
    if (next1) {
        next1.addEventListener("click", () => {
            // Validate step 1 fields
            const nameInput = document.getElementById("reg-name");
            const emailInput = document.getElementById("reg-email");
            if (!nameInput.value || !emailInput.value) {
                alert("Please fill in all details before proceeding.");
                return;
            }
            
            pane1.classList.remove("active");
            pane2.classList.add("active");
            
            dot1.className = "register-step-dot completed";
            dot2.className = "register-step-dot active";
            progressFill.style.width = "50%";
        });
    }
    
    if (next2) {
        next2.addEventListener("click", () => {
            const panInput = document.getElementById("reg-pan");
            if (!panInput.value) {
                alert("PAN Card / Tax identification details are required.");
                return;
            }
            pane2.classList.remove("active");
            pane3.classList.add("active");
            
            dot2.className = "register-step-dot completed";
            dot3.className = "register-step-dot active";
            progressFill.style.width = "100%";
        });
    }
    
    if (prev2) {
        prev2.addEventListener("click", () => {
            pane2.classList.remove("active");
            pane1.classList.add("active");
            
            dot1.className = "register-step-dot active";
            dot2.className = "register-step-dot";
            progressFill.style.width = "0%";
        });
    }
    
    if (prev3) {
        prev3.addEventListener("click", () => {
            pane3.classList.remove("active");
            pane2.classList.add("active");
            
            dot2.className = "register-step-dot active";
            dot3.className = "register-step-dot";
            progressFill.style.width = "50%";
        });
    }
    
    if (formSubmit) {
        formSubmit.addEventListener("submit", (e) => {
            e.preventDefault();
            const password = document.getElementById("reg-pass").value;
            const pin = document.getElementById("reg-pin").value;
            
            if (password.length < 6 || pin.length !== 6) {
                alert("Password must be 6+ characters and PIN exactly 6 digits.");
                return;
            }
            
            alert("Registration application submitted successfully! Redirecting to secure login.");
            window.location.href = "login.html";
        });
    }
}

