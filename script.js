tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                display: ["Sora", "sans-serif"],
                body: ["Manrope", "sans-serif"],
                techno: ["Space Grotesk", "sans-serif"],
                apple: ["-apple-system", "BlinkMacSystemFont", "'SF Pro Display'", "'SF Pro Text'", "'Helvetica Neue'", "sans-serif"],
            },
            boxShadow: {
                soft: "0 24px 70px rgba(15, 23, 42, 0.12)",
                glass: "0 16px 45px rgba(17, 24, 39, 0.16)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "0.55" },
                    "50%": { opacity: "0.95" },
                },
            },
            animation: {
                float: "float 7s ease-in-out infinite",
                pulseGlow: "pulseGlow 6s ease-in-out infinite",
            },
        },
    },
};

const portfolioConfig = {
    profile: {
        email: "rajsuriya51@gmail.com",
        githubUsername: "JAI1209",
        githubUrl: "https://github.com/JAI1209",
        linkedinUrl: "https://www.linkedin.com/in/jai1209/",
        instagramUrl: "https://www.instagram.com/jaisuryakr/",
        whatsappNumber: "919296353911",
        whatsappMessage: "Hi Jai, I found your portfolio and wanted to connect.",
    },
    repoPageSize: 100,
};

window.addEventListener("DOMContentLoaded", () => {
    feather.replace({ "stroke-width": 1.8 });

    const topNavbar = document.getElementById("topNavbar");
    const navbarTime = document.getElementById("navbarTime");
    const navbarDate = document.getElementById("navbarDate");
    const navbarBinaryLayer = document.getElementById("navbarBinaryLayer");
    const notchNav = document.getElementById("notchNav");
    const notchNavTrack = document.getElementById("notchNavTrack");
    const notchIndicator = document.getElementById("notchIndicator");
    const notchNavItems = Array.from(document.querySelectorAll(".notch-nav-item"));
    const smartVideos = Array.from(document.querySelectorAll("video"));

    const searchOverlay = document.getElementById("searchOverlay");
    const openSearchButton = document.getElementById("openSearch");
    const closeSearchButton = document.getElementById("closeSearch");
    const searchBackdrop = document.getElementById("searchBackdrop");
    const siteSearchInput = document.getElementById("siteSearchInput");
    const searchResults = document.getElementById("searchResults");
    const searchMeta = document.getElementById("searchMeta");

    const repoGrid = document.getElementById("repoGrid");
    const githubProfileLink = document.getElementById("githubProfileLink");
    const repoHandle = document.getElementById("repoHandle");
    const repoFeedMeta = document.getElementById("repoFeedMeta");
    const repoProfileAvatar = document.getElementById("repoProfileAvatar");
    const repoProfileName = document.getElementById("repoProfileName");
    const repoProfileUsername = document.getElementById("repoProfileUsername");
    const repoProfileBio = document.getElementById("repoProfileBio");
    const repoProfileMeta = document.getElementById("repoProfileMeta");
    const repoProfileCount = document.getElementById("repoProfileCount");
    const repoProfileStars = document.getElementById("repoProfileStars");
    const repoProfileFollowers = document.getElementById("repoProfileFollowers");

    const emailLink = document.getElementById("emailLink");
    const contactGithub = document.getElementById("contactGithub");
    const contactGithubText = document.getElementById("contactGithubText");
    const contactLinkedin = document.getElementById("contactLinkedin");
    const contactLinkedinText = document.getElementById("contactLinkedinText");
    const contactInstagram = document.getElementById("contactInstagram");
    const contactInstagramText = document.getElementById("contactInstagramText");
    const contactWhatsapp = document.getElementById("contactWhatsapp");
    const contactWhatsappText = document.getElementById("contactWhatsappText");

    const searchState = {
        items: [],
    };
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const runWhenIdle = (callback, timeout = 1200) => {
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(callback, { timeout });
            return;
        }

        window.setTimeout(callback, Math.min(180, timeout));
    };
    const debounce = (callback, wait = 120) => {
        let timeoutId = null;

        return (...args) => {
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }

            timeoutId = window.setTimeout(() => {
                timeoutId = null;
                callback(...args);
            }, wait);
        };
    };
    const supportsLocalStorage = (() => {
        try {
            const probeKey = "__iojoy_perf_probe__";
            window.localStorage.setItem(probeKey, "1");
            window.localStorage.removeItem(probeKey);
            return true;
        } catch (error) {
            return false;
        }
    })();
    const githubCachePrefix = "iojoy:github-cache:";
    const githubCacheTtlMs = 1000 * 60 * 15;
    const getCachedJson = (key, { allowExpired = false } = {}) => {
        if (!supportsLocalStorage) {
            return null;
        }

        try {
            const raw = window.localStorage.getItem(key);

            if (!raw) {
                return null;
            }

            const parsed = JSON.parse(raw);

            if (!parsed || typeof parsed !== "object" || !("value" in parsed)) {
                window.localStorage.removeItem(key);
                return null;
            }

            const expiresAt = Number(parsed.expiresAt || 0);

            if (!allowExpired && expiresAt && Date.now() > expiresAt) {
                window.localStorage.removeItem(key);
                return null;
            }

            return parsed.value;
        } catch (error) {
            return null;
        }
    };
    const setCachedJson = (key, value, ttlMs = githubCacheTtlMs) => {
        if (!supportsLocalStorage) {
            return;
        }

        try {
            window.localStorage.setItem(key, JSON.stringify({
                value,
                expiresAt: Date.now() + Math.max(0, ttlMs),
            }));
        } catch (error) {
            // Ignore quota/storage errors and keep runtime behavior intact.
        }
    };
    const getGitHubCacheKey = (url) => `${githubCachePrefix}${url}`;

    const isConfiguredValue = (value) => {
        if (!value) {
            return false;
        }

        const normalized = String(value).trim().toLowerCase();

        return normalized !== ""
            && !normalized.includes("your-github-username")
            && !normalized.includes("your-linkedin-handle")
            && !normalized.includes("your-instagram-handle")
            && !normalized.includes("000000000000")
            && !normalized.includes("0000000000");
    };

    const getGitHubUsername = () => {
        if (isConfiguredValue(portfolioConfig.profile.githubUsername)) {
            return portfolioConfig.profile.githubUsername.trim();
        }

        if (isConfiguredValue(portfolioConfig.profile.githubUrl)) {
            const trimmed = portfolioConfig.profile.githubUrl.replace(/\/+$/, "");
            return trimmed.split("/").pop() || "";
        }

        return "";
    };

    const getWhatsappUrl = () => {
        if (!isConfiguredValue(portfolioConfig.profile.whatsappNumber)) {
            return "";
        }

        const digits = portfolioConfig.profile.whatsappNumber.replace(/\D/g, "");
        const text = encodeURIComponent(portfolioConfig.profile.whatsappMessage || "");
        return `https://wa.me/${digits}${text ? `?text=${text}` : ""}`;
    };

    const getHandleFromUrl = (url) => {
        if (!isConfiguredValue(url)) {
            return "";
        }

        try {
            const parsedUrl = new URL(url);
            const segments = parsedUrl.pathname.split("/").filter(Boolean);
            return segments.length ? segments[segments.length - 1] : parsedUrl.hostname;
        } catch (error) {
            return url;
        }
    };

    const prefersReducedMotion = () => reducedMotionQuery.matches;

    const getScrollOffset = () => {
        const navbarHeight = topNavbar?.getBoundingClientRect().height || 0;
        return Math.max(92, Math.round(navbarHeight + 18));
    };

    const updateLocationHash = (target) => {
        if (!target?.id || !window.history?.replaceState) {
            return;
        }

        window.history.replaceState(null, "", `#${target.id}`);
    };

    const scrollToTarget = (target, { updateHash = true } = {}) => {
        if (!target) {
            return;
        }

        const targetTop = target.id === "top"
            ? 0
            : Math.max(0, window.scrollY + target.getBoundingClientRect().top - getScrollOffset());

        window.scrollTo({
            top: targetTop,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
        });

        if (updateHash) {
            updateLocationHash(target);
        }
    };

    const setLinkState = (element, configured, href) => {
        if (!element) {
            return;
        }

        if (configured && href) {
            element.href = href;
            if (/^https?:/i.test(href)) {
                element.target = "_blank";
                element.rel = "noreferrer";
            }
            element.style.opacity = "1";
            element.style.pointerEvents = "auto";
        } else {
            element.href = "#contact";
            element.removeAttribute("target");
            element.removeAttribute("rel");
            element.style.opacity = "0.65";
            element.style.pointerEvents = "none";
        }
    };

    const updateNavbarDateTime = () => {
        if (!navbarTime || !navbarDate) {
            return;
        }

        const now = new Date();

        navbarTime.textContent = timeFormatter.format(now);
        navbarDate.textContent = dateFormatter.format(now);
    };
    const timeFormatter = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const makeBinaryLine = (groups) => {
        return Array.from({ length: groups }, () => {
            const digits = 4 + Math.floor(Math.random() * 7);
            return Array.from({ length: digits }, () => (Math.random() > 0.5 ? "1" : "0")).join("");
        }).join("   ");
    };

    const initBinaryNavbar = () => {
        if (!navbarBinaryLayer) {
            return;
        }

        const mediaQuery = window.matchMedia("(max-width: 640px)");
        let binaryRows = [];
        let binaryIntervalId = null;

        const buildBinaryBackground = () => {
            navbarBinaryLayer.innerHTML = "";
            const rowCount = mediaQuery.matches ? 4 : 6;

            binaryRows = Array.from({ length: rowCount }, (_, index) => {
                const row = document.createElement("span");
                row.className = `nav-binary-stream${index % 2 === 0 ? "" : " reverse"}`;
                row.style.top = `${16 + index * (mediaQuery.matches ? 18 : 13)}%`;
                row.style.setProperty("--duration", `${14 + Math.random() * 7}s`);
                row.style.setProperty("--delay", `${-Math.random() * 12}s`);
                row.style.opacity = `${0.38 + Math.random() * 0.22}`;
                row.textContent = makeBinaryLine(mediaQuery.matches ? 16 : 28);
                navbarBinaryLayer.appendChild(row);
                return row;
            });
        };

        const refreshBinaryRows = () => {
            binaryRows.forEach((row, index) => {
                row.textContent = makeBinaryLine(mediaQuery.matches ? 16 + (index % 2) * 2 : 28 + (index % 2) * 3);
            });
        };

        const stopBinaryTicker = () => {
            if (binaryIntervalId !== null) {
                window.clearInterval(binaryIntervalId);
                binaryIntervalId = null;
            }
        };

        const startBinaryTicker = () => {
            if (binaryIntervalId !== null || prefersReducedMotion() || document.hidden) {
                return;
            }

            binaryIntervalId = window.setInterval(refreshBinaryRows, 1600);
        };

        buildBinaryBackground();
        refreshBinaryRows();
        startBinaryTicker();

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", () => {
                buildBinaryBackground();
                refreshBinaryRows();
            });
        } else if (typeof mediaQuery.addListener === "function") {
            mediaQuery.addListener(() => {
                buildBinaryBackground();
                refreshBinaryRows();
            });
        }

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                stopBinaryTicker();
            } else {
                startBinaryTicker();
            }
        });
    };

    const initNotchNavigation = () => {
        if (!notchNav || !notchNavTrack || !notchIndicator || !notchNavItems.length) {
            return;
        }

        const navEntries = notchNavItems.map((item) => {
            const targetSelector = item.getAttribute("href") || "";

            return {
                item,
                target: targetSelector.startsWith("#") ? document.querySelector(targetSelector) : null,
            };
        });

        let activeItem = notchNavItems.find((item) => item.classList.contains("is-active")) || notchNavItems[0];
        let isTicking = false;
        const sectionRatios = new Map();
        let sectionObserver = null;
        let lastIndicatorCenter = null;
        let scrollLockUntil = 0;
        let trackEdgePadding = 0;

        const updateTrackMetrics = () => {
            const trackStyles = window.getComputedStyle(notchNavTrack);
            trackEdgePadding = parseFloat(trackStyles.paddingLeft || "0") || 0;
        };

        const positionIndicator = (item, { force = false } = {}) => {
            if (!item) {
                return;
            }

            const indicatorCenter = item.offsetLeft + (item.offsetWidth / 2);
            const trackWidth = notchNavTrack.clientWidth || notchNav.clientWidth || 0;
            const bubbleWidth = notchIndicator.offsetWidth || item.offsetWidth || 0;
            const minCenter = bubbleWidth ? ((bubbleWidth / 2) + trackEdgePadding) : indicatorCenter;
            const maxCenter = trackWidth ? (trackWidth - (bubbleWidth / 2) - trackEdgePadding) : indicatorCenter;
            const safeCenter = trackWidth
                ? Math.min(Math.max(indicatorCenter, minCenter), maxCenter)
                : indicatorCenter;

            if (!force && lastIndicatorCenter !== null && Math.abs(lastIndicatorCenter - safeCenter) < 0.5) {
                if (notchIndicator.innerHTML !== item.innerHTML) {
                    notchIndicator.innerHTML = item.innerHTML;
                }
                return;
            }

            lastIndicatorCenter = safeCenter;

            notchNav.style.setProperty("--active-left", `${safeCenter}px`);
            notchNavTrack.style.setProperty("--active-left", `${safeCenter}px`);

            if (notchIndicator.innerHTML !== item.innerHTML) {
                notchIndicator.innerHTML = item.innerHTML;
            }
        };

        const setActiveItem = (item, { force = false } = {}) => {
            if (!item) {
                return;
            }

            const didChange = item !== activeItem;
            activeItem = item;

            if (didChange || force) {
                notchNavItems.forEach((navItem) => {
                    const isActive = navItem === item;
                    navItem.classList.toggle("is-active", isActive);

                    if (isActive) {
                        navItem.setAttribute("aria-current", "page");
                    } else {
                        navItem.removeAttribute("aria-current");
                    }
                });
            }

            positionIndicator(item, { force: force || didChange });
        };

        const getEntryScore = ({ target }, scrollOffset, focusLine, viewportHeight) => {
            if (!target) {
                return Number.NEGATIVE_INFINITY;
            }

            const rect = target.getBoundingClientRect();
            const ratio = sectionRatios.get(target) || 0;
            const anchorLine = rect.top + Math.min(rect.height * 0.35, 180);
            const distancePenalty = Math.abs(anchorLine - focusLine);
            const isInViewport = rect.bottom > scrollOffset && rect.top < viewportHeight * 0.92;

            return (ratio * 1200) + (isInViewport ? 140 : 0) - distancePenalty;
        };

        const syncActiveItemToScroll = () => {
            if (performance.now() < scrollLockUntil) {
                return;
            }

            const viewportHeight = window.innerHeight;
            const scrollOffset = getScrollOffset();
            const focusLine = scrollOffset + (viewportHeight * 0.28);

            if (window.scrollY <= 18) {
                setActiveItem(navEntries[0]?.item || activeItem);
                return;
            }

            if (viewportHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
                setActiveItem(navEntries[navEntries.length - 1]?.item || activeItem);
                return;
            }

            let nextItem = activeItem;
            let bestScore = Number.NEGATIVE_INFINITY;

            navEntries.forEach((entry) => {
                const score = getEntryScore(entry, scrollOffset, focusLine, viewportHeight);

                if (score > bestScore) {
                    bestScore = score;
                    nextItem = entry.item;
                }
            });

            if (nextItem !== activeItem) {
                setActiveItem(nextItem);
            }
        };

        const observeSections = () => {
            if (!("IntersectionObserver" in window)) {
                return;
            }

            if (sectionObserver) {
                sectionObserver.disconnect();
            }

            sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    sectionRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
                });

                requestScrollSync();
            }, {
                root: null,
                rootMargin: `-${getScrollOffset()}px 0px -42% 0px`,
                threshold: [0, 0.08, 0.16, 0.28, 0.4, 0.55, 0.72, 0.88, 1],
            });

            navEntries.forEach(({ target }) => {
                if (target) {
                    sectionObserver.observe(target);
                }
            });
        };

        const requestScrollSync = () => {
            if (isTicking) {
                return;
            }

            isTicking = true;
            window.requestAnimationFrame(() => {
                syncActiveItemToScroll();
                isTicking = false;
            });
        };

        notchNavItems.forEach((item) => {
            item.addEventListener("click", () => {
                scrollLockUntil = performance.now() + (prefersReducedMotion() ? 0 : 720);
                window.requestAnimationFrame(() => setActiveItem(item, { force: true }));
            });
        });

        let resizeAnimationFrameId = 0;
        const handleResize = () => {
            if (resizeAnimationFrameId) {
                return;
            }

            resizeAnimationFrameId = window.requestAnimationFrame(() => {
                resizeAnimationFrameId = 0;
                updateTrackMetrics();
                positionIndicator(activeItem, { force: true });
                observeSections();
                requestScrollSync();
            });
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", requestScrollSync, { passive: true });
        window.addEventListener("load", () => {
            updateTrackMetrics();
            positionIndicator(activeItem, { force: true });
        });

        if ("ResizeObserver" in window) {
            const resizeObserver = new ResizeObserver(() => {
                updateTrackMetrics();
                positionIndicator(activeItem, { force: true });
            });
            resizeObserver.observe(notchNavTrack);
            notchNavItems.forEach((item) => resizeObserver.observe(item));
        }

        updateTrackMetrics();
        observeSections();
        const hashMatchedItem = notchNavItems.find((item) => item.getAttribute("href") === window.location.hash);
        setActiveItem(hashMatchedItem || activeItem);
        window.requestAnimationFrame(syncActiveItemToScroll);
    };

    const initSmoothInternalNavigation = () => {
        document.addEventListener("click", (event) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            const link = event.target.closest("a[href^='#']");

            if (!link) {
                return;
            }

            const href = link.getAttribute("href") || "";

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();
            scrollToTarget(target);
        });
    };

    const initSmartVideos = () => {
        if (!smartVideos.length) {
            return;
        }

        const videoState = new Map();
        const hydratedVideos = new WeakSet();

        const hydrateVideoSource = (video) => {
            if (hydratedVideos.has(video)) {
                return;
            }

            const lazySource = video.querySelector("source[data-src]");

            if (!lazySource) {
                hydratedVideos.add(video);
                return;
            }

            const sourceValue = lazySource.getAttribute("data-src");

            if (!sourceValue) {
                hydratedVideos.add(video);
                return;
            }

            lazySource.src = sourceValue;
            lazySource.removeAttribute("data-src");
            video.load();
            hydratedVideos.add(video);
        };

        const syncVideoPlayback = (video) => {
            const state = videoState.get(video);

            if (!state) {
                return;
            }

            const shouldPlay = state.shouldPlay && !document.hidden;

            video.classList.toggle("smart-video", true);
            video.classList.toggle("is-video-playing", shouldPlay);
            video.classList.toggle("is-video-paused", !shouldPlay);

            if (shouldPlay) {
                hydrateVideoSource(video);
                const playPromise = video.play();

                if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(() => { });
                }
            } else {
                video.pause();
            }
        };

        smartVideos.forEach((video) => {
            video.muted = true;
            video.playsInline = true;
            video.classList.add("smart-video", "is-video-paused");
            if (video.dataset.lazyVideo === "true") {
                video.preload = "none";
            }

            videoState.set(video, {
                shouldPlay: false,
            });
        });

        if ("IntersectionObserver" in window) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const state = videoState.get(entry.target);

                    if (!state) {
                        return;
                    }

                    if (entry.isIntersecting) {
                        hydrateVideoSource(entry.target);
                    }

                    state.shouldPlay = entry.isIntersecting && entry.intersectionRatio > 0.18;
                    syncVideoPlayback(entry.target);
                });
            }, {
                rootMargin: "220px 0px",
                threshold: [0, 0.12, 0.18, 0.3, 0.5, 0.75],
            });

            smartVideos.forEach((video) => videoObserver.observe(video));
        } else {
            smartVideos.forEach((video) => {
                const state = videoState.get(video);
                hydrateVideoSource(video);
                state.shouldPlay = true;
                syncVideoPlayback(video);
            });
        }

        document.addEventListener("visibilitychange", () => {
            smartVideos.forEach(syncVideoPlayback);
        });

        window.addEventListener("pageshow", () => {
            smartVideos.forEach(syncVideoPlayback);
        });
    };

    const buildSearchIndex = () => {
        const githubUsername = getGitHubUsername();
        const whatsappUrl = getWhatsappUrl();

        searchState.items = [
            {
                title: "Home",
                description: "Hero section and main intro",
                keywords: "home hero welcome jai iojoy landing page",
                href: "#top",
                type: "internal",
                category: "Section",
            },
            {
                title: "About Me",
                description: "About section, skills, and profile summary",
                keywords: "about frontend architecture ui design javascript react",
                href: "#about",
                type: "internal",
                category: "Section",
            },
            {
                title: "My Work",
                description: "Project showcase and case-study cards",
                keywords: "work projects portfolio dashboard showcase brand page",
                href: "#work",
                type: "internal",
                category: "Section",
            },
            {
                title: "GitHub Repositories",
                description: "Live GitHub repositories section",
                keywords: "github repositories repos code source projects",
                href: "#repos",
                type: "internal",
                category: "Section",
            },
            {
                title: "Contact",
                description: "Social links, WhatsApp, and email",
                keywords: "contact email github linkedin instagram whatsapp social",
                href: "#contact",
                type: "internal",
                category: "Section",
            },
            {
                title: "SaaS Dashboard Concept",
                description: "Work card for dashboard UI concept",
                keywords: "saas dashboard concept interface product ui",
                href: "#work",
                type: "internal",
                category: "Project",
            },
            {
                title: "Interactive Brand Page",
                description: "Work card for launch-style page",
                keywords: "brand page launch page animation motion website",
                href: "#work",
                type: "internal",
                category: "Project",
            },
            {
                title: "Video-First Showcase",
                description: "Work card for cinematic project presentation",
                keywords: "video showcase cinematic portfolio motion",
                href: "#work",
                type: "internal",
                category: "Project",
            },
            {
                title: "Email",
                description: portfolioConfig.profile.email,
                keywords: `email mail contact ${portfolioConfig.profile.email}`,
                href: `mailto:${portfolioConfig.profile.email}`,
                type: "external",
                category: "Contact",
            },
        ];

        if (isConfiguredValue(portfolioConfig.profile.githubUrl) || githubUsername) {
            searchState.items.push({
                title: "GitHub Profile",
                description: githubUsername ? `github.com/${githubUsername}` : "Open GitHub profile",
                keywords: `github profile repos code ${githubUsername}`,
                href: isConfiguredValue(portfolioConfig.profile.githubUrl)
                    ? portfolioConfig.profile.githubUrl
                    : `https://github.com/${githubUsername}`,
                type: "external",
                category: "Social",
            });
        }

        if (isConfiguredValue(portfolioConfig.profile.linkedinUrl)) {
            searchState.items.push({
                title: "LinkedIn",
                description: getHandleFromUrl(portfolioConfig.profile.linkedinUrl),
                keywords: `linkedin career professional social ${getHandleFromUrl(portfolioConfig.profile.linkedinUrl)}`,
                href: portfolioConfig.profile.linkedinUrl,
                type: "external",
                category: "Social",
            });
        }

        if (isConfiguredValue(portfolioConfig.profile.instagramUrl)) {
            searchState.items.push({
                title: "Instagram",
                description: `@${getHandleFromUrl(portfolioConfig.profile.instagramUrl)}`,
                keywords: `instagram social visuals photos ${getHandleFromUrl(portfolioConfig.profile.instagramUrl)}`,
                href: portfolioConfig.profile.instagramUrl,
                type: "external",
                category: "Social",
            });
        }

        if (whatsappUrl) {
            searchState.items.push({
                title: "WhatsApp",
                description: portfolioConfig.profile.whatsappNumber,
                keywords: `whatsapp phone message chat ${portfolioConfig.profile.whatsappNumber}`,
                href: whatsappUrl,
                type: "external",
                category: "Social",
            });
        }
    };

    const escapeHtml = (value) => {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("\"", "&quot;")
            .replaceAll("'", "&#39;");
    };

    const formatCompactNumber = (value) => {
        return new Intl.NumberFormat(undefined, {
            notation: "compact",
            maximumFractionDigits: 1,
        }).format(Number(value) || 0);
    };

    const formatRepoUpdatedDate = (value) => {
        return new Intl.DateTimeFormat(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(value));
    };

    const languageColors = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        HTML: "#e34c26",
        CSS: "#663399",
        SCSS: "#c6538c",
        Python: "#3572A5",
        Java: "#b07219",
        "C++": "#f34b7d",
        C: "#555555",
        PHP: "#4F5D95",
        Shell: "#89e051",
        Vue: "#41b883",
        Go: "#00ADD8",
        Rust: "#dea584",
        Kotlin: "#A97BFF",
        Swift: "#F05138",
        Dart: "#00B4AB",
    };

    const getLanguageColor = (language) => {
        return languageColors[language] || "#94a3b8";
    };

    const fetchGitHubJson = async (url, { cacheTtlMs = githubCacheTtlMs } = {}) => {
        const cacheKey = getGitHubCacheKey(url);
        const cached = getCachedJson(cacheKey);

        if (cached !== null) {
            return cached;
        }

        try {
            const response = await fetch(url, {
                headers: {
                    Accept: "application/vnd.github+json",
                },
            });

            if (!response.ok) {
                throw new Error(`GitHub API returned ${response.status}`);
            }

            const data = await response.json();
            setCachedJson(cacheKey, data, cacheTtlMs);
            return data;
        } catch (error) {
            const staleCache = getCachedJson(cacheKey, { allowExpired: true });

            if (staleCache !== null) {
                return staleCache;
            }

            throw error;
        }
    };

    const fetchAllGitHubRepos = async (username) => {
        const allRepos = [];
        const perPage = portfolioConfig.repoPageSize || 100;

        for (let page = 1; page <= 10; page += 1) {
            const pageRepos = await fetchGitHubJson(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${perPage}&type=owner&page=${page}`);

            if (!Array.isArray(pageRepos) || !pageRepos.length) {
                break;
            }

            allRepos.push(...pageRepos);

            if (pageRepos.length < perPage) {
                break;
            }
        }

        return allRepos;
    };

    const renderRepoProfile = (profile, repos, username) => {
        const profileLogin = profile?.login || username || "username";
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const summaryParts = [
            profile?.location,
            profile?.company,
            profile?.blog,
        ].filter(Boolean);

        if (repoHandle) {
            repoHandle.textContent = `github.com/${profileLogin}`;
        }

        if (repoProfileAvatar && profile?.avatar_url) {
            repoProfileAvatar.src = profile.avatar_url;
            repoProfileAvatar.alt = `${profileLogin} GitHub avatar`;
        }

        if (repoProfileName) {
            repoProfileName.textContent = profile?.name || profileLogin;
        }

        if (repoProfileUsername) {
            repoProfileUsername.textContent = `@${profileLogin}`;
        }

        if (repoProfileBio) {
            repoProfileBio.textContent = profile?.bio || "Frontend builds, UI systems, and practical experiments loaded live from GitHub.";
        }

        if (repoProfileMeta) {
            repoProfileMeta.textContent = summaryParts.join("\n") || "Public repositories, live profile data, and recent activity from GitHub.";
        }

        if (repoProfileCount) {
            repoProfileCount.textContent = formatCompactNumber(repos.length);
        }

        if (repoProfileStars) {
            repoProfileStars.textContent = formatCompactNumber(totalStars);
        }

        if (repoProfileFollowers) {
            repoProfileFollowers.textContent = formatCompactNumber(profile?.followers || 0);
        }

        if (repoFeedMeta) {
            repoFeedMeta.textContent = `${repos.length} repositories • sorted by latest activity`;
        }
    };

    const renderSearchResults = (items, query) => {
        if (!searchResults || !searchMeta) {
            return;
        }

        if (!query.trim()) {
            const quickItems = items.slice(0, 6);
            searchMeta.textContent = "Try Home, About Me, GitHub Repositories, Contact, or any project name.";

            searchResults.innerHTML = quickItems.map((item) => `
                <button type="button"
                    class="search-result-item flex w-full items-start justify-between gap-4 rounded-2xl px-3 py-3 text-left transition hover:bg-black/[0.04]"
                    data-href="${escapeHtml(item.href)}"
                    data-type="${escapeHtml(item.type)}">
                    <div>
                        <p class="text-sm font-semibold text-slate-900">${escapeHtml(item.title)}</p>
                        <p class="mt-1 text-sm leading-6 text-slate-500">${escapeHtml(item.description)}</p>
                    </div>
                    <span class="rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        ${escapeHtml(item.category)}
                    </span>
                </button>
            `).join("");

            return;
        }

        const normalizedQuery = query.trim().toLowerCase();
        const matches = items.filter((item) => {
            const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });

        searchMeta.textContent = matches.length
            ? `${matches.length} result${matches.length > 1 ? "s" : ""} found for "${query.trim()}".`
            : `No results found for "${query.trim()}".`;

        if (!matches.length) {
            searchResults.innerHTML = `
                <div class="rounded-2xl px-3 py-5 text-sm text-slate-500">
                    No matches yet. Try searching for <span class="font-semibold text-slate-700">About</span>,
                    <span class="font-semibold text-slate-700">GitHub</span>,
                    <span class="font-semibold text-slate-700">Contact</span>, or a project title.
                </div>
            `;
            return;
        }

        searchResults.innerHTML = matches.map((item) => `
            <button type="button"
                class="search-result-item flex w-full items-start justify-between gap-4 rounded-2xl px-3 py-3 text-left transition hover:bg-black/[0.04]"
                data-href="${escapeHtml(item.href)}"
                data-type="${escapeHtml(item.type)}">
                <div>
                    <p class="text-sm font-semibold text-slate-900">${escapeHtml(item.title)}</p>
                    <p class="mt-1 text-sm leading-6 text-slate-500">${escapeHtml(item.description)}</p>
                </div>
                <span class="rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    ${escapeHtml(item.category)}
                </span>
            </button>
        `).join("");

    };

    const closeSearch = () => {
        if (!searchOverlay) {
            return;
        }

        searchOverlay.style.pointerEvents = "none";
        searchOverlay.style.opacity = "0";
    };

    const openSearch = () => {
        if (!searchOverlay || !siteSearchInput) {
            return;
        }

        searchOverlay.style.pointerEvents = "auto";
        searchOverlay.style.opacity = "1";
        renderSearchResults(searchState.items, siteSearchInput.value);
        window.requestAnimationFrame(() => {
            siteSearchInput.focus({ preventScroll: true });
        });
    };

    const activateSearchItem = (href, type) => {
        if (!href) {
            return;
        }

        closeSearch();

        if (type === "internal" && href.startsWith("#")) {
            const target = document.querySelector(href);
            if (target) {
                scrollToTarget(target);
            }
            return;
        }

        if (href.startsWith("mailto:")) {
            window.location.href = href;
            return;
        }

        window.open(href, "_blank", "noopener,noreferrer");
    };

    const initSearch = () => {
        buildSearchIndex();

        if (!searchOverlay || !openSearchButton || !siteSearchInput || !searchResults) {
            return;
        }

        openSearchButton.addEventListener("click", openSearch);
        closeSearchButton?.addEventListener("click", closeSearch);
        searchBackdrop?.addEventListener("click", closeSearch);
        searchResults.addEventListener("click", (event) => {
            const actionItem = event.target.closest(".search-result-item");

            if (!actionItem) {
                return;
            }

            const href = actionItem.getAttribute("data-href") || "";
            const type = actionItem.getAttribute("data-type") || "internal";
            activateSearchItem(href, type);
        });

        const renderSearchResultsDebounced = debounce((query) => {
            renderSearchResults(searchState.items, query);
        }, 90);

        siteSearchInput.addEventListener("input", (event) => {
            renderSearchResultsDebounced(event.target.value);
        });

        siteSearchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const firstResult = searchResults.querySelector(".search-result-item");
                if (firstResult) {
                    firstResult.click();
                }
            }
        });

        document.addEventListener("keydown", (event) => {
            const isTypingTarget = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || "");

            if (event.key === "/" && !isTypingTarget) {
                event.preventDefault();
                openSearch();
            }

            if (event.key === "Escape") {
                closeSearch();
            }
        });

        renderSearchResults(searchState.items, "");
    };

    const populateContactInfo = () => {
        const githubUsername = getGitHubUsername();
        const githubUrl = isConfiguredValue(portfolioConfig.profile.githubUrl)
            ? portfolioConfig.profile.githubUrl
            : (githubUsername ? `https://github.com/${githubUsername}` : "");
        const linkedinUrl = portfolioConfig.profile.linkedinUrl;
        const instagramUrl = portfolioConfig.profile.instagramUrl;
        const whatsappUrl = getWhatsappUrl();

        if (emailLink && portfolioConfig.profile.email) {
            emailLink.href = `mailto:${portfolioConfig.profile.email}`;
            emailLink.innerHTML = `
                <i data-feather="mail" class="h-4 w-4"></i>
                ${escapeHtml(portfolioConfig.profile.email)}
            `;
        }

        setLinkState(contactGithub, !!githubUrl, githubUrl);
        if (contactGithubText) {
            contactGithubText.textContent = githubUrl
                ? `github.com/${githubUsername || getHandleFromUrl(githubUrl)}`
                : "Add your GitHub username in script.js";
        }

        setLinkState(contactLinkedin, isConfiguredValue(linkedinUrl), linkedinUrl);
        if (contactLinkedinText) {
            contactLinkedinText.textContent = isConfiguredValue(linkedinUrl)
                ? `linkedin.com/in/${getHandleFromUrl(linkedinUrl)}`
                : "Add your LinkedIn profile URL in script.js";
        }

        setLinkState(contactInstagram, isConfiguredValue(instagramUrl), instagramUrl);
        if (contactInstagramText) {
            contactInstagramText.textContent = isConfiguredValue(instagramUrl)
                ? `@${getHandleFromUrl(instagramUrl)}`
                : "Add your Instagram handle in script.js";
        }

        setLinkState(contactWhatsapp, !!whatsappUrl, whatsappUrl);
        if (contactWhatsappText) {
            contactWhatsappText.textContent = whatsappUrl
                ? `+${portfolioConfig.profile.whatsappNumber.replace(/\D/g, "")}`
                : "Add your WhatsApp number in script.js";
        }

        if (githubProfileLink) {
            if (githubUrl) {
                githubProfileLink.href = githubUrl;
                githubProfileLink.target = "_blank";
                githubProfileLink.rel = "noreferrer";
            } else {
                githubProfileLink.href = "#contact";
                githubProfileLink.removeAttribute("target");
                githubProfileLink.removeAttribute("rel");
            }
        }

        feather.replace({ "stroke-width": 1.8 });
    };

    const renderRepoCards = (repos) => {
        if (!repoGrid) {
            return;
        }

        repoGrid.innerHTML = repos.map((repo) => {
            const updatedDate = formatRepoUpdatedDate(repo.updated_at);
            const topics = (repo.topics || []).slice(0, 4).map((topic) => `
                <span class="repo-topic-chip">${escapeHtml(topic)}</span>
            `).join("");
            const badges = [
                repo.fork ? '<span class="repo-chip">Fork</span>' : "",
                repo.archived ? '<span class="repo-chip">Archived</span>' : "",
                repo.homepage ? '<span class="repo-chip">Live</span>' : "",
            ].join("");

            return `
                <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer"
                    class="repo-row group">
                    <div class="repo-row-top">
                        <div class="repo-row-title">
                            <h3 class="repo-row-heading">
                                ${escapeHtml(repo.name)}
                            </h3>
                            <p class="repo-row-desc">
                                ${escapeHtml(repo.description || "A focused repository with modern implementation details, structured source code, and practical front-end problem solving.")}
                            </p>
                            ${badges ? `<div class="repo-row-badges">${badges}</div>` : ""}
                        </div>

                        <span class="repo-row-launch">
                            <i data-feather="arrow-up-right" class="h-4 w-4"></i>
                        </span>
                    </div>

                    <div class="repo-row-bottom">
                        ${topics ? `<div class="repo-topic-row">${topics}</div>` : '<div class="repo-topic-row"></div>'}

                        <div class="repo-row-meta">
                            <span class="inline-flex items-center gap-2">
                                <span class="repo-lang-dot" style="background:${escapeHtml(getLanguageColor(repo.language))}"></span>
                                ${escapeHtml(repo.language || "Repository")}
                            </span>
                            <span class="inline-flex items-center gap-2">
                                <i data-feather="star" class="h-4 w-4"></i>
                                ${formatCompactNumber(repo.stargazers_count)} stars
                            </span>
                            <span class="inline-flex items-center gap-2">
                                <i data-feather="git-branch" class="h-4 w-4"></i>
                                ${escapeHtml(repo.default_branch)}
                            </span>
                            <span class="inline-flex items-center gap-2">
                                <i data-feather="clock" class="h-4 w-4"></i>
                                Updated ${escapeHtml(updatedDate)}
                            </span>
                        </div>
                    </div>
                </a>
            `;
        }).join("");

        feather.replace({ "stroke-width": 1.8 });
    };

    const addRepoItemsToSearch = (repos) => {
        const repoItems = repos.map((repo) => ({
            title: repo.name,
            description: repo.description || "GitHub repository",
            keywords: `${repo.name} ${repo.language || ""} repo github code ${repo.topics?.join(" ") || ""}`,
            href: repo.html_url,
            type: "external",
            category: "Repo",
        }));

        searchState.items = [
            ...searchState.items.filter((item) => item.category !== "Repo"),
            ...repoItems,
        ];

        if (searchOverlay && searchOverlay.style.pointerEvents === "auto") {
            renderSearchResults(searchState.items, siteSearchInput?.value || "");
        }
    };

    const loadGitHubRepos = async () => {
        const username = getGitHubUsername();

        if (!repoGrid) {
            return;
        }

        if (!username) {
            repoGrid.innerHTML = `
                <article class="repo-empty-state">
                    Add your GitHub username in <strong>script.js</strong> to load your public repositories here automatically.
                </article>
            `;
            if (repoFeedMeta) {
                repoFeedMeta.textContent = "GitHub username is not configured yet";
            }
            return;
        }

        if (repoFeedMeta) {
            repoFeedMeta.textContent = "Syncing live repository workspace...";
        }
        if (repoHandle) {
            repoHandle.textContent = `github.com/${username}`;
        }

        try {
            const [profile, repos] = await Promise.all([
                fetchGitHubJson(`https://api.github.com/users/${encodeURIComponent(username)}`),
                fetchAllGitHubRepos(username),
            ]);
            const sortedRepos = [...repos].sort((left, right) => new Date(right.updated_at) - new Date(left.updated_at));

            renderRepoProfile(profile, sortedRepos, username);

            if (!sortedRepos.length) {
                repoGrid.innerHTML = `
                    <article class="repo-empty-state">
                        No public repositories were found for this GitHub profile yet.
                    </article>
                `;
                if (repoFeedMeta) {
                    repoFeedMeta.textContent = "No public repositories found yet";
                }
                return;
            }

            renderRepoCards(sortedRepos);
            addRepoItemsToSearch(sortedRepos);
        } catch (error) {
            repoGrid.innerHTML = `
                <article class="repo-empty-state">
                    GitHub repositories could not be loaded right now. Check the username in script.js or try again with network access in the browser.
                </article>
            `;
            if (repoFeedMeta) {
                repoFeedMeta.textContent = "GitHub workspace could not be loaded";
            }
        }
    };

    const initDeferredGitHubRepos = () => {
        let hasLoaded = false;
        const reposSection = document.getElementById("repos");
        const loadReposOnce = () => {
            if (hasLoaded) {
                return;
            }

            hasLoaded = true;
            loadGitHubRepos();
        };

        if (!reposSection || !("IntersectionObserver" in window)) {
            loadReposOnce();
            return;
        }

        const repoObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                repoObserver.disconnect();
                loadReposOnce();
            }
        }, {
            root: null,
            rootMargin: "420px 0px",
            threshold: 0,
        });

        repoObserver.observe(reposSection);

        runWhenIdle(() => {
            const nearViewportThreshold = reposSection.offsetTop - (window.innerHeight * 1.6);

            if (window.scrollY >= nearViewportThreshold) {
                repoObserver.disconnect();
                loadReposOnce();
            }
        }, 3200);
    };

    let navbarTimeTickTimeoutId = null;
    const scheduleNavbarDateTimeUpdate = () => {
        updateNavbarDateTime();
        const millisecondsToNextMinute = 60000 - (Date.now() % 60000);
        navbarTimeTickTimeoutId = window.setTimeout(scheduleNavbarDateTimeUpdate, millisecondsToNextMinute + 24);
    };

    scheduleNavbarDateTimeUpdate();
    window.addEventListener("pagehide", () => {
        if (navbarTimeTickTimeoutId !== null) {
            window.clearTimeout(navbarTimeTickTimeoutId);
            navbarTimeTickTimeoutId = null;
        }
    });

    initBinaryNavbar();
    initSmoothInternalNavigation();
    initNotchNavigation();
    initSmartVideos();
    populateContactInfo();
    initSearch();
    initDeferredGitHubRepos();
});
