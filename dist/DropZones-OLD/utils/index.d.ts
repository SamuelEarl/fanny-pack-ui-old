export declare const FILE_INVALID_TYPE = "file-invalid-type";
export declare const FILE_TOO_LARGE = "file-too-large";
export declare const FILE_TOO_SMALL = "file-too-small";
export declare const TOO_MANY_FILES = "too-many-files";
export declare const getInvalidTypeRejectionErr: (accept: any) => {
    code: string;
    message: string;
};
export declare const getTooLargeRejectionErr: (maxSize: any) => {
    code: string;
    message: string;
};
export declare const getTooSmallRejectionErr: (minSize: any) => {
    code: string;
    message: string;
};
export declare const TOO_MANY_FILES_REJECTION: {
    code: string;
    message: string;
};
export declare function fileAccepted(file: any, accept: any): any[];
export declare function fileMatchSize(file: any, minSize: any, maxSize: any): (boolean | {
    code: string;
    message: string;
})[];
export declare function allFilesAccepted({ files, accept, minSize, maxSize, multiple, }: {
    files: any;
    accept: any;
    minSize: any;
    maxSize: any;
    multiple: any;
}): any;
export declare function isPropagationStopped(event: any): any;
export declare function isEvtWithFiles(event: any): any;
export declare function isKindFile(item: any): boolean;
export declare function onDocumentDragOver(event: any): void;
export declare function isIeOrEdge(userAgent?: string): boolean;
/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls `event.isPropagationStopped()`.
 * Note that the check is done on the first invoke too,
 * meaning that if propagation was stopped before invoking the fns,
 * no handlers will be executed.
 *
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */
export declare function composeEventHandlers(...fns: any[]): (event: any, ...args: any[]) => boolean;
