import { useEffect } from "react";

type TawkApi = {
    onLoad?: () => void;
    onChatMessageAgent?: (message: string) => void;
    onChatMaximized?: () => void;
    maximize?: () => void;
    isChatMaximized?: () => boolean;
    [key: string]: unknown;
};

declare global {
    interface Window {
        Tawk_API?: TawkApi;
        Tawk_LoadStart?: Date;
    }
}

const PROPERTY_ID = "6ae280097eefa63472c51ca6";
const WIDGET_ID = "1k62c89qc";
const MAX_RETRIES = 10;
const FLASH_TEXT = "New message!";
const FIRST_OPEN_DELAY = 5000; 
const FIRST_VISIT_KEY = "tawk_first_open_done";
const ROUTE_CHANGE_EVENT = "tawk:routechange";

const injectSnippet = () => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();

    if (document.getElementById("tawk-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
};

const isFirstVisit = () => {
    try {
        return !sessionStorage.getItem(FIRST_VISIT_KEY);
    } catch {
        return true;
    }
};

const markVisited = () => {
    try {
        sessionStorage.setItem(FIRST_VISIT_KEY, "1");
    } catch {
        
    }
};

const TawkChat = () => {
    useEffect(() => {
        injectSnippet();

        const T = () => window.Tawk_API;
        if (!T()) return;

        let pendingOpen = false;
        let openRequested = false;
        let titleTimer: ReturnType<typeof setInterval> | null = null;
        let savedTitle = "";
        const retryTimers = new Set<ReturnType<typeof setTimeout>>();

        const isWidgetReady = () => typeof T()?.maximize === "function";

        const isMaximized = () => {
            try {
                return T()?.isChatMaximized?.() ?? false;
            } catch {
                return false;
            }
        };

        const stopTitleFlash = () => {
            if (!titleTimer) return;
            clearInterval(titleTimer);
            titleTimer = null;
            document.title = savedTitle;
        };

        const startTitleFlash = () => {
            if (titleTimer) return;
            savedTitle = document.title;
            let on = false;
            titleTimer = setInterval(() => {
                document.title = on ? savedTitle : FLASH_TEXT;
                on = !on;
            }, 1000);
        };

        const forceOpen = (attempt = 0) => {
            try {
                T()?.maximize?.();
            } catch {
                
            }
            const t = setTimeout(() => {
                retryTimers.delete(t);
                if (isMaximized()) {
                    pendingOpen = false;
                    stopTitleFlash();
                    return;
                }
                if (attempt < MAX_RETRIES) forceOpen(attempt + 1);
            }, 300);
            retryTimers.add(t);
        };

        const tryAutoOpen = () => {
            if (!openRequested || !isWidgetReady()) return;
            openRequested = false;
            if (!isMaximized()) forceOpen(0);
        };

        const requestOpen = () => {
            openRequested = true;
            tryAutoOpen();
        };

        if (isFirstVisit()) {
            const t = setTimeout(() => {
                retryTimers.delete(t);
                markVisited();
                requestOpen();
            }, FIRST_OPEN_DELAY);
            retryTimers.add(t);
        } else {
            requestOpen();
        }

        const origPush = history.pushState;
        const origReplace = history.replaceState;
        let lastPath = location.pathname;

        const notifyRouteChange = () => {
            window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
        };

        const patchedPush: typeof history.pushState = function (this: History, ...args) {
            const result = origPush.apply(this, args);
            notifyRouteChange();
            return result;
        };
        const patchedReplace: typeof history.replaceState = function (this: History, ...args) {
            const result = origReplace.apply(this, args);
            notifyRouteChange();
            return result;
        };
        history.pushState = patchedPush;
        history.replaceState = patchedReplace;

        const onRouteChange = () => {
            if (location.pathname === lastPath) return;
            lastPath = location.pathname;
            if (isFirstVisit()) return;
            requestOpen();
        };

        window.addEventListener(ROUTE_CHANGE_EVENT, onRouteChange);
        window.addEventListener("popstate", onRouteChange);

        const onAgentMessage = () => {
            pendingOpen = true;
            forceOpen(0);
            if (document.hidden) startTitleFlash();
        };

        const onMaximized = () => {
            pendingOpen = false;
            stopTitleFlash();
        };

        const onTabVisibility = () => {
            if (!document.hidden && pendingOpen) forceOpen(0);
            else if (!document.hidden) stopTitleFlash();
        };

        const api = T()!;
        const prevOnLoad = api.onLoad;
        const onWidgetLoad = () => {
            prevOnLoad?.();
            tryAutoOpen();
        };

        api.onLoad = onWidgetLoad;
        api.onChatMessageAgent = onAgentMessage;
        api.onChatMaximized = onMaximized;
        document.addEventListener("visibilitychange", onTabVisibility);

        return () => {
            if (api.onLoad === onWidgetLoad) api.onLoad = prevOnLoad;
            if (api.onChatMessageAgent === onAgentMessage) api.onChatMessageAgent = undefined;
            if (api.onChatMaximized === onMaximized) api.onChatMaximized = undefined;
            if (history.pushState === patchedPush) history.pushState = origPush;
            if (history.replaceState === patchedReplace) history.replaceState = origReplace;
            window.removeEventListener(ROUTE_CHANGE_EVENT, onRouteChange);
            window.removeEventListener("popstate", onRouteChange);
            document.removeEventListener("visibilitychange", onTabVisibility);
            retryTimers.forEach(clearTimeout);
            retryTimers.clear();
            stopTitleFlash();
        };
    }, []);

    return null;
};

export default TawkChat;