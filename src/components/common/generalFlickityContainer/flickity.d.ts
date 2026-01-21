declare module 'flickity' {
    interface FlickityOptions {
        accessibility?: boolean;
        cellAlign?: 'left' | 'center' | 'right';
        cellSelector?: string;
        contain?: boolean;
        draggable?: boolean;
        dragThreshold?: number;
        friction?: number;
        groupCells?: boolean | number | string;
        initialIndex?: number;
        pageDots?: boolean;
        percentPosition?: boolean;
        prevNextButtons?: boolean;
        selectedAttraction?: number;
        wrapAround?: boolean;
        freeScroll?: boolean;
        [key: string]: any;
    }

    interface FlickityInstance {
        x: number;
        slides: any[];
        cells: any[];
        selectedIndex: number;
        slider?: {
            childNodes: NodeList;
        };
        next(isWrapped?: boolean, isInstant?: boolean): void;
        previous(isWrapped?: boolean, isInstant?: boolean): void;
        resize(): void;
        reposition(): void;
        destroy(): void;
        on(eventName: string, callback: (...args: any[]) => void): void;
        off(eventName: string, callback: (...args: any[]) => void): void;
    }

    class Flickity {
        constructor(element: Element | string, options?: FlickityOptions);

        x: number;
        slides: any[];
        cells: any[];
        selectedIndex: number;
        slider?: {
            childNodes: NodeList;
        };

        next(isWrapped?: boolean, isInstant?: boolean): void;
        previous(isWrapped?: boolean, isInstant?: boolean): void;
        resize(): void;
        reposition(): void;
        destroy(): void;
        on(eventName: string, callback: (...args: any[]) => void): void;
        off(eventName: string, callback: (...args: any[]) => void): void;
    }

    export = Flickity;
}
