/* ==========================================
   APEXEXCHANGE JAVASCRIPT ENGINE
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
                    alert(`Welcome to ApexExchange! Successfully authenticated account: ${clientVal}`);
                    window.location.href = "index.html";
                }, 1200);
            }
        });
    }
}
