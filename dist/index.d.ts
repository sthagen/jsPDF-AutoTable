// Generated by dts-bundle-generator v5.4.0

export declare type jsPDFConstructor = any;
export declare type jsPDFDocument = any;
export declare type Opts = {
	[key: string]: string | number;
};
declare class DocHandler {
	private readonly jsPDFDocument;
	readonly userStyles: Partial<Styles>;
	constructor(jsPDFDocument: jsPDFDocument);
	static setDefaults(defaults: UserOptions, doc?: jsPDFDocument | null): void;
	private static unifyColor;
	applyStyles(styles: Partial<Styles>, fontOnly?: boolean): void;
	splitTextToSize(text: string | string[], size: number, opts: Opts): string[];
	rect(x: number, y: number, width: number, height: number, fillStyle: string): any;
	getLastAutoTable(): Table | null;
	getTextWidth(text: string | string[]): number;
	getDocument(): any;
	setPage(page: number): void;
	addPage(): any;
	getFontList(): {
		[key: string]: string[] | undefined;
	};
	getGlobalOptions(): UserOptions;
	getDocumentOptions(): UserOptions;
	pageSize(): {
		width: number;
		height: number;
	};
	scaleFactor(): number;
	pageNumber(): number;
}
declare class HookData {
	table: Table;
	pageNumber: number;
	pageCount: number;
	settings: Settings;
	doc: jsPDFDocument;
	cursor: Pos | null;
	constructor(doc: DocHandler, table: Table, cursor: Pos | null);
}
export declare class CellHookData extends HookData {
	cell: Cell;
	row: Row;
	column: Column;
	section: "head" | "body" | "foot";
	constructor(doc: DocHandler, table: Table, cell: Cell, row: Row, column: Column, cursor: Pos | null);
}
export declare type MarginPadding = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};
export interface ContentInput {
	body: RowInput[];
	head: RowInput[];
	foot: RowInput[];
	columns: ColumnInput[];
}
export interface TableInput {
	id: string | number | undefined;
	settings: Settings;
	styles: StylesProps;
	hooks: HookProps;
	content: ContentInput;
}
export declare type Pos = {
	x: number;
	y: number;
};
export declare type PageHook = (data: HookData) => void | boolean;
export declare type CellHook = (data: CellHookData) => void | boolean;
export interface HookProps {
	didParseCell: CellHook[];
	willDrawCell: CellHook[];
	didDrawCell: CellHook[];
	didDrawPage: PageHook[];
}
export interface Settings {
	includeHiddenHtml: boolean;
	useCss: boolean;
	theme: "striped" | "grid" | "plain";
	startY: number;
	margin: MarginPadding;
	pageBreak: "auto" | "avoid" | "always";
	rowPageBreak: "auto" | "avoid";
	tableWidth: "auto" | "wrap" | number;
	showHead: "everyPage" | "firstPage" | "never";
	showFoot: "everyPage" | "lastPage" | "never";
	tableLineWidth: number;
	tableLineColor: Color;
	horizontalPageBreak?: boolean;
	horizontalPageBreakRepeat?: string | number | null;
}
export interface StylesProps {
	styles: Partial<Styles>;
	headStyles: Partial<Styles>;
	bodyStyles: Partial<Styles>;
	footStyles: Partial<Styles>;
	alternateRowStyles: Partial<Styles>;
	columnStyles: {
		[key: string]: Partial<Styles>;
	};
}
export declare type ContentSettings = {
	body: Row[];
	head: Row[];
	foot: Row[];
	columns: Column[];
};
export declare class Table {
	readonly id?: string | number;
	readonly settings: Settings;
	readonly styles: StylesProps;
	readonly hooks: HookProps;
	readonly columns: Column[];
	readonly head: Row[];
	readonly body: Row[];
	readonly foot: Row[];
	pageNumber: number;
	finalY?: number;
	startPageNumber?: number;
	pageCount: number;
	constructor(input: TableInput, content: ContentSettings);
	getHeadHeight(columns: Column[]): number;
	getFootHeight(columns: Column[]): number;
	allRows(): Row[];
	callCellHooks(doc: DocHandler, handlers: CellHook[], cell: Cell, row: Row, column: Column, cursor: {
		x: number;
		y: number;
	} | null): boolean;
	callEndPageHooks(doc: DocHandler, cursor: {
		x: number;
		y: number;
	}): void;
	getWidth(pageWidth: number): number;
}
export declare class Row {
	readonly raw: HTMLTableRowElement | RowInput;
	readonly element?: HTMLTableRowElement;
	readonly index: number;
	readonly section: Section;
	readonly cells: {
		[key: string]: Cell;
	};
	spansMultiplePages: boolean;
	height: number;
	constructor(raw: RowInput | HTMLTableRowElement, index: number, section: Section, cells: {
		[key: string]: Cell;
	}, spansMultiplePages?: boolean);
	getMaxCellHeight(columns: Column[]): number;
	hasRowSpan(columns: Column[]): boolean;
	canEntireRowFit(height: number, columns: Column[]): boolean;
	getMinimumRowHeight(columns: Column[], doc: DocHandler): number;
}
export declare type Section = "head" | "body" | "foot";
export declare class Cell {
	raw: HTMLTableCellElement | CellInput;
	styles: Styles;
	text: string[];
	section: Section;
	colSpan: number;
	rowSpan: number;
	contentHeight: number;
	contentWidth: number;
	wrappedWidth: number;
	minReadableWidth: number;
	minWidth: number;
	width: number;
	height: number;
	x: number;
	y: number;
	constructor(raw: CellInput, styles: Styles, section: Section);
	getTextPos(): Pos;
	getContentHeight(scaleFactor: number): number;
	padding(name: "vertical" | "horizontal" | "top" | "bottom" | "left" | "right"): number;
}
export declare class Column {
	raw: ColumnInput | null;
	dataKey: string | number;
	index: number;
	wrappedWidth: number;
	minReadableWidth: number;
	minWidth: number;
	width: number;
	constructor(dataKey: string | number, raw: ColumnInput | null, index: number);
	getMaxCustomCellWidth(table: Table): number;
}
export interface LineWidths {
	bottom: number;
	top: number;
	left: number;
	right: number;
}
export interface Styles {
	font: "helvetica" | "times" | "courier" | string;
	fontStyle: "normal" | "bold" | "italic" | "bolditalic" | string;
	overflow: "linebreak" | "ellipsize" | "visible" | "hidden" | Function;
	fillColor: Color;
	textColor: Color;
	halign: "left" | "center" | "right" | "justify";
	valign: "top" | "middle" | "bottom";
	fontSize: number;
	cellPadding: MarginPaddingInput;
	lineColor: Color;
	lineWidth: number | Partial<LineWidths>;
	cellWidth: "auto" | "wrap" | number;
	minCellHeight: number;
	minCellWidth: number;
}
export interface UserOptions {
	includeHiddenHtml?: boolean;
	useCss?: boolean;
	theme?: "striped" | "grid" | "plain" | null;
	startY?: number | false;
	margin?: MarginPaddingInput;
	pageBreak?: "auto" | "avoid" | "always";
	rowPageBreak?: "auto" | "avoid";
	tableWidth?: "auto" | "wrap" | number;
	showHead?: "everyPage" | "firstPage" | "never" | boolean;
	showFoot?: "everyPage" | "lastPage" | "never" | boolean;
	tableLineWidth?: number;
	tableLineColor?: Color;
	tableId?: string | number;
	head?: RowInput[];
	body?: RowInput[];
	foot?: RowInput[];
	html?: string | HTMLTableElement;
	columns?: ColumnInput[];
	horizontalPageBreak?: boolean;
	horizontalPageBreakRepeat?: string | number;
	styles?: Partial<Styles>;
	bodyStyles?: Partial<Styles>;
	headStyles?: Partial<Styles>;
	footStyles?: Partial<Styles>;
	alternateRowStyles?: Partial<Styles>;
	columnStyles?: {
		[key: string]: Partial<Styles>;
	};
	didParseCell?: CellHook;
	willDrawCell?: CellHook;
	didDrawCell?: CellHook;
	didDrawPage?: PageHook;
}
export declare type ColumnInput = string | number | {
	header?: CellInput;
	title?: CellInput;
	footer?: CellInput;
	dataKey?: string | number;
	key?: string | number;
};
export declare type Color = [
	number,
	number,
	number
] | number | string | false;
export declare type MarginPaddingInput = number | number[] | {
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
	horizontal?: number;
	vertical?: number;
};
export interface CellDef {
	rowSpan?: number;
	colSpan?: number;
	styles?: Partial<Styles>;
	content?: string | string[] | number;
	title?: string;
	_element?: HTMLTableCellElement;
}
declare class HtmlRowInput extends Array<CellDef> {
	_element: HTMLTableRowElement;
	constructor(element: HTMLTableRowElement);
}
export declare type CellInput = null | string | string[] | number | boolean | CellDef;
export declare type RowInput = {
	[key: string]: CellInput;
} | HtmlRowInput | CellInput[];
export declare type autoTable = (options: UserOptions) => void;
export declare function applyPlugin(jsPDF: jsPDFConstructor): void;
export default function autoTable(d: jsPDFDocument, options: UserOptions): void;
export declare function __createTable(d: jsPDFDocument, options: UserOptions): Table;
export declare function __drawTable(d: jsPDFDocument, table: Table): void;

export {};
